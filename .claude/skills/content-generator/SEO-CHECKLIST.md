# Checklist SEO para Posts del Blog

Usa esta lista antes de publicar cualquier contenido.

## Antes de Escribir

```
□ Definí la keyword principal
□ Investigué keywords secundarias (3-5)
□ Revisé qué contenido ya existe sobre el tema
□ Definí el ángulo único de mi artículo
□ Elegí la categoría correcta
```

---

## Título (Title Tag)

```
□ Máximo 60 caracteres
□ Keyword principal al inicio (primeras 3-4 palabras)
□ Es claro y descriptivo
□ Genera curiosidad o promete beneficio
□ No tiene clickbait engañoso
```

**Fórmulas que funcionan**:
- `[Número] [Tema] para [Objetivo]` → "7 Estrategias ESG para Empresas Mexicanas"
- `Qué es [Concepto] y Por Qué Importa` → "Qué es la MIA y Por Qué la Necesitas"
- `Cómo [Lograr X]: Guía [Año]` → "Cómo Obtener Permisos Ambientales: Guía 2025"
- `[Concepto]: Guía Completa para [Audiencia]` → "IFC Standards: Guía para Desarrolladores"

---

## Descripción (Meta Description)

```
□ Entre 120 y 160 caracteres
□ Incluye la keyword principal
□ Tiene un beneficio claro para el lector
□ Incluye llamado a acción implícito
□ No repite exactamente el título
```

**Estructura recomendada**:
`[Qué aprenderás] + [Beneficio] + [Diferenciador]`

**Ejemplo**:
> "Aprende a implementar criterios ESG en tu empresa mexicana. Guía práctica con pasos claros y ejemplos reales para 2025."

---

## URL (Slug)

```
□ Corta (3-5 palabras idealmente)
□ Incluye keyword principal
□ Solo letras minúsculas y guiones
□ Sin números de fecha (evitar 2025 en URL)
□ Sin palabras vacías (el, la, de, para, etc.)
```

**Bien**: `/blog/guia-esg-empresas-mexicanas/`
**Mal**: `/blog/guia-completa-de-esg-para-empresas-mexicanas-en-2025/`

---

## Contenido

### Estructura

```
□ Introducción en primeras 100 palabras incluye keyword
□ Headings siguen jerarquía (H2 → H3, nunca saltar a H4)
□ Cada sección H2 tiene al menos 100 palabras
□ Párrafos cortos (máx 3-4 oraciones)
□ Uso de listas cuando hay 3+ items
□ Al menos una imagen o elemento visual
```

### Keywords

```
□ Keyword principal aparece en:
  □ Título (H1)
  □ Primer párrafo
  □ Al menos un H2
  □ Último párrafo
□ Keywords secundarias distribuidas naturalmente
□ No hay keyword stuffing (máx 3-5 menciones por 1,500 palabras)
□ Uso de sinónimos y variaciones
```

### Links

```
□ 2-4 links internos a otros posts del blog
□ Links internos usan texto ancla descriptivo
□ 1-2 links externos a fuentes confiables (opcional)
□ Links externos abren en nueva pestaña
□ No hay links rotos
```

---

## Imágenes

### Imagen Hero

```
□ Tamaño: 1200x630px (ratio 1.91:1)
□ Formato: JPG para fotos, PNG para gráficos
□ Tamaño de archivo: <200KB idealmente
□ Nombre descriptivo: hero-guia-esg.jpg
□ heroImageAlt tiene descripción útil
```

### Imágenes en Contenido

```
□ Cada imagen tiene alt text descriptivo
□ Alt text describe la imagen, no solo "imagen de X"
□ Nombre de archivo descriptivo (no IMG_1234.jpg)
□ Imágenes comprimidas para web
□ Figuras tienen caption cuando aporta contexto
```

**Buen alt text**:
> "Diagrama circular mostrando los tres pilares ESG: Ambiental, Social y Gobernanza"

**Mal alt text**:
> "imagen ESG" o "diagrama"

---

## Frontmatter Completo

```yaml
---
title: "[Máx 60 chars, keyword al inicio]"
description: "[120-160 chars, keyword + beneficio]"
pubDate: YYYY-MM-DD
category: "[Categoría válida]"
tags: ["tag1", "tag2", "tag3"]  # 3-7 tags
draft: false  # Cambiar a false para publicar
featured: false  # true solo para posts destacados
heroImage: ./hero.jpg
heroImageAlt: "[Descripción accesible de la imagen]"
---
```

---

## Antes de Publicar

```
□ Leí el artículo completo en voz alta
□ No hay errores de ortografía o gramática
□ Todos los links funcionan
□ Las imágenes cargan correctamente
□ El frontmatter está completo
□ draft: false está configurado
□ Preview local funciona (bun dev)
```

---

## Después de Publicar

```
□ Verificar que la página carga en producción
□ Revisar cómo se ve en móvil
□ Compartir en redes sociales
□ Verificar que aparece en /blog/
□ Verificar que aparece en su categoría
```

---

## Herramientas Útiles

### Contar caracteres
```bash
# Contar caracteres del título
echo "Mi título aquí" | wc -c
```

### Verificar keywords
```bash
# Buscar menciones de keyword en el archivo
grep -i "keyword" web/src/content/blog/mi-post/index.mdx | wc -l
```

### Verificar links internos
```bash
# Buscar links en el contenido
grep -o '\](/blog/[^)]*' web/src/content/blog/mi-post/index.mdx
```

---

## Checklist Rápido (Copiar/Pegar)

```
PRE-PUBLICACIÓN:
□ Título ≤60 chars, keyword al inicio
□ Descripción 120-160 chars
□ URL corta y limpia
□ Keyword en intro y headings
□ 2-4 links internos
□ Imágenes con alt text
□ Hero 1200x630px
□ Sin errores ortográficos
□ draft: false

POST-PUBLICACIÓN:
□ Carga en producción
□ Se ve bien en móvil
□ Compartido en redes
```
