import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { sendPasswordResetCodeEmail } from '@/lib/mail';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { email } = await request.json();
    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      const { code, expiry } = await sendPasswordResetCodeEmail(email);
      await prisma.user.update({
        where: { id: user.id },
        data: {
          passwordResetCode: code,
          passwordResetCodeExpiry: expiry,
        },
      });
    }
    
    // ইমেইলটি সিস্টেমে আছে কি না, তা ব্যবহারকারীকে না জানিয়ে একটি জেনেরিক মেসেজ দিন
    return NextResponse.json({ message: 'যদি এই ইমেইলটি আমাদের সিস্টেমে থাকে, তবে একটি রিসেট কোড পাঠানো হয়েছে।' });

  } catch (error) {
    console.error('REQUEST_RESET_ERROR:', error);
    return NextResponse.json({ message: 'একটি অভ্যন্তরীণ সার্ভার ত্রুটি ঘটেছে।' }, { status: 500 });
  }
}