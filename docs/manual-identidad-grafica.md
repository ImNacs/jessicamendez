# Manual de Identidad Grafica

## Jessica Mendez - Biologa
### Consultora en Medioambiente y Sostenibilidad

---

## Indice

1. [Introduccion](#1-introduccion)
2. [Paleta de Colores](#2-paleta-de-colores)
3. [Tipografia](#3-tipografia)
4. [Logo](#4-logo)
5. [Elementos Graficos](#5-elementos-graficos)
6. [Aplicaciones](#6-aplicaciones)
7. [Usos Incorrectos](#7-usos-incorrectos)

---

## 1. Introduccion

Este manual de identidad grafica establece las directrices visuales para la marca **JM Biologa** de Jessica Mendez, consultora independiente en medioambiente y sostenibilidad.

La identidad visual refleja:
- **Profesionalismo** y seriedad en consultoria ambiental
- **Naturaleza** y conexion con el medio ambiente
- **Elegancia** y sofisticacion en el sector corporativo
- **Sostenibilidad** como valor central

El estilo visual combina elementos organicos y naturales con una estetica moderna y profesional, utilizando una paleta de colores que evoca la naturaleza (verdes) con toques calidos y sofisticados (rosa terracota).

---

## 2. Paleta de Colores

### 2.1 Colores Principales

#### Verde Bosque (Primary)
El color principal de la marca, representa naturaleza, crecimiento y sostenibilidad.

| Propiedad | Valor |
|-----------|-------|
| **HEX** | `#5B7C5B` |
| **RGB** | `91, 124, 91` |
| **HSL** | `120, 15%, 42%` |
| **CMYK** | `27%, 0%, 27%, 51%` |

**Uso recomendado:**
- Titulos principales
- Logo (letra M)
- Encabezados de secciones
- Iconos principales
- Botones primarios
- Enlaces

**Variantes:**
| Variante | HEX | Uso |
|----------|-----|-----|
| Verde Bosque Oscuro | `#4A6B4A` | Hover en botones, enfasis |
| Verde Bosque Claro | `#6B8C6B` | Fondos sutiles, bordes |
| Verde Bosque 10% | `#EFF3EF` | Fondos de seccion |

---

#### Rosa Terracota / Dusty Rose (Secondary)
Color secundario que aporta calidez, sofisticacion y feminidad profesional.

| Propiedad | Valor |
|-----------|-------|
| **HEX** | `#C4958A` |
| **RGB** | `196, 149, 138` |
| **HSL** | `11, 33%, 65%` |
| **CMYK** | `0%, 24%, 30%, 23%` |

**Uso recomendado:**
- Logo (letra J)
- Fondos de secciones destacadas
- Acentos decorativos
- Subtitulos
- Iconos secundarios
- Elementos decorativos de fondo

**Variantes:**
| Variante | HEX | Uso |
|----------|-----|-----|
| Rosa Terracota Oscuro | `#B08578` | Hover, enfasis |
| Rosa Terracota Claro | `#D4A59A` | Fondos claros |
| Rosa Terracota 10% | `#FAF5F4` | Fondos sutiles |
| Rosa Terracota 50% | `#E2CAC5` | Fondos medios |

---

### 2.2 Colores de Soporte

#### Blanco
| Propiedad | Valor |
|-----------|-------|
| **HEX** | `#FFFFFF` |
| **RGB** | `255, 255, 255` |

**Uso recomendado:**
- Fondo principal de paginas
- Texto sobre fondos oscuros
- Espacios de respiro visual

---

#### Gris Oscuro / Negro Suave
| Propiedad | Valor |
|-----------|-------|
| **HEX** | `#333333` |
| **RGB** | `51, 51, 51` |

**Uso recomendado:**
- Texto de cuerpo
- Parrafos
- Informacion detallada

**Variantes:**
| Variante | HEX | Uso |
|----------|-----|-----|
| Gris Medio | `#666666` | Texto secundario |
| Gris Claro | `#999999` | Placeholder, texto deshabilitado |
| Gris muy Claro | `#F5F5F5` | Fondos alternos |

---

#### Verde Claro / Sage (Accent)
| Propiedad | Valor |
|-----------|-------|
| **HEX** | `#8BAD8B` |
| **RGB** | `139, 173, 139` |
| **HSL** | `120, 18%, 61%` |

**Uso recomendado:**
- Acentos en graficos
- Badges y etiquetas
- Elementos decorativos secundarios
- Hover states suaves

---

### 2.3 Combinaciones de Color Recomendadas

#### Combinacion 1: Profesional Clasica
- Fondo: `#FFFFFF`
- Texto: `#333333`
- Acentos: `#5B7C5B`
- Decoracion: `#C4958A`

#### Combinacion 2: Seccion Destacada
- Fondo: `#C4958A`
- Texto: `#FFFFFF`
- Iconos: `#5B7C5B`

#### Combinacion 3: Seccion Naturaleza
- Fondo: `#5B7C5B`
- Texto: `#FFFFFF`
- Acentos: `#8BAD8B`

#### Combinacion 4: Fondo Suave
- Fondo: `#FAF5F4` (Rosa 10%)
- Texto: `#333333`
- Acentos: `#5B7C5B`

---

### 2.4 CSS Variables

```css
:root {
  /* Colores Principales */
  --color-primary: #5B7C5B;
  --color-primary-dark: #4A6B4A;
  --color-primary-light: #6B8C6B;
  --color-primary-10: #EFF3EF;

  --color-secondary: #C4958A;
  --color-secondary-dark: #B08578;
  --color-secondary-light: #D4A59A;
  --color-secondary-10: #FAF5F4;
  --color-secondary-50: #E2CAC5;

  /* Colores de Soporte */
  --color-white: #FFFFFF;
  --color-black: #333333;
  --color-gray-dark: #666666;
  --color-gray-medium: #999999;
  --color-gray-light: #F5F5F5;

  /* Color de Acento */
  --color-accent: #8BAD8B;
}
```

---

## 3. Tipografia

### 3.1 Familia Tipografica Principal

#### Titulos: Playfair Display
Tipografia serif elegante que transmite sofisticacion y profesionalismo.

```css
font-family: 'Playfair Display', Georgia, serif;
```

**Caracteristicas:**
- Estilo: Serif clasico con toques modernos
- Sensacion: Elegante, profesional, sofisticada
- Ideal para: Titulos, encabezados, destacados

**Alternativas:**
- Cormorant Garamond
- Libre Baskerville
- Lora

---

#### Cuerpo: Inter
Tipografia sans-serif moderna, altamente legible en pantallas.

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Caracteristicas:**
- Estilo: Sans-serif geometrica
- Sensacion: Moderna, limpia, profesional
- Ideal para: Texto de cuerpo, botones, navegacion

**Alternativas:**
- Source Sans Pro
- Open Sans
- Nunito Sans

---

### 3.2 Escala Tipografica

| Elemento | Tamano Desktop | Tamano Mobile | Peso | Line Height |
|----------|---------------|---------------|------|-------------|
| H1 | 48px / 3rem | 36px / 2.25rem | 700 | 1.2 |
| H2 | 36px / 2.25rem | 28px / 1.75rem | 700 | 1.25 |
| H3 | 28px / 1.75rem | 24px / 1.5rem | 600 | 1.3 |
| H4 | 24px / 1.5rem | 20px / 1.25rem | 600 | 1.35 |
| H5 | 20px / 1.25rem | 18px / 1.125rem | 600 | 1.4 |
| H6 | 18px / 1.125rem | 16px / 1rem | 600 | 1.4 |
| Body Large | 18px / 1.125rem | 16px / 1rem | 400 | 1.6 |
| Body | 16px / 1rem | 16px / 1rem | 400 | 1.6 |
| Body Small | 14px / 0.875rem | 14px / 0.875rem | 400 | 1.5 |
| Caption | 12px / 0.75rem | 12px / 0.75rem | 400 | 1.4 |

---

### 3.3 Pesos Tipograficos

| Peso | Valor | Uso |
|------|-------|-----|
| Regular | 400 | Texto de cuerpo |
| Medium | 500 | Subtitulos, enfasis leve |
| SemiBold | 600 | Encabezados H3-H6, botones |
| Bold | 700 | Titulos H1-H2, destacados importantes |

---

### 3.4 CSS Typography

```css
/* Importar fuentes */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');

/* Variables de tipografia */
:root {
  --font-heading: 'Playfair Display', Georgia, serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

  /* Tamanos */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.75rem;
  --text-4xl: 2.25rem;
  --text-5xl: 3rem;
}

/* Estilos base */
body {
  font-family: var(--font-body);
  font-size: var(--text-base);
  line-height: 1.6;
  color: #333333;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  color: #5B7C5B;
}

h1 {
  font-size: var(--text-5xl);
  font-weight: 700;
  line-height: 1.2;
}

h2 {
  font-size: var(--text-4xl);
  font-weight: 700;
  line-height: 1.25;
}

h3 {
  font-size: var(--text-3xl);
  font-weight: 600;
  line-height: 1.3;
}
```

---

## 4. Logo

### 4.1 Descripcion del Logo

El logo **JM Biologa** es un monograma que combina las iniciales de Jessica Mendez con la palabra "Biologa" como descriptor profesional.

**Estructura:**
- **J** - En color Rosa Terracota (#C4958A), posicionada en la parte superior izquierda
- **M** - En color Verde Bosque (#5B7C5B), entrelazada con la J, siendo el elemento dominante
- **Biologa** - Texto pequeno en Rosa Terracota, posicionado como subscript

**Caracteristicas del diseno:**
- Las letras J y M se entrelazan de forma elegante
- La J tiene un trazo curvo que fluye hacia la M
- La M tiene terminaciones con serifas sutiles
- El conjunto transmite profesionalismo y conexion con la naturaleza

---

### 4.2 Versiones del Logo

#### Version Principal (Full Color)
- J en Rosa Terracota (#C4958A)
- M en Verde Bosque (#5B7C5B)
- "Biologa" en Rosa Terracota

#### Version Monocromatica Verde
- Todo el logo en Verde Bosque (#5B7C5B)
- Para uso sobre fondos claros

#### Version Monocromatica Blanca
- Todo el logo en Blanco (#FFFFFF)
- Para uso sobre fondos oscuros o de color

#### Version Monocromatica Negra
- Todo el logo en Gris Oscuro (#333333)
- Para documentos formales o impresiones en blanco y negro

---

### 4.3 Area de Proteccion

El logo debe mantener un espacio libre alrededor equivalente a la altura de la letra "B" en "Biologa" en todos sus lados. Este espacio asegura la legibilidad y presencia visual del logo.

```
+------------------+
|                  |
|   [  JM Logo  ]  |
|   [  Biologa  ]  |
|                  |
+------------------+
     ^-- Espacio = altura de "B"
```

---

### 4.4 Tamanos Minimos

| Aplicacion | Tamano Minimo |
|------------|---------------|
| Digital (pantalla) | 80px de ancho |
| Impreso | 25mm de ancho |
| Favicon | 32x32px (solo monograma) |

---

## 5. Elementos Graficos

### 5.1 Iconografia

Los iconos utilizados en la marca siguen un estilo **outline** (linea) con las siguientes caracteristicas:

- Grosor de linea: 2px
- Terminaciones: Redondeadas
- Estilo: Minimalista y organico
- Colores: Verde Bosque principal, Rosa Terracota para acentos

**Temas de iconos:**
- Naturaleza (hojas, plantas, arboles)
- Medio ambiente (globo terraqueo, agua, aire)
- Sostenibilidad (reciclaje, energia renovable)
- Profesional (documentos, graficas, lupa)

---

### 5.2 Elementos Decorativos

#### Hojas y Ramas
Elementos botanicos estilizados que refuerzan la conexion con la naturaleza:
- Hojas simples con nervaduras sutiles
- Ramas con multiples hojas
- Disposicion asimetrica y organica

#### Formas Organicas (Blobs)
Formas curvas y fluidas para fondos y separadores:
- Bordes suaves sin angulos
- Colores en tonos suaves (10-50% de opacidad)
- Usadas para crear interes visual sin distraer

#### Globo con Planta
Representa la mision global de sostenibilidad:
- Globo terraqueo estilizado
- Planta emergiendo o envolviendo
- Simboliza cuidado del planeta

#### Mano Sosteniendo Planta
Simbolo de cuidado y sostenibilidad:
- Mano abierta en gesto de soporte
- Planta con hojas creciendo
- Transmite proteccion y crecimiento

---

### 5.3 Patrones

#### Patron de Hojas
Para fondos sutiles y texturas:
- Hojas dispersas con opacidad baja (5-10%)
- Repeticion organica, no rigidamente geometrica
- Color: Verde Bosque o Rosa Terracota

---

## 6. Aplicaciones

### 6.1 Web

#### Header/Navegacion
- Logo a la izquierda
- Fondo blanco o transparente
- Links en Verde Bosque (#5B7C5B)
- Hover en Verde Bosque Oscuro (#4A6B4A)

#### Hero Section
- Titulo principal en Verde Bosque con Playfair Display
- Subtitulo en Rosa Terracota
- Fondo blanco con elementos decorativos sutiles

#### Secciones de Contenido
- Alternar entre fondo blanco y Rosa Terracota claro (#FAF5F4)
- Titulos de seccion en Verde Bosque
- Iconos en Verde Bosque

#### Footer
- Fondo Verde Bosque (#5B7C5B)
- Texto en blanco
- Logo en version blanca

---

### 6.2 Botones

#### Boton Primario
```css
.btn-primary {
  background-color: #5B7C5B;
  color: #FFFFFF;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
}

.btn-primary:hover {
  background-color: #4A6B4A;
}
```

#### Boton Secundario
```css
.btn-secondary {
  background-color: transparent;
  color: #5B7C5B;
  border: 2px solid #5B7C5B;
  padding: 12px 24px;
  border-radius: 8px;
}

.btn-secondary:hover {
  background-color: #5B7C5B;
  color: #FFFFFF;
}
```

#### Boton Terciario
```css
.btn-tertiary {
  background-color: #C4958A;
  color: #FFFFFF;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
}

.btn-tertiary:hover {
  background-color: #B08578;
}
```

---

### 6.3 Cards/Tarjetas

```css
.card {
  background: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  padding: 24px;
  border: 1px solid #EFF3EF;
}

.card-title {
  font-family: 'Playfair Display', serif;
  color: #5B7C5B;
  font-size: 1.5rem;
}

.card-icon {
  color: #5B7C5B;
  margin-bottom: 16px;
}
```

---

### 6.4 Espaciado

Sistema de espaciado basado en multiplos de 4px:

| Token | Valor | Uso |
|-------|-------|-----|
| space-1 | 4px | Espaciado minimo |
| space-2 | 8px | Entre elementos relacionados |
| space-3 | 12px | Padding interno pequeno |
| space-4 | 16px | Padding estandar |
| space-6 | 24px | Separacion de secciones |
| space-8 | 32px | Margen entre secciones |
| space-12 | 48px | Separacion de bloques |
| space-16 | 64px | Margen de seccion grande |
| space-24 | 96px | Espaciado hero/secciones principales |

---

## 7. Usos Incorrectos

### No hacer:

1. **No cambiar los colores del logo**
   - Mantener siempre los colores oficiales o versiones monocromaticas aprobadas

2. **No distorsionar proporciones**
   - El logo debe mantener sus proporciones originales

3. **No usar sobre fondos que reduzcan la legibilidad**
   - Evitar fondos con patrones complejos o colores similares al logo

4. **No rotar el logo**
   - Mantener siempre en posicion horizontal

5. **No agregar efectos**
   - No sombras, brillos, degradados o efectos 3D al logo

6. **No usar tipografias no autorizadas**
   - Mantener Playfair Display para titulos e Inter para cuerpo

7. **No usar colores fuera de la paleta**
   - Todos los elementos deben usar colores de la paleta oficial

---

## Creditos y Contacto

**Marca:** JM Biologa - Jessica Mendez
**Web:** jessicamendez.bio
**Email:** contacto@jessicamendez.bio

---

*Manual de Identidad Grafica v1.0*
*Ultima actualizacion: Enero 2026*
