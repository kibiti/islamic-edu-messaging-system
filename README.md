# Islamic Edu Messaging System

A free, beginner-friendly automated messaging system for Islamic institutions to send scheduled emails and WhatsApp messages to contacts imported from CSV.

A simple automated messaging system for Islamic institutions to send emails and WhatsApp messages to contacts.

## Setup

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `config/settings.env` file with your environment variables (use `config/settings.env.example` as a guide).
4. Place your contacts in `data/contacts.csv`.
5. Customize the templates in `src/templates/`.
6. Run `npm start` to start the scheduler.

## Usage

The system will automatically send messages based on the schedule (currently set to 9 AM daily). You can also manually trigger the sending by uncommenting the line in `src/app.js`.

## Environment Variables

See `config/settings.env.example` for required variables.

## Important

- For Gmail, use an App Password, not your regular password.
- Twilio sandbox number is used for WhatsApp. Replace with your business number when going live.


## Features
- Import contacts (emails & WhatsApp numbers) from CSV
- Send emails via SMTP
- Send WhatsApp messages via Twilio
- Schedule messages for events
- Easy configuration & setup

## Quick Start

1. Clone this repo:  
   `git clone https://github.com/kibiti/islamic-edu-messaging-system.git`

2. Fill in your details in `config/settings.env` (see instructions inside the file).

3. Place your contacts CSV in the `contacts/` folder.

4. Edit message templates in `templates/`.

5. Install dependencies:  
   `pip install -r requirements.txt`

6. Run:  
   `python src/main.py`

## Folders & Files

- `contacts/CONTACTS.csv`: Your contacts file.
- `config/settings.env`: Fill your SMTP, Twilio, and sender info.
- `config/schedule.json`: Message schedule/events.
- `templates/`: Message templates.
- `src/`: Source code.

---

**Replace UPPERCASE placeholders in all files with your actual details!**

---

## islamic-edu-messaging-system repo structure 
```bash
islamic-edu-messaging-system/
├── README.md
├── contacts/
│   └── CONTACTS.csv
├── config/
│   ├── settings.env
│   └── schedule.json
├── src/
│   ├── send_email.py
│   ├── send_whatsapp.py
│   └── main.py
├── requirements.txt
└── templates/
    ├── email_template.txt
    └── whatsapp_template.txt
```
