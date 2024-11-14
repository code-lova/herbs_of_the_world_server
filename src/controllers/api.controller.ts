import { BAD_REQUEST, NOT_FOUND, OK } from "../constants/http";
import { categorySchema } from "../schemas/api.schema";
import {
  createCategoryService,
  deleteCategoryService,
  fetchCategoriesService,
  fetchcategoryById,
  updateCategoryService,
} from "../services/api.service";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchErrors";

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
  const { id } = req.params;

  // Ensure category ID exists
  appAssert(id, BAD_REQUEST, "Category ID is required");

  // Call the service to delete the category
  await deleteCategoryService(id);

  // Return response
  return res.status(OK).json({
    message: "Category deleted successfully",
  });
});
