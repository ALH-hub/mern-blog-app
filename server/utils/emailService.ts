import nodemailer from 'nodemailer';
import { timeout } from 'promise-timeout';

const sendPasswordResetEmail = async (
  email: string,
  resetCode: string,
  username: string,
): Promise<void> => {
  const userEmail = process.env.EMAIL_USER;
  const userPassword = process.env.EMAIL_PASS;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: userEmail,
      pass: userPassword,
    },
  });

  const mailOptions = {
    from: userEmail,
    to: email,
    subject: 'Password Reset Request',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Password Reset Request</h2>
        <p>Hello ${username},</p>
        <p>You requested a password reset for your NexusBlog account.</p>
        <p>Your verification code is:</p>
        <div style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 2px; margin: 20px 0;">
          ${resetCode}
        </div>
        <p>This code will expire in 15 minutes.</p>
        <p>If you didn't request this password reset, please ignore this email.</p>
        <p>Best regards,<br>NexusBlog Team</p>
      </div>
    `,
  };

  try {
    await timeout(transporter.sendMail(mailOptions), 60000);
  } catch (error) {
    console.error('Timeout sending email:', error);
    return;
  }
};

export default sendPasswordResetEmail;
