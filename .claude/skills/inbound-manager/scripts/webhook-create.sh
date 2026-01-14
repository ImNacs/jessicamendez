#!/bin/bash
# Crear webhook
# Uso: ./webhook-create.sh <endpoint_url> <events>
# events: comma-separated list (email.sent,email.delivered,email.bounced,email.complained,email.opened,email.clicked)
# Ejemplo: ./webhook-create.sh "https://myapp.com/webhook" "email.delivered,email.bounced"

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
    echo "Uso: ./webhook-create.sh <endpoint_url> <events>"
    echo ""
    echo "Eventos disponibles:"
    echo "  email.sent, email.delivered, email.bounced"
    echo "  email.complained, email.opened, email.clicked"
    echo ""
    echo "Ejemplo:"
    echo "  ./webhook-create.sh \"https://myapp.com/webhook\" \"email.delivered,email.bounced\""
    exit 1
fi

ENDPOINT="$1"
EVENTS="$2"

# Convertir eventos separados por coma a array JSON
EVENTS_JSON=$(echo "$EVENTS" | sed 's/,/","/g' | sed 's/^/["/' | sed 's/$/"]/')

curl -s -X POST "https://api.resend.com/webhooks" \
    -H "Authorization: Bearer $RESEND_API_KEY" \
    -H "Content-Type: application/json" \
    -d "{\"endpoint\":\"$ENDPOINT\",\"events\":$EVENTS_JSON}" | jq
