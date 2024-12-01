"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const api_controller_1 = require("../controllers/api.controller");
const apiRoutes = (0, express_1.Router)();
//Prefix /api
apiRoutes.post("/category/create", api_controller_1.createCategoryHandler);
apiRoutes.get("/category/all", api_controller_1.fetchCategories); //get all categories
apiRoutes.get("/category/:id", api_controller_1.editCategoryHandler); //get a specific category
apiRoutes.put("/category/:categoryId", api_controller_1.updateCategoryHandler); //Update category
apiRoutes.delete("/category/:categoryId", api_controller_1.deleteCategoryHandler);
//subcategory API
apiRoutes.post("/subcategory/create", api_controller_1.createSubCategoryHandler);
apiRoutes.get("/subcategory/all", api_controller_1.fetchSubCategories); //get all sub categories
apiRoutes.put("/subcategory/:subCategoryId", api_controller_1.updateSubCategoryHandler); //Update category
apiRoutes.delete("/subcategory/:subCategoryId", api_controller_1.deleteSubCategoryHandler);
exports.default = apiRoutes;
