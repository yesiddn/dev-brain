# dev-brain

Base de conocimientos personal construida con **Astro 6**, **Tailwind v4** y **MDX**. Todo el contenido está redactado en español.

## Inicio rápido

Este proyecto utiliza **exclusivamente `pnpm`**. No hay `package-lock.json` ni `yarn.lock`.

```bash
# 1. Instalar dependencias
pnpm install

# 2. Iniciar el servidor de desarrollo en http://localhost:4321
pnpm dev
```

## Colecciones de Contenido

El sitio gestiona 5 colecciones de contenido definidas en `src/content.config.ts`:

- `playbooks`
- `snippets`
- `concepts`
- `lab`
- `stack` (⚠️ Utiliza un esquema independiente a las demás colecciones)

Todas utilizan el *glob loader* de Astro y se renderizan dinámicamente mediante la ruta `src/pages/[collection]/[...id].astro`.

## Creación de notas (CLI)

Utiliza el script integrado para crear nuevas notas (excepto para `stack`):

```bash
node scripts/new-note.mjs <type> <tech> <slug>
```

**Ejemplos:**
- `node scripts/new-note.mjs playbook dotnet webapi-crud`
- `node scripts/new-note.mjs snippet react use-debounce`

*(Para `stack`, debes crear el archivo manualmente usando `init-project/_template.stack.mdx`)*.

### Ciclo de vida de los estados

| Estado | Comportamiento |
|--------|----------------|
| `draft` | Oculto en el sidebar, trabajo en progreso. |
| `active` | Visible en todas partes (sidebar e índice). |
| `archived` | Oculto en el sidebar, excluido de los listados. |

*Nota: La colección `stack` tiene sus propios estados (`active`, `learning`, `dormant`, `archived`).*

## Arquitectura técnica

- **Generación Estática (SSG):** Configuración por defecto de Astro.
- **Tailwind v4:** Configuración basada directamente en CSS (`@import "tailwindcss"`), sin archivo `tailwind.config.mjs`. El plugin de tipografía también se configura aquí.
- **TypeScript estricto:** La verificación principal del código se hace mediante `astro check`. No hay pipelines de CI/CD ni configuración de ESLint/Prettier.

## Comandos disponibles

| Comando | Descripción |
|---------|-------------|
| `pnpm install` | Instala las dependencias necesarias. |
| `pnpm dev` | Levanta el entorno de desarrollo local. |
| `pnpm astro check` | Verifica los tipos del proyecto (No usar `tsc`). |
| `pnpm build` | Compila el sitio a archivos estáticos en `./dist/`. |
| `pnpm preview` | Sirve la carpeta `./dist/` para probar el build localmente. |