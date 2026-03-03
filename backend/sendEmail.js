const { google } = require('googleapis');
require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const EMAIL_USER = process.env.EMAIL_USER;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendConsultationEmail(toEmail, toName) {
  try {
    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

    const htmlMessage = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <p>Hi ${toName},</p>
        <p>Thank you for booking your <strong>1-on-1 consultation</strong> with <strong>IET Placement Tracker 🎯</strong></p>
        <p>We have received your request and are currently sharing your details with our seniors.</p>
        <p>We will get back to you soon with the available time slots and meeting link on this email ID.</p>
        <p>📌 This consultation is only to solve your placement-related doubts.</p>
        <p>If you have any urgent queries, feel free to reach out at <a href="mailto:ietplacementtracker@gmail.com">ietplacementtracker@gmail.com</a></p>
        <p>Looking forward to helping you 🚀</p>
        <br>
        <p>Best regards,<br>Team IET Placement Tracker</p>
      </div>
    `;

    const message = [
      `From: IET Placement Tracker <${EMAIL_USER}>`,
      `To: ${toEmail}`,
      `Subject: Your 1-on-1 Consultation Booking`,
      `Content-Type: text/html; charset=UTF-8`,
      ``,
      htmlMessage
    ].join('\n');

    const encodedMessage = Buffer.from(message)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    const result = await gmail.users.messages.send({
      userId: 'me',
      requestBody: { raw: encodedMessage }
    });

    console.log('✅ Email sent:', result.data.id);
  } catch (error) {
    console.error('❌ Email error:', error);
  }
} ;

// Test
// sendConsultationEmail('tlalwani2023@gmail.com', 'Kirtan Lakhotia');

module.exports = sendConsultationEmail;


