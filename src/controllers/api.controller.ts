import { BAD_REQUEST, NOT_FOUND, OK } from "../constants/http";
import { categorySchema, subCategorySchema } from "../schemas/api.schema";
import {
  createCategoryService,
  createSubCategoryService,
  deleteCategoryService,
  deleteSubCategoryService,
  fetchCategoriesService,
  fetchcategoryById,
  fetchSubCategoriesService,
  updateCategoryService,
  updateSubCategoryService,
} from "../services/api.service";
import { QueryParams } from "../types";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchErrors";
import { parseQueryParams } from "../utils/helpers";

export const createCategoryHandler = catchErrors(async (req, res) => {
  //validate request
  const request = categorySchema.parse({ ...req.body });

  // Call the service to create the category
  const newCategory = await createCategoryService(request);

  // Return response
  return res.status(OK).json({
    message: "Category created successfully",
    category: newCategory,
  });
});

export const fetchCategories = catchErrors(async (req, res) => {
  // call the service
  const categories = await fetchCategoriesService();

  // Return response
  return res.status(OK).json({
    message: "Categories fetched successfully",
    categories,
  });
});

export const editCategoryHandler = catchErrors(async (req, res) => {
  // Extract category ID from the request parameters
  const { id } = req.params;

  // Ensure category ID exists
  appAssert(id, BAD_REQUEST, "Category ID is required");

  const category = await fetchcategoryById(id);

  return res.status(OK).json({
    message: "Category fetched successfully",
    category,
  });
});

export const updateCategoryHandler = catchErrors(async (req, res) => {
  // Extract categoryId from params
  const { categoryId } = req.params;

  // Ensure categoryId exists
  appAssert(categoryId, BAD_REQUEST, "Category ID is required");

  // Validate request body
  const request = categorySchema.parse({ ...req.body });

  // Call the service to update the category
  const updatedCategory = await updateCategoryService(categoryId, request);

  // Return response

  return res.status(OK).json({
    message: "category Updated successfully",
    category: updatedCategory,
  });
});


export const deleteCategoryHandler = catchErrors(async (req, res) => {
  // Extract category ID from the request parameters
  const { categoryId } = req.params;

  // Ensure category ID exists
  appAssert(categoryId, BAD_REQUEST, "Category ID is required");

  // Call the service to delete the category
  await deleteCategoryService(categoryId);

  // Return response
  return res.status(OK).json({
    message: "Category deleted successfully",
  });
});



//**** This is for sub categories handlers ***/


export const createSubCategoryHandler = catchErrors(async (req, res) => {
  //validate request
  const request = subCategorySchema.parse({ ...req.body });

  // Call the service to create the category
  const newSubCategory = await createSubCategoryService(request);

  // Return response
  return res.status(OK).json({
    message: "Subcategory created successfully",
    category: newSubCategory,
  });
});


export const fetchSubCategories = catchErrors(async (req, res) => {

  // Use the helper function to extract and validate query parameters
  const { searchTerm, page, limit }: QueryParams = parseQueryParams(req.query);

  // Call the service with the correct arguments
  const subCategories = await fetchSubCategoriesService({ page, limit, searchTerm });

 
  // Return response
  return res.status(OK).json({
    message: "Subcategories fetched successfully",
    subCategories,
  });
});


export const updateSubCategoryHandler = catchErrors(async (req, res) => {
  // Extract categoryId from params
  const { subCategoryId } = req.params;

  // Ensure categoryId exists
  appAssert(subCategoryId, BAD_REQUEST, "Sub Category ID is required");

  // Validate request body
  const request = subCategorySchema.parse({ ...req.body });

  // Call the service to update the category
  const updatedSubCategory = await updateSubCategoryService(subCategoryId, request);

  // Return response

  return res.status(OK).json({
    message: "Subcategory Updated successfully",
    Subcategory: updatedSubCategory,
  });
});


export const deleteSubCategoryHandler = catchErrors(async (req, res) => {
  // Extract category ID from the request parameters
  const { subCategoryId } = req.params;

  // Ensure category ID exists
  appAssert(subCategoryId, BAD_REQUEST, "Subcategory ID is required");

  // Call the service to delete the category
  await deleteSubCategoryService(subCategoryId);

  // Return response
  return res.status(OK).json({
    message: "Subcategory deleted successfully",
  });
});