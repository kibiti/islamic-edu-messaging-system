const twilio = require('twilio');
require('dotenv').config({ path: './config/settings.env' });

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function sendWhatsAppMessage(to, message) {
    try {
        const result = await client.messages.create({
            body: message,
            from: process.env.TWILIO_WHATSAPP_NUMBER,
            to: `whatsapp:\${to}`
        });
        console.log(`WhatsApp message sent to \${to}: \${result.sid}`);
        return result;
    } catch (error) {
        console.error(`Error sending WhatsApp message to \${to}:`, error);
        throw error;
    }
}

module.exports = { sendWhatsAppMessage };
