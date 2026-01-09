# Propuesta de Rediseño 2025 - jessicamendez.bio

## Resumen Ejecutivo

Esta propuesta presenta un rediseño integral del sitio web de Jessica Méndez, evolucionando de un diseño funcional a una experiencia **Organic Luxury** que posiciona a Jessica como referente premium en consultoría ambiental.

**Puntuación actual del diseño:** 8.2/10
**Puntuación objetivo:** 9.5/10

---

## 1. Dirección Estética: "Organic Luxury"

### Concepto Central

Fusionar la elegancia del sector financiero con la calidez de lo natural y sostenible. No es minimalismo frío ni maximalismo caótico—es **refinamiento con alma**.

### Principios de Diseño

1. **Tensión Elegante**: Tipografía editorial (serif) + elementos orgánicos
2. **Quietud Activa**: Espacio negativo generoso con micro-interacciones significativas
3. **Materialidad Digital**: Texturas sutiles que evocan papel, tierra, naturaleza
4. **Jerarquía Respirante**: El contenido respira, no compite por atención

### Lo que NO haremos

- Gradientes púrpura genéricos
- Animaciones sin propósito (bouncing logos, spinning icons)
- Tipografía Inter/Roboto/Space Grotesk (las "Arial del AI")
- Cards idénticas en grid perfecto
- Ilustraciones 3D flotantes genéricas

---

## 2. Sistema de Diseño Optimizado

### 2.1 Tipografía Refinada

**Cambio propuesto:** Reducir de 7 a 3 archivos de fuentes usando variable fonts.

```css
/* ANTES: 7 archivos separados */
@import "@fontsource/cormorant-garamond/400.css";
@import "@fontsource/cormorant-garamond/500.css";
@import "@fontsource/cormorant-garamond/600.css";
@import "@fontsource/cormorant-garamond/700.css";
@import "@fontsource/inter/400.css";
@import "@fontsource/inter/500.css";
@import "@fontsource/inter/600.css";

/* DESPUÉS: 2 variable fonts */
@import "@fontsource-variable/cormorant/wght.css";
@import "@fontsource-variable/inter/wght.css";
```

**Escala tipográfica mejorada:**

```css
@theme inline {
  /* Fluid typography con clamp() */
  --text-hero: clamp(2.5rem, 5vw + 1rem, 4rem);
  --text-section: clamp(1.875rem, 3vw + 0.5rem, 2.75rem);
  --text-card: clamp(1.25rem, 2vw + 0.25rem, 1.5rem);
  --text-body: clamp(1rem, 1vw + 0.5rem, 1.125rem);
  --text-caption: clamp(0.75rem, 0.5vw + 0.5rem, 0.875rem);

  /* Letter spacing refinado */
  --tracking-tight: -0.025em;
  --tracking-normal: 0;
  --tracking-wide: 0.05em;
  --tracking-wider: 0.1em;
}
```

### 2.2 Paleta de Colores Refinada

Mantener la identidad pero con mayor sofisticación:

```css
:root {
  /* Primarios - más profundidad */
  --verde-deep: #3a4f3a;      /* Nuevo: verde profundo para textos */
  --verde-forest: #496349;    /* Principal */
  --verde-sage: #7d9b7d;      /* Medio */
  --verde-mist: #c8d8c8;      /* Claro */
  --verde-whisper: #f0f4f0;   /* Ultra claro */

  /* Acentos - más calidez */
  --terracotta: #c4958a;
  --terracotta-soft: #dfc4bc;
  --terracotta-whisper: #faf5f4;

  /* Neutros cálidos */
  --cream: #fefdfb;
  --cream-warm: #f8f5f0;
  --stone-light: #e8e4df;
  --stone: #9a9590;
  --stone-dark: #5a5550;
  --charcoal: #2d2d2d;

  /* Semánticos */
  --success: #5b8a5b;
  --warning: #c49a6c;
  --error: #b85c5c;
}
```

### 2.3 Sistema de Espaciado Consistente

```css
@theme inline {
  /* Spacing scale basado en 8px */
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
  --space-32: 8rem;     /* 128px */

  /* Section spacing responsive */
  --section-y: clamp(4rem, 8vw, 7rem);
  --section-x: clamp(1rem, 5vw, 3rem);
}
```

---

## 3. Sistema de Animaciones Cohesivo

### 3.1 Filosofía de Animación

**Regla de oro:** Cada animación debe tener un propósito comunicativo, no decorativo.

| Tipo | Propósito | Duración | Easing |
|------|-----------|----------|--------|
| **Entrada** | Guiar atención | 400-600ms | ease-out |
| **Hover** | Feedback táctil | 200-300ms | ease-in-out |
| **Transición** | Continuidad espacial | 300-400ms | ease-in-out |
| **Ambiental** | Atmosférica sutil | 8-20s | linear |

### 3.2 Animaciones Base (CSS)

```css
/* ============================================
   SISTEMA DE ANIMACIONES - Organic Luxury
   ============================================ */

/* Entrance animations - staggered reveal */
@keyframes reveal-up {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes reveal-scale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes reveal-blur {
  from {
    opacity: 0;
    filter: blur(8px);
  }
  to {
    opacity: 1;
    filter: blur(0);
  }
}

/* Interactive states */
@keyframes subtle-lift {
  from { transform: translateY(0); }
  to { transform: translateY(-4px); }
}

/* Ambient - muy sutil, solo para fondos */
@keyframes breathe {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.6; }
}

@keyframes drift {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(10px, -10px); }
}

/* Utility classes */
.animate-reveal-up {
  animation: reveal-up 0.5s ease-out forwards;
  opacity: 0;
}

.animate-reveal-scale {
  animation: reveal-scale 0.4s ease-out forwards;
  opacity: 0;
}

/* Stagger delays */
.stagger-1 { animation-delay: 50ms; }
.stagger-2 { animation-delay: 100ms; }
.stagger-3 { animation-delay: 150ms; }
.stagger-4 { animation-delay: 200ms; }
.stagger-5 { animation-delay: 250ms; }
.stagger-6 { animation-delay: 300ms; }

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 3.3 View Transitions (Astro)

```astro
---
// src/layouts/Layout.astro
import { ViewTransitions } from 'astro:transitions';
---

