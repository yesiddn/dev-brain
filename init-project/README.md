# dev-brain — Plantillas de arranque

Archivos para inicializar tu knowledge base personal en Astro 6.

## Estructura de archivos

```text
src/
├─ content.config.ts         ← Copiar a src/content.config.ts
├─ content/
│  ├─ playbooks/             ← Guías de reentrada por tecnología
│  │  ├─ dotnet/
│  │  ├─ python/
│  │  └─ react/
│  ├─ snippets/              ← Código copiable y listo para usar
│  ├─ concepts/              ← Teoría, patrones, arquitectura
│  ├─ lab/                   ← Experimentos y práctica personal
│  └─ stack/                 ← Una página índice por tecnología
scripts/
└─ new-note.mjs              ← CLI para crear notas rápido
```

## Setup inicial

```bash
# 1. Crear proyecto Astro
npm create astro@latest dev-brain -- --template minimal --typescript strict --no-install
cd dev-brain
npm install

# 2. Copiar los archivos de este kit
cp content.config.ts src/content.config.ts
cp new-note.mjs scripts/new-note.mjs

# 3. Crear estructura de carpetas
mkdir -p src/content/{playbooks/{dotnet,python,react},snippets/{dotnet,python,react,sql},concepts/{frontend,backend,arquitectura},lab/{astro,react,integrations},stack}

# 4. Primer nota de prueba
node scripts/new-note.mjs playbook dotnet webapi-starter
```

## Crear nuevas notas (CLI)

```bash
# Sintaxis: node scripts/new-note.mjs [tipo] [tech] [nombre-slug]
node scripts/new-note.mjs playbook dotnet   webapi-crud
node scripts/new-note.mjs playbook python   django-rest-starter
node scripts/new-note.mjs playbook react    feature-based-setup
node scripts/new-note.mjs snippet  react    use-debounce
node scripts/new-note.mjs snippet  sql      pagination-query
node scripts/new-note.mjs concept  backend  dependency-injection
node scripts/new-note.mjs lab      astro    mdx-components
```

## Plantillas disponibles

| Archivo | Colección | Descripción |
| --------- | ----------- | ------------- |
| `_template.playbook.mdx` | `playbooks/` | Guía de reentrada a una tecnología |
| `_template.snippet.mdx` | `snippets/` | Código copiable con ejemplo de uso |
| `_template.concept.mdx` | `concepts/` | Concepto técnico con código y tabla |
| `_template.lab.mdx` | `lab/` | Diario de experimento o práctica |
| `_template.stack.mdx` | `stack/` | Hub/índice de una tecnología |

## Convención de status

- `draft` — en progreso, incompleta
- `active` — lista y útil
- `archived` — obsoleta o reemplazada

## Filtrar por tecnología en código

```typescript
// Solo notas de .NET
const dotnetPlaybooks = await getCollection("playbooks",
  ({ id }) => id.startsWith("dotnet/")
);

// Solo notas activas
const active = await getCollection("playbooks",
  ({ data }) => data.status === "active"
);

// Ordenadas por fecha de actualización
const sorted = entries.sort(
  (a, b) => b.data.updatedAt.getTime() - a.data.updatedAt.getTime()
);
```
