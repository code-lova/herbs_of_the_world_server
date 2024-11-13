import mongoose from "mongoose";

export interface categoryDocument extends mongoose.Document {
  name: string;
  slug: string;
  description?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  canonicalUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Schema definition
const categorySchema = new mongoose.Schema<categoryDocument>(
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
        validator: function (v: string) {
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
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

// Index the `slug` field for efficient searching
categorySchema.index({ slug: 1 });

const Category = mongoose.model<categoryDocument>("Category", categorySchema);

export default Category;