<head>
  <ViewTransitions />
  <style is:global>
    /* Custom view transitions */
    @view-transition {
      navigation: auto;
    }

    ::view-transition-old(root),
    ::view-transition-new(root) {
      animation-duration: 0.3s;
      animation-timing-function: ease-in-out;
    }

    /* Hero image persists across navigation */
    .hero-image {
      view-transition-name: hero-image;
    }

    /* Section titles morph */
    .section-title {
      view-transition-name: section-title;
    }

    /* Logo persists */
    .logo {
      view-transition-name: logo;
    }
  </style>
</head>
```

---

## 4. Mejoras por Componente

### 4.1 HERO - "Primera Impresión Inolvidable"

**Problemas actuales:**
- Versión duplicada (Astro + React)
- Background gradient animado pesado
- Falta de jerarquía visual clara

**Propuesta: Hero Cinematográfico**

```astro
---
// src/components/website/HeroV2.astro
import { Button } from '@/components/ui/button';
import { profile } from '@/lib/utils';

const credentials = [
  { name: 'IFC Performance Standards', icon: 'shield' },
  { name: 'Principios de Ecuador', icon: 'globe' },
  { name: 'SEMARNAT', icon: 'check' },
];

const sectors = ['Energía Renovable', 'Infraestructura', 'Minería', 'Oil & Gas'];
---

<section
  id="inicio"
  class="relative min-h-screen flex items-center overflow-hidden"
  aria-label="Introducción"
>
  <!-- Background: Textura orgánica sutil -->
  <div class="absolute inset-0 bg-cream">
    <!-- Grain texture overlay -->
    <div class="absolute inset-0 opacity-30" style="background-image: url('/textures/grain.svg');" />

    <!-- Organic shapes - posicionados con intención -->
    <div
      class="absolute top-20 -right-32 w-[500px] h-[500px] rounded-full bg-verde-whisper blur-3xl animate-breathe"
      style="animation-delay: 0s;"
      aria-hidden="true"
    />
    <div
      class="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-terracotta-whisper blur-3xl animate-breathe"
      style="animation-delay: 4s;"
      aria-hidden="true"
    />
  </div>

  <!-- Content Grid -->
  <div class="relative z-10 container mx-auto px-section-x py-section-y">
    <div class="grid lg:grid-cols-12 gap-12 items-center">

      <!-- Left: Text Content (7 cols) -->
      <div class="lg:col-span-7 space-y-8">

        <!-- Overline / Badge -->
        <div class="animate-reveal-up stagger-1">
          <span
            class="inline-flex items-center gap-2 px-4 py-2
                   bg-verde-whisper border border-verde-mist rounded-full
                   text-caption tracking-wide text-verde-forest"
          >
            <span class="w-2 h-2 rounded-full bg-verde-sage animate-pulse" aria-hidden="true"></span>
            Consultora Ambiental Senior
          </span>
        </div>

        <!-- Headline - Editorial style -->
        <h1
          class="text-hero font-serif tracking-tight text-charcoal
                 animate-reveal-up stagger-2"
        >
          <span class="block">Tu aliada en</span>
          <span class="block text-verde-forest">regulación ambiental</span>
          <span class="block">
            y <span class="text-terracotta italic">financiamiento sostenible</span>
          </span>
        </h1>

        <!-- Subhead -->
        <p
          class="text-body text-stone-dark max-w-xl leading-relaxed
                 animate-reveal-up stagger-3"
        >
          Acompaño a desarrolladores de proyectos y entidades financieras en la
          obtención de permisos ambientales y cumplimiento de estándares internacionales.
        </p>

        <!-- CTAs -->
        <div class="flex flex-wrap gap-4 animate-reveal-up stagger-4">
          <Button
            size="lg"
            class="group bg-verde-forest hover:bg-verde-deep text-white
                   px-8 py-6 text-base font-medium transition-all duration-300
                   hover:shadow-xl hover:shadow-verde-forest/20"
          >
            <a href="#contacto" class="flex items-center gap-3">
              Agenda una consulta
              <svg
                class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </Button>

          <Button
            size="lg"
            variant="ghost"
            class="px-8 py-6 text-base text-verde-deep hover:text-verde-forest
                   hover:bg-verde-whisper border border-transparent hover:border-verde-mist
                   transition-all duration-300"
          >
            <a href="#servicios" class="flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 9l-7 7-7-7" />
              </svg>
              Explorar servicios
            </a>
          </Button>
        </div>

        <!-- Credentials inline -->
        <div class="flex flex-wrap gap-3 pt-4 animate-reveal-up stagger-5">
          {credentials.map((cred) => (
            <span class="inline-flex items-center gap-2 text-caption text-stone">
              <svg class="w-4 h-4 text-verde-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              {cred.name}
            </span>
          ))}
        </div>
      </div>

      <!-- Right: Visual Element (5 cols) -->
      <div class="lg:col-span-5 relative animate-reveal-scale stagger-4">
        <!-- Featured image con marco editorial -->
        <div class="relative">
          <!-- Decorative frame -->
          <div
            class="absolute -inset-4 border border-verde-mist rounded-2xl
                   transform rotate-2 transition-transform duration-500
                   group-hover:rotate-0"
            aria-hidden="true"
          />

          <div class="relative overflow-hidden rounded-xl shadow-2xl shadow-stone/10">
            <img
              src="/jessica-hero.webp"
              alt="Jessica Méndez - Consultora Ambiental"
              class="w-full aspect-[4/5] object-cover"
              loading="eager"
              fetchpriority="high"
            />

            <!-- Overlay gradient -->
            <div
              class="absolute inset-0 bg-gradient-to-t from-verde-deep/40 via-transparent to-transparent"
              aria-hidden="true"
            />
          </div>

          <!-- Floating stat card -->
          <div
            class="absolute -bottom-6 -left-6 bg-white p-5 rounded-xl shadow-xl
                   border border-stone-light animate-reveal-up"
            style="animation-delay: 600ms;"
          >
            <p class="text-3xl font-serif text-verde-forest">{profile.experience}</p>
            <p class="text-caption text-stone uppercase tracking-wider">de experiencia</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom: Social proof bar -->
    <div
      class="mt-20 pt-8 border-t border-stone-light animate-reveal-up"
      style="animation-delay: 700ms;"
    >
      <p class="text-caption text-stone mb-4 uppercase tracking-wider">
        Especialista en sectores de alto impacto
      </p>
      <div class="flex flex-wrap items-center gap-8">
        {sectors.map((sector, i) => (
          <span class="text-sm font-medium text-stone-dark hover:text-verde-forest transition-colors cursor-default">
            {sector}
          </span>
        ))}
      </div>
    </div>
  </div>

  <!-- Scroll indicator -->
  <div
    class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
    style="animation-duration: 2s;"
  >
    <a
      href="#servicios"
      class="flex flex-col items-center gap-2 text-stone hover:text-verde-forest transition-colors"
      aria-label="Scroll para ver más"
    >
      <span class="text-caption uppercase tracking-widest">Descubre más</span>
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </a>
  </div>
