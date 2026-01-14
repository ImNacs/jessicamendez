#!/bin/bash
# Enviar broadcast
# Uso: ./broadcast-send.sh <broadcast_id> [schedule_at]
# schedule_at: ISO 8601 datetime o "now" (default: now)
# Ejemplo: ./broadcast-send.sh abc123
# Ejemplo: ./broadcast-send.sh abc123 "2025-01-20T10:00:00Z"

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
    echo "Uso: ./broadcast-send.sh <broadcast_id> [schedule_at]"
    echo "schedule_at: ISO 8601 datetime o \"now\" (default: now)"
    echo ""
    echo "Ejemplos:"
    echo "  ./broadcast-send.sh abc123"
    echo "  ./broadcast-send.sh abc123 \"2025-01-20T10:00:00Z\""
    exit 1
fi

BROADCAST_ID="$1"
SCHEDULE_AT="${2:-}"

if [ -n "$SCHEDULE_AT" ] && [ "$SCHEDULE_AT" != "now" ]; then
    JSON="{\"scheduledAt\":\"$SCHEDULE_AT\"}"
    curl -s -X POST "https://api.resend.com/broadcasts/$BROADCAST_ID/send" \
        -H "Authorization: Bearer $RESEND_API_KEY" \
        -H "Content-Type: application/json" \
        -d "$JSON" | jq
else
    curl -s -X POST "https://api.resend.com/broadcasts/$BROADCAST_ID/send" \
        -H "Authorization: Bearer $RESEND_API_KEY" \
        -H "Content-Type: application/json" | jq
fi
