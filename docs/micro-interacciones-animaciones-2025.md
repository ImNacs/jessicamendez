# Catálogo de Micro-interacciones y Animaciones Web 2025

## Índice

1. [Principios Fundamentales](#principios-fundamentales)
2. [Especificaciones de Timing](#especificaciones-de-timing)
3. [Micro-interacciones por Componente](#micro-interacciones-por-componente)
4. [Herramientas y Técnicas](#herramientas-y-técnicas)
5. [Ejemplos de Referencia](#ejemplos-de-referencia)
6. [Anti-patterns y Errores](#anti-patterns-y-errores)
7. [Accesibilidad](#accesibilidad)

---

## Principios Fundamentales

### Mejores Prácticas 2025

**1. Mantén la simplicidad**
- Las micro-interacciones deben ser directas y servir un propósito específico
- Evita animaciones complejas o detalles innecesarios que puedan confundir a los usuarios

**2. Proporciona feedback claro**
- Los usuarios necesitan saber qué está sucediendo cuando interactúan
- Usa barras de progreso, spinners o checkmarks para feedback en tiempo real

**3. Optimiza el rendimiento**
- Las micro-interacciones deben ser ligeras para no afectar la velocidad del sitio
- Usa CSS y JavaScript ligero sobre animaciones pesadas
- **Solo anima `transform` y `opacity`** para aceleración GPU

**4. Mantén la consistencia**
- Las micro-interacciones deben seguir un lenguaje de diseño uniforme en toda la plataforma
- La consistencia ayuda a los usuarios a predecir interacciones

**5. Añade personalidad con moderación**
- Animaciones sutiles, elementos lúdicos o textos amigables hacen que las interacciones sean más atractivas
- Los toques personales ayudan a crear una conexión entre el usuario y el producto

**6. Prueba e itera**
- Las interacciones pequeñas pueden tener un gran impacto, pero solo si son fluidas
- Haz A/B testing de estados hover, efectos scroll y animaciones

### Componentes de una Micro-interacción Exitosa

Toda micro-interacción consta de cuatro componentes:

1. **Triggers** (Disparadores): Acciones iniciadas por el usuario o el sistema
2. **Rules** (Reglas): Directrices que determinan qué sucede una vez activada
3. **Feedback** (Retroalimentación): Respuestas visuales, auditivas o hápticas
4. **Loops and Modes**: Determina si la interacción se repite o tiene estados alternativos

### Impacto en Negocio

- Según Adobe, los sitios con elementos de motion sutiles vieron un **aumento promedio del 12% en CTR** comparado con sitios sin animaciones
- Gartner predice que para finales de 2025, **75% de aplicaciones orientadas al cliente** incorporarán micro-interacciones como práctica estándar de UI/UX

---

## Especificaciones de Timing

### Duraciones Recomendadas

#### Por Tipo de Dispositivo

| Dispositivo | Duración | Razón |
|-------------|----------|--------|
| **Desktop/Web** | 150-200ms | Los usuarios esperan transiciones casi instantáneas en navegadores |
| **Mobile** | 200-300ms | Duración base según Material Design Guidelines |
| **Tablet** | 400-450ms | 30% más largo que mobile (pantalla más grande) |
| **Wearables** | 150-200ms | 30% más corto que mobile (pantalla más pequeña) |

#### Por Tipo de Animación

| Tipo | Duración | Uso |
|------|----------|-----|
| **Instantánea** | < 100ms | Cambios de color y opacidad |
| **Micro-interacción** | 100-150ms | Hover, active states |
| **Rápida** | 150-200ms | Botones, inputs, elementos pequeños |
| **Normal** | 200-300ms | Transiciones estándar, cards |
| **Media** | 300-500ms | Modales, drawers, transiciones complejas |
| **Lenta** | 500-700ms | Animaciones periféricas (fuera del centro de visión) |
| **Muy lenta** | > 700ms | ⚠️ Evitar - se percibe como lentitud |

### Reglas de Oro

- **Óptimo para interfaces**: 200-500ms
- **Reacción visual humana**: ~215-230ms
- **Animaciones bajo 100ms**: No se reconocen
- **Animaciones sobre 1000ms**: Transmiten demora y aburren

### Easing Functions (Funciones de Aceleración)

#### Recomendaciones por Caso de Uso

```css
/* Para entradas (elementos que aparecen) */
ease-out: cubic-bezier(0, 0, 0.58, 1.0)
/* Inicio rápido, fin lento - sensación de respuesta rápida */

/* Para salidas (elementos que desaparecen) */
ease-in: cubic-bezier(0.42, 0, 1.0, 1.0)
/* Inicio lento, fin rápido */

/* Para transiciones bidireccionales */
ease-in-out: cubic-bezier(0.42, 0, 0.58, 1.0)
/* Suave en ambos extremos */

/* Custom curve recomendada por Stripe */
cubic-bezier(.2, .8, .2, 1)
/* Para micro-interacciones premium */

/* Para efectos naturales */
cubic-bezier(0.25, 0.1, 0.25, 1.0)
/* Material Design - movimiento más realista */
```

#### Principio de Material Design

> Usa curvas asimétricas para hacer el movimiento más natural y realístico. El final de la curva debe estar más enfatizado que el inicio, para que la duración de aceleración sea más corta que la de desaceleración.

### Timing por Ubicación Visual

| Ubicación | Duración | Razón |
|-----------|----------|--------|
| Centro de visión | 70-200ms | Visible directamente - necesita menos tiempo |
| Visión periférica | 300-700ms | Fuera del foco - beneficia de tiempo adicional |

---

## Micro-interacciones por Componente

### 1. Botones

#### Estados Esenciales

| Estado | Especificación Técnica | Timing |
|--------|------------------------|--------|
| **Hover** | `transform: scale(1.05)` + sombra suave | 150ms ease-out |
| **Active** | `transform: scale(0.95)` + sombra reducida | 100ms ease-in |
| **Focus** | Outline 3px + efecto glow | 150ms ease-out |
| **Loading** | Spinner + `opacity: 0.7` + `pointer-events: none` | 200ms ease-out |
| **Success** | Checkmark + color verde + micro-bounce | 300ms ease-out |
| **Error** | Shake animation + color rojo | 400ms ease-out |

#### Implementación CSS

```css
.button {
  transition: transform 150ms ease-out, box-shadow 150ms ease-out;
}

.button:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.button:active {
  transform: scale(0.95);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition-duration: 100ms;
}

.button:focus-visible {
  outline: 3px solid var(--focus-color);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(var(--focus-color-rgb), 0.1);
}

/* Loading state */
.button.loading {
  opacity: 0.7;
  pointer-events: none;
}

/* Error shake */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}

.button.error {
  animation: shake 400ms ease-out;
}
```

#### Patrón de Stripe - Botón con Fill

```css
.stripe-button {
  background: var(--primary);
  color: white;
  transition: background 300ms ease-out, color 300ms ease-out;
}

.stripe-button:hover {
  background: var(--primary-dark);
  /* Flip: fondo oscuro, texto claro */
}
```

**Timing**: 300-500ms para fill transitions según Stripe

### 2. Cards

#### Efectos Hover Recomendados

| Efecto | Implementación | Performance |
|--------|----------------|-------------|
| **Lift + Shadow** | `transform: translateY(-4px)` + shadow | ✅ GPU-accelerated |
| **Scale** | `transform: scale(1.02)` | ✅ GPU-accelerated |
| **Glow** | Pseudo-elemento con `opacity` animada | ✅ Óptimo |
| **Border** | `border-color` transition | ⚠️ Moderado |

#### Implementación Performante de Shadow

**❌ Anti-pattern (causa repaint):**
```css
.card {
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: box-shadow 300ms;
}

.card:hover {
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  /* Esto causa repaint en cada frame */
}
```

**✅ Mejor práctica (usa pseudo-elemento):**
```css
.card {
  position: relative;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 300ms ease-out;
}

/* Pre-renderiza la sombra más grande en un pseudo-elemento */
.card::after {
  content: '';
  position: absolute;
  inset: 0;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  opacity: 0;
  transition: opacity 300ms ease-out;
  z-index: -1;
}

.card:hover {
  transform: translateY(-4px);
}

.card:hover::after {
  opacity: 1;
}
```

**Timing**: 300ms ease-out para lift + shadow

### 3. Forms e Inputs

#### Estados de Input

| Estado | Especificación | Timing |
|--------|----------------|--------|
| **Focus** | Border color + shadow glow | 150ms ease-out |
| **Valid** | Green border + checkmark icon | 200ms ease-out |
| **Invalid** | Red border + shake + error message | 300ms ease-out |
| **Disabled** | `opacity: 0.5` + `cursor: not-allowed` | Instantáneo |
| **Filled** | Label flotante arriba | 200ms ease-out |

#### Implementación

```css
.input {
  border: 2px solid var(--border-color);
  transition: border-color 150ms ease-out, box-shadow 150ms ease-out;
}

.input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.1);
  outline: none;
}

.input.valid {
  border-color: var(--success);
}

.input.invalid {
  border-color: var(--error);
  animation: shake 300ms ease-out;
}

/* Label flotante */
.input-wrapper {
  position: relative;
}

.input-label {
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  transition: transform 200ms ease-out, font-size 200ms ease-out;
  pointer-events: none;
}

.input:focus ~ .input-label,
.input:not(:placeholder-shown) ~ .input-label {
  transform: translateY(-200%);
  font-size: 0.75rem;
}
```

#### Validación en Tiempo Real

**Timing de validación**:
- No validar mientras el usuario escribe (evita frustración)
- Validar `on blur` (cuando sale del campo)
- Mostrar errores con slide-in de 200ms
- Mostrar success con fade-in de 150ms

### 4. Navigation

#### Hamburger Menu

**Timing recomendado**: 200-300ms

```css
.hamburger {
  transition: transform 250ms cubic-bezier(.2, .8, .2, 1);
}

/* Transformación a X */
.hamburger.active .line-1 {
  transform: rotate(45deg) translateY(8px);
}

.hamburger.active .line-2 {
  opacity: 0;
}

.hamburger.active .line-3 {
  transform: rotate(-45deg) translateY(-8px);
}
```

#### Mobile Menu Slide-in

```css
.mobile-menu {
  transform: translateX(-100%);
  transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.mobile-menu.open {
  transform: translateX(0);
}
```

**Timing**: 300ms para drawer/slide transitions

#### Scroll Indicators

```css
.scroll-indicator {
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 200ms, transform 200ms;
}

.scroll-indicator.visible {
  opacity: 1;
  transform: translateY(0);
}
```

### 5. Modals y Dialogs

#### Entrance Animation

**Duración**: 150-220ms
**Exit**: 80-150ms (más rápido que entrada)

#### Implementación con @starting-style

```css
dialog {
  opacity: 0;
  transform: scale(0.9) translateY(-20px);
  transition:
    opacity 200ms ease-out,
    transform 200ms ease-out,
    display 200ms allow-discrete;
}

@starting-style {
  dialog[open] {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
}

dialog[open] {
  opacity: 1;
  transform: scale(1) translateY(0);
}

/* Exit animation */
dialog.closing {
  opacity: 0;
  transform: scale(0.9) translateY(-20px);
  transition-duration: 150ms;
}
```

#### Backdrop Fade

```css
dialog::backdrop {
  background: rgba(0, 0, 0, 0);
  transition: background 200ms ease-out;
}

dialog[open]::backdrop {
  background: rgba(0, 0, 0, 0.5);
}
```

#### Easing para Modales

```
cubic-bezier(.2, .8, .2, 1) /* Recomendado por estudios UX */
```

### 6. Loading States

#### Skeleton Screens

**Cuándo usar**:
- ✅ Carga entre 0.5s - 10s
- ✅ Avatares, cards, charts, listas, tablas
- ❌ Contenido que carga instantáneamente

**Animación de shimmer**:

```css
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
}
```

**Timing**: 2s para animación de shimmer completa

#### Spinners

**Cuándo usar**:
- Carga de 2-10s
- Procesos en background
- Loading states específicos de un componente

**⚠️ Nunca combines skeleton + spinner**

#### Progress Bars

**Cuándo usar**:
- Carga > 10s
- Dan sensación de duración
- Crítico para UX en procesos largos

### 7. Toast Notifications

#### Timing Specifications

| Fase | Duración | Justificación |
|------|----------|---------------|
| **Entrada** | 400ms | Tiempo necesario para cambiar el foco humano |
| **Display** | 3000-4000ms | Usuario puede procesar ~10 palabras |
| **Salida** | 1800ms | Tiempo amplio para observar la salida |
| **Hover-stay** | Indefinido | Si el usuario hace hover, permanece |

#### Duración por Longitud de Texto

```
< 10 palabras: 4000ms + 1000ms buffer
> 140 caracteres (20-35 palabras): No timeout automático
```

#### Colocación

- **Recomendado**: Esquina inferior derecha
- **Alternativa**: Superior derecha (si obstruye contenido importante)
- **Mobile con acción**: Inferior (acceso fácil con pulgar)

#### Implementación

```css
.toast {
  transform: translateY(100px);
  opacity: 0;
  transition: transform 400ms ease-out, opacity 400ms ease-out;
}

.toast.show {
  transform: translateY(0);
  opacity: 1;
}

.toast.hide {
  transform: translateY(100px);
  opacity: 0;
  transition-duration: 1800ms;
}

.toast:hover {
  /* Pausar auto-dismiss */
}
```

#### Prioridad en Stacking

1. **Error/Negative** (máxima prioridad)
2. **Success/Positive**
3. **Info/Default**

**⚠️ Importante**: Toast negativo no debe desaparecer automáticamente

---

## Herramientas y Técnicas

### 1. CSS Transitions vs Animations

#### CSS Transitions

**Cuándo usar**:
- Cambios de estado simple (hover, focus, active)
- Animaciones bidireccionales
- Performance crítica

**Ventajas**:
- Más performante
- Menos código
- GPU-accelerated automáticamente

```css
.element {
  transition: transform 300ms ease-out;
}
```

#### CSS Animations (@keyframes)

**Cuándo usar**:
- Animaciones complejas con múltiples pasos
- Animaciones que se repiten
- Control granular del timing

```css
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.element {
  animation: bounce 600ms ease-out;
}
```

### 2. Framer Motion (Rebranded: Motion)

**Cuándo usar**:
- Aplicaciones React/Next.js
- Animaciones complejas con gestos
- Layout animations
- Spring physics

#### Best Practices 2025

```tsx
import { motion, useReducedMotion } from 'framer-motion';

const Component = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.3,
        ease: [0.2, 0.8, 0.2, 1]
      }}
    >
      Content
    </motion.div>
  );
};
```

#### Performance Tips

- ✅ Usa `layout` prop para layout animations eficientes
- ✅ Lazy load con `useInView`
- ✅ Anima solo `transform` y `opacity`
- ✅ Define variants reutilizables
- ⚠️ Evita animar propiedades que disparen layout

#### Novedades v11 (2025)

- Mejoras en Layout Animations con React 19
- Mejor manejo de concurrent rendering
- Optimizaciones de performance para múltiples elementos animados

### 3. View Transitions API

**Estado en 2025**: Baseline Newly Available (Firefox 144 - Oct 2025)

#### Cuándo usar

- ✅ Transiciones entre estados del DOM (SPA)
- ✅ Navegación entre documentos (MPA)
- ✅ Crossfade y slide transitions
- ❌ Animaciones complejas tipo GSAP
- ❌ Spring physics

#### Implementación Básica

```javascript
// SPA - Same-document transitions
async function updateView() {
  const transition = document.startViewTransition(() => {
    // Actualiza el DOM aquí
    document.querySelector('.content').innerHTML = newContent;
  });

  await transition.finished;
}

// Con React experimental (canary)
import { useTransition } from 'react';

function Component() {
  const [isPending, startTransition] = useTransition({
    viewTransition: true
  });

  const handleClick = () => {
    startTransition(() => {
      // Actualización de estado
    });
  };
}
```

#### CSS para View Transitions

```css
/* Personalizar la transición */
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 300ms;
}

/* Scoped transitions (Chrome 140+) */
.card {
  view-transition-name: card-1;
}
```

#### Limitaciones

⚠️ **Importante**: View Transitions **congela el rendering**. No se puede interactuar con la página durante la animación. Evita animaciones largas para no perjudicar el Core Web Vital INP.

### 4. Técnica FLIP

**FLIP** = First, Last, Invert, Play

#### Cuándo usar

- Animaciones de layout (cambios de posición, tamaño)
- Transiciones entre estados con cambios de estructura DOM
- Cuando necesitas animar propiedades "caras" de forma performante

#### Cómo funciona

1. **First**: Captura posición/tamaño inicial
2. **Last**: Cambia el DOM, captura posición/tamaño final
3. **Invert**: Aplica transform inverso para "parecer" que está en First
4. **Play**: Anima transform a 0 (llegando a Last)

#### Implementación

```javascript
// 1. First - captura estado inicial
const first = element.getBoundingClientRect();

// 2. Last - aplica cambios y captura estado final
element.classList.add('final-state');
const last = element.getBoundingClientRect();

// 3. Invert - calcula y aplica transform inverso
const deltaX = first.left - last.left;
const deltaY = first.top - last.top;
const deltaW = first.width / last.width;
const deltaH = first.height / last.height;

element.style.transform = `
  translate(${deltaX}px, ${deltaY}px)
  scale(${deltaW}, ${deltaH})
`;

// 4. Play - anima a transform: none
requestAnimationFrame(() => {
  element.style.transition = 'transform 300ms ease-out';
  element.style.transform = 'none';
});
```

#### Performance: Batching

Si animas múltiples elementos, **agrupa lecturas y escrituras**:

```javascript
// ✅ BIEN - batch reads, batch writes
const firsts = elements.map(el => el.getBoundingClientRect());
elements.forEach(el => el.classList.add('final-state'));
const lasts = elements.map(el => el.getBoundingClientRect());

// ❌ MAL - causa reflow en cada iteración
elements.forEach(el => {
  const first = el.getBoundingClientRect();
  el.classList.add('final-state');
  const last = el.getBoundingClientRect();
});
```

#### Librerías que usan FLIP

- **Framer Motion**: Layout animations usan FLIP internamente
- **GSAP Flip Plugin**: Implementación avanzada con helpers

### 5. Stagger Animations

#### Timing Óptimo

**50-200ms** entre elementos

- < 50ms: Demasiado rápido, se pierde el efecto
- > 200ms: Muy lento, usuarios pierden interés

#### Implementación CSS

```css
.item {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 300ms ease-out, transform 300ms ease-out;
}

.item:nth-child(1) { transition-delay: 0ms; }
.item:nth-child(2) { transition-delay: 50ms; }
.item:nth-child(3) { transition-delay: 100ms; }
.item:nth-child(4) { transition-delay: 150ms; }

/* Con SCSS */
@for $i from 1 through 10 {
  .item:nth-child(#{$i}) {
    transition-delay: #{$i * 50}ms;
  }
}
```

#### Con Framer Motion

```tsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

<motion.ul variants={container} initial="hidden" animate="show">
  <motion.li variants={item} />
  <motion.li variants={item} />
  <motion.li variants={item} />
</motion.ul>
```

#### Con Motion.js (stagger utility)

```javascript
import { animate, stagger } from 'motion';

animate('.item',
  { opacity: 1, y: 0 },
  { delay: stagger(0.05) }
);

// Opciones avanzadas
animate('.item',
  { opacity: 1 },
  {
    delay: stagger(0.05, {
      from: 'center', // 'first', 'last', 'center', o número
      ease: 'easeOut'
    })
  }
);
```

#### Con GSAP

```javascript
gsap.to('.item', {
  opacity: 1,
  y: 0,
  duration: 0.3,
  stagger: 0.1, // 100ms entre cada elemento
  ease: 'power2.out'
});

// Stagger avanzado
gsap.to('.item', {
  opacity: 1,
  stagger: {
    amount: 1, // 1s total dividido entre todos
    from: 'center',
    ease: 'power1.inOut'
  }
});
```

### 6. Intersection Observer (Scroll Animations)

#### Cuándo usar

- Animaciones al hacer scroll
- Lazy loading de animaciones
- Performance crítica (mejor que scroll listeners)

#### Ventajas

- ✅ Asíncrono (no bloquea el main thread)
- ✅ Más performante que `scroll` event listeners
- ✅ API nativa del navegador

#### Implementación

```javascript
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target); // Deja de observar después de animar
      }
    });
  },
  {
    threshold: 0.3, // 30% visible para disparar
    rootMargin: '0px 0px -100px 0px' // Dispara 100px antes del viewport
  }
);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});
```

#### CSS

```css
.animate-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 600ms ease-out, transform 600ms ease-out;
}

.animate-on-scroll.animate-in {
  opacity: 1;
  transform: translateY(0);
}
```

#### Best Practices

1. **Unobserve después de animar** - evita trabajo innecesario
2. **Usa CSS para la lógica de animación** - JavaScript solo para trigger
3. **Batch observations** - observa múltiples elementos con el mismo observer
4. **Configura threshold apropiadamente** - 0.3 (30%) funciona bien
5. **Usa rootMargin** - dispara animaciones antes de que el elemento entre

---

## Ejemplos de Referencia

### 1. Stripe Checkout

**Filosofía**: Las animaciones deben ayudar al usuario a entender mejor qué está sucediendo, no solo entretener.

#### Micro-interacciones destacadas

**Botón de pago con transición de estados**:
- "Payment Info" → "Pay $25.00" con slide effect
- Timing: Coincide con transición de detalles de pago arriba
- Propósito: Resalta que la acción del botón cambia con cada paso

**Success state con checkmark**:
- Spinner breve → Checkmark animado
- "Te anima a sentir que completaste fácilmente la compra"
- Timing: ~500ms total

**Error handling con shake**:
- Animación de "shake" sutil para errores
- Alivia frustración con toque lúdico
- Timing: ~400ms

**Perceived speed**:
- Las animaciones hacen que el proceso se sienta más rápido
- Aunque el tiempo absoluto es el mismo, la percepción mejora

#### Técnica: Custom Curves

> "Casi nunca quieres usar timing-functions incorporadas como `ease-in`, `ease-out` o `linear`. Las curvas personalizadas hacen que las animaciones luzcan significativamente mejor."

**Curva recomendada por Stripe**: `cubic-bezier(.2, .8, .2, 1)`

### 2. Linear App

**Filosofía**: Animaciones que explican características y crean consistencia espacial.

#### Micro-interacciones destacadas

**Product Intelligence animation**:
- Explica cómo funciona la característica mediante animación
- Alternativa: Podrían usar imagen estática, pero animación ayuda a entender
- Ubicación: Viewport inicial de la página

**Scale down en botones**:
- Efecto sutil de `scale(0.95)` al presionar
- "Hace que la interfaz se sienta más viva y responsiva"

**Consistencia espacial**:
- Animaciones "vienen de y van en la misma dirección"
- Gestos como swipe-down-to-dismiss se sienten intuitivos

**Regla general**:
- Animaciones de UI deben permanecer **bajo 300ms**
- Mejoran la performance percibida de la app
- Se conectan con las acciones del usuario
- Hacen que la interfaz parezca "escuchar" al usuario

### 3. Apple Product Pages

**Filosofía**: Motion sutil y con propósito que realza la narrativa del producto.

#### Técnicas comunes

**Scroll-triggered animations**:
- Elementos se animan progresivamente al hacer scroll
- Revelan características del producto gradualmente

**Parallax effects**:
- Fondo y primer plano se mueven a velocidades diferentes
- Crea sensación de profundidad

**3D product rotations**:
- Productos rotan mientras el usuario hace scroll
- Muestra diferentes ángulos del producto

**Video scrubbing**:
- Videos avanzan/retroceden según scroll position
- Famosamente usado en AirPods Pro y iPhone
- Control total del usuario sobre la narrativa

**Sticky sections**:
- Imágenes de producto permanecen fijas
- Texto hace scroll sobre ellas

**Canvas animations**:
- Animaciones frame-by-frame con HTML5 canvas
- Para efectos complejos y fluidos

#### Principios de diseño

- Motion sutil que realza storytelling (no distrae)
- Optimización para 60fps suave
- Animaciones responsivas adaptadas a capacidades del dispositivo
- Resalta características del producto

### 4. Vercel Dashboard

**Filosofía**: Dashboard pulido y moderno con énfasis en subtileza.

#### Características destacadas

**Subtle micro-interactions**:
- Transiciones suaves al navegar entre secciones
- Hover states refinados
- Acciones con feedback visual

**Loading states elegantes**:
- Skeleton loaders
- Indicadores de progreso que informan al usuario

**Dark/Light mode**:
- Cambio de tema sin interrupciones
- Transiciones suaves de color

**Diseño minimalista**:
- Layouts limpios con whitespace intencional
- Animaciones con propósito

**Real-time updates**:
- Animaciones que reflejan cambios de estado de deployment
- Progreso de builds visible

---

## Anti-patterns y Errores

### Performance Issues

#### ❌ 1. Animar propiedades costosas

**Problema**: Animar `width`, `height`, `top`, `left`, `margin` dispara **layout + paint + composite**

```css
/* ❌ MAL - causa jank */
.element {
  transition: width 300ms, left 300ms;
}

.element:hover {
  width: 200px;
  left: 50px;
}
```

**Solución**: Usa solo `transform` y `opacity`

```css
/* ✅ BIEN - solo composite, GPU-accelerated */
.element {
  transition: transform 300ms, opacity 300ms;
}

.element:hover {
  transform: translateX(50px) scaleX(1.2);
  opacity: 0.8;
}
```

**Razón**: `transform` y `opacity` se animan en la GPU sin disparar layout o paint.

#### ❌ 2. Abuso de `will-change`

**Problema**: Usar `will-change` en todos los elementos consume memoria excesiva.

```css
/* ❌ MAL - too much memory */
* {
  will-change: transform;
}

.button {
  will-change: transform, opacity, color, background;
}
```

**Solución**: Usa `will-change` solo en elementos que realmente se animarán frecuentemente.

```css
/* ✅ BIEN - selectivo */
.carousel-item {
  will-change: transform;
}

/* Mejor aún - añadir con JS justo antes de animar */
element.style.willChange = 'transform';
// ... animate
element.style.willChange = 'auto'; // quitar después
```

#### ❌ 3. Animar cientos de elementos simultáneamente

**Problema**: Saturar el compositor con demasiadas animaciones.

**Solución**:
- Usa stagger con delays (50-100ms entre elementos)
- Virtualiza listas largas (react-window, react-virtuoso)
- Anima solo elementos visibles en viewport

### UX Problems

#### ❌ 4. Animaciones muy lentas

**Problema**: > 500ms se percibe como lentitud

```css
/* ❌ MAL - demasiado lento */
.modal {
  transition: opacity 1200ms;
}
```

**Solución**: Mantén la mayoría de animaciones entre 200-500ms

```css
/* ✅ BIEN */
.modal {
  transition: opacity 300ms;
}
```

#### ❌ 5. Ignorar `prefers-reduced-motion`

**Problema**: Usuarios con sensibilidad al movimiento experimentan náusea o malestar.

```css
/* ❌ MAL - no respeta preferencias */
.element {
  animation: bounce 600ms infinite;
}
```

**Solución**: Desactiva animaciones para usuarios que lo solicitan

```css
/* ✅ BIEN */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

#### ❌ 6. Animaciones que bloquean interacción

**Problema**: Usuario debe esperar a que termine la animación.

**⚠️ View Transitions API**: Congela rendering durante la animación.

**Solución**:
- Evita animaciones largas (< 300ms)
- Permite cancelar animaciones con interacción
- Usa CSS `pointer-events` apropiadamente

```css
.loading {
  pointer-events: none; /* Bloquea interacción durante loading */
}
```

### Design Anti-patterns

#### ❌ 7. Animaciones gratuitas (sin propósito)

**Problema**: Animar solo porque puedes, sin mejorar UX.

**Test**: Si desactivas la animación, ¿el flujo se siente roto? Si no, probablemente es superflua.

**Solución**: Toda animación debe:
- Comunicar cambio de estado
- Guiar atención del usuario
- Proporcionar feedback
- Mejorar comprensión del sistema

#### ❌ 8. Easing inconsistente

**Problema**: Usar diferentes easing functions aleatoriamente.

```css
/* ❌ MAL - inconsistencia */
.button { transition: transform 300ms linear; }
.card { transition: transform 300ms ease-in; }
.modal { transition: opacity 300ms cubic-bezier(.5,0,.5,1); }
```

**Solución**: Define easing functions en variables CSS/design system

```css
:root {
  --ease-out: cubic-bezier(0, 0, 0.58, 1);
  --ease-in: cubic-bezier(0.42, 0, 1, 1);
  --ease-in-out: cubic-bezier(0.42, 0, 0.58, 1);
  --ease-custom: cubic-bezier(.2, .8, .2, 1);
}

.element {
  transition: transform 300ms var(--ease-out);
}
```

#### ❌ 9. Animaciones sin manejar loading inicial

**Problema**: Flash of Unstyled Content (FOUC) antes de animaciones.

**Solución**:
- Usa `animation-play-state: paused` hasta que el elemento sea visible
- Intersection Observer para disparar animaciones cuando entran a viewport
- Skeleton screens durante carga inicial

#### ❌ 10. Overuse de motion

**Problema**: Demasiadas animaciones abruman y distraen.

**Principio**: **Less is more**. Una animación bien colocada > muchas animaciones mediocres.

**Guideline de Linear**:
> "Las animaciones deben mejorar la performance percibida, mantenerse conectadas a acciones del usuario, y hacer que la interfaz se sienta como si estuviera escuchando."

---

## Accesibilidad

### 1. `prefers-reduced-motion`

**Crítico**: Respetar esta preferencia es una **responsabilidad**.

#### Implementación Global

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
}
```

#### Implementación Específica

```css
.element {
  animation: slide-in 300ms ease-out;
}

@media (prefers-reduced-motion: reduce) {
  .element {
    animation: none;
    /* O reducir en lugar de eliminar */
    animation-duration: 50ms;
  }
}
```

#### JavaScript Detection

```javascript
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (prefersReducedMotion) {
  // Desactivar o reducir animaciones
  animationDuration = 0;
}

// Con Framer Motion
import { useReducedMotion } from 'framer-motion';

const shouldReduceMotion = useReducedMotion();
```

### 2. Focus States

**WCAG Requirement**: Focus visible es **requerimiento** para ser accesible.

#### Especificaciones

| Aspecto | Requerimiento |
|---------|---------------|
| **Contrast ratio** | Mínimo 3:1 (preferible 4.5:1) |
| **Visibility** | Debe ser altamente saliente |
| **Outline** | Doble outline preferido sobre punteado |
| **Animación** | Mismo timing que hover (150-200ms) |

#### Implementación

```css
.button:focus-visible {
  outline: 3px solid var(--focus-color);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(var(--focus-color-rgb), 0.1);
  transition: outline 150ms ease-out, box-shadow 150ms ease-out;
}

/* Sincronizar con hover */
.button:hover,
.button:focus-visible {
  transform: scale(1.05);
  /* Mismo efecto visual */
}
```

#### Regla de oro

> "Si puedes interactuar con un elemento con el mouse, debes poder usar el teclado para las mismas acciones. Y si usas teclado, todo lo que interactúes debe tener focus visible."

#### Testing

Testea navegación con:
- `Tab` / `Shift+Tab`
- `Arrow keys`
- `Enter` / `Space`
- `Escape`

Verifica:
- ✅ Focus visible en todos los elementos interactivos
- ✅ Orden lógico de foco
- ✅ Focus no queda atrapado en modales
- ✅ Al cerrar modal, focus regresa al trigger

### 3. Animaciones y Motion Sickness

**Problemas que causa motion excesivo**:
- Náusea
- Mareos
- Desorientación
- Posibles convulsiones (en casos extremos)

#### Grupos afectados

- Trastornos vestibulares
- Trastornos de convulsiones
- Discapacidades cognitivas
- Sensibilidad general al movimiento

#### Best Practices

1. **Evita motion innecesario** (WCAG 2.3.3)
2. **Respeta `prefers-reduced-motion`** por defecto
3. **Advertencias de motion**: Si el sitio usa motion excesivo, advierte al usuario
4. **Considera reducir en lugar de eliminar**: Algunos motion puede permanecer si es sutil

```css
/* Reducir en lugar de eliminar completamente */
@media (prefers-reduced-motion: reduce) {
  .element {
    /* En lugar de animation: none */
    animation-duration: 0.1s; /* Muy rápido pero existe */
    animation-iteration-count: 1; /* Solo una vez */
  }
}
```

### 4. Scroll-triggered Animations

#### Problema de accesibilidad

Animaciones de scroll pueden causar **Interaction to Next Paint (INP)** pobre.

#### Best Practices

- Usa Intersection Observer (asíncrono, no bloquea main thread)
- Evita scroll listeners costosos
- Anima solo al entrar a viewport (no continuamente)
- `unobserve()` después de animar

```javascript
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target); // ✅ Deja de observar
      }
    });
  },
  { threshold: 0.3 }
);
```

### 5. Toast Notifications

**Problemas de accesibilidad comunes**:

- ❌ Aparecen impredeciblemente
- ❌ Desaparecen demasiado rápido
- ❌ Falta accesibilidad de teclado
- ❌ No son anunciados por screen readers

#### Solución

```html
<div role="status" aria-live="polite" aria-atomic="true" class="toast">
  Tu mensaje fue enviado
</div>
```

```css
.toast {
  /* Asegura contraste suficiente */
  background: #333;
  color: #fff;
  /* 4.5:1 contrast ratio mínimo */
}

.toast.error {
  /* No auto-dismiss para errores */
  /* Usuario debe cerrar manualmente */
}
```

**Timing accesible**:
- Mínimo 4-5 segundos para leer
- Hover-stay (permanece si el usuario hace hover)
- Para errores: No timeout automático

### 6. Keyboard Navigation en Modales

#### Requerimientos

```javascript
// Al abrir modal
const previousFocus = document.activeElement;
dialog.showModal();
dialog.querySelector('.primary-action').focus(); // Focus en acción primaria

// Al cerrar modal
dialog.addEventListener('close', () => {
  previousFocus.focus(); // Regresa focus al trigger
});

// Trap focus dentro del modal
dialog.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    // Lógica para mantener focus dentro del modal
  }

  if (e.key === 'Escape') {
    dialog.close();
  }
});
```

### 7. Animaciones de Colores

**Problema**: Usuarios con daltonismo no perciben cambios de color.

**Solución**: No confíes **solo** en color para feedback.

```css
/* ❌ Solo color */
.input.invalid {
  border-color: red;
}

/* ✅ Color + icono + texto */
.input.invalid {
  border-color: red;
  background-image: url('error-icon.svg');
}
```

Acompaña con:
- Iconos (checkmark, X, warning)
- Texto explicativo
- Patrones o texturas

---

## Resumen de Especificaciones Técnicas

### Quick Reference: Timing por Tipo

| Tipo de Animación | Duración | Easing |
|-------------------|----------|--------|
| **Hover - Entrada** | 150ms | ease-out |
| **Hover - Salida** | 200ms | ease-in |
| **Active/Press** | 100ms | ease-in |
| **Focus** | 150ms | ease-out |
| **Card Lift** | 300ms | ease-out |
| **Modal Open** | 200-220ms | cubic-bezier(.2,.8,.2,1) |
| **Modal Close** | 150ms | ease-in |
| **Toast In** | 400ms | ease-out |
| **Toast Out** | 1800ms | ease-out |
| **Input Focus** | 150ms | ease-out |
| **Input Error** | 300ms | ease-out |
| **Drawer/Slide** | 300ms | cubic-bezier(0.4,0,0.2,1) |
| **Skeleton Shimmer** | 2000ms | linear |
| **Scroll Reveal** | 600ms | ease-out |
| **Stagger Delay** | 50-100ms | - |

### Quick Reference: Propiedades para Performance

| ✅ Animar (GPU) | ❌ Evitar (CPU) |
|-----------------|-----------------|
| `transform` | `width` |
| `opacity` | `height` |
| `filter` (con cautela) | `top` / `left` |
| | `margin` / `padding` |
| | `border-width` |

### Quick Reference: Browser Support 2025

| Feature | Support |
|---------|---------|
| CSS Transitions | ✅ Universal |
| CSS Animations | ✅ Universal |
| View Transitions API | ✅ Baseline (desde Oct 2025) |
| Intersection Observer | ✅ Universal |
| `prefers-reduced-motion` | ✅ Universal |
| `@starting-style` | ✅ Chrome 117+, Firefox 129+ |
| Framer Motion | ✅ React 18+ |
| FLIP technique | ✅ Manual o con libs |

---

## Referencias y Fuentes

### Micro-interacciones y Mejores Prácticas

- [Micro Interactions 2025: Best Practices to Elevate User Experience](https://www.stan.vision/journal/micro-interactions-2025-in-web-design)
- [Micro-Interactions: The Smallest Details Making the Biggest Impact in 2025](https://www.colorcolourcreative.com/creative-hub/2025/micro-interactions)
- [Best web micro-interaction examples and guidelines for 2025 - Justinmind](https://www.justinmind.com/web-design/micro-interactions)
- [The Role of Micro-interactions in Modern UX | IxDF](https://www.interaction-design.org/literature/article/micro-interactions-ux)
- [Motion UI Trends 2025: Micro-Interactions That Elevate UX Design](https://www.betasofttechnology.com/motion-ui-trends-and-micro-interactions/)

### Animation Timing y Duration

- [Web Animation Best Practices & Guidelines - GitHub Gist](https://gist.github.com/uxderrick/07b81ca63932865ef1a7dc94fbe07838)
- [Executing UX Animations: Duration and Motion Characteristics - NN/G](https://www.nngroup.com/articles/animation-duration/)
- [The ultimate guide to proper use of animation in UX | UX Collective](https://uxdesign.cc/the-ultimate-guide-to-proper-use-of-animation-in-ux-10bd98614fa9)

### CSS Button y Card Animations

- [CSS Hover Effects: 40 Engaging Animations To Try](https://prismic.io/blog/css-hover-effects)
- [An Interactive Guide to CSS Transitions • Josh W. Comeau](https://www.joshwcomeau.com/animation/css-transitions/)
- [41 Best CSS Button Hover Effects to Use in 2025 | LambdaTest](https://www.lambdatest.com/blog/best-css-button-hover-effects/)
- [How to animate box-shadow with silky smooth performance | Tobias Ahlin](https://tobiasahlin.com/blog/how-to-animate-box-shadow/)

### Framer Motion / Motion

- [The Ultimate Guide to Framer Motion: Mastering Animations in React | Medium](https://medium.com/@pareekpnt/mastering-framer-motion-a-deep-dive-into-modern-animation-for-react-0e71d86ffdf6)
- [Motion — JavaScript & React animation library](https://www.framer.com/motion/)
- [Animating React in 2025: Unlocking the Power of Motion | Medium](https://medium.com/outreach-prague/animating-react-in-2025-unlocking-the-power-of-motion-73ff9a490445)
- [Creating React animations in Motion - LogRocket Blog](https://blog.logrocket.com/creating-react-animations-with-motion/)

### View Transitions API

- [What's new in view transitions (2025 update) | Chrome for Developers](https://developer.chrome.com/blog/view-transitions-in-2025)
- [View Transition API - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API)
- [Smooth transitions with the View Transition API | Chrome for Developers](https://developer.chrome.com/docs/web-platform/view-transitions)
- [The View Transitions API And Delightful UI Animations - Smashing Magazine](https://www.smashingmagazine.com/2023/12/view-transitions-api-ui-animations-part1/)

### FLIP Technique

- [Aerotwist - FLIP Your Animations](https://aerotwist.com/blog/flip-your-animations/)
- [The FLIP technique for list animations • Josh W. Comeau](https://www.joshwcomeau.com/react/animating-the-unanimatable/)
- [Animating Layouts with the FLIP Technique | CSS-Tricks](https://css-tricks.com/animating-layouts-with-the-flip-technique/)
- [How to develop fast web animations by using FLIP and RAIL techniques](https://webanimation.blog/blog/how-to-develop-fast-web-animations-by-using-flip-and-rail-techniques/)

### Stripe y Casos de Estudio

- [Improve the payment experience with animations | by Michaël Villar | Medium](https://medium.com/bridge-collection/improve-the-payment-experience-with-animations-3d1b0a9b810e)
- [Stripe - The Animated Web](https://theanimatedweb.com/inspiration/stripe/)

### Navigation y Hamburger Menus

- [Cool CSS Hamburger Menus and Their Animations](https://www.sliderrevolution.com/resources/css-hamburger-menu/)
- [Animate a Mobile Hamburger Bar Menu Using CSS | Bits and Pieces](https://blog.bitsrc.io/animate-a-mobile-hamburger-bar-menu-using-css-and-just-a-hint-of-javascript-f31f928eb992)
- [How to Create an Animated Hamburger Menu in React](https://www.freecodecamp.org/news/how-to-create-an-animated-hamburger-menu-in-react/)
- [Animated hamburger menu icons for React](https://hamburger-react.netlify.app/)

### Intersection Observer

- [Animate on scroll with the Intersection Observer API | Medium](https://medium.com/@cgustin/animate-on-scroll-with-the-intersection-observer-api-ad368d91ebab)
- [How to Add Scroll Animations with JavaScript's Intersection Observer API](https://www.freecodecamp.org/news/scroll-animations-with-javascript-intersection-observer-api/)
- [Scroll Animations with Intersection Observer - WebDevStudios](https://webdevstudios.com/2019/11/21/scroll-animations-with-intersection-observer/)

### Performance y GPU Acceleration

- [Updates in hardware-accelerated animation capabilities | Chrome](https://developer.chrome.com/blog/hardware-accelerated-animations)
- [Boosting Web Performance With CSS GPU Acceleration | LambdaTest](https://www.lambdatest.com/blog/css-gpu-acceleration/)
- [CSS GPU Animation: Doing It Right — Smashing Magazine](https://www.smashingmagazine.com/2016/12/gpu-animation-doing-it-right/)
- [Animation performance guide | Motion](https://motion.dev/docs/performance)

### Focus States y Accesibilidad

- [Focus & Keyboard Operability | Yale Usability & Web Accessibility](https://usability.yale.edu/web-accessibility/articles/focus-keyboard-operability)
- [How To Design Useful and Usable Focus Indicators](https://www.deque.com/blog/give-site-focus-tips-designing-usable-focus-indicators/)
- [Clearly style focus states | Webflow Accessibility Checklist](https://webflow.com/accessibility/checklist/task/clearly-style-focus-states)

### Modal Animations

- [The Dialog Element with Entry and Exit Animations – Frontend Masters](https://frontendmasters.com/blog/the-dialog-element-with-entry-and-exit-animations/)
- [Building a dialog component | web.dev](https://web.dev/articles/building/a-dialog-component)
- [Animation in Modals: Best Techniques for a Smooth User Experience](https://hackmd.io/@hemantseobuddy/BkVRuqyZ1x)
- [Animating dialog and popover elements with CSS @starting-style - LogRocket](https://blog.logrocket.com/animating-dialog-popover-elements-css-starting-style/)

### Loading States y Skeletons

- [Skeleton Screens 101 - NN/G](https://www.nngroup.com/articles/skeleton-screens/)
- [Skeleton loading screen design — How to improve perceived performance - LogRocket](https://blog.logrocket.com/ux-design/skeleton-loading-screen-design/)
- [Skeleton Loader Example – How to Build with CSS | freeCodeCamp](https://www.freecodecamp.org/news/how-to-build-skeleton-screens-using-css-for-better-user-experience/)

### Stagger Animations

- [Staggers | GSAP | Docs & Learning](https://gsap.com/resources/getting-started/Staggers/)
- [stagger — Stagger the delay of multiple animations | Motion](https://motion.dev/docs/stagger)
- [What is Stagger Animation? Sequential Element Reveals](https://www.hashbuilds.com/patterns/what-is-stagger-animation)
- [Mastering UI Animation: The Art of Stagger Techniques](https://www.aninix.com/wiki/how-to-create-a-good-stagger-in-the-ui-animation)

### Toast Notifications

- [What is a toast notification? Best practices for UX - LogRocket](https://blog.logrocket.com/ux-design/toast-notifications/)
- [The UI of notification toasts - UX Files](https://benrajalu.net/articles/ui-of-notification-toasts)
- [Toast notifications — how to make it efficient | Medium](https://medium.com/design-bootcamp/toast-notifications-how-to-make-it-efficient-400cab6026e9)
- [Toast UI Design: Best practices | Mobbin](https://mobbin.com/glossary/toast)

---

## Conclusión

Las micro-interacciones y animaciones web efectivas en 2025 se caracterizan por:

✅ **Performance primero** - Solo animar `transform` y `opacity`
✅ **Timing preciso** - 200-500ms para la mayoría de interacciones
✅ **Propósito claro** - Cada animación debe comunicar o guiar
✅ **Accesibilidad** - Respetar `prefers-reduced-motion` es obligatorio
✅ **Consistencia** - Easing y timing uniforme en todo el sistema
✅ **Subtileza** - Less is more, motion que realza sin distraer

**Regla de oro**: Si desactivas una animación y el flujo no se siente roto, probablemente sea superflua.

---

**Documento creado**: 2026-01-09
**Última actualización**: 2026-01-09