</section>
```

### 4.2 SERVICES - "Descubrimiento Progresivo"

**Propuesta: Cards con reveal animado + hover states sofisticados**

```tsx
// src/components/website/ServicesV2.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  highlight?: boolean;
}

const services: Service[] = [
  {
    id: 'due-diligence',
    title: 'Due Diligence Ambiental',
    subtitle: 'Evaluación ESG para transacciones',
    description: 'Análisis exhaustivo de riesgos y oportunidades ambientales para fusiones, adquisiciones y financiamientos de proyectos.',
    features: [
      'Red flags ambientales',
      'Pasivos contingentes',
      'Gap analysis regulatorio',
      'Recomendaciones de mitigación'
    ],
    icon: <SearchIcon />,
    highlight: true
  },
  // ... más servicios
];

export function ServicesV2() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section id="servicios" className="py-section-y bg-cream-warm">
      <div className="container mx-auto px-section-x">

        {/* Section header */}
        <motion.div
          className="max-w-2xl mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-caption text-terracotta uppercase tracking-wider mb-4 block">
            Servicios Especializados
          </span>
          <h2 className="text-section font-serif text-charcoal mb-6">
            Soluciones integrales para tu <br className="hidden lg:block" />
            <span className="text-verde-forest">cumplimiento ambiental</span>
          </h2>
          <p className="text-body text-stone-dark">
            Más de 15 años de experiencia traducidos en servicios que generan valor
            real para tu negocio y el medio ambiente.
          </p>
        </motion.div>

        {/* Services grid - asimétrico */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "group relative",
                service.highlight && "md:row-span-2"
              )}
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div
                className={cn(
                  "relative h-full p-8 rounded-2xl transition-all duration-500",
                  "bg-white border border-stone-light",
                  "hover:border-verde-mist hover:shadow-2xl hover:shadow-verde-forest/5",
                  service.highlight && "bg-verde-forest text-white border-verde-forest"
                )}
              >
                {/* Icon */}
                <div
                  className={cn(
                    "w-14 h-14 rounded-xl flex items-center justify-center mb-6",
                    "transition-all duration-300",
                    service.highlight
                      ? "bg-white/10 text-white"
                      : "bg-verde-whisper text-verde-forest group-hover:bg-verde-mist"
                  )}
                >
                  {service.icon}
                </div>

                {/* Content */}
                <h3
                  className={cn(
                    "text-card font-serif mb-2",
                    service.highlight ? "text-white" : "text-charcoal"
                  )}
                >
                  {service.title}
                </h3>

                <p
                  className={cn(
                    "text-caption uppercase tracking-wider mb-4",
                    service.highlight ? "text-verde-mist" : "text-terracotta"
                  )}
                >
                  {service.subtitle}
                </p>

                <p
                  className={cn(
                    "text-body leading-relaxed mb-6",
                    service.highlight ? "text-verde-mist" : "text-stone-dark"
                  )}
                >
                  {service.description}
                </p>

                {/* Features - Progressive disclosure */}
                <AnimatePresence>
                  {(hoveredId === service.id || expandedId === service.id) && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-2 mb-6 overflow-hidden"
                    >
                      {service.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className={cn(
                            "flex items-center gap-2 text-sm",
                            service.highlight ? "text-verde-mist" : "text-stone"
                          )}
                        >
                          <svg
                            className={cn(
                              "w-4 h-4 flex-shrink-0",
                              service.highlight ? "text-terracotta-soft" : "text-verde-sage"
                            )}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>

                {/* CTA */}
                <button
                  className={cn(
                    "inline-flex items-center gap-2 text-sm font-medium",
                    "transition-all duration-300",
                    service.highlight
                      ? "text-terracotta-soft hover:text-white"
                      : "text-verde-forest hover:text-verde-deep"
                  )}
                  onClick={() => setExpandedId(expandedId === service.id ? null : service.id)}
                  aria-expanded={expandedId === service.id}
                >
                  <span>{expandedId === service.id ? 'Menos detalles' : 'Ver detalles'}</span>
                  <svg
                    className={cn(
                      "w-4 h-4 transition-transform duration-300",
                      expandedId === service.id && "rotate-180"
                    )}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Hover indicator line */}
                <motion.div
                  className={cn(
                    "absolute bottom-0 left-0 h-1 rounded-full",
                    service.highlight ? "bg-terracotta" : "bg-verde-sage"
                  )}
                  initial={{ width: 0 }}
                  animate={{ width: hoveredId === service.id ? "100%" : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SearchIcon() {
  return (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}
```

### 4.3 EXPERIENCE - "Timeline Editorial"

**Propuesta: Timeline con diseño editorial tipo revista de arquitectura**

```astro
---
// src/components/website/ExperienceV2.astro
const experiences = [
  {
    period: '2019 - Presente',
    role: 'Consultora Independiente',
    company: 'Jessica Méndez Consulting',
    description: 'Asesoría especializada en due diligence ambiental y cumplimiento de estándares IFC para proyectos de infraestructura y energía.',
    highlights: ['40+ proyectos', '12 países', '$2B+ financiados'],
    featured: true,
  },
  // ... más experiencias
];

const regions = [
  { flag: '🇲🇽', name: 'México', code: 'MX' },
  { flag: '🌎', name: 'Latinoamérica', code: 'LATAM' },
  { flag: '🇩🇴', name: 'República Dominicana', code: 'DO' },
];
---

<section id="experiencia" class="py-section-y bg-cream relative overflow-hidden">
  <!-- Decorative element -->
  <div
    class="absolute top-0 right-0 w-1/3 h-full bg-verde-whisper -skew-x-12 origin-top-right"
    aria-hidden="true"
  />

  <div class="container mx-auto px-section-x relative z-10">

    {/* Header */}
    <div class="grid lg:grid-cols-2 gap-12 mb-16">
      <div>
        <span class="text-caption text-terracotta uppercase tracking-wider mb-4 block">
          Trayectoria
        </span>
        <h2 class="text-section font-serif text-charcoal">
          Más de una década <br/>
          <span class="text-verde-forest">transformando proyectos</span>
        </h2>
      </div>

      {/* Regions - Accessible */}
      <div class="flex items-end justify-start lg:justify-end gap-6">
        {regions.map((region) => (
          <div class="text-center">
            <span class="text-4xl block mb-2" role="img" aria-label={region.name}>
              {region.flag}
            </span>
            <span class="text-caption text-stone uppercase tracking-wider">
              {region.code}
            </span>
          </div>
        ))}
      </div>
    </div>

    {/* Timeline */}
    <div class="relative">
      {/* Vertical line */}
      <div
        class="absolute left-0 lg:left-1/2 top-0 bottom-0 w-px bg-verde-mist lg:-translate-x-1/2"
        aria-hidden="true"
      />

      {experiences.map((exp, index) => (
        <article
          class={`relative grid lg:grid-cols-2 gap-8 mb-16 last:mb-0
                  ${index % 2 === 0 ? '' : 'lg:direction-rtl'}`}
        >
          {/* Timeline dot */}
          <div
            class="absolute left-0 lg:left-1/2 top-0 w-4 h-4 rounded-full
                   bg-terracotta border-4 border-cream lg:-translate-x-1/2 z-10"
            aria-hidden="true"
          />

          {/* Content card */}
          <div
            class={`ml-8 lg:ml-0 ${index % 2 === 0 ? 'lg:pr-16' : 'lg:pl-16 lg:col-start-2'}`}
          >
            <div
              class={`p-8 rounded-2xl transition-all duration-300 hover:shadow-xl
                      ${exp.featured
                        ? 'bg-verde-forest text-white shadow-lg shadow-verde-forest/20'
                        : 'bg-white border border-stone-light hover:border-verde-mist'}`}
            >
              {/* Period badge */}
              <span
                class={`inline-block px-3 py-1 rounded-full text-caption mb-4
                        ${exp.featured
                          ? 'bg-white/10 text-verde-mist'
                          : 'bg-verde-whisper text-verde-forest'}`}
              >
                {exp.period}
              </span>

              <h3
                class={`text-card font-serif mb-1 ${exp.featured ? 'text-white' : 'text-charcoal'}`}
              >
                {exp.role}
              </h3>

              <p
                class={`text-sm font-medium mb-4 ${exp.featured ? 'text-terracotta-soft' : 'text-terracotta'}`}
              >
                {exp.company}
              </p>

              <p
                class={`text-body leading-relaxed mb-6
                        ${exp.featured ? 'text-verde-mist' : 'text-stone-dark'}`}
              >
                {exp.description}
              </p>

              {/* Highlights */}
              {exp.highlights && (
                <div class="flex flex-wrap gap-3">
                  {exp.highlights.map((highlight) => (
                    <span
                      class={`px-3 py-1 rounded-full text-caption
                              ${exp.featured
                                ? 'bg-white/10 text-white'
                                : 'bg-stone-light text-stone-dark'}`}
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Empty space for alternating layout */}
          <div class="hidden lg:block" aria-hidden="true" />
        </article>
      ))}
    </div>
  </div>
</section>
```

### 4.4 CONTACT - "Formulario Inteligente"

**Propuesta: Formulario con feedback en tiempo real y micro-interacciones**

```tsx
// src/components/website/ContactV2.tsx
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const contactMethods = [
  {
    type: 'email',
    value: 'jessica@jessicamendez.bio',
    icon: MailIcon,
    label: 'Correo electrónico',
    action: 'mailto:jessica@jessicamendez.bio'
  },
  {
    type: 'phone',
    value: '+52 55 1234 5678',
    icon: PhoneIcon,
    label: 'Teléfono',
    action: 'tel:+525512345678'
  },
  {
    type: 'linkedin',
    value: 'LinkedIn',
    icon: LinkedInIcon,
    label: 'LinkedIn',
    action: 'https://linkedin.com/in/jessicamendez'
  },
];

export function ContactV2() {
  const [formState, setFormState] = useState<'idle' | 'focused' | 'submitting' | 'success' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');

    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 1500));
    setFormState('success');

    // Reset después de 3 segundos
    setTimeout(() => {
      setFormState('idle');
      formRef.current?.reset();
    }, 3000);
  };

  return (
    <section id="contacto" className="py-section-y bg-verde-deep relative overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{ backgroundImage: "url('/textures/topography.svg')" }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-section-x relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left: Content */}
          <div className="text-white">
            <motion.span
              className="text-caption text-terracotta-soft uppercase tracking-wider mb-4 block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Conectemos
            </motion.span>

            <motion.h2
              className="text-section font-serif mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              ¿Listo para dar el siguiente paso en{' '}
              <span className="text-terracotta-soft">sostenibilidad</span>?
            </motion.h2>

            <motion.p
              className="text-lg text-verde-mist mb-10 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Agenda una consulta gratuita de 30 minutos para discutir
              cómo puedo apoyar tu proyecto.
            </motion.p>

            {/* Contact methods */}
            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.type}
                  href={method.action}
                  className="group flex items-center gap-4 p-4 rounded-xl
                           bg-white/5 hover:bg-white/10
                           border border-white/10 hover:border-white/20
                           transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  target={method.type === 'linkedin' ? '_blank' : undefined}
                  rel={method.type === 'linkedin' ? 'noopener noreferrer' : undefined}
                >
                  <div className="w-12 h-12 rounded-lg bg-terracotta/20
                                flex items-center justify-center text-terracotta-soft
                                group-hover:bg-terracotta/30 transition-colors">
                    <method.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-caption text-verde-mist uppercase tracking-wider">
                      {method.label}
                    </p>
                    <p className="text-white font-medium group-hover:text-terracotta-soft transition-colors">
                      {method.value}
                    </p>
                  </div>
                  <svg
                    className="w-5 h-5 ml-auto text-white/40 group-hover:text-white
                             group-hover:translate-x-1 transition-all"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-2xl shadow-black/20">
              <AnimatePresence mode="wait">
                {formState === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-verde-whisper
                                  flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-verde-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-serif text-charcoal mb-2">
                      ¡Mensaje enviado!
                    </h3>
                    <p className="text-stone">
                      Te responderé en las próximas 24 horas.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    ref={formRef}
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-serif text-charcoal mb-6">
                      Envíame un mensaje
                    </h3>

                    {/* Name field */}
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        required
                        className={cn(
                          "peer w-full px-4 py-4 rounded-lg border-2 transition-all duration-200",
                          "text-charcoal placeholder-transparent",
                          "focus:outline-none focus:ring-0",
                          focusedField === 'name'
                            ? "border-verde-forest"
                            : "border-stone-light hover:border-stone"
                        )}
                        placeholder="Nombre"
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                      />
                      <label
                        className={cn(
                          "absolute left-4 transition-all duration-200 pointer-events-none",
                          "peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-stone",
                          "peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-verde-forest peer-focus:bg-white peer-focus:px-1",
                          "-top-2.5 text-xs bg-white px-1",
                          focusedField === 'name' ? "text-verde-forest" : "text-stone"
                        )}
                      >
                        Nombre completo *
                      </label>
                    </div>

                    {/* Email field */}
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        required
                        className={cn(
                          "peer w-full px-4 py-4 rounded-lg border-2 transition-all duration-200",
                          "text-charcoal placeholder-transparent",
                          "focus:outline-none focus:ring-0",
                          focusedField === 'email'
                            ? "border-verde-forest"
                            : "border-stone-light hover:border-stone"
                        )}
                        placeholder="Email"
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                      />
                      <label
                        className={cn(
                          "absolute left-4 transition-all duration-200 pointer-events-none",
                          "peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-stone",
                          "peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-verde-forest peer-focus:bg-white peer-focus:px-1",
                          "-top-2.5 text-xs bg-white px-1",
                          focusedField === 'email' ? "text-verde-forest" : "text-stone"
                        )}
                      >
                        Correo electrónico *
                      </label>
                    </div>

                    {/* Message field */}
                    <div className="relative">
                      <textarea
                        name="message"
                        rows={4}
                        required
                        className={cn(
                          "peer w-full px-4 py-4 rounded-lg border-2 transition-all duration-200 resize-none",
                          "text-charcoal placeholder-transparent",
                          "focus:outline-none focus:ring-0",
                          focusedField === 'message'
                            ? "border-verde-forest"
                            : "border-stone-light hover:border-stone"
                        )}
                        placeholder="Mensaje"
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                      />
                      <label
                        className={cn(
                          "absolute left-4 transition-all duration-200 pointer-events-none bg-white px-1",
                          "peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-stone",
                          "peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-verde-forest",
                          "-top-2.5 text-xs",
                          focusedField === 'message' ? "text-verde-forest" : "text-stone"
                        )}
                      >
                        Cuéntame sobre tu proyecto *
                      </label>
                    </div>

                    {/* Submit button */}
                    <Button
                      type="submit"
                      disabled={formState === 'submitting'}
                      className={cn(
                        "w-full py-6 text-base font-medium",
                        "bg-verde-forest hover:bg-verde-deep text-white",
                        "transition-all duration-300",
                        formState === 'submitting' && "opacity-80 cursor-wait"
                      )}
                    >
                      {formState === 'submitting' ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Enviando...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          Enviar mensaje
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </span>
                      )}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Response time indicator */}
            <div className="flex items-center justify-center gap-2 mt-6 text-verde-mist">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">Respuesta típica en menos de 24 horas</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Icon components
function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}
```

---

## 5. Mejoras de Accesibilidad

### 5.1 Focus States Visibles

```css
/* Agregar a global.css */

/* Focus visible - keyboard only */
*:focus-visible {
  outline: 2px solid var(--terracotta);
  outline-offset: 2px;
  border-radius: 4px;
}

/* Remove default focus for mouse users */
*:focus:not(:focus-visible) {
  outline: none;
}

/* Skip link */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--verde-forest);
  color: white;
  padding: 8px 16px;
  z-index: 100;
  transition: top 0.3s;
}

.skip-link:focus {
  top: 0;
}
```

### 5.2 Flags Accesibles

```astro
<!-- ANTES (inaccesible) -->
<span>🇲🇽</span>

<!-- DESPUÉS (accesible) -->
<span role="img" aria-label="México">🇲🇽</span>

<!-- O mejor aún, con SVG: -->
<span class="sr-only">México</span>
<svg aria-hidden="true" class="w-8 h-6">
  <use href="/flags/mx.svg#flag" />
</svg>
```

### 5.3 Screen Reader Only Class

```css
/* Utility para contenido solo para screen readers */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

### 5.4 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  /* Mantener indicadores de estado sin animación */
  .animate-pulse {
    animation: none;
    opacity: 1;
  }
}
```

---

## 6. Optimizaciones de Performance

### 6.1 Critical CSS Inline

```astro
---
// Layout.astro - inline critical CSS
---
<head>
  <style is:inline>
    /* Critical above-the-fold styles */
    :root {
      --verde-forest: #496349;
      --cream: #fefdfb;
      --charcoal: #2d2d2d;
    }
    body {
      background: var(--cream);
      color: var(--charcoal);
      font-family: system-ui, sans-serif;
    }
    .hero-skeleton {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
  </style>
</head>
```

### 6.2 Font Loading Strategy

```astro
<head>
  <!-- Preload critical fonts -->
  <link
    rel="preload"
    href="/fonts/cormorant-variable.woff2"
    as="font"
    type="font/woff2"
    crossorigin
  />

  <!-- Font display swap -->
  <style is:inline>
    @font-face {
      font-family: 'Cormorant';
      src: url('/fonts/cormorant-variable.woff2') format('woff2');
      font-weight: 400 700;
      font-style: normal;
      font-display: swap;
    }
  </style>
</head>
```

### 6.3 Image Optimization

```astro
---
import { Image } from 'astro:assets';
import heroImage from '../assets/jessica-hero.webp';
---

<Image
  src={heroImage}
  alt="Jessica Méndez - Consultora Ambiental"
  widths={[400, 800, 1200]}
  sizes="(max-width: 768px) 100vw, 50vw"
  loading="eager"
  fetchpriority="high"
  class="w-full aspect-[4/5] object-cover"
/>
```

---

## 7. Aprovechando Astro 5 al Máximo

### 7.1 View Transitions Avanzadas

Las View Transitions de Astro 5 permiten transiciones tipo SPA sin JavaScript adicional.

```astro
---
// src/layouts/Layout.astro
import { ViewTransitions } from 'astro:transitions';
import { fade, slide } from 'astro:transitions';
---

<html lang="es">
  <head>
    <ViewTransitions fallback="animate" />
  </head>
  <body>
    <!-- Header persiste entre páginas -->
    <header transition:persist="header">
      <nav transition:name="main-nav">
        <!-- navegación -->
      </nav>
    </header>

    <main transition:animate={fade({ duration: '0.3s' })}>
      <slot />
    </main>
  </body>
</html>
```

**Transiciones personalizadas por elemento:**

```astro
---
// src/components/blog/BlogCard.astro
const { post, index } = Astro.props;
---

<article
  transition:name={`blog-card-${post.slug}`}
  transition:animate="slide"
  style={`--stagger-delay: ${index * 50}ms`}
>
  <img
    src={post.image}
    alt={post.title}
    transition:name={`blog-image-${post.slug}`}
    class="hero-image"
  />
  <h3 transition:name={`blog-title-${post.slug}`}>
    {post.title}
  </h3>
</article>

<style>
  article {
    view-transition-name: var(--blog-card-name);
  }

  /* Animación staggered */
  @keyframes slide-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
  }

  ::view-transition-new(blog-card-*):only-child {
    animation: slide-up 0.4s ease-out;
    animation-delay: var(--stagger-delay);
  }
</style>
```

**Mantener scroll position en navegación:**

```astro
<!-- Para secciones con scroll horizontal -->
<div transition:persist="services-carousel" class="overflow-x-auto">
  <!-- carousel content -->
</div>
```

### 7.2 Astro Actions para Formularios Type-Safe

Reemplazar el formulario de contacto con Astro Actions elimina boilerplate y añade validación automática.

```typescript
// src/actions/index.ts
import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

export const server = {
  // Acción de contacto con validación Zod
  sendContact: defineAction({
    accept: 'form',
    input: z.object({
      name: z.string().min(2, 'Nombre muy corto'),
      email: z.string().email('Email inválido'),
      message: z.string().min(10, 'Mensaje muy corto'),
      service: z.enum([
        'due-diligence',
        'evaluacion-impacto',
        'cumplimiento-ifc',
        'esg-sostenibilidad',
        'otro'
      ]).optional(),
    }),
    handler: async (input, context) => {
      // Enviar con Resend
      const { Resend } = await import('resend');
      const resend = new Resend(import.meta.env.RESEND_API_KEY);

      await resend.emails.send({
        from: 'contacto@jessicamendez.bio',
        to: 'jessica@jessicamendez.bio',
        replyTo: input.email,
        subject: `Nuevo contacto: ${input.name}`,
        html: `
          <h2>Nuevo mensaje de contacto</h2>
          <p><strong>Nombre:</strong> ${input.name}</p>
          <p><strong>Email:</strong> ${input.email}</p>
          <p><strong>Servicio:</strong> ${input.service || 'No especificado'}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${input.message}</p>
        `,
      });

      // Guardar en NocoDB para seguimiento
      // await saveToNocoDB(input);

      return { success: true, message: 'Mensaje enviado correctamente' };
    },
  }),

  // Newsletter subscription
  subscribeNewsletter: defineAction({
    accept: 'form',
    input: z.object({
      email: z.string().email(),
    }),
    handler: async ({ email }) => {
      // Lógica de suscripción
      return { success: true };
    },
  }),
};
```

**Uso en componente Astro (sin JS del cliente):**

```astro
---
// src/components/website/ContactForm.astro
import { actions } from 'astro:actions';
---

<form method="POST" action={actions.sendContact}>
  <div class="form-group">
    <label for="name">Nombre completo</label>
    <input
      type="text"
      id="name"
      name="name"
      required
      minlength="2"
    />
  </div>

  <div class="form-group">
    <label for="email">Correo electrónico</label>
    <input
      type="email"
      id="email"
      name="email"
      required
    />
  </div>

  <div class="form-group">
    <label for="service">Servicio de interés</label>
    <select id="service" name="service">
      <option value="">Selecciona un servicio</option>
      <option value="due-diligence">Due Diligence Ambiental</option>
      <option value="evaluacion-impacto">Evaluación de Impacto</option>
      <option value="cumplimiento-ifc">Cumplimiento IFC</option>
      <option value="esg-sostenibilidad">ESG y Sostenibilidad</option>
      <option value="otro">Otro</option>
    </select>
  </div>

  <div class="form-group">
    <label for="message">Mensaje</label>
    <textarea
      id="message"
      name="message"
      required
      minlength="10"
      rows="5"
    ></textarea>
  </div>

  <button type="submit" class="btn-primary">
    Enviar mensaje
  </button>
</form>

{/* Mostrar errores de validación */}
{Astro.getActionResult(actions.sendContact)?.error && (
  <div class="error-message" role="alert">
    {Astro.getActionResult(actions.sendContact).error.message}
  </div>
)}

{Astro.getActionResult(actions.sendContact)?.data?.success && (
  <div class="success-message" role="status">
    ¡Mensaje enviado! Te responderé pronto.
  </div>
)}
```

**Uso con React para UX mejorada:**

```tsx
// src/components/website/ContactFormReact.tsx
import { actions } from 'astro:actions';
import { useState, useTransition } from 'react';

export function ContactFormReact() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ success?: boolean; error?: string } | null>(null);

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const response = await actions.sendContact(formData);

      if (response.error) {
        setResult({ error: response.error.message });
      } else {
        setResult({ success: true });
      }
    });
  };

  return (
    <form action={handleSubmit}>
      {/* campos del formulario */}

      <button
        type="submit"
        disabled={isPending}
        className="btn-primary"
      >
        {isPending ? (
          <span className="flex items-center gap-2">
            <LoadingSpinner />
            Enviando...
          </span>
        ) : (
          'Enviar mensaje'
        )}
      </button>

      {result?.success && (
        <SuccessMessage />
      )}

      {result?.error && (
        <ErrorMessage message={result.error} />
      )}
    </form>
  );
}
```

### 7.3 Image Optimization con astro:assets

Usar el componente Image nativo para optimización automática.

```astro
---
// src/components/website/HeroImage.astro
import { Image } from 'astro:assets';
import heroImage from '@/assets/images/jessica-hero.webp';
---

