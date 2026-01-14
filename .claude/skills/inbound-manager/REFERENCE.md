# Resend API Reference

## Base URL

```
https://api.resend.com
```

## Autenticación

```bash
Authorization: Bearer $RESEND_API_KEY
```

## Precios

| Tipo | Free | Pro |
|------|------|-----|
| **Transaccionales** | 3,000/mes (100/día) | $20/mes → 50,000/mes |
| **Marketing** | 1,000 contactos | $40/mes → 5,000 contactos |
| **Broadcasts** | Ilimitados | Ilimitados |
| **Dominios** | 1 | 10+ |

## Arquitectura

```
Contact (email único global)
    ├── Properties: { sector, empresa, ... }
    ├── Segments: [ interno, no visible ]
    ├── Topics: [ visible al usuario, opt-in/out ]
    └── unsubscribed: boolean (master switch)
```

---

## Endpoints

### Emails

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/emails` | Enviar email |
| POST | `/emails/batch` | Enviar lote |
| GET | `/emails` | Listar emails |
| GET | `/emails/:id` | Obtener email |
| POST | `/emails/:id/cancel` | Cancelar programado |

**Request body (POST /emails)**:
```json
{
  "from": "Name <email@domain.com>",
  "to": "recipient@example.com",
  "subject": "Subject line",
  "html": "<p>Content</p>",
  "text": "Plain text alternative",
  "reply_to": "reply@example.com",
  "headers": {},
  "attachments": [],
  "tags": []
}
```

---

### Contacts

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/contacts` | Crear contacto |
| GET | `/contacts` | Listar contactos |
| GET | `/contacts/:id` | Obtener por ID |
| GET | `/contacts/:email` | Obtener por email |
| PATCH | `/contacts/:id` | Actualizar por ID |
| PATCH | `/contacts/:email` | Actualizar por email |
| DELETE | `/contacts/:id` | Eliminar contacto |

**Request body (POST /contacts)**:
```json
{
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "unsubscribed": false,
  "properties": {
    "sector": "Mining",
    "company": "Acme Corp"
  }
}
```

---

### Contact Segments

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/contacts/:id/segments/:seg_id` | Agregar a segmento |
| DELETE | `/contacts/:id/segments/:seg_id` | Remover de segmento |
| GET | `/contacts/:id/segments` | Listar segmentos |

---

### Contact Topics

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/contacts/:id/topics` | Obtener topics |
| PATCH | `/contacts/:id/topics` | Actualizar topics |

**Request body (PATCH)**:
```json
{
  "topics": [
    { "id": "topic_xxx", "subscribed": true },
    { "id": "topic_yyy", "subscribed": false }
  ]
}
```

---

### Segments

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/segments` | Crear segmento |
| GET | `/segments` | Listar segmentos |
| GET | `/segments/:id` | Obtener segmento |
| DELETE | `/segments/:id` | Eliminar segmento |

**Request body (POST)**:
```json
{
  "name": "Profesionales ESG",
  "description": "Consultores del sector"
}
```

---

### Topics

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/topics` | Crear topic |
| GET | `/topics` | Listar topics |
| GET | `/topics/:id` | Obtener topic |
| PATCH | `/topics/:id` | Actualizar topic |
| DELETE | `/topics/:id` | Eliminar topic |

**Request body (POST)**:
```json
{
  "name": "Newsletter ESG",
  "description": "Newsletter semanal",
  "defaultSubscription": "opt-in",
  "visibility": "public"
}
```

**defaultSubscription**: `opt-in` | `opt-out`
**visibility**: `public` | `private`

---

### Broadcasts

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/broadcasts` | Crear broadcast |
| GET | `/broadcasts` | Listar broadcasts |
| GET | `/broadcasts/:id` | Obtener broadcast |
| PATCH | `/broadcasts/:id` | Actualizar broadcast |
| POST | `/broadcasts/:id/send` | Enviar broadcast |
| DELETE | `/broadcasts/:id` | Eliminar broadcast |

**Request body (POST /broadcasts)**:
```json
{
  "from": "Name <email@domain.com>",
  "subject": "Newsletter Title",
  "html": "<h1>Hello {{{FIRST_NAME|friend}}}</h1>",
  "segmentId": "seg_xxx",
  "topicId": "topic_xxx"
}
```

**Variables de personalización**:
- `{{{FIRST_NAME|fallback}}}`
- `{{{LAST_NAME|fallback}}}`
- `{{{EMAIL}}}`
- `{{{RESEND_UNSUBSCRIBE_URL}}}`

**Send request body**:
```json
{
  "scheduledAt": "2025-01-20T10:00:00Z"
}
```

---

### Contact Properties

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/contact-properties` | Crear propiedad |
| GET | `/contact-properties` | Listar propiedades |
| GET | `/contact-properties/:id` | Obtener propiedad |
| PATCH | `/contact-properties/:id` | Actualizar propiedad |
| DELETE | `/contact-properties/:id` | Eliminar propiedad |

**Request body (POST)**:
```json
{
  "key": "sector",
  "type": "string",
  "fallbackValue": "General"
}
```

**type**: `string` | `number` | `boolean`

---

### Domains

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/domains` | Crear dominio |
| GET | `/domains` | Listar dominios |
| GET | `/domains/:id` | Obtener dominio |
| POST | `/domains/:id/verify` | Verificar dominio |
| PATCH | `/domains/:id` | Actualizar dominio |
| DELETE | `/domains/:id` | Eliminar dominio |

**Response (GET)**:
```json
{
  "id": "d_xxx",
  "name": "jessicamendez.bio",
  "status": "verified",
  "records": [
    { "type": "MX", "name": "@", "value": "..." },
    { "type": "TXT", "name": "@", "value": "..." }
  ]
}
```

---

### Templates

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/templates` | Crear template |
| GET | `/templates` | Listar templates |
| GET | `/templates/:id` | Obtener template |
| PATCH | `/templates/:id` | Actualizar template |
| DELETE | `/templates/:id` | Eliminar template |
| POST | `/templates/:id/publish` | Publicar template |
| POST | `/templates/:id/duplicate` | Duplicar template |

---

### Webhooks

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/webhooks` | Crear webhook |
| GET | `/webhooks` | Listar webhooks |
| GET | `/webhooks/:id` | Obtener webhook |
| PATCH | `/webhooks/:id` | Actualizar webhook |
| DELETE | `/webhooks/:id` | Eliminar webhook |

**Request body (POST)**:
```json
{
  "endpoint": "https://myapp.com/webhook",
  "events": ["email.delivered", "email.bounced"]
}
```

**Eventos disponibles**:
- `email.sent`
- `email.delivered`
- `email.bounced`
- `email.complained`
- `email.opened`
- `email.clicked`

---

### API Keys

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api-keys` | Crear API key |
| GET | `/api-keys` | Listar API keys |
| DELETE | `/api-keys/:id` | Eliminar API key |

**Request body (POST)**:
```json
{
  "name": "Production Key",
  "permission": "sending_access"
}
```

**permission**: `full_access` | `sending_access`

---

## Rate Limits

- **Default**: 2 requests/segundo
- **Batch emails**: hasta 100 emails por request

## Códigos de Error

| Código | Descripción |
|--------|-------------|
| 400 | Bad Request - JSON inválido o parámetros faltantes |
| 401 | Unauthorized - API key inválida |
| 403 | Forbidden - Sin permisos para esta operación |
| 404 | Not Found - Recurso no existe |
| 429 | Rate Limited - Demasiadas requests |
| 500 | Server Error - Error interno de Resend |
