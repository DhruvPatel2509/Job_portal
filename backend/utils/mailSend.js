import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendResetOtp = async (otp, recipientEmail) => {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true,
      auth: {
        user: process.env.EMAIL_USER, // Your email (set in .env file)
        pass: process.env.EMAIL_PASS, // App password (set in .env file)
      },
    });

    // Email content
    const mailOptions = {
      from: `"Support Team" <${process.env.EMAIL_USER}>`,
      to: recipientEmail,
      subject: "Password Reset Request - OTP Inside",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h2 style="color: #333;">Password Reset Request</h2>
          <p>Dear User,</p>
          <p>We have received a request to reset the password for your account. Please use the One-Time Password (OTP) provided below to proceed with the reset process:</p>
          <h3 style="color: #0056b3;">${otp}</h3>
          <p><strong>Note:</strong> This OTP will expire in 48 seconds. If you did not initiate this request, please disregard this email or contact our support team immediately for assistance.</p>
          <p>Best regards,<br>The Support Team</p>
        </div>
      `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent successfully:", info);
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Error sending email", error };
  }
};