<!-- Hero image - crítica, carga inmediata -->
<Image
  src={heroImage}
  alt="Jessica Méndez - Consultora Ambiental Senior"
  width={800}
  height={1000}
  quality={85}
  format="webp"
  loading="eager"
  fetchpriority="high"
  class="hero-portrait"
  transition:name="hero-portrait"
/>
```

**Para imágenes del blog con srcset automático:**

```astro
---
// src/components/blog/BlogImage.astro
import { Image } from 'astro:assets';

interface Props {
  src: ImageMetadata;
  alt: string;
  caption?: string;
}

const { src, alt, caption } = Astro.props;
---

<figure class="blog-figure">
  <Image
    src={src}
    alt={alt}
    widths={[400, 800, 1200]}
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 800px"
    quality={80}
    format="webp"
    loading="lazy"
    decoding="async"
    class="rounded-lg"
  />
  {caption && (
    <figcaption class="text-sm text-stone mt-2 text-center">
      {caption}
    </figcaption>
  )}
</figure>
```

**Picture component para múltiples formatos:**

```astro
---
import { Picture } from 'astro:assets';
import projectImage from '@/assets/images/project.png';
---

<Picture
  src={projectImage}
  formats={['avif', 'webp', 'png']}
  alt="Proyecto de energía renovable"
  widths={[400, 800, 1200]}
  sizes="(max-width: 768px) 100vw, 50vw"
  loading="lazy"
