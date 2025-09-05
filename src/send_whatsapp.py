from twilio.rest import Client

def send_whatsapp(to_number, body, env):
    account_sid = env['TWILIO_ACCOUNT_SID']
    auth_token = env['TWILIO_AUTH_TOKEN']
    from_whatsapp = env['TWILIO_WHATSAPP_NUMBER']

    client = Client(account_sid, auth_token)
    try:
        message = client.messages.create(
            body=body,
            from_=from_whatsapp,
            to=f"whatsapp:{to_number}"
        )
        print(f"WhatsApp message sent to {to_number}")
    except Exception as e:
        print(f"Failed to send WhatsApp to {to_number}: {e}")
