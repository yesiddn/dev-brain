# AGENTS.md — dev-brain

Personal knowledge base built with **Astro 6 + Tailwind v4 + MDX**. Spanish-language throughout.

## Package manager

**pnpm only.** There is no `package-lock.json` or `yarn.lock`.

```bash
pnpm install
```

## Commands

```bash
pnpm dev          # http://localhost:4321
pnpm build        # outputs to dist/
pnpm astro check  # type-check (Astro wrapper — don't use `pnpm tsc`)
pnpm preview      # preview production build locally
```

## Architecture

- **Astro 6 static site (SSG)** — `output: 'static'` is the Astro default
- **5 content collections** defined in `src/content.config.ts`: `playbooks`, `snippets`, `concepts`, `lab`, `stack`
- All collections use glob loader from `astro/loaders`
- Tailwind v4 via `@tailwindcss/vite` plugin + `@tailwindcss/typography` plugin
- MDX support via `@astrojs/mdx`
- TypeScript strict mode (`astro/tsconfigs/strict`)
- One dynamic route handles all collections: `src/pages/[collection]/[...id].astro`

### Layout chain

```
BaseLayout (shell: <html>, meta, global CSS)
  └─ NoteLayout (adds SideBar, max-w-4xl content area)
  └─ index.astro (adds SideBar, recent entries grid)
```

## Content conventions

### File structure

```
src/content/{collection}/{tech}/{slug}.mdx
```

Examples:
- `src/content/playbooks/astro/dev-brain.mdx`
- `src/content/playbooks/dotnet/webapi-starter.mdx`

The entry `id` is the path relative to the collection root: `astro/dev-brain`, `dotnet/webapi-starter`.

### Creating new notes via CLI

```bash
node scripts/new-note.mjs <type> <tech> <slug>
# Examples:
node scripts/new-note.mjs playbook dotnet webapi-crud
node scripts/new-note.mjs snippet react use-debounce
node scripts/new-note.mjs concept backend dependency-injection
node scripts/new-note.mjs lab astro content-collections
```

Valid types: `playbook`, `snippet`, `concept`, `lab`. Note: `stack` is NOT supported by the CLI (create manually using `init-project/_template.stack.mdx`).

### Status lifecycle

```
draft → active → archived
```

- **draft**: hidden from sidebar, work in progress
- **active**: visible everywhere (sidebar + index)
- **archived**: hidden from sidebar, excluded from index queries

Stack collection uses a different status enum: `active | learning | dormant | archived`.

### ⚠️ Stack collection is different

The `stack` collection does **NOT** use `baseSchema`. It has its own standalone schema:

| Other collections | stack |
|---|---|
| `title` field | `title` field |
| `status: draft\|active\|archived` | `status: active\|learning\|dormant\|archived` |
| `tech: string[]` | no `tech` field |
| has `level`, `summary`, `related` | has `icon`, `color`, `version`, `docs` |

Code that iterates over "all collections" must handle stack separately or guard with `'tech' in data`.

### Frontmatter dates

`updatedAt` uses `z.coerce.date()` — accepts `"2026-04-17"` strings. `createdAt` is optional.

## Tailwind v4 gotchas

- Uses `@import "tailwindcss"` in CSS (v4 syntax), NOT the old `@tailwind base; @tailwind components; @tailwind utilities;`
- Config is CSS-based, not JS-based. There is no `tailwind.config.*` file.
- The `@plugin "@tailwindcss/typography"` directive must be in the CSS file — it is NOT configured in `astro.config.mjs`

## init-project/

Not part of the built site. Contains documentation and templates for starting a new dev-brain instance. The actual `src/content.config.ts` at the project root is the authoritative schema.

## No CI, no tests, no linting

This project has no CI workflows, test runner, ESLint, or Prettier configured. Type-checking via `pnpm astro check` is the only verification step.
