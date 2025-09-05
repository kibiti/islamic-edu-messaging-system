const nodemailer = require('nodemailer');
require('dotenv').config({ path: './config/settings.env' });

// Create transporter
const transporter = nodemailer.createTransporter({
    host: process.env.SMTP_SERVER,
    port: process.env.SMTP_PORT,
    secure: true, // use SSL
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
    },
});

async function sendEmail(to, subject, htmlContent) {
    try {
        let info = await transporter.sendMail({
            from: `"\${process.env.Hassan Kibiti}" <\${process.env.elimuhubconsultant@gmail.com}>`,
            to: to,
            subject: subject,
            html: htmlContent,
        });
        console.log('Email sent: %s', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

module.exports = { sendEmail };
