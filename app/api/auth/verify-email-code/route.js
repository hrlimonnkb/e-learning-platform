import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { email, code } = await request.json();

    if (!email || !code) {
      return NextResponse.json({ message: "অনুগ্রহ করে ইমেইল এবং কোড দিন।" }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: {
        email: email,
        verificationCode: code,
        verificationCodeExpiry: { gt: new Date() },
      },
    });

    if (!user) {
      return NextResponse.json({ message: "কোডটি ভুল অথবা মেয়াদ উত্তীর্ণ হয়ে গেছে।" }, { status: 400 });
    }

    // ব্যবহারকারীর ইমেইল ভেরিফাই করুন এবং কোড মুছে দিন
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        verificationCode: null,
        verificationCodeExpiry: null,
      },
    });

    return NextResponse.json({ message: "আপনার ইমেইল সফলভাবে যাচাই করা হয়েছে!" });

  } catch (error) {
    console.error('VERIFY_EMAIL_CODE_ERROR:', error);
    return NextResponse.json({ message: 'একটি অভ্যন্তরীণ সার্ভার ত্রুটি ঘটেছে।' }, { status: 500 });
  }
}