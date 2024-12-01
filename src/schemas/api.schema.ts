import { z } from "zod";
import mongoose from "mongoose";

export const categorySchema = z.object({
  name: z.string().min(1).max(50).trim(), // Category name
  slug: z.string().min(1).max(50).trim(), // URL-friendly version of the name
  description: z.string().max(400).optional(), // Optional category description for better context
  metaTitle: z.string().max(60).optional(), // SEO title for search engines
  metaDescription: z.string().max(160).optional(), // Meta description for search engines
  metaKeywords: z.string().optional(), // Keywords for search engines (comma-separated)
  canonicalUrl: z.string().url().optional(), // Canonical URL to avoid duplicate content
});

// SubCategory schema validation with Zod
export const subCategorySchema = z.object({
  name: z.string().min(1).max(50).trim(), // Category name
  slug: z.string().min(1).max(50).trim(), // URL-friendly version of the name
  description: z.string().max(400).optional(), // Optional category description for better context
  metaTitle: z.string().max(60).optional(), // SEO title for search engines
  metaDescription: z.string().max(160).optional(), // Meta description for search engines
  metaKeywords: z.string().optional(), // Keywords for search engines (comma-separated)
  canonicalUrl: z.string().url().optional(), // Canonical URL to avoid duplicate content
  categoryId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid categoryId format", // Validate as a valid ObjectId
  }),
  status: z.enum(["active", "inactive"]).default("active"), // Restrict to "active" or "inactive"
});
