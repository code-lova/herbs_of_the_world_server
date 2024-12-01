"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubCategoryHandler = exports.updateSubCategoryHandler = exports.fetchSubCategories = exports.createSubCategoryHandler = exports.deleteCategoryHandler = exports.updateCategoryHandler = exports.editCategoryHandler = exports.fetchCategories = exports.createCategoryHandler = void 0;
const http_1 = require("../constants/http");
const api_schema_1 = require("../schemas/api.schema");
const api_service_1 = require("../services/api.service");
const appAssert_1 = __importDefault(require("../utils/appAssert"));
const catchErrors_1 = __importDefault(require("../utils/catchErrors"));
const helpers_1 = require("../utils/helpers");
exports.createCategoryHandler = (0, catchErrors_1.default)(async (req, res) => {
    //validate request
    const request = api_schema_1.categorySchema.parse({ ...req.body });
    // Call the service to create the category
    const newCategory = await (0, api_service_1.createCategoryService)(request);
    // Return response
    return res.status(http_1.OK).json({
        message: "Category created successfully",
        category: newCategory,
    });
});
exports.fetchCategories = (0, catchErrors_1.default)(async (req, res) => {
    // call the service
    const categories = await (0, api_service_1.fetchCategoriesService)();
    // Return response
    return res.status(http_1.OK).json({
        message: "Categories fetched successfully",
        categories,
    });
});
exports.editCategoryHandler = (0, catchErrors_1.default)(async (req, res) => {
    // Extract category ID from the request parameters
    const { id } = req.params;
    // Ensure category ID exists
    (0, appAssert_1.default)(id, http_1.BAD_REQUEST, "Category ID is required");
    const category = await (0, api_service_1.fetchcategoryById)(id);
    return res.status(http_1.OK).json({
        message: "Category fetched successfully",
        category,
    });
});
exports.updateCategoryHandler = (0, catchErrors_1.default)(async (req, res) => {
    // Extract categoryId from params
    const { categoryId } = req.params;
    // Ensure categoryId exists
    (0, appAssert_1.default)(categoryId, http_1.BAD_REQUEST, "Category ID is required");
    // Validate request body
    const request = api_schema_1.categorySchema.parse({ ...req.body });
    // Call the service to update the category
    const updatedCategory = await (0, api_service_1.updateCategoryService)(categoryId, request);
    // Return response
    return res.status(http_1.OK).json({
        message: "category Updated successfully",
        category: updatedCategory,
    });
});
exports.deleteCategoryHandler = (0, catchErrors_1.default)(async (req, res) => {
    // Extract category ID from the request parameters
    const { categoryId } = req.params;
    // Ensure category ID exists
    (0, appAssert_1.default)(categoryId, http_1.BAD_REQUEST, "Category ID is required");
    // Call the service to delete the category
    await (0, api_service_1.deleteCategoryService)(categoryId);
    // Return response
    return res.status(http_1.OK).json({
        message: "Category deleted successfully",
    });
});
//**** This is for sub categories handlers ***/
exports.createSubCategoryHandler = (0, catchErrors_1.default)(async (req, res) => {
    //validate request
    const request = api_schema_1.subCategorySchema.parse({ ...req.body });
    // Call the service to create the category
    const newSubCategory = await (0, api_service_1.createSubCategoryService)(request);
    // Return response
    return res.status(http_1.OK).json({
        message: "Subcategory created successfully",
        category: newSubCategory,
    });
});
exports.fetchSubCategories = (0, catchErrors_1.default)(async (req, res) => {
    // Use the helper function to extract and validate query parameters
    const { searchTerm, page, limit } = (0, helpers_1.parseQueryParams)(req.query);
    // Call the service with the correct arguments
    const subCategories = await (0, api_service_1.fetchSubCategoriesService)({ page, limit, searchTerm });
    // Return response
    return res.status(http_1.OK).json({
        message: "Subcategories fetched successfully",
        subCategories,
    });
});
exports.updateSubCategoryHandler = (0, catchErrors_1.default)(async (req, res) => {
    // Extract categoryId from params
    const { subCategoryId } = req.params;
    // Ensure categoryId exists
    (0, appAssert_1.default)(subCategoryId, http_1.BAD_REQUEST, "Sub Category ID is required");
    // Validate request body
    const request = api_schema_1.subCategorySchema.parse({ ...req.body });
    // Call the service to update the category
    const updatedSubCategory = await (0, api_service_1.updateSubCategoryService)(subCategoryId, request);
    // Return response
    return res.status(http_1.OK).json({
        message: "Subcategory Updated successfully",
        Subcategory: updatedSubCategory,
    });
});
exports.deleteSubCategoryHandler = (0, catchErrors_1.default)(async (req, res) => {
    // Extract category ID from the request parameters
    const { subCategoryId } = req.params;
    // Ensure category ID exists
    (0, appAssert_1.default)(subCategoryId, http_1.BAD_REQUEST, "Subcategory ID is required");
    // Call the service to delete the category
    await (0, api_service_1.deleteSubCategoryService)(subCategoryId);
    // Return response
    return res.status(http_1.OK).json({
        message: "Subcategory deleted successfully",
    });
});
