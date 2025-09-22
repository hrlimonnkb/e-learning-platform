import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { email, code, password } = await request.json();

    if (password.length < 6) {
      return NextResponse.json({ message: 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।' }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: {
        email: email,
        passwordResetCode: code,
        passwordResetCodeExpiry: { gt: new Date() },
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'কোডটি ভুল অথবা মেয়াদ উত্তীর্ণ হয়ে গেছে।' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        passwordResetCode: null,
        passwordResetCodeExpiry: null,
      },
    });

    return NextResponse.json({ message: 'পাসওয়ার্ড সফলভাবে রিসেট করা হয়েছে!' });

  } catch (error) {
    console.error('RESET_PASSWORD_ERROR:', error);
    return NextResponse.json({ message: 'একটি অভ্যন্তরীণ সার্ভার ত্রুটি ঘটেছে।' }, { status: 500 });
  }
}