/>
```

### 7.4 Client Directives Optimizados

**Regla:** Solo hidratar lo necesario, cuando sea necesario.

```astro
---
// src/pages/index.astro
import Header from '@/components/website/Header.astro';
import Hero from '@/components/website/Hero.astro';
import Services from '@/components/website/Services.tsx';
import Experience from '@/components/website/Experience.astro';
import Contact from '@/components/website/Contact.tsx';
import Footer from '@/components/website/Footer.tsx';
import NewsletterPopup from '@/components/website/NewsletterPopup.tsx';
---

<!-- Header: Astro puro, sin hidratación -->
<Header />

<!-- Hero: Astro puro con animaciones CSS -->
<Hero />

<!-- Services: React con hidratación cuando visible -->
<Services client:visible />

<!-- Experience: Astro puro, timeline CSS -->
<Experience />

<!-- Contact: React hidratado cuando visible (formulario interactivo) -->
<Contact client:visible />

<!-- Footer: React hidratado cuando idle (newsletter form) -->
<Footer client:idle />

<!-- Newsletter popup: Solo en desktop, con delay -->
<NewsletterPopup client:media="(min-width: 1024px)" />
```

**Componentes que NO necesitan hidratación:**

```astro
<!-- Header con toggle de tema: Usar JS inline mínimo -->
<button
  id="theme-toggle"
  aria-label="Cambiar tema"
  class="theme-toggle"
