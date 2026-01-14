#!/bin/bash
# Enviar emails en lote
# Uso: ./email-send-batch.sh <json_emails>
# json_emails: array de objetos email
# Ejemplo: ./email-send-batch.sh '[{"from":"test@example.com","to":"a@b.com","subject":"Hi","html":"<p>Hello</p>"}]'

set -e
cd "$(dirname "$0")/../../../.." 2>/dev/null || cd /nacs/proyectos/jessicamendez.bio

if [ -f ".env.local" ]; then
    export $(grep -E '^RESEND_API_KEY' .env.local | xargs)
fi

if [ -z "$RESEND_API_KEY" ]; then
    echo "Error: RESEND_API_KEY no configurada en .env.local"
    exit 1
fi

if [ -z "$1" ]; then
    echo "Uso: ./email-send-batch.sh <json_emails>"
    echo ""
    echo "json_emails: array de objetos con from, to, subject, html"
    echo ""
    echo "Ejemplo:"
    echo "  ./email-send-batch.sh '[{\"from\":\"test@example.com\",\"to\":\"a@b.com\",\"subject\":\"Hi\",\"html\":\"<p>Hello</p>\"}]'"
    exit 1
fi

EMAILS="$1"

curl -s -X POST "https://api.resend.com/emails/batch" \
    -H "Authorization: Bearer $RESEND_API_KEY" \
    -H "Content-Type: application/json" \
    -d "$EMAILS" | jq
