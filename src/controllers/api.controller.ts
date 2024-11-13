import { OK } from "../constants/http";
import { categorySchema } from "../schemas/api.schema";
import { createCategoryService } from "../services/api.service";
import catchErrors from "../utils/catchErrors";



export const categoryHandler = catchErrors(async (req, res) => {

    //validate request
    const request = categorySchema.parse({...req.body});

   // Call the service to create the category
  const newCategory = await createCategoryService(request);

  // Return response
  return res.status(OK).json({
    message: "Category created successfully",
    category: newCategory,
  });
})