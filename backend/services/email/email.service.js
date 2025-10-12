import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import ejs from 'ejs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create a transporter object using Mailtrap SMTP
const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST || 'sandbox.smtp.mailtrap.io',
  port: process.env.MAILTRAP_PORT || 2525,
  auth: {
    user: process.env.MAILTRAP_USER || 'ce8edd9419f8ef',
    pass: process.env.MAILTRAP_PASS || 'c88c0b1236755f',
  },
});

class EmailService {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `TrustCare <${process.env.EMAIL_FROM || 'noreply@trustcare.com'}>`;
  }

  // Load email template
  async loadTemplate(template, data = {}) {
    try {
      const templatePath = path.join(
        __dirname,
        'templates',
        `${template}.ejs`
      );
      const templateContent = await fs.readFile(templatePath, 'utf-8');
      return ejs.render(templateContent, {
        firstName: this.firstName,
        email: this.to,
        url: this.url,
        ...data,
      });
    } catch (error) {
      console.error('Error loading email template:', error);
      throw new Error('Error loading email template');
    }
  }

  // Send email with template
  async send(templateName, subject, data = {}) {
    try {
      const html = await this.loadTemplate(templateName, data);
      
      const mailOptions = {
        from: this.from,
        to: this.to,
        subject,
        html,
        text: html.replace(/<[^>]*>?/gm, ''), // Convert HTML to plain text
      };

      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Error sending email');
    }
  }

  // Send verification email
  async sendVerification() {
    await this.send('verification', 'Verify your email address');
  }

  // Send password reset email
  async sendPasswordReset() {
    await this.send('passwordReset', 'Your password reset token (valid for 10 minutes)');
  }
}

export default EmailService;
