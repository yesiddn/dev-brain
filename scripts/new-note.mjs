#!/usr/bin/env node
/**
 * dev-brain: script para crear una nueva nota desde la línea de comandos
 * 
 * Uso:
 *   node scripts/new-note.mjs playbook dotnet webapi-crud
 *   node scripts/new-note.mjs snippet react use-local-storage
 *   node scripts/new-note.mjs concept backend caching-strategies
 *   node scripts/new-note.mjs lab astro content-collections-test
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const VALID_TYPES = ["playbook", "snippet", "concept", "lab"];

const TEMPLATES = {
  playbook: (title, tech, slug) => `---
title: "${title}"
description: "Guía de reentrada para ${tech} — completar descripción"
goal: "Completar este campo: qué vas a poder hacer al terminar"
tech: ["${tech}"]
tags: ["starter"]
level: "basico"
status: "draft"
prerequisites: []
estimatedTime: "15 min"
updatedAt: ${today()}
createdAt: ${today()}
summary: "Completar resumen de una línea"
related: []
---

## Contexto

> ¿Cuándo usar este playbook?

---

## Prerequisitos

\`\`\`bash
# verificar instalación
\`\`\`

---

## Pasos

### 1. Crear el proyecto

\`\`\`bash
# comando aquí
\`\`\`

### 2. Estructura generada

\`\`\`
proyecto/
└─ completar...
\`\`\`

### 3. Verificar que funciona

\`\`\`bash
# comando de prueba
\`\`\`

---

## Errores comunes

| Error | Causa | Solución |
|-------|-------|----------|
| - | - | - |

---

## Qué revisar la próxima vez

- [ ] Pendiente 1
- [ ] Pendiente 2
`,

  snippet: (title, tech, slug) => `---
title: "${title}"
description: "Completar descripción del snippet"
tech: ["${tech}"]
tags: []
language: "${tech}"
level: "medio"
status: "draft"
copyReady: false
context: "completar: frontend | backend | cli | db"
updatedAt: ${today()}
summary: "Completar resumen de una línea"
related: []
---

## Qué hace

Completar explicación en 1-2 líneas.

## Código

\`\`\`${tech}
// código aquí
\`\`\`

## Cómo usarlo

\`\`\`${tech}
// ejemplo de uso aquí
\`\`\`

## Notas

- Nota 1
- Nota 2
`,

  concept: (title, tech, slug) => `---
title: "${title}"
description: "Completar descripción del concepto"
tech: ["${tech}"]
tags: []
level: "medio"
status: "draft"
updatedAt: ${today()}
summary: "Completar resumen en una línea"
related: []
---

## En una línea

> Completar definición directa del concepto.

## Por qué importa

Completar contexto.

## Cómo funciona

\`\`\`${tech}
// ejemplo mínimo
\`\`\`

## Cuándo usarlo / cuándo no

| Usarlo cuando... | NO usarlo cuando... |
|-----------------|---------------------|
| - | - |
`,

  lab: (title, tech, slug) => `---
title: "${title}"
description: "Experimento: completar descripción"
tech: ["${tech}"]
tags: []
level: "medio"
status: "draft"
result: ""
success: null
updatedAt: ${today()}
summary: "Completar resumen"
related: []
---

## Objetivo

Completar qué querés probar o aprender.

## Qué hice

1. Paso 1
2. Paso 2

## Código probado

\`\`\`${tech}
// código aquí
\`\`\`

## Resultado

Completar qué pasó.

## Lo que no esperaba

- Sorpresa 1

## Próximos pasos

- [ ] Pendiente
`,
};

function today() {
  return new Date().toISOString().split("T")[0];
}

function toTitle(slug) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function main() {
  const [, , type, tech, slug] = process.argv;

  if (!type || !VALID_TYPES.includes(type)) {
    console.error(`❌ Tipo inválido. Usá: ${VALID_TYPES.join(" | ")}`);
    console.error(`   Ejemplo: node scripts/new-note.mjs playbook dotnet webapi-crud`);
    process.exit(1);
  }
  if (!tech) {
    console.error(`❌ Falta el tech. Ejemplo: dotnet | react | python | sql`);
    process.exit(1);
  }
  if (!slug) {
    console.error(`❌ Falta el nombre (slug). Ejemplo: webapi-crud | use-debounce`);
    process.exit(1);
  }

  // Plural del tipo para la carpeta (playbook → playbooks, etc.)
  const folder = `${type}s`;
  const dir = path.join(process.cwd(), "src", "content", folder, tech);
  const filePath = path.join(dir, `${slug}.mdx`);

  if (fs.existsSync(filePath)) {
    console.error(`❌ Ya existe: ${filePath}`);
    process.exit(1);
  }

  const title = toTitle(slug);
  const content = TEMPLATES[type](title, tech, slug);

  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");

  console.log(`✅ Nota creada: src/content/${folder}/${tech}/${slug}.mdx`);
  console.log(`📝 Acordate de cambiar status de "draft" a "active" cuando esté lista`);
}

main();
