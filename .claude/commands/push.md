---
description: Actualiza documentación, crea commits y pushea cambios
allowed-tools: Read, Edit, Bash(git status:*), Bash(git add:*), Bash(git commit:*), Bash(git push:*), Glob, Grep
model: sonnet
---

# Push - Documentación y Cambios

## Objetivo

Verifica que la documentación general se encuentre al día con el código fuente.

Genera los commits necesarios para mantener la documentación al día y pushea al servidor remoto.

## Directrices para CLAUDE.md

**IMPORTANTE**: El archivo `CLAUDE.md` debe mantenerse **claro y conciso**.

- Si agregas un workflow, solo descríbelo brevemente de manera general
- Agrega **referencias** a la documentación detallada de dicho workflow
- Evita duplicar información que ya existe en otros archivos

## Pasos

1. **Verificar estado actual**: `git status`

2. **Health Check de CLAUDE.md**:
   - Si hay cambios en código relacionado con skills, ejecutar `claude-md-maintainer` skill
   - Triggers para invocar: "health check CLAUDE.md"
   - La skill verificará:
     - Líneas totales (target: 100-200)
     - Secciones extensas (>30 líneas)
     - Consistencia con skills existentes
     - Oportunidades de delegación
   - Si score < 85: Aplicar optimizaciones recomendadas antes de continuar
   - Si score >= 85: Continuar sin cambios

3. **Revisar documentación desactualizada**:
   - Comparar `CLAUDE.md` con código reciente
   - Verificar que skills documentadas existan
   - Comprobar que referencias estén actualizadas

4. **Actualizar documentación** si es necesario

5. **Crear commits estructurados** (Conventional Commits)

6. **Pushear al servidor remoto**

7. **Mostrar resumen final**

## Salida Esperada

Al finalizar, muestra:
- ✅ Archivos modificados
- ✅ Commits creados
- ✅ Status del push
- 📊 Resumen de cambios en documentación
