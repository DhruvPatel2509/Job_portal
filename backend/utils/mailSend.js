import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendResetOtp = async (otp, recipientEmail) => {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "eliezer.hamill@ethereal.email",
        pass: "9jxCYrtwKkwEYmB3tF",
      },
    });

    // Email content
    const mailOptions = {
      from: "Support Team",
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
