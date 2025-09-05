import csv
import os
import time
import json
from datetime import datetime
from send_email import send_email
from send_whatsapp import send_whatsapp

def load_env(filepath):
    env = {}
    with open(filepath) as f:
        for line in f:
            if line.strip() and not line.startswith('#'):
                k, v = line.strip().split('=', 1)
                env[k] = v
    return env

def load_contacts(filepath):
    contacts = []
    with open(filepath, newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            contacts.append(row)
    return contacts

def load_schedule(filepath):
    with open(filepath) as f:
        return json.load(f)

def load_template(template_path):
    with open(template_path) as f:
        return f.read()

def personalize(template, contact, event):
    return template.format(
        NAME=contact['NAME'],
        EVENT=event['event'],
        DATE=event['date'],
        TIME=event['time'],
        SENDER_NAME=env['SENDER_NAME']
    )

if __name__ == "__main__":
    env = load_env("config/settings.env")
    contacts = load_contacts("contacts/CONTACTS.csv")
    schedule = load_schedule("config/schedule.json")

    now = datetime.now()
    for event in schedule:
        event_dt = datetime.strptime(f"{event['date']} {event['time']}", "%Y-%m-%d %H:%M")
        if now <= event_dt:
            template = load_template(f"templates/{event['template']}")
            for contact in contacts:
                msg = personalize(template, contact, event)
                if event['message_type'] == 'email':
                    send_email(contact['EMAIL'], event.get('subject', 'Notification'), msg, env)
                elif event['message_type'] == 'whatsapp':
                    send_whatsapp(contact['WHATSAPP_NUMBER'], msg, env)
            print(f"Completed sending for event: {event['event']}")
