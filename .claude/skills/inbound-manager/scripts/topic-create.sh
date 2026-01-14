#!/bin/bash
# Crear topic
# Uso: ./topic-create.sh <name> <default_subscription> [description] [visibility]
# default_subscription: opt-in | opt-out
# visibility: public | private (default: public)
# Ejemplo: ./topic-create.sh "Newsletter ESG" "opt-in" "Newsletter semanal" "public"

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
    echo "Uso: ./topic-create.sh <name> <default_subscription> [description] [visibility]"
    echo "default_subscription: opt-in | opt-out"
    echo "visibility: public | private (default: public)"
    echo "Ejemplo: ./topic-create.sh \"Newsletter ESG\" \"opt-in\" \"Newsletter semanal\" \"public\""
    exit 1
fi

NAME="$1"
DEFAULT_SUB="$2"
DESCRIPTION="${3:-}"
VISIBILITY="${4:-public}"

JSON="{\"name\":\"$NAME\",\"defaultSubscription\":\"$DEFAULT_SUB\",\"visibility\":\"$VISIBILITY\""
[ -n "$DESCRIPTION" ] && JSON="$JSON,\"description\":\"$DESCRIPTION\""
JSON="$JSON}"

curl -s -X POST "https://api.resend.com/topics" \
    -H "Authorization: Bearer $RESEND_API_KEY" \
    -H "Content-Type: application/json" \
    -d "$JSON" | jq
