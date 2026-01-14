---
name: inbound-manager
description: Gestiona suscriptores, emails y newsletters con Resend. Usa con "suscriptores", "newsletter", "broadcast", "contactos", "segments", "topics", "email marketing", "lista de correo", "enviar email", "dominios resend".
allowed-tools: Bash, Read
---

# Inbound Manager (Resend)

Skill para gestionar suscriptores, enviar emails y newsletters usando Resend.

## Cuándo Usar Esta Skill

- Usuario quiere gestionar contactos/suscriptores
- Usuario necesita enviar emails transaccionales o broadcasts
- Usuario pregunta por segments, topics o audiencias
- Usuario quiere configurar dominios, webhooks o templates
- Usuario menciona "newsletter", "email marketing", "lista de correo"

## Configuración

| Campo | Valor |
|-------|-------|
| **API Base** | https://api.resend.com |
| **API Key** | `.env.local` → `RESEND_API_KEY` |
| **From default** | `Jessica Méndez <contacto@jessicamendez.bio>` |

## Scripts Disponibles

Todos los scripts están en `.claude/skills/inbound-manager/scripts/`.

### Contacts (Suscriptores)

| Script | Uso |
|--------|-----|
| `contact-list.sh` | Listar contactos |
| `contact-create.sh <email> [firstName] [lastName]` | Crear contacto |
| `contact-get.sh <id_or_email>` | Obtener contacto |
| `contact-update.sh <id_or_email> <json>` | Actualizar contacto |
| `contact-delete.sh <id_or_email>` | Eliminar contacto |
| `contact-add-segment.sh <contact_id> <segment_id>` | Agregar a segmento |
| `contact-remove-segment.sh <contact_id> <segment_id>` | Remover de segmento |
| `contact-list-segments.sh <contact_id>` | Ver segmentos del contacto |
| `contact-get-topics.sh <contact_id>` | Ver topics del contacto |
| `contact-update-topics.sh <contact_id> <json>` | Actualizar topics |

### Segments

| Script | Uso |
|--------|-----|
| `segment-list.sh` | Listar segmentos |
| `segment-create.sh <name> [description]` | Crear segmento |
| `segment-get.sh <segment_id>` | Obtener segmento |
| `segment-delete.sh <segment_id>` | Eliminar segmento |

### Topics (Preferencias de suscripción)

| Script | Uso |
|--------|-----|
| `topic-list.sh` | Listar topics |
| `topic-create.sh <name> <opt-in\|opt-out> [desc] [public\|private]` | Crear topic |
| `topic-get.sh <topic_id>` | Obtener topic |
| `topic-update.sh <topic_id> <json>` | Actualizar topic |
| `topic-delete.sh <topic_id>` | Eliminar topic |

### Broadcasts (Newsletter/Campañas)

| Script | Uso |
|--------|-----|
| `broadcast-list.sh` | Listar broadcasts |
| `broadcast-create.sh <from> <subject> <html> [target_id] [segment\|topic]` | Crear broadcast |
| `broadcast-get.sh <broadcast_id>` | Obtener broadcast |
| `broadcast-update.sh <broadcast_id> <json>` | Actualizar broadcast |
| `broadcast-send.sh <broadcast_id> [schedule_at]` | Enviar broadcast |
| `broadcast-delete.sh <broadcast_id>` | Eliminar broadcast |

### Emails (Transaccionales)

| Script | Uso |
|--------|-----|
| `email-send.sh <to> <subject> <html> [from]` | Enviar email |
| `email-send-batch.sh <json_emails>` | Enviar lote |
| `email-get.sh <email_id>` | Obtener email |
| `email-list.sh [limit]` | Listar emails |
| `email-cancel.sh <email_id>` | Cancelar programado |

### Properties (Propiedades custom)

