import nodemailer from "nodemailer";
import crypto from "crypto";
import User from "@/models/usermodel";

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
}) => {
  try {
    // Create a random token
    const token = crypto.randomBytes(32).toString("hex");

    // Token expires in 1 hour
    const tokenExpiry = Date.now() + 3600000;

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: token,
        verifyTokenExpiry: tokenExpiry,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: token,
        forgotPasswordTokenExpiry: tokenExpiry,
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER!,
        pass: process.env.MAILTRAP_PASS!,
      },
    });

    const link =
      emailType === "VERIFY"
        ? `${process.env.DOMAIN}/verifyemail?token=${token}`
        : `${process.env.DOMAIN}/resetpassword?token=${token}`;

    const mailOptions = {
      from: process.env.MAIL_FROM!,
      to: email,
      subject:
        emailType === "VERIFY"
          ? "Verify your email"
          : "Reset your password",
      html: `
        <p>
          Click <a href="${link}">here</a> to
          ${
            emailType === "VERIFY"
              ? "verify your email"
              : "reset your password"
          }.
        </p>

        <p>
          Or copy and paste this link into your browser:
        </p>

        <p>${link}</p>
      `,
    };

    const mailResponse = await transport.sendMail(mailOptions);

    return mailResponse;
  } catch (error: unknown) {
    console.error("Email sending error:", error);

    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Failed to send email");
  }
};