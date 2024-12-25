import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.SMTP_USER, // Your Gmail address
    pass: process.env.SMTP_PASS, // Your app password or Gmail account password
  },
});

// Verify SMTP configuration
transporter.verify()
  .then(() => console.log('SMTP server is ready to send emails'))
  .catch((error) => {
    console.error('Error in SMTP configuration:', error.message);
  });

export default transporter;
