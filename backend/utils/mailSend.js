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
      subject: "Password Reset OTP",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>Password Reset Request</h2>
          <p>Hello,</p>
          <p>We received a request to reset your password. Use the OTP below to complete the process:</p>
          <h3 style="color: #0056b3;">${otp}</h3>
          <p>If you did not request this, please ignore this email or contact support.</p>
          <p>Thank you,<br/>The Support Team</p>
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
