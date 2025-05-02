import { contactUs } from "../model/contactUsData.js";
import nodemailer from "nodemailer";
async function sendMail(email, name, subject, message) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "hamrokitchen1122@gmail.com",
      pass: "yfjz fird rxew vgnr",
    },
  });
  const mailOptions = {
    from: "hamrokitchen1122@gmail.com",
    to: email,
    subject: `Thanks for contacting us, ${name}!`,
    text: `Hi ${name},\n\nThanks for contacting us. We’ve received your message and will get back to you soon.\n\nSubject: ${subject}\nMessage: ${message}\n\nBest regards,\nHamro Kitchen Team`,
    html: `
        <p>Hi ${name},</p>
        <p style="color: #333;">Thanks for reaching out to us! We've received your message and will get back to you soon.</p>
        <h3>Here’s what you sent:</h3>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br>${message}</p>
        <p>If you need urgent help, contact us at <a href="mailto:hamrokitchen1122@gmail.com">support@blogSpot.com</a>.</p>
        <p>Best regards,</p>
      `,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("email send successfully", email);
    return true;
  } catch (error) {
    console.error("Error sending OTP:", error);
    return false;
  }
}
const contactUsForm = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!subject || !name || !email || !message) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }
  if (message.length < 10) {
    return res
      .status(400)
      .json({ message: "Message should be at least 10 characters long" });
  }
  try {
    const newContact = new contactUs({
      name,
      email,
      subject,
      message,
    });
    await newContact.save();

    // Send email logic can be added here if needed
    const emailSent = await sendMail(email, name, subject, message);
    if (!emailSent) {
      return res.status(500).json({ message: "Failed to send email" });
    }
    res.status(200).json({ message: "Message sent successfully" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

export default contactUsForm;
