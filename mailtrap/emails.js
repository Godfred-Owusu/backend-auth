import { transport, sender } from "./mailtrap.config.js";
import {
  passwordResetEmail,
  passwordResetSuccessEmail,
  verificationCode,
} from "./emailTamplates.js";
export const sendVerificationEmail = async (email, verificationToken) => {
  const recipients = [{ email }];

  try {
    transport.sendMail({
      from: sender,
      to: recipients[0].email,
      subject: "Verify your email",

      html: verificationCode.replace("{{token}}", verificationToken),
    });
  } catch (error) {
    throw new Error("Failed to send verification email. " + error);
  }
};

export const sendPasswordResetEmail = async (email, resetToken) => {
  const recipients = [{ email }];

  try {
    await transport.sendMail({
      from: sender,
      to: recipients[0].email,
      subject: "Verify your email",
      html: passwordResetEmail.replace("{{resetToken}}", resetToken),
      category: "Password Reset",
    });
  } catch (error) {
    throw new Error(
      "Failed to send password reset verification email. " + error
    );
  }
};

export const sendResetPasswordSuccessEmail = async (email, name) => {
  const recipients = [{ email }];

  try {
    transport.sendMail({
      from: sender,
      to: recipients[0].email,
      subject: "Password Reset Successfully",
      html: passwordResetSuccessEmail.replace("{{name}}", name),
      category: "Password Reset Success",
    });
  } catch (error) {
    throw new Error(
      "Failed to send password reset verification email. " + error
    );
  }
};
