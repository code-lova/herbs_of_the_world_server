"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subCategorySchema = exports.categorySchema = void 0;
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
exports.categorySchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(50).trim(), // Category name
    slug: zod_1.z.string().min(1).max(50).trim(), // URL-friendly version of the name
    description: zod_1.z.string().max(400).optional(), // Optional category description for better context
    metaTitle: zod_1.z.string().max(60).optional(), // SEO title for search engines
    metaDescription: zod_1.z.string().max(160).optional(), // Meta description for search engines
    metaKeywords: zod_1.z.string().optional(), // Keywords for search engines (comma-separated)
    canonicalUrl: zod_1.z.string().url().optional(), // Canonical URL to avoid duplicate content
});
// SubCategory schema validation with Zod
exports.subCategorySchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(50).trim(), // Category name
    slug: zod_1.z.string().min(1).max(50).trim(), // URL-friendly version of the name
    description: zod_1.z.string().max(400).optional(), // Optional category description for better context
    metaTitle: zod_1.z.string().max(60).optional(), // SEO title for search engines
    metaDescription: zod_1.z.string().max(160).optional(), // Meta description for search engines
    metaKeywords: zod_1.z.string().optional(), // Keywords for search engines (comma-separated)
    canonicalUrl: zod_1.z.string().url().optional(), // Canonical URL to avoid duplicate content
    categoryId: zod_1.z.string().refine((val) => mongoose_1.default.Types.ObjectId.isValid(val), {
        message: "Invalid categoryId format", // Validate as a valid ObjectId
    }),
    status: zod_1.z.enum(["active", "inactive"]).default("active"), // Restrict to "active" or "inactive"
});
