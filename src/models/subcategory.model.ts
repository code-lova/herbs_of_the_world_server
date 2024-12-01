import mongoose from "mongoose";
import { Status } from "../types";

export interface SubCategoryDocument extends mongoose.Document {
  name: string;
  slug: string;
  description?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  canonicalUrl?: string;
  categoryId: mongoose.Schema.Types.ObjectId;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}

const subCategorySchema = new mongoose.Schema<SubCategoryDocument>(
  {
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
        validator: function (v: string) {
          return /^https?:\/\/.+/.test(v); // Ensure a valid URL format
        },
        message: "Invalid URL format",
      },
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
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
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

// Index the `slug` field for efficient searching
subCategorySchema.index({ slug: 1 });

// Index the `categoryId` field to optimize queries by category
subCategorySchema.index({ categoryId: 1 });

const SubCategory = mongoose.model<SubCategoryDocument>(
  "SubCategory",
  subCategorySchema
);

export default SubCategory;
