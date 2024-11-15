"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Schema definition
const categorySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
    },
    slug: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
        unique: true, // Ensure slug is unique for SEO purposes
    },
    description: {
        type: String,
        trim: true,
        maxlength: 400,
    },
    metaTitle: {
        type: String,
        trim: true,
        maxlength: 60,
    },
    metaDescription: {
        type: String,
        trim: true,
        maxlength: 160,
    },
    metaKeywords: {
        type: String,
        trim: true,
    },
    canonicalUrl: {
        type: String,
        trim: true,
        validate: {
            validator: function (v) {
                return /^https?:\/\/.+/.test(v); // Ensure a valid URL format
            },
            message: "Invalid URL format",
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt
});
// Index the `slug` field for efficient searching
categorySchema.index({ slug: 1 });
const Category = mongoose_1.default.model("Category", categorySchema);
exports.default = Category;
