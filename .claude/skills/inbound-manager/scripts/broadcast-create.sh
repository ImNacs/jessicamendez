#!/bin/bash
# Crear broadcast
# Uso: ./broadcast-create.sh <from> <subject> <html_content> [segment_id|topic_id] [type]
# type: segment | topic (default: segment)
# Ejemplo: ./broadcast-create.sh "Jessica <contacto@jessicamendez.bio>" "Newsletter" "<h1>Hola</h1>" "seg_123" "segment"

set -e
cd "$(dirname "$0")/../../../.." 2>/dev/null || cd /nacs/proyectos/jessicamendez.bio

if [ -f ".env.local" ]; then
    export $(grep -E '^RESEND_API_KEY' .env.local | xargs)
fi

if [ -z "$RESEND_API_KEY" ]; then
    echo "Error: RESEND_API_KEY no configurada en .env.local"
    exit 1
fi

if [ -z "$1" ] || [ -z "$2" ] || [ -z "$3" ]; then
    echo "Uso: ./broadcast-create.sh <from> <subject> <html_content> [segment_id|topic_id] [type]"
    echo "type: segment | topic (default: segment)"
    echo ""
    echo "Ejemplo:"
    echo "  ./broadcast-create.sh \"Jessica <contacto@jessicamendez.bio>\" \"Newsletter\" \"<h1>Hola</h1>\" \"seg_123\" \"segment\""
    exit 1
fi

FROM="$1"
SUBJECT="$2"
HTML="$3"
TARGET_ID="${4:-}"
TARGET_TYPE="${5:-segment}"

# Escapar HTML para JSON
HTML_ESCAPED=$(echo "$HTML" | sed 's/"/\\"/g' | tr -d '\n')

JSON="{\"from\":\"$FROM\",\"subject\":\"$SUBJECT\",\"html\":\"$HTML_ESCAPED\""

if [ -n "$TARGET_ID" ]; then
    if [ "$TARGET_TYPE" = "topic" ]; then
        JSON="$JSON,\"topicId\":\"$TARGET_ID\""
    else
        JSON="$JSON,\"segmentId\":\"$TARGET_ID\""
    fi
fi

JSON="$JSON}"

curl -s -X POST "https://api.resend.com/broadcasts" \
    -H "Authorization: Bearer $RESEND_API_KEY" \
    -H "Content-Type: application/json" \
    -d "$JSON" | jq
