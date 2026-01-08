---
name: email-sender
description: Envía emails con Resend y React Email. Usa con "enviar email", "email de bienvenida", "confirmación", "newsletter", "notificación", "correo", "email transaccional".
allowed-tools: Bash, Read, Write, Edit
---

# Email Sender (Resend + React Email)

Skill para enviar emails usando Resend con templates React Email.

## Cuándo Usar Esta Skill

- Usuario quiere enviar un email a alguien
- Usuario necesita crear un nuevo template de email
- Usuario pide enviar confirmaciones, bienvenidas, notificaciones
- Usuario menciona newsletters o emails transaccionales

## Configuración

| Campo | Valor |
|-------|-------|
| **Proveedor** | Resend |
| **From** | `Jessica Méndez <contacto@jessicamendez.bio>` |
| **API Key** | En `.env.local` como `RESEND_API_KEY` |
| **Límite gratuito** | 3,000 emails/mes, 100/día |

## Templates Disponibles

| Template | Props | Uso |
|----------|-------|-----|
| `bienvenida` | `nombre` | Nuevos suscriptores |
| `confirmacion-curso` | `nombre`, `curso`, `fecha`, `hora?`, `accesoUrl`, `detalles?` | Inscripciones a cursos |

## Enviar Email con Template Existente

```bash
cd web && bun scripts/send-email.ts \
  --to "destinatario@ejemplo.com" \
  --template bienvenida \
  --data '{"nombre":"Juan García"}'
```

```bash
cd web && bun scripts/send-email.ts \
  --to "cliente@ejemplo.com" \
  --template confirmacion-curso \
  --data '{"nombre":"María","curso":"IFC Performance Standards","fecha":"15 de febrero de 2026","accesoUrl":"https://jessicamendez.bio/cursos/ifc"}'
```

**Listar templates:**
```bash
cd web && bun scripts/send-email.ts --list
```

**Opciones adicionales:**
- `--from "Nombre <email>"` - Cambiar remitente (requiere dominio verificado)
- `--subject "Asunto personalizado"` - Sobrescribir asunto por defecto

## Crear Nuevo Template

Los templates están en `web/src/emails/`. Estructura:

```tsx
// web/src/emails/nombre-template.tsx
import { Button, Heading, Text } from '@react-email/components';
import * as React from 'react';
import { BaseEmail } from './base';

interface NombreTemplateEmailProps {
  // Props tipadas
}

export const NombreTemplateEmail = ({ ...props }: NombreTemplateEmailProps) => (
  <BaseEmail preview="Preview del email">
    <Heading style={styles.heading}>Título</Heading>
    <Text style={styles.text}>Contenido...</Text>
    <Button href="https://..." style={styles.button}>
      Call to action
    </Button>
  </BaseEmail>
);

const styles = {
  heading: {
    color: '#1a1a1a',
    fontSize: '24px',
    fontWeight: '600',
    margin: '0 0 20px',
  },
  text: {
    color: '#333333',
    fontSize: '16px',
    lineHeight: '1.6',
    margin: '0 0 16px',
  },
  button: {
    backgroundColor: '#2d5a45',
    borderRadius: '6px',
    color: '#ffffff',
    display: 'inline-block',
    fontSize: '16px',
    fontWeight: '600',
    padding: '14px 28px',
    textDecoration: 'none',
  },
};

export default NombreTemplateEmail;
```

**Después de crear el template:**

1. Exportar en `web/src/emails/index.ts`:
```typescript
export { NombreTemplateEmail } from './nombre-template';
```

2. Registrar en `web/scripts/send-email.ts`:
```typescript
import { NombreTemplateEmail } from '../src/emails/nombre-template';

const templates = {
  // ... existentes
  'nombre-template': {
    component: NombreTemplateEmail,
    defaultSubject: 'Asunto por defecto',
  },
};
```

## Componentes React Email Disponibles

```tsx
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
```

| Componente | Uso |
|------------|-----|
| `Html`, `Head`, `Body` | Estructura base |
| `Container` | Wrapper con max-width |
| `Section` | Agrupador de contenido |
| `Heading` | Títulos (h1-h6) |
| `Text` | Párrafos |
| `Button` | Botones con href |
| `Link` | Enlaces inline |
| `Img` | Imágenes |
| `Hr` | Línea horizontal |
| `Preview` | Texto preview en cliente de email |

## Estilos de Marca

Colores principales (del manual de identidad):

```typescript
const brandColors = {
  primary: '#2d5a45',      // Verde principal
  text: '#333333',         // Texto
  textLight: '#666666',    // Texto secundario
  background: '#f5f5f5',   // Fondo
  white: '#ffffff',
  border: '#e5e5e5',
};
```

## Enviar Email Programáticamente

```typescript
import { sendEmail } from '@/lib/email';
import { BienvenidaEmail } from '@/emails';

await sendEmail({
  to: 'destinatario@ejemplo.com',
  subject: 'Bienvenido',
  react: BienvenidaEmail({ nombre: 'Juan' }),
});
```

## Enviar a Múltiples Destinatarios

```typescript
await sendEmail({
  to: ['user1@ejemplo.com', 'user2@ejemplo.com'],
  subject: 'Anuncio importante',
  react: AnuncioEmail({ mensaje: '...' }),
});
```

## Con Adjuntos

```typescript
import fs from 'fs';

await sendEmail({
  to: 'cliente@ejemplo.com',
  subject: 'Tu certificado',
  react: CertificadoEmail({ nombre: 'Juan' }),
  attachments: [
    {
      filename: 'certificado.pdf',
      content: fs.readFileSync('./certificado.pdf'),
    },
  ],
});
```

## Flujo para Usuarios

### Usuario básico
```
"Envía un email de bienvenida a juan@ejemplo.com"

→ Usar template existente:
  cd web && bun scripts/send-email.ts --to juan@ejemplo.com --template bienvenida --data '{"nombre":"Juan"}'
```

### Usuario avanzado
```
"Crea un email para promocionar el webinar de ESG con diseño minimalista"

→ Crear nuevo template en web/src/emails/promocion-webinar.tsx
→ Registrarlo en el script
→ Enviar
```

## Manejo de Errores

### Error: "Invalid API Key"
Verificar `RESEND_API_KEY` en `.env.local`

### Error: "Domain not verified"
El dominio jessicamendez.bio debe estar verificado en Resend Dashboard.

**Para verificar el dominio:**
1. Ir a https://resend.com/domains
2. Agregar `jessicamendez.bio`
3. Añadir registros DNS (MX, TXT/SPF, DKIM) en el panel de DigitalOcean
4. Esperar verificación (minutos)

**Workaround para desarrollo/pruebas:**
```bash
cd web && bun scripts/send-email.ts \
  --to "destinatario@ejemplo.com" \
  --template bienvenida \
  --data '{"nombre":"Test"}' \
  --from "Resend <onboarding@resend.dev>"
```

### Error: "Rate limit exceeded"
Límite: 100 emails/día en tier gratuito. Esperar o upgrade.

### Error: "Invalid email address"
Verificar formato del email destinatario

## Recursos

- [Resend Docs](https://resend.com/docs)
- [React Email Components](https://react.email/docs/components)
- Templates en `web/src/emails/`
