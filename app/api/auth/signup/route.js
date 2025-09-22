import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { sendVerificationCodeEmail } from '@/lib/mail';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { name, username, email, mobileNumber, password } = await request.json();

    // আপনার আগের ভ্যালিডেশন এবং ইউজার এক্সিস্ট চেক এখানে থাকবে
    if (!name || !username || !email || !password) {
      return NextResponse.json({ message: 'অনুগ্রহ করে সবগুলো প্রয়োজনীয় ফিল্ড পূরণ করুন।' }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ message: 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।' }, { status: 400 });
    }
    const existingUserByEmail = await prisma.user.findUnique({ where: { email } });
    if (existingUserByEmail) {
      return NextResponse.json({ message: 'এই ইমেইল দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট আছে।' }, { status: 409 });
    }
    const existingUserByUsername = await prisma.user.findUnique({ where: { username } });
    if (existingUserByUsername) {
        return NextResponse.json({ message: 'এই ইউজারনেমটি ইতিমধ্যে ব্যবহৃত হয়েছে।' }, { status: 409 });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // ভেরিফিকেশন কোড তৈরি এবং ইমেইল পাঠান
    const { code, expiry } = await sendVerificationCodeEmail(email);

    // ব্যবহারকারী তৈরি করুন
    await prisma.user.create({
      data: {
        name,
        username,
        email,
        mobileNumber,
        password: hashedPassword,
        verificationCode: code,
        verificationCodeExpiry: expiry,
      },
    });

    return NextResponse.json(
      { message: 'আপনার অ্যাকাউন্টে একটি ভেরিফিকেশন কোড পাঠানো হয়েছে। অনুগ্রহ করে আপনার ইমেইল চেক করুন।' },
      { status: 201 }
    );

  } catch (error) {
    console.error('SIGNUP_API_ERROR:', error);
    return NextResponse.json({ message: 'একটি অভ্যন্তরীণ সার্ভার ত্রুটি ঘটেছে।' }, { status: 500 });
  }
}