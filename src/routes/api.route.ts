import { Router } from "express";
import {
  createCategoryHandler,
  deleteCategoryHandler,
  editCategoryHandler,
  fetchCategories,
  updateCategoryHandler,
} from "../controllers/api.controller";

const apiRoutes = Router();

//Prefix /api

apiRoutes.post("/category/create", createCategoryHandler);
apiRoutes.get("/category/all", fetchCategories); //get all categories
apiRoutes.get("/category/:id", editCategoryHandler); //get a specific category
apiRoutes.put("/category/:categoryId", updateCategoryHandler); //Update category
apiRoutes.delete("/category/:id", deleteCategoryHandler);

export default apiRoutes;
