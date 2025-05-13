const nodemailer = require("nodemailer");
require('dotenv').config();

const MailSender = async (email) => {
    try {
        // Create the transporter with proper configuration
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587,  // Standard SMTP port for TLS
            secure: false,  // Use TLS
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Define the email options
        let info = await transporter.sendMail({
            from: `"Green Cart" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Welcome to Green Cart! 🌿",
            text: `Hi there,

            Welcome to the Green Cart family! 🛒🌱

            We're truly excited to have you on board. At Green Cart, we believe in bringing you the freshest products, handpicked with care, and delivered with love. Your journey towards a healthier and eco-friendly lifestyle begins right here.

            Feel free to explore our wide range of items made just for you. And don’t worry — we’re always here if you need help, support, or just a little shopping inspiration. 😉

            Thank you for choosing us. Let’s grow together.

            Warm regards,  
            Team Green Cart`
        });



        console.log("Email sent successfully: ", info);
        return info;
    } catch (error) {
        console.error("Error in MailSender:", error.message);
        return null;
    }
};

module.exports = MailSender;