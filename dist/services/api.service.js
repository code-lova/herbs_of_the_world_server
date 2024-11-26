"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryService = exports.updateCategoryService = exports.fetchcategoryById = exports.fetchCategoriesService = exports.createCategoryService = void 0;
const http_1 = require("../constants/http");
const category_model_1 = __importDefault(require("../models/category.model"));
const appAssert_1 = __importDefault(require("../utils/appAssert"));
const slug_1 = require("../utils/slug");
const createCategoryService = async (data) => {
    //verify if the category already exists
    const existingCategory = await category_model_1.default.exists({
        $or: [{ name: data.name }, { slug: (0, slug_1.toSlug)(data.slug || data.name) }],
    });
    (0, appAssert_1.default)(!existingCategory, http_1.CONFLICT, "Category name or slug already exists");
    // Generate a slug if it isn't provided or incorrectly formatted
    const slug = data.slug && data.slug.trim() !== "" ? (0, slug_1.toSlug)(data.slug) : (0, slug_1.toSlug)(data.name);
    //create the category
    const newCategory = await category_model_1.default.create({
        ...data,
        slug,
    });
    //return the data
    return {
        status: http_1.CREATED,
        message: "Category created successfully",
        category: newCategory,
    };
};
exports.createCategoryService = createCategoryService;
const fetchCategoriesService = async () => {
    // Fetch all categories from the database
    const categories = await category_model_1.default.find().sort({ createdAt: -1 }); // Sort by newest first
    // Return the categories
    return categories;
};
exports.fetchCategoriesService = fetchCategoriesService;
//This was not needed any more...
const fetchcategoryById = async (id) => {
    // Fetch the category by ID
    const category = await category_model_1.default.findById(id);
    // Ensure the category exists
    (0, appAssert_1.default)(category, http_1.NOT_FOUND, "Category not found");
    // Return the category
    return category;
};
exports.fetchcategoryById = fetchcategoryById;
const updateCategoryService = async (categoryId, data) => {
    //verify if the category id exists in the database
    const existingCategory = await category_model_1.default.findById(categoryId);
    (0, appAssert_1.default)(existingCategory, http_1.NOT_FOUND, "Category does not exists");
    // Verify if the updated name already exists for a different category
    if (data.name) {
        const conflictingCategory = await category_model_1.default.exists({
            name: data.name,
            _id: { $ne: categoryId }, // Exclude the current category
        });
        (0, appAssert_1.default)(!conflictingCategory, http_1.CONFLICT, "Category with this name already exists");
        // Generate a slug from the new name
        data.slug = (0, slug_1.toSlug)(data.name);
    }
    else if (data.slug) {
        // Ensure the slug is properly formatted even if only the slug is updated
        data.slug = (0, slug_1.toSlug)(data.slug);
    }
    // Update the category with new details
    const updatedCategory = await category_model_1.default.findByIdAndUpdate(categoryId, data, {
        new: true, // Return the updated document
        runValidators: true, // Ensure validation rules are applied
    });
    // Ensure the category update was successful
    (0, appAssert_1.default)(updatedCategory, http_1.NOT_FOUND, "Failed to update category");
    //return the data
    return updatedCategory;
};
exports.updateCategoryService = updateCategoryService;
const deleteCategoryService = async (id) => {
    // Verify if the category ID exists in the database
    const category = await category_model_1.default.findById(id);
    (0, appAssert_1.default)(category, http_1.NOT_FOUND, "Category does not exist");
    // Delete the category
    await category_model_1.default.findByIdAndDelete(id);
    return { message: "Category deleted successfully" };
};
exports.deleteCategoryService = deleteCategoryService;
