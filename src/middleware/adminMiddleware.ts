import { RequestHandler } from "express";
import { FORBIDDEN } from "../constants/http";
import { AppErrorCode } from "../types";
import User from "../models/user.model";
import AppError from "../utils/appError";

const adminMiddleware: RequestHandler = async (req, res, next) => {
    const userId = req.userId; // Set by authenticate middleware

     // Assert that userId exists
     if (!userId) {
        return next(new AppError(FORBIDDEN, "Access denied. User not found.", AppErrorCode.AccessDenied));
    }

    // Fetch the user from the database
    const user = await User.findById(userId).select("role"); // Fetch only the role field

   // Check if the user exists and is an admin
   if (!user || user.role !== 'admin') {
    return next(new AppError(FORBIDDEN, "Access denied. Admins only.", AppErrorCode.AccessDenied));
}
    next(); // User is an admin, proceed to the next middleware/route handler
};

export default adminMiddleware;
