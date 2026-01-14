#!/bin/bash
# Actualizar topic
# Uso: ./topic-update.sh <topic_id> <json_data>
# Ejemplo: ./topic-update.sh abc123 '{"name":"Nuevo nombre","visibility":"private"}'

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
    echo "Uso: ./topic-update.sh <topic_id> <json_data>"
    echo "Ejemplo: ./topic-update.sh abc123 '{\"name\":\"Nuevo nombre\",\"visibility\":\"private\"}'"
    exit 1
fi

TOPIC_ID="$1"
DATA="$2"

curl -s -X PATCH "https://api.resend.com/topics/$TOPIC_ID" \
    -H "Authorization: Bearer $RESEND_API_KEY" \
    -H "Content-Type: application/json" \
    -d "$DATA" | jq