| Script | Uso |
|--------|-----|
| `property-list.sh` | Listar propiedades |
| `property-create.sh <key> <string\|number\|boolean> [fallback]` | Crear propiedad |
| `property-get.sh <property_id>` | Obtener propiedad |
| `property-update.sh <property_id> <json>` | Actualizar propiedad |
| `property-delete.sh <property_id>` | Eliminar propiedad |

### Domains

| Script | Uso |
|--------|-----|
| `domain-list.sh` | Listar dominios |
| `domain-create.sh <name>` | Crear dominio |
| `domain-get.sh <domain_id>` | Obtener dominio |
| `domain-verify.sh <domain_id>` | Verificar dominio |
| `domain-update.sh <domain_id> <json>` | Actualizar dominio |
| `domain-delete.sh <domain_id>` | Eliminar dominio |

### Templates

| Script | Uso |
|--------|-----|
| `template-list.sh` | Listar templates |
| `template-create.sh <name> <subject> <html>` | Crear template |
| `template-get.sh <template_id>` | Obtener template |
| `template-update.sh <template_id> <json>` | Actualizar template |
| `template-delete.sh <template_id>` | Eliminar template |
| `template-publish.sh <template_id>` | Publicar template |
| `template-duplicate.sh <template_id>` | Duplicar template |

### Webhooks

| Script | Uso |
|--------|-----|
| `webhook-list.sh` | Listar webhooks |
| `webhook-create.sh <url> <events>` | Crear webhook |
| `webhook-get.sh <webhook_id>` | Obtener webhook |
| `webhook-update.sh <webhook_id> <json>` | Actualizar webhook |
| `webhook-delete.sh <webhook_id>` | Eliminar webhook |

### API Keys

| Script | Uso |
|--------|-----|
| `apikey-list.sh` | Listar API keys |
| `apikey-create.sh <name> [full_access\|sending_access]` | Crear API key |
| `apikey-delete.sh <api_key_id>` | Eliminar API key |

## Ejemplos de Uso

### Crear suscriptor nuevo

```bash
.claude/skills/inbound-manager/scripts/contact-create.sh \
  "usuario@ejemplo.com" "Juan" "García"
```

### Crear topic para newsletter

```bash
.claude/skills/inbound-manager/scripts/topic-create.sh \
  "Briefing Ambiental" "opt-in" "Newsletter semanal de ESG" "public"
```

### Crear y enviar broadcast

```bash
# Crear broadcast
.claude/skills/inbound-manager/scripts/broadcast-create.sh \
  "Jessica Méndez <contacto@jessicamendez.bio>" \
  "Newsletter Enero 2025" \
  "<h1>Hola {{{FIRST_NAME|amigo/a}}}</h1><p>Contenido...</p>" \
  "seg_xxx" "segment"

# Enviar inmediatamente
.claude/skills/inbound-manager/scripts/broadcast-send.sh <broadcast_id>

# O programar
.claude/skills/inbound-manager/scripts/broadcast-send.sh <broadcast_id> "2025-01-20T10:00:00Z"
```

## Variables de Personalización (Broadcasts)

```
{{{FIRST_NAME|fallback}}}
{{{LAST_NAME|fallback}}}
{{{EMAIL}}}
{{{RESEND_UNSUBSCRIBE_URL}}}
```

## Manejo de Errores

### Error: "RESEND_API_KEY no configurada"
Verificar que existe en `.env.local`:
```bash
grep RESEND_API_KEY .env.local
```

### Error: "401 Unauthorized"
API key inválida o expirada. Regenerar en https://resend.com/api-keys

### Error: "Domain not verified"
Verificar dominio:
```bash
.claude/skills/inbound-manager/scripts/domain-list.sh
.claude/skills/inbound-manager/scripts/domain-verify.sh <domain_id>
```

## Recursos

- **Dashboard**: https://resend.com
- **API Reference**: [REFERENCE.md](REFERENCE.md)
- **Docs oficiales**: https://resend.com/docs
