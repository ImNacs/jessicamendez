# Mejores Prácticas para CLAUDE.md

> **Fuente**: Documentación oficial de Anthropic + Comunidad Claude Code
> **Última actualización**: 2025-11-05

---

## 📏 Tamaño y Estructura

### Límites Recomendados

| Métrica | Recomendado | Máximo Aceptable |
|---------|-------------|------------------|
| **Líneas totales** | 100-200 | 250 |
| **Secciones nivel 2 (##)** | 6-8 | 10 |
| **Líneas por sección** | <30 | <50 |
| **Líneas por skill/agente** | 2-3 | 5 |

### Estructura Multi-Archivo

Para proyectos grandes (>500 archivos), considerar:
```
/proyecto
├── CLAUDE.md (general)
├── /frontend
│   └── CLAUDE.md (específico frontend)
├── /backend
│   └── CLAUDE.md (específico backend)
└── /ai
    └── CLAUDE.md (específico AI)
```

**Proyecto Karmatic**: Por ahora solo CLAUDE.md raíz (proyecto aún no tan grande)

---

## 🎯 Filosofía Core

### Rol de CLAUDE.md

> "CLAUDE.md adds content as a user message FOLLOWING Claude Code's default system prompt"

**NO** reemplaza el prompt del sistema (eso es Output Styles)
**SÍ** complementa capacidades con contexto específico del proyecto

### Índice Inteligente vs Enciclopedia

CLAUDE.md debe ser **índice** que:
- ✅ **Referencias** a documentación detallada
- ✅ **Delega** a skills/agentes especializados
- ✅ **Guía** hacia recursos relevantes

CLAUDE.md NO debe ser **enciclopedia** con:
- ❌ Documentación completa inline
- ❌ Detalles técnicos extensos
- ❌ Ejemplos de código largos

---

## ✅ Qué DEBE Incluir

### 1. Comandos Bash Comunes
```markdown
## Comandos de Desarrollo

```bash
pnpm dev        # Desarrollo
pnpm build      # Construcción
pnpm test       # Tests
```

**Razón**: Información frecuentemente usada, fácil de recordar

### 2. Reglas Críticas del Proyecto
```markdown
## ⚠️ REGLAS CRÍTICAS

### BASE DE DATOS
- **NUNCA ejecutar `pnpm exec prisma db push`** - Causa pérdida de datos
- Las migraciones se ejecutan manualmente usando MCP de Supabase
```

**Razón**: Previene errores costosos, debe estar siempre visible

### 3. Referencias a Skills/Agentes

**Formato Compacto** (3 líneas):
```markdown
#### `supabase-query`
**Triggers**: database, supabase, sql, migration, schema
**Ubicación**: `.claude/skills/supabase-query/` | 21 MCP tools + Schema completo
```

**Razón**: Invocación automática requiere triggers claros, ubicación para referencia

### 4. Estructura de Directorios
```markdown
### Estructura del Proyecto
- Frontend: `/app`
- Backend AI: `/mastra`
- Services/Utils: `/lib`
```

**Razón**: Orientación básica del proyecto, pocas líneas

### 5. Idioma y Convenciones
```markdown
## Idioma y Comunicación
**IMPORTANTE**: Todas las respuestas en **ESPAÑOL**, incluyendo commits, docs, código
```

**Razón**: Regla de alto nivel que afecta todo el trabajo

---

## ❌ Qué NO Debe Incluir (Delegar)

### 1. Detalles Técnicos Extensos

**Ejemplo de problema**:
```markdown
### Sistema de Traces (43 líneas)
Los modos de fetcher son:
1. get-listing-trace.ts (381 LOC)
   - Usa Cheerio para parsing
   - Reduce HTML 75-85%
   - [20 líneas más de detalles...]
```

**Solución**:
```markdown
### Sistema de Traces
Extracción automatizada con 4 modos (static/dynamic para listings/vehicles).
**Detalles**: Ver `.claude/docs/architecture/traces-system.md`
```

### 2. Schemas y APIs

Delegar a:
- Skill específica (ej: `supabase-query` para schema DB)
- Archivo de documentación (ej: `.claude/docs/api/endpoints.md`)

### 3. Ejemplos de Código Extensos

Delegar a:
- `.claude/docs/examples/`
- README.md de componentes específicos

### 4. Información que Cambia Frecuentemente

**Ejemplo**: Lista exhaustiva de variables de entorno

**Problema**: Requiere actualizar CLAUDE.md en cada cambio

**Solución**: Usar link a `.env.example` o @import

---

## 🔗 Delegación: Links vs @imports

### Opción A: Links Markdown (RECOMENDADO)
```markdown
### Sistema de Traces
Detalles técnicos en `.claude/docs/architecture/traces-system.md`
```

**Ventaja**: Carga on-demand, no infla contexto inicial

### Opción B: @imports
```markdown
### Sistema de Traces
@.claude/docs/architecture/traces-system.md
```

**Desventaja**: Carga contenido en prompt, puede inflar contexto

**Decisión Proyecto Karmatic**: Usar Links (Opción A)

---

## 📝 Especificidad y Medición

### Principio: "Específico y Medible"

**❌ Vago**:
```markdown
- Formatear código correctamente
- Seguir mejores prácticas
```

**✅ Específico**:
```markdown
- Usar 2-space indentation
- Máximo 80 caracteres por línea
- Exportar funciones con JSDoc completo
```

### Aplicación

**Comandos**:
```markdown
✅ pnpm dev:all    # Desarrollo completo con Panel de Mastra
❌ pnpm dev:all    # Desarrollo
```

**Reglas**:
```markdown
✅ NUNCA ejecutar `pnpm exec prisma db push` - Causa pérdida de datos
❌ No usar comandos peligrosos de migración
```

---

## 🔄 Mantenimiento Continuo

### Cuándo Revisar CLAUDE.md

1. **Después de agregar skill/agente** → Actualizar sección de delegación
2. **Después de cambios arquitecturales** → Actualizar estructura del proyecto
3. **Cuando CLAUDE.md > 250 líneas** → Ejecutar optimización
4. **Mensualmente** → Health check preventivo

### Indicadores de Problema

- 🔴 **CLAUDE.md > 300 líneas** → Optimización urgente
- 🟡 **Secciones > 50 líneas** → Considerar delegar
- 🟡 **Skills sin documentar** → Agregar referencias
- 🔴 **Referencias rotas** → Corregir inmediatamente

---

## 🎯 Objetivos de Calidad

### Score Target: >= 85/100

**Cálculo**:
```
Score = (
  (100 - line_excess_penalty) +
  (100 - section_bloat_penalty) +
  (consistency_score) +
  (delegation_score)
) / 4

Donde:
- line_excess_penalty = max(0, (líneas - 200) / 2)
- section_bloat_penalty = max(0, (secciones - 8) * 10)
- consistency_score = (skills_ok + agents_ok + refs_ok) / 3 * 100
- delegation_score = (content_delegated / content_delegable) * 100
```

### Métricas Objetivo

| Métrica | Target | Excelente |
|---------|--------|-----------|
| **Líneas totales** | 150-200 | 100-150 |
| **Score de calidad** | >= 85 | >= 95 |
| **Secciones > 30 líneas** | 0 | 0 |
| **Skills sin documentar** | 0 | 0 |
| **Referencias rotas** | 0 | 0 |

---

## 📚 Referencias

- [Claude Code Memory Docs](https://docs.claude.com/en/docs/claude-code/memory.md)
- [Output Styles vs CLAUDE.md](https://docs.claude.com/en/docs/claude-code/output-styles.md)
- [eesel.ai Best Practices](https://www.eesel.ai/blog/claude-code-best-practices)
- [Plan Original](.claude/docs/claude-md-maintainer-skill-plan.md)
