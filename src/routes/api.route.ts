import { Router } from "express";
import {
  createCategoryHandler,
  createSubCategoryHandler,
  deleteCategoryHandler,
  deleteSubCategoryHandler,
  editCategoryHandler,
  fetchCategories,
  fetchSubCategories,
  updateCategoryHandler,
  updateSubCategoryHandler,
} from "../controllers/api.controller";

const apiRoutes = Router();

//Prefix /api

apiRoutes.post("/category/create", createCategoryHandler);
apiRoutes.get("/category/all", fetchCategories); //get all categories
apiRoutes.get("/category/:id", editCategoryHandler); //get a specific category
apiRoutes.put("/category/:categoryId", updateCategoryHandler); //Update category
apiRoutes.delete("/category/:categoryId", deleteCategoryHandler);

//subcategory API
apiRoutes.post("/subcategory/create", createSubCategoryHandler);
apiRoutes.get("/subcategory/all", fetchSubCategories); //get all sub categories
apiRoutes.put("/subcategory/:subCategoryId", updateSubCategoryHandler); //Update category
apiRoutes.delete("/subcategory/:subCategoryId", deleteSubCategoryHandler);


export default apiRoutes;
