import { CONFLICT, CREATED } from "../constants/http";
import Category from "../models/category.model";
import { createCategoryType } from "../types";
import appAssert from "../utils/appAssert";
import { toSlug } from "../utils/slug";



export const createCategoryService = async(data: createCategoryType) => {

    //verify if the category already exists
    const existingCategory = await Category.exists({
        name: data.name
    });

    appAssert(!existingCategory, CONFLICT, "Category already exists");

    // Generate a slug if it isn't provided
    const slug = data.slug || toSlug(data.name);

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

}