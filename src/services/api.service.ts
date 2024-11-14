import { CONFLICT, CREATED, NOT_FOUND } from "../constants/http";
import Category from "../models/category.model";
import { createCategoryType } from "../types";
import appAssert from "../utils/appAssert";
import { toSlug } from "../utils/slug";

export const createCategoryService = async (data: createCategoryType) => {
  //verify if the category already exists
  const existingCategory = await Category.exists({
    name: data.name,
  });

  appAssert(!existingCategory, CONFLICT, "Category already exists");

  // Generate a slug if it isn't provided or incorrectly formatted
  const slug = data.slug && data.slug.trim() !== "" ? toSlug(data.slug) : toSlug(data.name);

  //create the category
  const newCategory = await Category.create({
    ...data,
    slug,
  });

  //return the data
  return {
    status: CREATED,
    message: "Category created successfully",
    category: newCategory,
  };
};

export const fetchCategoriesService = async () => {
  // Fetch all categories from the database
  const categories = await Category.find().sort({ createdAt: -1 }); // Sort by newest first

  // Return the categories
  return categories;
};

export const fetchcategoryById = async (id: String) => {
  // Fetch the category by ID
  const category = await Category.findById(id);

  // Ensure the category exists
  appAssert(category, NOT_FOUND, "Category not found");

  // Return the category
  return category;
};

export const updateCategoryService = async (
  categoryId: string,
  data: createCategoryType
) => {
  //verify if the category id exists in the database
  const existingCategory = await Category.findById(categoryId);
  appAssert(existingCategory, NOT_FOUND, "Category does not exists");

  // Verify if the updated name already exists for a different category
  if (data.name) {
    const conflictingCategory = await Category.exists({
      name: data.name,
      _id: { $ne: categoryId }, // Exclude the current category
    });
    appAssert(
      !conflictingCategory,
      CONFLICT,
      "Category with this name already exists"
    );

    // Generate a slug from the new name
    data.slug = toSlug(data.name);
  } else if (data.slug) {
    // Ensure the slug is properly formatted even if only the slug is updated
    data.slug = toSlug(data.slug);
  }

  // Update the category with new details
  const updatedCategory = await Category.findByIdAndUpdate(categoryId, data, {
    new: true, // Return the updated document
    runValidators: true, // Ensure validation rules are applied
  });

  // Ensure the category update was successful
  appAssert(updatedCategory, NOT_FOUND, "Failed to update category");

  //return the data
  return updatedCategory;
};

export const deleteCategoryService = async (id: string) => {
  // Verify if the category ID exists in the database
  const category = await Category.findById(id);
  appAssert(category, NOT_FOUND, "Category does not exist");

  // Delete the category
  await Category.findByIdAndDelete(id);

  return { message: "Category deleted successfully" };
};
