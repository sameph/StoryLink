import {
	PASSWORD_RESET_REQUEST_TEMPLATE,
	PASSWORD_RESET_SUCCESS_TEMPLATE,
	VERIFICATION_EMAIL_TEMPLATE,
	WELCOME_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import transporter from "./nodemailer.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
	const mailOptions = {
		from: process.env.SMTP_USER,
		to: email,
		subject: "Verify your email",
		html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
	};

	try {
		const response = await transporter.sendMail(mailOptions);
		console.log("Email sent successfully", response);
	} catch (error) {
		console.error(`Error sending verification email`, error);
		throw new Error(`Error sending verification email: ${error}`);
	}
};

export const sendWelcomeEmail = async (email, name) => {
	const dashboardURL = 'https://authcompany.com/dashboard'; // Replace with the actual URL or dynamically generate it
	const htmlContent = WELCOME_EMAIL_TEMPLATE
		.replace('{name}', name)
		.replace('{dashboardURL}', dashboardURL);

	const mailOptions = {
		from: process.env.SMTP_USER,
		to: email,
		subject: "Welcome to Auth Company!",
		html: htmlContent,
	};

	try {
		const response = await transporter.sendMail(mailOptions);
		console.log("Welcome email sent successfully", response);
	} catch (error) {
		console.error("Error sending welcome email", error);
		throw new Error(`Error sending welcome email: ${error.message}`);
	}
};


export const sendPasswordResetEmail = async (email, resetURL) => {
	const mailOptions = {
		from: process.env.SMTP_USER,
		to: email,
		subject: "Reset your password",
		html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
	};

	try {
		const response = await transporter.sendMail(mailOptions);
		console.log("Password reset email sent successfully", response);
	} catch (error) {
		console.error(`Error sending password reset email`, error);
		throw new Error(`Error sending password reset email: ${error}`);
	}
};

export const sendResetSuccessEmail = async (email) => {
	const mailOptions = {
		from: process.env.SMTP_USER,
		to: email,
		subject: "Password Reset Successful",
		html: PASSWORD_RESET_SUCCESS_TEMPLATE,
	};

	try {
		const response = await transporter.sendMail(mailOptions);
		console.log("Password reset success email sent successfully", response);
	} catch (error) {
		console.error(`Error sending password reset success email`, error);
		throw new Error(`Error sending password reset success email: ${error}`);
	}
};
