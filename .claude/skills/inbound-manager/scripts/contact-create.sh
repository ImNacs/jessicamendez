#!/bin/bash
# Crear contacto en Resend
# Uso: ./contact-create.sh <email> [firstName] [lastName] [unsubscribed]
# Ejemplo: ./contact-create.sh user@example.com "Juan" "García" false

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
    echo "Uso: ./contact-create.sh <email> [firstName] [lastName] [unsubscribed]"
    echo "Ejemplo: ./contact-create.sh user@example.com \"Juan\" \"García\" false"
    exit 1
fi

EMAIL="$1"
FIRST_NAME="${2:-}"
LAST_NAME="${3:-}"
UNSUBSCRIBED="${4:-false}"

# Construir JSON
JSON="{\"email\":\"$EMAIL\",\"unsubscribed\":$UNSUBSCRIBED"
[ -n "$FIRST_NAME" ] && JSON="$JSON,\"firstName\":\"$FIRST_NAME\""
[ -n "$LAST_NAME" ] && JSON="$JSON,\"lastName\":\"$LAST_NAME\""
JSON="$JSON}"

curl -s -X POST "https://api.resend.com/contacts" \
    -H "Authorization: Bearer $RESEND_API_KEY" \
    -H "Content-Type: application/json" \
    -d "$JSON" | jq
