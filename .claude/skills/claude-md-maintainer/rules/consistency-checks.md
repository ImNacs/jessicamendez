# Validaciones de Consistencia

Reglas para verificar que CLAUDE.md esté sincronizado con el proyecto real.

---

## 🔍 Categorías de Validación

### 1. Skills
### 2. Agentes
### 3. Slash Commands
### 4. Referencias a Archivos
### 5. Información Duplicada

---

## 1️⃣ Validación de Skills

### Check 1.1: Skills Documentadas Existen

**Objetivo**: Verificar que todas las skills mencionadas en CLAUDE.md existen en el filesystem.

**Proceso**:
```bash
# Leer skills documentadas en CLAUDE.md
grep -A 2 "^#### \`" CLAUDE.md | grep -o "\`[^`]*\`"

# Listar skills existentes
ls -d .claude/skills/*/

# Comparar listas
```

**Output esperado**:
```markdown
### Skills Documentadas vs Existentes

✅ `agent-builder` - Existe en `.claude/skills/agent-builder/`
✅ `command-builder` - Existe en `.claude/skills/command-builder/`
❌ `trace-generator` - Documentada pero NO existe
✅ `supabase-query` - Existe en `.claude/skills/supabase-query/`
```

**Acción si falla**:
- Eliminar entrada de skill inexistente de CLAUDE.md
- O crear skill si era intención documentarla anticipadamente

---

### Check 1.2: Skills Existentes Están Documentadas

**Objetivo**: Verificar que todas las skills del filesystem están mencionadas en CLAUDE.md.

**Proceso**:
```bash
# Listar skills existentes
find .claude/skills -maxdepth 1 -type d -not -path .claude/skills

# Verificar cada una está en CLAUDE.md
```

**Output esperado**:
```markdown
### Skills Existentes vs Documentadas

✅ `agent-builder` - Documentada en CLAUDE.md
✅ `command-builder` - Documentada en CLAUDE.md
⚠️ `experimental-skill` - Existe pero NO está documentada
✅ `supabase-query` - Documentada en CLAUDE.md
```

**Acción si falla**:
- Agregar skill no documentada a CLAUDE.md usando template
- O marcar como experimental/deprecated si no debe documentarse

---

### Check 1.3: Triggers Actualizados

**Objetivo**: Verificar que los triggers en CLAUDE.md coinciden con los del SKILL.md.

**Proceso**:
```bash
# Leer triggers de SKILL.md
grep "^description:" .claude/skills/[skill-name]/SKILL.md

# Comparar con triggers en CLAUDE.md
grep -A 1 "#### \`[skill-name]\`" CLAUDE.md | grep "Triggers"
```

**Output esperado**:
```markdown
### Triggers de `supabase-query`

📄 En SKILL.md:
description: ... database, supabase, sql, migration, schema ...

📄 En CLAUDE.md:
**Triggers**: database, supabase, sql, migration, schema

✅ Coinciden
```

**Acción si falla**:
- Actualizar triggers en CLAUDE.md para coincidir con SKILL.md
- SKILL.md es la fuente de verdad

---

## 2️⃣ Validación de Agentes

### Check 2.1: Agentes Documentados Existen

**Objetivo**: Verificar que todos los agentes mencionados en CLAUDE.md existen.

**Proceso**:
```bash
# Leer agentes documentados
grep "^#### \`" CLAUDE.md | grep -A 2 "Usa para"

# Listar agentes existentes
ls .claude/agents/*.md
```

**Output esperado**:
```markdown
### Agentes Documentados vs Existentes

✅ `project-analyst` - Existe en `.claude/agents/project-analyst.md`
✅ `stack-expert` - Existe en `.claude/agents/stack-expert.md`
❌ `vehicle-validator` - Documentado pero NO existe
```

**Acción si falla**:
- Eliminar entrada de agente inexistente
- O crear agente si faltaba implementarlo

---

### Check 2.2: Agentes Existentes Están Documentados

**Objetivo**: Verificar que todos los agentes del filesystem están mencionados en CLAUDE.md.

**Proceso**:
```bash
# Listar agentes existentes
ls .claude/agents/*.md

# Verificar cada uno está en CLAUDE.md
grep -o "\`[^`]*\`" CLAUDE.md | grep -o "[^`]*"
```

**Output esperado**:
```markdown
### Agentes Existentes vs Documentados

