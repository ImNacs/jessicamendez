# Template: Entrada de Agente (Formato Compacto)

Usa este template para agregar o actualizar agentes en CLAUDE.md.

---

## Formato Compacto (3 líneas)

```markdown
#### `[agent-name]`
**Usa para**: [Descripción concisa de casos de uso]
**Ubicación**: `.claude/agents/[agent-name].md`
```

---

## Ejemplo Real

```markdown
#### `project-analyst`
**Usa para**: Estado del proyecto, changelog, implementaciones actuales, desviaciones código/docs
**Ubicación**: `.claude/agents/project-analyst.md`
```

---

## Campos

### `[agent-name]`
- Nombre exacto del agente (debe coincidir con archivo)
- Formato: kebab-case (palabras-separadas-por-guiones)

### `**Usa para**`
- Casos de uso principales del agente (2-4 items)
- Separados por comas
- Enfoque en RESULTADOS que entrega, no proceso
- Máximo 15 palabras total

### `**Ubicación**`
- Path relativo al archivo .md del agente
- Formato: `.claude/agents/[nombre].md`

---

## Comparación: Formato Anterior vs Compacto

### ❌ Formato Anterior (8 líneas)
```markdown
#### `project-analyst`
**Cuándo usar**: Necesitas estado actual del proyecto, agentes/workflows/tools implementados, changelog
**Usa para**:
- "¿Qué agentes/workflows/tools tenemos implementados?"
- "¿Cuál es el estado actual del proyecto?"
- "¿Hay desviaciones entre código y documentación?"
- "¿Qué breaking changes hay?"
**Capacidad**: Escanea el codebase REAL (no documentación) y genera reportes actualizados
**Ubicación**: `.claude/agents/project-analyst.md`
```

**Problemas**:
- Muy verboso (78 palabras)
- Ejemplos de preguntas innecesarios en CLAUDE.md
- Información redundante

### ✅ Formato Compacto (3 líneas)
```markdown
#### `project-analyst`
**Usa para**: Estado del proyecto, changelog, implementaciones actuales, desviaciones código/docs
**Ubicación**: `.claude/agents/project-analyst.md`
```

**Ventajas**:
- Conciso (13 palabras)
- Información esencial clara
- 62% menos líneas
- Fácil de escanear

---

## Checklist de Validación

Antes de agregar agente a CLAUDE.md, verificar:

- [ ] Nombre coincide exactamente con archivo `.claude/agents/[nombre].md`
- [ ] "Usa para" describe resultados, no proceso
- [ ] "Usa para" <= 15 palabras
- [ ] Ubicación es correcta y archivo existe
- [ ] Total de entrada <= 3 líneas
- [ ] No hay información redundante

---

## Proceso de Actualización

### Agregar Nuevo Agente

1. Crear agente en `.claude/agents/[nombre].md`
2. Copiar template de este archivo
3. Llenar campos con información del agente
4. Insertar en sección "Sub-Agentes" de CLAUDE.md
5. Ejecutar `claude-md-maintainer` para validar

### Actualizar Agente Existente

1. Leer archivo .md del agente para obtener descripción actualizada
2. Actualizar solo campos que cambiaron
3. Mantener formato compacto (3 líneas)
4. Validar con `claude-md-maintainer`

---

## Ejemplo Completo en Contexto

```markdown
### 🎯 Sub-Agentes (Delegación Explícita)

Usa estos agentes para análisis especializado:

#### `analyze-listing-qa-agent`
**Usa para**: Análisis de calidad de inventario extraído, detección de errores, scoring 0-100
**Ubicación**: `.claude/agents/analyze-listing-qa-agent.md`

#### `project-analyst`
**Usa para**: Estado del proyecto, changelog, implementaciones actuales, desviaciones código/docs
**Ubicación**: `.claude/agents/project-analyst.md`

#### `stack-expert`
**Usa para**: Planes de implementación, best practices, integración de componentes Mastra/CopilotKit/Next.js
**Ubicación**: `.claude/agents/stack-expert.md`

#### `theme-designer`
**Usa para**: Paletas OKLCH optimizadas, contraste WCAG AAA, sistemas de variables CSS
**Ubicación**: `.claude/agents/theme-designer.md`

#### `ui-architect`
**Usa para**: Análisis de componentes UI, prompts premium Lovable, integración CopilotKit
**Ubicación**: `.claude/agents/ui-architect.md`
```

---

## Tips para "Usa para"

### ✅ Buenos ejemplos
```markdown
**Usa para**: Estado del proyecto, changelog, breaking changes
**Usa para**: Paletas de colores, contraste WCAG, sistemas de diseño
**Usa para**: Análisis de calidad, detección de errores, scoring
```

### ❌ Malos ejemplos
```markdown
**Usa para**: Cuando necesitas saber el estado del proyecto (demasiado verboso)
**Usa para**: Hace análisis del codebase (describe proceso, no resultado)
**Usa para**: Es útil para consultar el estado (vago, no específico)
```

### Patrón Recomendado
```
[Resultado 1], [Resultado 2], [Resultado 3]
```

Donde cada resultado es:
- Sustantivo concreto (estado, changelog, análisis)
- Resultado que el usuario obtiene
- <= 5 palabras por resultado
- 2-4 resultados total