>
  <svg class="sun-icon">...</svg>
  <svg class="moon-icon">...</svg>
</button>

<script>
  // JS mínimo inline, no necesita React
  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem(
      'theme',
      document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    );
  });
</script>
```

### 7.5 Content Collections Mejoradas

Schema robusto con validación completa:

```typescript
// src/content/config.ts
import { defineCollection, z, reference } from 'astro:content';

// Schema base para SEO
const seoSchema = z.object({
  title: z.string().max(60).optional(),
  description: z.string().max(160).optional(),
  keywords: z.array(z.string()).optional(),
  canonical: z.string().url().optional(),
  noindex: z.boolean().default(false),
});

// Schema para imágenes
const imageSchema = z.object({
  src: z.string(),
  alt: z.string(),
  caption: z.string().optional(),
});

// Blog collection
const blogCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    // Metadata básica
    title: z.string().min(10).max(100),
    description: z.string().min(50).max(200),
    author: z.string().default('Jessica Méndez'),

    // Fechas
    publishedDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),

    // Categorización
    category: z.enum([
      'ESG',
      'Regulacion-Ambiental',
      'IFC',
      'Sostenibilidad',
      'Estudios-Ambientales',
    ]),
    tags: z.array(z.string()).max(5).optional(),

    // Media
    heroImage: image().optional(),
    heroImageAlt: z.string().optional(),
    ogImage: z.string().optional(),

    // SEO
    seo: seoSchema.optional(),

    // Estado
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),

    // Relacionados (referencias a otros posts)
    relatedPosts: z.array(reference('blog')).max(3).optional(),

    // Tiempo de lectura calculado
    readingTime: z.number().optional(),
  }),
});

