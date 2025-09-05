const cron = require('node-cron');
const { sendEmail } = require('./emailService');
const { sendWhatsAppMessage } = require('./whatsappService');
const { parseCSV } = require('../utils/csvParser');
const fs = require('fs');

// Paths to templates
const emailTemplatePath = './src/templates/emailTemplate.html';
const whatsappTemplatePath = './src/templates/whatsappTemplate.txt';

// Read templates
let emailTemplate = '';
let whatsappTemplate = '';

try {
    emailTemplate = fs.readFileSync(emailTemplatePath, 'utf8');
    whatsappTemplate = fs.readFileSync(whatsappTemplatePath, 'utf8');
} catch (error) {
    console.error('Error reading templates:', error);
}

// Function to send messages to all contacts
async function sendMessagesToAll() {
    try {
        const contacts = await parseCSV('./data/contacts.csv');
        for (const contact of contacts) {
            // Send WhatsApp if phone exists
            if (contact.phone) {
                await sendWhatsAppMessage(contact.phone, whatsappTemplate);
            }

            // Send Email if email exists
            if (contact.email) {
                await sendEmail(contact.email, 'Event Invitation', emailTemplate);
            }
        }
    } catch (error) {
        console.error('Error sending messages:', error);
    }
}

// Schedule to run every day at 9 AM (for example)
// You can change the schedule as needed
cron.schedule(process.env.SCHEDULE_TIME || '0 9 * * *', () => {
    console.log('Sending scheduled messages...');
    sendMessagesToAll();
});

// Export for manual triggering if needed
module.exports = { sendMessagesToAll };
