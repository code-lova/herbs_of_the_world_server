"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorySchema = void 0;
const zod_1 = require("zod");
exports.categorySchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(50).trim(), // Category name
    slug: zod_1.z.string().min(1).max(50).trim(), // URL-friendly version of the name
    description: zod_1.z.string().max(400).optional(), // Optional category description for better context
    metaTitle: zod_1.z.string().max(60).optional(), // SEO title for search engines
    metaDescription: zod_1.z.string().max(160).optional(), // Meta description for search engines
    metaKeywords: zod_1.z.string().optional(), // Keywords for search engines (comma-separated)
    canonicalUrl: zod_1.z.string().url().optional(), // Canonical URL to avoid duplicate content
});
