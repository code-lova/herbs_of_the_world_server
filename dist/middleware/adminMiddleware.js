"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("../constants/http");
const user_model_1 = __importDefault(require("../models/user.model"));
const appError_1 = __importDefault(require("../utils/appError"));
const adminMiddleware = async (req, res, next) => {
    const userId = req.userId; // Set by authenticate middleware
    // Assert that userId exists
    if (!userId) {
        return next(new appError_1.default(http_1.FORBIDDEN, "Access denied. User not found.", "AccessDenied" /* AppErrorCode.AccessDenied */));
    }
    // Fetch the user from the database
    const user = await user_model_1.default.findById(userId).select("role"); // Fetch only the role field
    // Check if the user exists and is an admin
    if (!user || user.role !== 'admin') {
        return next(new appError_1.default(http_1.FORBIDDEN, "Access denied. Admins only.", "AccessDenied" /* AppErrorCode.AccessDenied */));
    }
    next(); // User is an admin, proceed to the next middleware/route handler
};
exports.default = adminMiddleware;
