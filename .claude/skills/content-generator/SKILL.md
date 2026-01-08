---
name: content-generator
description: Genera contenido para el blog de Jessica Méndez. Usa con "contenido", "blog", "crear post", "nueva entrada", "generar artículo", "publicar", "SEO blog", "ideas de contenido", "escribir sobre".
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, Task, WebSearch, WebFetch
---

# Content Generator - Generador de Contenido del Blog

Soy tu experto en contenido y administrador inteligente del blog. Te guío desde la idea inicial hasta la publicación final, paso a paso y sin complicaciones.

## Cuándo Usar Esta Skill

Usa esta skill cuando necesites:
- Crear una nueva entrada del blog
- Generar ideas de contenido
- Investigar un tema para escribir
- Optimizar un artículo para SEO
- Revisar contenido antes de publicar
- Gestionar categorías y tags
- Actualizar un post existente

## El Proceso Completo (6 Pasos)

```
┌─────────────────────────────────────────────────────────┐
│  1. OBJETIVO  →  2. IDEA  →  3. PLAN  →               │
│                                                         │
│  4. ESCRIBIR  →  5. OPTIMIZAR  →  6. PUBLICAR         │
└─────────────────────────────────────────────────────────┘
```

---

## Paso 1: Definir el Objetivo

**Pregunta clave**: ¿Qué quieres lograr con este contenido?

### Los 3 Objetivos de Contenido

Piensa en el contenido como un ciclo: primero atraes personas nuevas, luego las convences de que eres experta, y finalmente las conviertes en fans que te recomiendan.

---

#### 🧲 ATRAER — "Que me encuentren"

**¿Qué es?** Contenido para personas que NO te conocen. Buscan en Google, encuentran tu artículo, y así descubren quién eres.

**Características:**
- Responde preguntas básicas que la gente busca
- Explica conceptos desde cero
- Usa keywords que la gente realmente escribe en Google
- No asume conocimiento previo

**Ejemplos para tu sector:**

| Tema | Título de ejemplo |
|------|-------------------|
| ESG | "¿Qué es ESG? Guía para Empresarios Mexicanos" |
| Regulación | "MIA: Qué es y Cuándo la Necesita tu Proyecto" |
| Sostenibilidad | "Diseño Sostenible: Qué Significa Realmente" |
| IFC | "Estándares IFC: Por Qué los Bancos los Exigen" |

**Casos típicos:**
- Un empresario que escucha "ESG" en una junta y no sabe qué es
- Un desarrollador inmobiliario que necesita permisos y busca "MIA México"
- Un inversionista que quiere entender "financiamiento verde"

---

#### 🤝 INVOLUCRAR — "Que confíen en mí"

**¿Qué es?** Contenido para personas que YA te conocen pero todavía no están convencidas de trabajar contigo. Quieren ver evidencia de tu experiencia.

**Características:**
- Muestra tu experiencia real con casos y proyectos
- Compara opciones y da recomendaciones
- Profundiza en temas que el contenido básico no cubre
- Demuestra que sabes de lo que hablas

**Ejemplos para tu sector:**

| Tema | Título de ejemplo |
|------|-------------------|
| Caso de estudio | "Cómo Ayudamos a [Empresa] a Obtener Certificación ESG" |
| Comparativa | "LEED vs EDGE: ¿Cuál Conviene para tu Proyecto en México?" |
| Proceso | "Paso a Paso: Cómo Tramitamos una MIA en 90 Días" |
| Análisis | "3 Errores Comunes al Implementar ESG (y Cómo Evitarlos)" |

**Casos típicos:**
- Un cliente potencial que te encontró y quiere ver tu trabajo anterior
- Alguien comparando consultores y buscando diferenciadores
- Una empresa que ya intentó ESG sola y falló, busca ayuda experta

---

#### ⭐ DELEITAR — "Que me recomienden"

**¿Qué es?** Contenido para clientes actuales o personas muy comprometidas. Les das tanto valor que te recomiendan a otros.

**Características:**
- Recursos descargables y herramientas prácticas
- Tutoriales avanzados paso a paso
- Contenido exclusivo o actualizado frecuentemente
- Checklists, plantillas, calculadoras

**Ejemplos para tu sector:**

| Tema | Título de ejemplo |
|------|-------------------|
| Plantilla | "Plantilla Gratuita: Diagnóstico ESG para PyMEs" |
| Tutorial | "Cómo Crear tu Primer Reporte de Sostenibilidad" |
| Herramienta | "Checklist: 20 Puntos Antes de Entregar tu MIA" |
| Recurso | "Directorio de Proveedores Sostenibles en México" |

