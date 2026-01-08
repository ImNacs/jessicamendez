# Referencia Técnica del Blog

Detalles técnicos para cuando necesites información específica del sistema.

## Ubicaciones Importantes

| Elemento | Ruta |
|----------|------|
| Posts del blog | `web/src/content/blog/` |
| Schema de contenido | `web/src/content.config.ts` |
| Componentes MDX | `web/src/components/mdx/` |
| Layout del blog | `web/src/layouts/BlogLayout.astro` |
| Utilidades | `web/src/lib/blog.ts` |
| Assets públicos | `web/public/` |

## Schema del Blog (Frontmatter)

```typescript
{
  // SEO (obligatorios)
  title: string,           // máx 60 caracteres
  description: string,     // 120-160 caracteres

  // Fechas
  pubDate: Date,           // obligatorio
  updatedDate?: Date,      // opcional

  // Taxonomía
  category: enum,          // ver categorías válidas
  tags: string[],          // array de strings

  // Media
  heroImage?: ImagePath,   // relativo: ./hero.jpg
  heroImageAlt?: string,   // descripción accesible

  // Control
  draft: boolean,          // true = no publicado
  featured: boolean,       // true = destacado en home

  // SEO avanzado
  canonicalUrl?: string,   // URL canónica si es repost
  noindex?: boolean,       // true = no indexar
}
```

## Categorías Válidas

```typescript
type Category =
  | 'ESG'
  | 'Regulacion-Ambiental'
  | 'IFC'
  | 'Sostenibilidad'
  | 'Estudios-Ambientales';
```

### Colores por Categoría

| Categoría | Fondo | Texto |
|-----------|-------|-------|
| ESG | verde-100 | verde-900 |
| Regulacion-Ambiental | rosa-100 | rosa-900 |
| IFC | crema-200 | crema-400 |
| Sostenibilidad | verde-50 | verde-800 |
| Estudios-Ambientales | rosa-50 | rosa-800 |

## Componentes MDX

### Callout

```tsx
interface CalloutProps {
  type: 'info' | 'warning' | 'tip' | 'important' | 'note';
  title?: string;
  children: ReactNode;
}
```

**Uso típico**:
```mdx
<Callout type="tip" title="Consejo">
  Contenido del consejo aquí.
</Callout>
```

### Figure

```tsx
interface FigureProps {
  src: string;        // URL o ruta local
  alt: string;        // obligatorio para accesibilidad
  caption?: string;   // texto bajo la imagen
  fullWidth?: boolean; // default: false
}
```

**Uso típico**:
```mdx
<Figure
  src="./diagrama-esg.png"
  alt="Diagrama mostrando los tres pilares de ESG"
  caption="Figura 1: Los pilares ESG"
/>
```

### LinkCard

```tsx
interface LinkCardProps {
  href: string;
  title: string;
  description?: string;
  external?: boolean;  // default: false
}
```

**Uso típico**:
```mdx
<LinkCard
  href="/blog/guia-esg/"
  title="Guía completa de ESG"
  description="Todo lo que necesitas saber"
/>
```

### Embed

```tsx
interface EmbedProps {
  src: string;
  title: string;
  aspectRatio?: '16:9' | '4:3' | '1:1' | '9:16';
}
```

**Plataformas soportadas**: YouTube, Vimeo, Google Maps, Datawrapper

## Utilidades Disponibles

```typescript
// Calcular tiempo de lectura (200 palabras/minuto)
calculateReadingTime(content: string): number

// Formatear fecha
formatDate(date: Date): string  // "7 de enero de 2025"
formatDateShort(date: Date): string  // "7 ene 2025"

// Crear slug
slugify(text: string): string  // "mi-titulo" → "mi-titulo"

// Truncar texto
truncate(text: string, maxLength: number): string
```

## Estructura de Carpeta por Post

```
web/src/content/blog/
└── nombre-del-post/
    ├── index.mdx        # Contenido principal
    ├── hero.jpg         # Imagen destacada (1200x630px)
    ├── diagrama-1.png   # Imágenes adicionales
    └── ejemplo.svg      # Gráficos vectoriales
```

**Convención de nombres**:
- Carpeta: `kebab-case` (minúsculas, guiones)
- Imágenes: descriptivas, `kebab-case`
- Extensiones: `.jpg`, `.png`, `.svg`, `.webp`

## Rutas Generadas

| Ruta | Descripción |
|------|-------------|
| `/blog/` | Lista de todos los posts |
| `/blog/[slug]/` | Post individual |
| `/blog/categoria/[cat]/` | Posts por categoría |

## Comandos de Desarrollo

```bash
# Servidor de desarrollo
cd web && bun dev

# Build de producción
cd web && bun run build

# Preview del build
cd web && bun run preview
```

## Deploy

El deploy es automático via GitHub Actions al hacer push a `main`.

```bash
git add .
git commit -m "content(blog): [descripción]"
git push origin main
```

El workflow copia `dist/` a `/root/jessicamendez/web/dist` en el droplet.
