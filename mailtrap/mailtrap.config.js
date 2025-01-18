import Nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();
// const TOKEN = process.env.MAILTRAP_TOKEN;

// export const transport = Nodemailer.createTransport(
//   MailtrapTransport({
//     token: TOKEN,
//   })
// );

// export const sender = {
//   address: "hello@demomailtrap.com",
//   name: "Godfred Mireku Owusu",
// };

// const recipients = ["godfredmirekuowusu@gmail.com"];

// transport
//   .sendMail({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     text: "Congrats for sending test email with Mailtrap!",
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);

export const transport = Nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sender = {
  address: process.env.EMAIL,
  name: "Godfred Mireku Owusu",
};
