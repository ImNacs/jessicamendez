#!/bin/bash
# Listar segmentos de un contacto
# Uso: ./contact-list-segments.sh <contact_id>

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
    echo "Uso: ./contact-list-segments.sh <contact_id>"
    exit 1
fi

CONTACT_ID="$1"

curl -s "https://api.resend.com/contacts/$CONTACT_ID/segments" \
    -H "Authorization: Bearer $RESEND_API_KEY" \
    -H "Content-Type: application/json" | jq