// Proyectos / Case studies (futuro)
const projectsCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    client: z.string(),
    sector: z.enum([
      'Energia-Renovable',
      'Infraestructura',
      'Mineria',
      'Oil-Gas',
    ]),
    services: z.array(z.string()),
    year: z.number(),
    image: image(),
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  blog: blogCollection,
  projects: projectsCollection,
};
```

**Queries type-safe:**

```astro
---
// src/pages/blog/index.astro
import { getCollection } from 'astro:content';

// Obtener posts publicados, ordenados por fecha
const posts = await getCollection('blog', ({ data }) => {
  return import.meta.env.PROD ? !data.draft : true;
});

const sortedPosts = posts.sort(
  (a, b) => b.data.publishedDate.valueOf() - a.data.publishedDate.valueOf()
);

// Posts destacados
const featuredPosts = sortedPosts.filter(post => post.data.featured).slice(0, 3);

// Posts por categoría
const categories = [...new Set(posts.map(p => p.data.category))];
---
```

### 7.6 Prefetch Strategies Inteligentes

```javascript
// astro.config.mjs
export default defineConfig({
  prefetch: {
    prefetchAll: false, // No precargar todo automáticamente
    defaultStrategy: 'hover', // Precargar al hover
  },
});
```

**Estrategias por tipo de enlace:**

```astro
<!-- Navegación principal: hover (default) -->
<nav>
  <a href="/">Inicio</a>
  <a href="/servicios">Servicios</a>
  <a href="/blog">Blog</a>