**Casos típicos:**
- Un cliente pasado que quiere mantenerse actualizado
- Alguien que ya leyó varios artículos tuyos y quiere más
- Profesionales del sector que te siguen como referencia

---

### ¿Cómo elegir?

Pregúntate:

| Pregunta | Si la respuesta es... | Objetivo |
|----------|----------------------|----------|
| ¿La persona ya me conoce? | No | Atraer |
| ¿Ya me conoce pero no ha trabajado conmigo? | Sí | Involucrar |
| ¿Ya es cliente o seguidor fiel? | Sí | Deleitar |

### Acción
Pregunta al usuario:
1. ¿Este contenido es para gente nueva, para convencer, o para fidelizar?
2. ¿A quién va dirigido específicamente?
3. ¿Hay algún tema o proyecto en mente?

---

## Paso 2: Generar Ideas

Si el usuario no tiene un tema definido, usar sub-agentes para investigar:

### Investigar Tendencias
```
Lanzar Task (subagent_type: general-purpose):
"Investiga tendencias actuales en [tema del usuario] para México/Latinoamérica.
Busca: noticias recientes, regulaciones nuevas, preguntas frecuentes del sector.
Devuelve 5 ideas de artículos con título tentativo y ángulo único."
```

### Analizar Contenido Existente
```bash
# Ver posts existentes para evitar duplicados
ls -la web/src/content/blog/
```

### Banco de Ideas por Categoría
Ver [IDEAS-BANCO.md](IDEAS-BANCO.md) para ideas pre-investigadas por categoría.

---

## Paso 3: Planificar el Contenido

### 3.1 Elegir Categoría

| Categoría | Cuándo Usarla |
|-----------|---------------|
| `ESG` | Temas de Environmental, Social, Governance |
| `Regulacion-Ambiental` | Leyes, normas, MIA, permisos |
| `IFC` | Estándares IFC, financiamiento sostenible |
| `Sostenibilidad` | Prácticas sostenibles, diseño verde |
| `Estudios-Ambientales` | Estudios técnicos, metodologías |

### 3.2 Definir Estructura

**Longitud recomendada**: 1,500 - 2,500 palabras

**Estructura base**:
```
1. Introducción (enganche + promesa)
2. Sección principal 1
3. Sección principal 2
4. Sección principal 3
5. Conclusión con llamado a acción
```

### 3.3 Preparar Metadata

Antes de escribir, definir:

| Campo | Regla | Ejemplo |
|-------|-------|---------|
| **Título** | Máx 60 caracteres | "Guía ESG para Empresas Mexicanas 2025" |
| **Descripción** | 120-160 caracteres | "Aprende a implementar criterios ESG en tu empresa..." |
| **Tags** | 3-7 relevantes | `["ESG", "México", "empresas", "sostenibilidad"]` |

---

## Paso 4: Escribir el Contenido

### 4.1 Crear la Carpeta del Post

```bash
# Crear carpeta con nombre en kebab-case
mkdir -p web/src/content/blog/[nombre-del-post]/
```

### 4.2 Crear el Archivo MDX

```bash
# Crear archivo principal
touch web/src/content/blog/[nombre-del-post]/index.mdx
```

### 4.3 Estructura del Frontmatter

```yaml
---
title: "Título del Post (máx 60 chars)"
description: "Descripción SEO de 120-160 caracteres que enganche al lector."
pubDate: 2025-01-08
category: "ESG"
tags: ["tag1", "tag2", "tag3"]
draft: true
featured: false
heroImage: ./hero.jpg
heroImageAlt: "Descripción accesible de la imagen"
---
```

### 4.4 Componentes MDX Disponibles

Para enriquecer el contenido, importar y usar:

```mdx
import { Callout, Figure, LinkCard, Embed } from '@/components/mdx';
```

**Callout** - Para destacar información:
```mdx
<Callout type="info" title="Dato importante">
  Los criterios ESG son cada vez más relevantes en México.
</Callout>
```
Tipos: `info`, `warning`, `tip`, `important`, `note`

**Figure** - Para imágenes con caption:
```mdx
<Figure
  src="./diagrama.png"
  alt="Descripción accesible"
  caption="Figura 1: Proceso ESG"
/>
```

**LinkCard** - Para enlaces destacados:
```mdx
<LinkCard
  href="/blog/otro-post/"
  title="Artículo relacionado"
  description="Descripción breve"
/>
```

**Embed** - Para videos:
```mdx
<Embed
  src="https://www.youtube.com/embed/VIDEO_ID"
  title="Título del video"
/>
```

Ver [TEMPLATES.md](TEMPLATES.md) para plantillas completas por tipo de contenido.

