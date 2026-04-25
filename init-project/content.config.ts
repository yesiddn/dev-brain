// src/content.config.ts
// Astro 5.x usa la nueva API con loaders explícitos y defineCollection
import { defineCollection, z, reference } from "astro:content";
import { glob } from "astro/loaders";

// ─── Schema base compartido por todas las colecciones ───────────────────────
const baseSchema = z.object({
  title: z.string(),
  description: z.string(),

  // Tecnologías involucradas: ["react", "typescript", "django", etc.]
  tech: z.array(z.string()),

  // Tags libres para búsqueda y filtrado
  tags: z.array(z.string()).default([]),

  // Nivel de dificultad / experiencia requerida
  level: z.enum(["basico", "medio", "avanzado"]).default("medio"),

  // Estado de la nota: draft = en progreso, active = lista, archived = obsoleta
  status: z.enum(["draft", "active", "archived"]).default("active"),

  // Fechas — updatedAt es obligatoria para ordenar por relevancia
  updatedAt: z.coerce.date(),
  createdAt: z.coerce.date().optional(),

  // Resumen en 1 línea para cards y listas
  summary: z.string().optional(),

  // IDs de otras entradas relacionadas dentro de cualquier colección
  // Formato: "collectionName/entry-slug"
  related: z.array(z.string()).default([]),
});

// ─── Playbooks ───────────────────────────────────────────────────────────────
// "Cómo vuelvo a trabajar con X tecnología hoy, desde cero"
const playbooks = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/playbooks" }),
  schema: baseSchema.extend({
    // Qué vas a poder hacer al terminar de leer esto
    goal: z.string(),
    // Lo que necesitás tener instalado/configurado antes
    prerequisites: z.array(z.string()).default([]),
    // Tiempo estimado para completar el playbook (ej: "15 min")
    estimatedTime: z.string().optional(),
  }),
});

// ─── Snippets ────────────────────────────────────────────────────────────────
// Código corto, copiable y listo para usar
const snippets = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/snippets" }),
  schema: baseSchema.extend({
    // Lenguaje principal del snippet para el resaltado de código
    language: z.string(),
    // Si está listo para copiar-pegar sin modificar (false = necesita adaptación)
    copyReady: z.boolean().default(true),
    // Contexto donde se usa: "backend", "frontend", "db", "cli", etc.
    context: z.string().optional(),
  }),
});

// ─── Concepts ────────────────────────────────────────────────────────────────
// Teoría, arquitectura, patrones, conceptos académicos y profesionales
const concepts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/concepts" }),
  schema: baseSchema,
});

// ─── Lab ─────────────────────────────────────────────────────────────────────
// Experimentos, pruebas de features, posts de práctica personal
const lab = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/lab" }),
  schema: baseSchema.extend({
    // Qué aprendiste / qué salió del experimento
    result: z.string().optional(),
    // Si el experimento fue exitoso
    success: z.boolean().optional(),
  }),
});

// ─── Stack ───────────────────────────────────────────────────────────────────
// Páginas índice por tecnología (una por cada stack que manejás)
const stack = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/stack" }),
  schema: z.object({
    name: z.string(),           // Nombre de la tecnología: "React", ".NET 8", etc.
    icon: z.string().optional(),// Nombre del ícono (Simple Icons slug)
    color: z.string().optional(),// Color hex para la card
    version: z.string().optional(),// Versión que usás actualmente
    status: z.enum(["active", "learning", "dormant", "archived"]).default("active"),
    description: z.string(),
    docs: z.string().url().optional(),// URL de la documentación oficial
    tags: z.array(z.string()).default([]),
    updatedAt: z.coerce.date(),
  }),
});

export const collections = { playbooks, snippets, concepts, lab, stack };
