import { CONFLICT, CREATED, NOT_FOUND } from "../constants/http";
import Category from "../models/category.model";
import SubCategory from "../models/subcategory.model";
import { createCategoryType, createSubCategoryType, QueryParams } from "../types";
import appAssert from "../utils/appAssert";
import { toSlug } from "../utils/slug";

export const createCategoryService = async (data: createCategoryType) => {
  //verify if the category already exists
  const existingCategory = await Category.exists({
    $or: [{ name: data.name }, { slug: toSlug(data.slug || data.name) }],
  });

  appAssert(
    !existingCategory,
    CONFLICT,
    "Category name or slug already exists"
  );

  // Generate a slug if it isn't provided or incorrectly formatted
  const slug =
    data.slug && data.slug.trim() !== ""
      ? toSlug(data.slug)
      : toSlug(data.name);

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

//This was not needed any more...
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

export const deleteCategoryService = async (categoryId: string) => {
  // Verify if the category ID exists in the database
  const category = await Category.findById(categoryId);
  appAssert(category, NOT_FOUND, "Category does not exist");

  // Delete the category
  await Category.findByIdAndDelete(categoryId);

  return { message: "Category deleted successfully" };
};

//** This is for sub category service  */

export const createSubCategoryService = async (data: createSubCategoryType) => {
  //verify if the subcategory already exists
  const existingCategory = await SubCategory.exists({
    $or: [{ name: data.name }, { slug: toSlug(data.slug || data.name) }],
  });

  appAssert(
    !existingCategory,
    CONFLICT,
    "Subcategory name or slug already exists"
  );

  // Generate a slug if it isn't provided or incorrectly formatted
  const slug =
    data.slug && data.slug.trim() !== ""
      ? toSlug(data.slug)
      : toSlug(data.name);

  //create the subcategory
  const newSubCategory = await SubCategory.create({
    ...data,
    slug,
  });

  //return the data
  return {
    status: CREATED,
    message: "Subcategory created successfully",
    Subcategory: newSubCategory,
  };
};

export const fetchSubCategoriesService = async (
  { searchTerm, page, limit }: QueryParams
) => {
  // Calculate the number of documents to skip
  const skip = (page - 1) * limit;

  // Create a filter for search
  const searchFilter = searchTerm
    ? { name: { $regex: searchTerm, $options: "i" } } // Case-insensitive search
    : {};

  // Fetch the subcategories with pagination
  const subCategories = await SubCategory.find(searchFilter)
    .populate("categoryId", "name") // Populate the category name
    .sort({ createdAt: -1 }) // Sort by newest first
    .skip(skip) // Skip documents for pagination
    .limit(limit); // Limit the number of documents returned

  // Get the total count for pagination metadata
  const total = await SubCategory.countDocuments(searchFilter);

  return {
    subCategories,
    total,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
  };
};

export const updateSubCategoryService = async (
  subCategoryId: string,
  data: createSubCategoryType
) => {
  //verify if the category id exists in the database
  const existingSubCategory = await SubCategory.findById(subCategoryId);
  appAssert(existingSubCategory, NOT_FOUND, "Subcategory does not exists");

  // Verify if the updated name already exists for a different sub category
  if (data.name) {
    const conflictingSubCategory = await SubCategory.exists({
      name: data.name,
      _id: { $ne: subCategoryId }, // Exclude the current sub category
    });
    appAssert(
      !conflictingSubCategory,
      CONFLICT,
      "Sub Category with this name already exists"
    );

    // Generate a slug from the new name
    data.slug = toSlug(data.name);
  } else if (data.slug) {
    // Ensure the slug is properly formatted even if only the slug is updated
    data.slug = toSlug(data.slug);
  }

  // Update the category with new details
  const updatedSubCategory = await SubCategory.findByIdAndUpdate(
    subCategoryId,
    data,
    {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation rules are applied
    }
  );

  // Ensure the category update was successful
  appAssert(updatedSubCategory, NOT_FOUND, "Failed to update sub category");

  //return the data
  return updatedSubCategory;
};

export const deleteSubCategoryService = async (subCategoryId: string) => {
  // Verify if the sub category ID exists in the database
  const subCategory = await SubCategory.findById(subCategoryId);
  appAssert(subCategory, NOT_FOUND, "Subcategory does not exist");

  // Delete the category
  await SubCategory.findByIdAndDelete(subCategoryId);

  return { message: "Subcategory deleted successfully" };
};
