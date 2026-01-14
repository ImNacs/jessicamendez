#!/bin/bash
# Obtener topic por ID
# Uso: ./topic-get.sh <topic_id>

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
    echo "Uso: ./topic-get.sh <topic_id>"
    exit 1
fi

TOPIC_ID="$1"

curl -s "https://api.resend.com/topics/$TOPIC_ID" \
    -H "Authorization: Bearer $RESEND_API_KEY" \
    -H "Content-Type: application/json" | jq
