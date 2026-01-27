const nodemailer = require("nodemailer");
const resetPasswordEmailTemplate = require("./otpEmailTemplate");
const sendEmail = async (email, resetLink) => {
  try {
    const transportr = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });
    await transportr.sendMail({
      from: `"Harsh Foujdar" <${process.env.EMAIL}`,
      to: email,
      subject: "Reset Your Password",
      html: resetPasswordEmailTemplate(resetLink, "Harsh Foujdar"),
    });
    return { success: true, message: "Reset Password email sent" };
  } catch (error) {
    console.log("Email Sending Error", error);
  }
};

module.exports = sendEmail;
