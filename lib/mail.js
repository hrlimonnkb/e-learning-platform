import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    // secure: true for port 465, false for other ports (like 587)
    secure: process.env.EMAIL_SECURE === 'true', 
    auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
    },
});

/**
 * ৪-ডিজিটের একটি র‍্যান্ডম কোড তৈরি করে
 * @returns {string} - যেমন: "1234", "0876"
 */
const generateFourDigitCode = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

// ইমেইল ভেরিফিকেশন কোড পাঠানোর জন্য ফাংশন
export const sendVerificationCodeEmail = async (email) => {
  const code = generateFourDigitCode();
  const tenMinutes = 10 * 60 * 1000; // ১০ মিনিট
  const expiry = new Date(Date.now() + tenMinutes);

  await transporter.sendMail({
    from: `"Bangla Voice AI" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: 'আপনার ভেরিফিকেশন কোড',
    html: `
      <div style="font-family: Arial, sans-serif; text-align: center; color: #333;">
        <h2>Bangla Voice AI অ্যাকাউন্ট যাচাই করুন</h2>
        <p>আপনার অ্যাকাউন্ট যাচাই করার জন্য নিচের ৪-ডিজিটের কোডটি ব্যবহার করুন:</p>
        <p style="font-size: 24px; font-weight: bold; letter-spacing: 5px; background-color: #f0f0f0; padding: 10px; border-radius: 5px;">
          ${code}
        </p>
        <p>এই কোডটি ১০ মিনিটের জন্য সক্রিয় থাকবে।</p>
      </div>
    `,
  });

  return { code, expiry };
};

// পাসওয়ার্ড রিসেট কোড পাঠানোর জন্য ফাংশন
export const sendPasswordResetCodeEmail = async (email) => {
  const code = generateFourDigitCode();
  const oneHour = 60 * 60 * 1000; // ১ ঘন্টা
  const expiry = new Date(Date.now() + oneHour);

  await transporter.sendMail({
    from: `"Bangla Voice AI" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: 'আপনার পাসওয়ার্ড রিসেট কোড',
    html: `
      <div style="font-family: Arial, sans-serif; text-align: center; color: #333;">
        <h2>পাসওয়ার্ড রিসেট অনুরোধ</h2>
        <p>আপনার পাসওয়ার্ড রিসেট করার জন্য নিচের ৪-ডিজিটের কোডটি ব্যবহার করুন:</p>
        <p style="font-size: 24px; font-weight: bold; letter-spacing: 5px; background-color: #f0f0f0; padding: 10px; border-radius: 5px;">
          ${code}
        </p>
        <p>এই কোডটি ১ ঘন্টার জন্য সক্রিয় থাকবে।</p>
      </div>
    `,
  });

  return { code, expiry };
};