---

## Paso 5: Optimizar para SEO

Antes de publicar, verificar cada punto:

### Checklist Rápido

```
□ Título tiene la keyword principal al inicio
□ Descripción tiene 120-160 caracteres
□ URL es corta y descriptiva (kebab-case)
□ Keyword aparece en primeras 100 palabras
□ Hay al menos 2-3 links internos a otros posts
□ Imágenes tienen alt text descriptivo
□ Headings siguen jerarquía (H2 → H3, nunca saltar)
```

### Investigar Keywords (Opcional)

```
Lanzar Task (subagent_type: general-purpose):
"Investiga keywords relacionadas con [tema] en español para México.
Busca: volumen de búsqueda, keywords long-tail, preguntas frecuentes.
Sugiere 3 keywords principales y 5 secundarias."
```

Ver [SEO-CHECKLIST.md](SEO-CHECKLIST.md) para checklist completo.

---

## Paso 6: Publicar

### 6.1 Revisar Borrador

```bash
# Verificar que el archivo existe y tiene contenido
cat web/src/content/blog/[nombre-del-post]/index.mdx | head -50
```

### 6.2 Agregar Imagen Hero

Copiar imagen a la carpeta del post:
```bash
# La imagen debe llamarse hero.jpg o hero.png
cp /ruta/imagen.jpg web/src/content/blog/[nombre-del-post]/hero.jpg
```

Tamaño recomendado: **1200x630px** (ratio 1.91:1 para redes sociales)

### 6.3 Cambiar Draft a False

```yaml
draft: false  # Cambiar de true a false para publicar
```

### 6.4 Verificar en Local

```bash
cd web && bun dev
# Abrir http://localhost:4321/blog/[nombre-del-post]/
```

### 6.5 Commit y Deploy

```bash
git add web/src/content/blog/[nombre-del-post]/
git commit -m "content(blog): agregar [título corto del post]"
git push origin main
# El deploy es automático via GitHub Actions
```

---

## Gestión de Contenido Existente

### Ver Todos los Posts

```bash
ls -la web/src/content/blog/
```

### Buscar Posts por Categoría

```bash
grep -r "category:" web/src/content/blog/ | grep "[Categoría]"
```

### Ver Posts en Borrador

```bash
grep -r "draft: true" web/src/content/blog/
```

### Actualizar un Post

1. Leer el archivo actual
2. Editar contenido necesario
3. Agregar `updatedDate: YYYY-MM-DD` al frontmatter
4. Commit con mensaje: `content(blog): actualizar [título]`

---

## Flujos Rápidos

### "Quiero escribir sobre X pero no sé cómo empezar"

1. Definir objetivo (Atraer/Involucrar/Deleitar)
2. Investigar con sub-agente el tema
3. Proponer 3 ángulos diferentes
4. Usuario elige uno
5. Crear estructura y escribir

### "Tengo un artículo listo, ayúdame a publicarlo"

1. Revisar SEO checklist
2. Validar frontmatter
3. Verificar imágenes
4. Cambiar draft a false
5. Commit y push

### "Dame ideas de contenido para este mes"

1. Revisar posts existentes
2. Investigar tendencias del sector
3. Proponer 5 ideas con título, ángulo y categoría
4. Crear calendario editorial sugerido

---

## Manejo de Errores

### Error: "Título muy largo"
1. El título debe tener máximo 60 caracteres
2. Acortar eliminando palabras innecesarias
3. Mover información extra a la descripción

### Error: "Descripción fuera de rango"
1. Debe tener entre 120 y 160 caracteres
2. Si es muy corta: agregar beneficio o call-to-action
3. Si es muy larga: eliminar adjetivos redundantes

### Error: "Categoría inválida"
1. Solo usar categorías existentes:
   - ESG
   - Regulacion-Ambiental
   - IFC
   - Sostenibilidad
   - Estudios-Ambientales
2. No inventar nuevas categorías sin actualizar el schema

### Error: "Build falla con MDX"
1. Verificar que imports de componentes son correctos
2. Revisar que JSX tiene tags cerrados
3. Escapar caracteres especiales en código

---

## Recursos

- **Referencia técnica**: [REFERENCE.md](REFERENCE.md)
- **Plantillas por tipo**: [TEMPLATES.md](TEMPLATES.md)
- **Checklist SEO completo**: [SEO-CHECKLIST.md](SEO-CHECKLIST.md)
- **Banco de ideas**: [IDEAS-BANCO.md](IDEAS-BANCO.md)
- **Investigación base**: `docs/investigacion-generacion-contenido-blog.md`
