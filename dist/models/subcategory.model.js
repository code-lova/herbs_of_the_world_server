"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const subCategorySchema = new mongoose_1.default.Schema({
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
        unique: true,
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
    categoryId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Category", // Reference the Category model
        required: true,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
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
subCategorySchema.index({ slug: 1 });
// Index the `categoryId` field to optimize queries by category
subCategorySchema.index({ categoryId: 1 });
const SubCategory = mongoose_1.default.model("SubCategory", subCategorySchema);
exports.default = SubCategory;