✅ `project-analyst` - Documentado
✅ `stack-expert` - Documentado
⚠️ `analyze-listing-qa-agent` - Existe pero NO documentado
```

**Acción si falla**:
- Agregar agente a CLAUDE.md usando template
- Obtener descripción de archivo .md del agente

---

## 3️⃣ Validación de Slash Commands

### Check 3.1: Comandos Documentados Existen

**Objetivo**: Verificar que todos los comandos mencionados en CLAUDE.md existen.

**Proceso**:
```bash
# Leer comandos documentados
grep "^### \`/" CLAUDE.md

# Listar comandos existentes
ls .claude/commands/*.md
```

**Output esperado**:
```markdown
### Comandos Documentados vs Existentes

✅ `/verify-docs` - Existe en `.claude/commands/verify-docs.md`
✅ `/push` - Existe en `.claude/commands/push.md`
✅ `/nocodb` - Existe en `.claude/commands/nocodb.md`
```

**Acción si falla**:
- Eliminar documentación de comando inexistente
- O crear comando si faltaba

---

### Check 3.2: Comandos Existentes Están Documentados

**Objetivo**: Verificar que todos los comandos del filesystem están mencionados.

**Proceso**:
```bash
# Listar comandos existentes
find .claude/commands -name "*.md"

# Verificar documentación en CLAUDE.md
```

**Output esperado**:
```markdown
### Comandos Existentes vs Documentados

✅ `verify-docs` - Documentado en CLAUDE.md
✅ `push` - Documentado en CLAUDE.md
✅ `nocodb` - Documentado en CLAUDE.md
⚠️ `experimental-cmd` - Existe pero NO documentado
```

**Acción si falla**:
- Agregar comando a CLAUDE.md
- O marcar como interno/experimental

---

## 4️⃣ Validación de Referencias

### Check 4.1: Links a Archivos Son Válidos

**Objetivo**: Verificar que todos los links a archivos en CLAUDE.md apuntan a archivos existentes.

**Proceso**:
```bash
# Extraer todos los links a archivos locales
grep -oE '\[.*\]\((\.claude/[^)]+)\)' CLAUDE.md

# Verificar cada path existe
for file in $files; do
  test -f "$file" && echo "✅ $file" || echo "❌ $file"
done
```

**Output esperado**:
```markdown
### Referencias a Archivos

✅ `.claude/skills/supabase-query/` - Existe
✅ `.claude/agents/project-analyst.md` - Existe
❌ `.claude/docs/old-guide.md` - NO existe (referencia rota)
✅ `.claude/commands/verify-docs.md` - Existe
```

**Acción si falla**:
- Corregir path del link
- O eliminar referencia si archivo fue movido/eliminado

---

### Check 4.2: Referencias a Secciones

**Objetivo**: Verificar que links internos (#sección) apuntan a secciones existentes.

**Proceso**:
```bash
# Extraer links internos
grep -oE '\[.*\]\(#[^)]+\)' CLAUDE.md

# Verificar cada sección existe
grep "^##" CLAUDE.md
```

**Output esperado**:
```markdown
### Links Internos

✅ `#sistema-de-delegación` - Sección existe
✅ `#comandos-de-desarrollo` - Sección existe
❌ `#workflows-implementados` - Sección NO existe
```

**Acción si falla**:
- Corregir link a sección correcta
- O agregar sección faltante

---

## 5️⃣ Validación de Duplicación

### Check 5.1: Información Duplicada con .env.example

**Objetivo**: Detectar si variables de entorno están duplicadas.

**Proceso**:
```bash
# Extraer variables mencionadas en CLAUDE.md
grep -oE "[A-Z_]+=" CLAUDE.md

# Comparar con .env.example
```

**Output esperado**:
```markdown
### Variables de Entorno

⚠️ Duplicación detectada:
- OPENAI_API_KEY mencionada en CLAUDE.md Y .env.example
- DATABASE_URL mencionada en CLAUDE.md Y .env.example

Recomendación:
- Mantener solo variables CRÍTICAS en CLAUDE.md
- Referenciar .env.example para lista completa
```

**Acción si falla**:
- Reducir lista de env vars en CLAUDE.md
- Agregar link a .env.example

---

### Check 5.2: Información Duplicada con READMEs

**Objetivo**: Detectar si contenido de CLAUDE.md está duplicado en READMEs.

**Proceso**:
```bash
# Buscar similitudes de contenido
# (Heurística: si >80% de líneas de una sección están en README)
```

**Output esperado**:
```markdown
### Duplicación con READMEs

⚠️ Sección "Sistema de Traces" en CLAUDE.md
   Coincide 85% con `mastra/tools/fetcher/README.md`

Recomendación: Delegar a README, mantener solo resumen en CLAUDE.md
```

**Acción si falla**:
- Delegar contenido detallado a README
- Mantener solo resumen + link en CLAUDE.md

---

## 📊 Reporte de Consistencia

### Template de Reporte Completo

```markdown
## 🔍 Reporte de Consistencia de CLAUDE.md

**Fecha**: [YYYY-MM-DD]

### 1. Skills

#### Documentadas vs Existentes
- ✅ 6 skills documentadas existen
- ❌ 1 skill documentada NO existe: `trace-generator`

#### Existentes vs Documentadas
- ✅ 6 skills existentes documentadas
- ⚠️ 1 skill existe pero NO documentada: `experimental-tool`

#### Triggers Actualizados
- ✅ 6/6 skills tienen triggers actualizados
- ❌ 0 skills con triggers desactualizados

**Score de Skills**: 85/100 (1 problema detectado)

---

### 2. Agentes

#### Documentados vs Existentes
- ✅ 5 agentes documentados existen
- ❌ 0 agentes documentados NO existen

#### Existentes vs Documentados
- ✅ 4 agentes existentes documentados
- ⚠️ 1 agente existe pero NO documentado: `analyze-listing-qa-agent`

**Score de Agentes**: 90/100 (1 agente faltante en CLAUDE.md)

---

### 3. Comandos

#### Documentados vs Existentes
- ✅ 3 comandos documentados existen
- ❌ 0 comandos documentados NO existen

#### Existentes vs Documentados
- ✅ 3 comandos existentes documentados
- ⚠️ 0 comandos existen pero NO documentados

**Score de Comandos**: 100/100

---

### 4. Referencias

#### Links a Archivos
- ✅ 12 referencias válidas
- ❌ 0 referencias rotas

#### Links Internos
- ✅ 8 links internos válidos
- ❌ 0 links internos rotos

**Score de Referencias**: 100/100

---

### 5. Duplicación

#### Duplicación Detectada
- ⚠️ Variables de entorno duplicadas con .env.example
- ⚠️ Sección "Sistema de Traces" duplica mastra/tools/README.md

**Score de Duplicación**: 70/100

---

## Score Total de Consistencia: 89/100

### Clasificación: Muy Bueno

### Acciones Recomendadas (Prioridad Alta)
1. Eliminar skill `trace-generator` de CLAUDE.md (no existe)
2. Agregar agente `analyze-listing-qa-agent` a CLAUDE.md

### Acciones Recomendadas (Prioridad Media)
3. Reducir variables de entorno, link a .env.example
4. Delegar "Sistema de Traces" a archivo separado
```

---

## 🔄 Automatización de Checks

### Comando de Validación Rápida

```bash
# Ejecutar todos los checks
claude-md-maintainer validate

# Solo checks de consistencia
claude-md-maintainer validate --consistency

# Solo skills
claude-md-maintainer validate --skills

# Solo agentes
claude-md-maintainer validate --agents
```

### Integración con CI/CD

Considerar agregar validación automática en pre-commit hook:

```bash
# .git/hooks/pre-commit
#!/bin/bash
if [[ $(git diff --cached --name-only | grep CLAUDE.md) ]]; then
  echo "Validando CLAUDE.md..."
  claude-md-maintainer validate --quick
  if [ $? -ne 0 ]; then
    echo "❌ CLAUDE.md tiene problemas de consistencia"
    echo "Ejecuta: claude-md-maintainer validate --fix"
    exit 1
  fi
fi
```

---

## 🎯 Frecuencia de Validación

| Evento | Validación |
|--------|-----------|
| **Después de crear skill/agente** | Check 1.2 / 2.2 (existentes documentados) |
| **Antes de commit a CLAUDE.md** | Todos los checks |
| **Semanal (automático)** | Reporte completo de consistencia |
| **Después de optimización** | Validar referencias no rotas |

---

## 📈 Métricas de Consistencia

### Target
- **Skills**: 100% (todas documentadas y existentes)
- **Agentes**: 100% (todas documentadas y existentes)
- **Comandos**: 100% (todos documentados)
- **Referencias**: 100% (sin links rotos)
- **Duplicación**: 0% (sin duplicación innecesaria)

### Score Mínimo Aceptable: 90/100
