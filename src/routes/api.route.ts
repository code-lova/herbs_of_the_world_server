import { Router } from "express";
import { categoryHandler } from "../controllers/api.controller";

const apiRoutes = Router();


//Prefix /api

apiRoutes.post("/category/create", categoryHandler);


export default apiRoutes;