</nav>

<!-- Links en viewport (footer, sidebar): viewport -->
<footer>
  <a href="/privacidad" data-astro-prefetch="viewport">Privacidad</a>
  <a href="/terminos" data-astro-prefetch="viewport">Términos</a>
</footer>

<!-- CTAs importantes: load (precargar inmediatamente) -->
<a href="/contacto" data-astro-prefetch="load" class="btn-primary">
  Agenda una consulta
</a>

<!-- Links en mobile: tap (precargar al tocar) -->
<a href="/blog/articulo" data-astro-prefetch="tap">
  Leer artículo
</a>

<!-- Desactivar prefetch para links externos o pesados -->
<a href="/descargar-pdf" data-astro-prefetch="false">
  Descargar PDF (5MB)
</a>
```

### 7.7 Middleware para Analytics y Auth

```typescript
// src/middleware.ts
import { defineMiddleware, sequence } from 'astro:middleware';

// Middleware de logging/analytics
const analyticsMiddleware = defineMiddleware(async (context, next) => {
  const start = Date.now();
  const response = await next();
  const duration = Date.now() - start;

  // Log para debugging en dev
  if (import.meta.env.DEV) {
    console.log(`[${context.request.method}] ${context.url.pathname} - ${duration}ms`);
  }

  return response;
});

// Middleware de geolocalización
const geoMiddleware = defineMiddleware(async (context, next) => {
  // Headers de Cloudflare/Vercel
  context.locals.geo = {
    country: context.request.headers.get('cf-ipcountry') ||
             context.request.headers.get('x-vercel-ip-country') ||
             'MX',
    city: context.request.headers.get('cf-ipcity') || 'Unknown',
  };

  return next();
});

// Middleware de autenticación (para futuro dashboard)
const authMiddleware = defineMiddleware(async (context, next) => {
  const protectedRoutes = ['/admin', '/dashboard'];
  const isProtected = protectedRoutes.some(route =>
    context.url.pathname.startsWith(route)
  );

  if (isProtected) {
    const session = context.cookies.get('session');

    if (!session) {
      return context.redirect('/login');
    }

    // Verificar sesión
    try {
      const user = await verifySession(session.value);
      context.locals.user = user;
    } catch {
      return context.redirect('/login');
    }
  }

  return next();
});

// Combinar middlewares
export const onRequest = sequence(
  analyticsMiddleware,
  geoMiddleware,
  authMiddleware
);

// Types para locals
declare global {
  namespace App {
    interface Locals {
      geo: {
        country: string;
        city: string;
      };
      user?: {
        id: string;
        email: string;
        name: string;
      };
    }
  }
}
```

### 7.8 Server Islands para Contenido Dinámico (Futuro)

Para cuando se agregue contenido personalizado:

```astro
---
// src/components/PersonalizedGreeting.astro
// Este componente se renderiza en el servidor bajo demanda
export const partial = true; // Marcar como Server Island

const { userId } = Astro.props;

// Fetch datos del usuario
const user = userId ? await getUser(userId) : null;
---

{user ? (
  <div class="greeting">
    <p>¡Hola, {user.name}!</p>
    {user.lastVisit && (
      <p class="text-sm text-stone">
        Última visita: {formatDate(user.lastVisit)}
      </p>
    )}
  </div>
) : (
  <div class="greeting">
    <p>¡Bienvenido!</p>
    <a href="/login">Inicia sesión</a>
  </div>
)}
```

**Uso con fallback:**

```astro
---
// src/pages/index.astro
import PersonalizedGreeting from '@/components/PersonalizedGreeting.astro';
---

<PersonalizedGreeting server:defer userId={Astro.locals.user?.id}>
  <div slot="fallback" class="greeting-skeleton">
    <div class="skeleton-text w-32 h-6"></div>
  </div>
</PersonalizedGreeting>
```

---

## 8. Priorización de Implementación

### Fase 1: Fundamentos (Semana 1)
- [ ] Migrar a variable fonts
- [ ] Actualizar tokens de diseño en global.css
- [ ] Implementar focus states accesibles
- [ ] Unificar Hero (eliminar versión React duplicada)

### Fase 2: Componentes Core (Semana 2)
- [ ] Rediseñar Hero con nueva propuesta
- [ ] Actualizar Services con descubrimiento progresivo
- [ ] Mejorar Experience timeline

### Fase 3: Interactividad (Semana 3)
- [ ] Implementar Contact form con feedback
- [ ] Agregar micro-interacciones a cards
- [ ] View Transitions entre páginas

### Fase 4: Polish (Semana 4)
- [ ] Optimizar imágenes y fonts
- [ ] Testing de accesibilidad (axe-core)
- [ ] Performance audit (Lighthouse 95+)
- [ ] Dark mode refinements

---

## 8. Métricas de Éxito

| Métrica | Actual | Objetivo |
|---------|--------|----------|
| Lighthouse Performance | ~85 | 95+ |
| Lighthouse Accessibility | ~80 | 100 |
| First Contentful Paint | ~1.5s | <1s |
| Largest Contentful Paint | ~2.5s | <2s |
| Cumulative Layout Shift | ~0.1 | <0.05 |
| Time to Interactive | ~3s | <2s |

---

## Conclusión

Esta propuesta transforma jessicamendez.bio de un sitio funcional a una experiencia **Organic Luxury** que:

1. **Posiciona** a Jessica como líder premium en consultoría ambiental
2. **Respeta** la identidad visual existente mientras la eleva
3. **Prioriza** performance y accesibilidad sin sacrificar estética
4. **Aprovecha** las fortalezas de Astro (View Transitions, Islands, SSG)
5. **Evita** patrones genéricos de "AI aesthetic"

El resultado será un sitio memorable, rápido, accesible y que comunica profesionalismo con calidez—exactamente lo que necesita una consultora ambiental de alto nivel.

---

*Documento generado: Enero 2025*
*Versión: 1.0*
