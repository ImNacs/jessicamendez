#!/bin/bash
# Actualizar topics de un contacto
# Uso: ./contact-update-topics.sh <contact_id> <json_topics>
# Ejemplo: ./contact-update-topics.sh abc123 '[{"id":"topic_id","subscribed":true}]'

set -e
cd "$(dirname "$0")/../../../.." 2>/dev/null || cd /nacs/proyectos/jessicamendez.bio

if [ -f ".env.local" ]; then
    export $(grep -E '^RESEND_API_KEY' .env.local | xargs)
fi

if [ -z "$RESEND_API_KEY" ]; then
    echo "Error: RESEND_API_KEY no configurada en .env.local"
    exit 1
fi

if [ -z "$1" ] || [ -z "$2" ]; then
    echo "Uso: ./contact-update-topics.sh <contact_id> <json_topics>"
    echo "Ejemplo: ./contact-update-topics.sh abc123 '[{\"id\":\"topic_id\",\"subscribed\":true}]'"
    exit 1
fi

CONTACT_ID="$1"
TOPICS="$2"

curl -s -X PATCH "https://api.resend.com/contacts/$CONTACT_ID/topics" \
    -H "Authorization: Bearer $RESEND_API_KEY" \
    -H "Content-Type: application/json" \
    -d "{\"topics\":$TOPICS}" | jq
