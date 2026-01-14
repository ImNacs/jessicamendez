# jessicamendez.bio

Sitio web personal y profesional de Jessica Méndez. Arquitecta de interiores con enfoque en diseño sostenible.

## Idioma

Comunicar siempre en **español**. El contenido del sitio está en español.

## Stack

- **Framework**: Astro 5 + React 19
- **Estilos**: Tailwind CSS 4 + shadcn/ui
- **Blog**: MDX con content collections
- **Deploy**: DigitalOcean droplet + GitHub Actions CI/CD
- **Dominio**: jessicamendez.bio

## Estructura del Proyecto

```
jessicamendez.bio/
├── web/                    # Aplicación Astro principal
│   ├── src/
│   │   ├── pages/          # Rutas (index, blog/, blog/[id])
│   │   ├── components/     # React + Astro components
│   │   │   ├── ui/         # shadcn/ui components
│   │   │   ├── website/    # Secciones del sitio (Hero, About, etc.)
│   │   │   ├── blog/       # Componentes del blog
│   │   │   ├── mdx/        # Componentes para MDX
│   │   │   └── seo/        # SEO y JSON-LD
│   │   ├── layouts/        # Layout.astro, BlogLayout.astro
│   │   ├── content/        # Contenido MDX del blog
│   │   └── lib/            # Utilidades (utils.ts, blog.ts)
│   ├── public/             # Assets estáticos
│   └── dist/               # Build de producción
├── docs/                   # Documentación e investigación
├── brochure-app/           # Aplicación secundaria (brochure)
└── .claude/skills/         # Skills de Claude Code
```

## Comandos

```bash
# Desarrollo
cd web && bun dev           # Servidor dev en localhost:4321

# Build
cd web && bun run build     # Build de producción

# Preview
cd web && bun run preview   # Preview del build

# Deploy (automático via GitHub Actions)
git push origin main        # Trigger deploy a producción
```

## Skills Disponibles

#### `skill-builder`
**Triggers**: crear skill, nueva skill, generar skill
**Ubicación**: `.claude/skills/skill-builder/`

#### `content-generator`
**Triggers**: contenido, blog, crear post, nueva entrada, generar artículo, publicar, SEO blog
**Ubicación**: `.claude/skills/content-generator/` | Incluye plantillas, checklist SEO y banco de ideas

#### `do-manager`
**Triggers**: droplet, DigitalOcean, DO, servidor, VPS, SSH, DNS
**Ubicación**: `.claude/skills/do-manager/` | Incluye info de infraestructura actual

#### `nocodb-manager`
**Triggers**: NocoDB, hub, base de datos, crear tabla, insertar registros, API NocoDB
**Ubicación**: `.claude/skills/nocodb-manager/`

#### `inbound-manager`
**Triggers**: suscriptores, newsletter, broadcast, contactos, segments, topics, email marketing, lista de correo, enviar email, dominios resend
**Ubicación**: `.claude/skills/inbound-manager/` | Resend API (56 scripts)

#### `analytics-reporter`
**Triggers**: analytics, métricas, visitas, tráfico, reportes, fuentes, campañas UTM, eventos, posts populares
**Ubicación**: `.claude/skills/analytics-reporter/` | Umami Analytics API

#### `claude-md-maintainer`
**Triggers**: optimizar CLAUDE.md, revisar CLAUDE.md, analizar CLAUDE.md
**Ubicación**: `.claude/skills/claude-md-maintainer/`

## Comandos Personalizados

#### `/push`
Verifica documentación, crea commits estructurados y pushea cambios.
**Ubicación**: `.claude/commands/push.md`

## MCP Servers

| Server | Uso |
|--------|-----|
| `shadcn-components` | Obtener componentes shadcn/ui v4 |
| `shadcn-themes` | Temas de tweakcn.com |
| `mastra` | Documentación de Mastra.ai |
| `copilotKit` | Búsqueda en docs de CopilotKit |
| `playwright` | Automatización de browser |
| `chrome-devtools` | DevTools automation |

## Reglas Críticas

### Desarrollo
- Usar `bun` como package manager (no npm/pnpm en web/)
- Componentes React con `.tsx`, componentes Astro con `.astro`
- Estilos con Tailwind CSS classes, no CSS modules
- Blog posts en `web/src/content/blog/` como archivos MDX

### Deploy
- El deploy es automático al hacer push a `main`
- GitHub Actions copia `dist/` a `/root/jessicamendez/web/dist` en el droplet
- Nginx sirve los archivos estáticos

### Contenido
- El sitio es bilingüe pero prioriza español
- Categorías del blog: ESG, Regulacion-Ambiental, IFC, Sostenibilidad, Estudios-Ambientales
- Usar componentes MDX disponibles: Callout, LinkCard, Figure, Embed

## Infraestructura

**Droplet**: jessica-mendez (542544146)
- IP: 165.227.201.91 / 167.172.14.128
- Stack: Ubuntu 24.04 + Nginx + Docker
- NocoDB en https://hub.jessicamendez.bio
- Umami en https://data.jessicamendez.bio

Para gestionar infraestructura, usar skill `do-manager`.
Para gestionar NocoDB (bases, tablas, registros), usar skill `nocodb-manager`.
Para consultar analytics (visitas, fuentes, eventos), usar skill `analytics-reporter`.

## Referencias

- **Manual de identidad**: `docs/manual-identidad-grafica.md`
- **Investigaciones**: `docs/investigacion-*.md`
- **Configuración MCP**: `.mcp.json`
