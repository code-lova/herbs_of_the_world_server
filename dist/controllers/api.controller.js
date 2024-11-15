"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryHandler = exports.updateCategoryHandler = exports.editCategoryHandler = exports.fetchCategories = exports.createCategoryHandler = void 0;
const http_1 = require("../constants/http");
const api_schema_1 = require("../schemas/api.schema");
const api_service_1 = require("../services/api.service");
const appAssert_1 = __importDefault(require("../utils/appAssert"));
const catchErrors_1 = __importDefault(require("../utils/catchErrors"));
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
    const { id } = req.params;
    // Ensure category ID exists
    (0, appAssert_1.default)(id, http_1.BAD_REQUEST, "Category ID is required");
    // Call the service to delete the category
    await (0, api_service_1.deleteCategoryService)(id);
    // Return response
    return res.status(http_1.OK).json({
        message: "Category deleted successfully",
    });
});
