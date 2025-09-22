import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // 1. Server-side Validation
    if (!email || !password) {
      return NextResponse.json(
        { message: 'অনুগ্রহ করে ইমেইল এবং পাসওয়ার্ড দিন।' },
        { status: 400 } // Bad Request
      );
    }

    // 2. Find the user by email
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    // 3. If user doesn't exist, return an error
    if (!user) {
      return NextResponse.json(
        { message: 'আপনার ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।' },
        { status: 401 } // Unauthorized
      );
    }

    // 4. Compare the provided password with the stored hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    // 5. If passwords don't match, return an error
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: 'আপনার ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।' },
        { status: 401 } // Unauthorized
      );
    }

    // 6. Remove password from the user object before sending the response
    const { password: _, ...userWithoutPassword } = user;

    // 7. Return a success response with user data
    return NextResponse.json(
      {
        message: 'সফলভাবে লগইন হয়েছে!',
        user: userWithoutPassword,
      },
      { status: 200 } // OK
    );

  } catch (error) {
    console.error('SIGNIN_API_ERROR:', error);
    return NextResponse.json(
      { message: 'একটি অভ্যন্তরীণ সার্ভার ত্রুটি ঘটেছে।' },
      { status: 500 } // Internal Server Error
    );
  }
}