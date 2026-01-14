#!/bin/bash
# Actualizar webhook
# Uso: ./webhook-update.sh <webhook_id> <json_data>
# Ejemplo: ./webhook-update.sh abc123 '{"endpoint":"https://newurl.com/webhook"}'

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
    echo "Uso: ./webhook-update.sh <webhook_id> <json_data>"
    echo "Ejemplo: ./webhook-update.sh abc123 '{\"endpoint\":\"https://newurl.com/webhook\"}'"
    exit 1
fi

WEBHOOK_ID="$1"
DATA="$2"

curl -s -X PATCH "https://api.resend.com/webhooks/$WEBHOOK_ID" \
    -H "Authorization: Bearer $RESEND_API_KEY" \
    -H "Content-Type: application/json" \
    -d "$DATA" | jq
