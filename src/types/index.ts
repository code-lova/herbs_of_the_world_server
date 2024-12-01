import { sessionDocument } from "../models/session.model";
import { UserDocument } from "../models/user.model";
import mongoose from "mongoose";

export type UserRole = "admin" | "user";

export const UserRoles: UserRole[] = ["admin", "user"];

export const enum verificationCodeType {
  EmailVerification = "email_verification",
  PasswordReset = "password_reset",
}

export const enum AppErrorCode {
    InvalidAccessToken = "InvalidAccessToken",
    UserNotFound = "UserNotFound",
    AccessDenied = "AccessDenied",
}

export type CreateAccountParams = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  userAgent?: string;
};

export type loginUserParams = {
  email: string;
  password: string;
  userAgent?: string;
};

export type refreshTokenPayload = {
  sessionId: sessionDocument["_id"],
};

export type accessTokenPayload = {
  userId: mongoose.Types.ObjectId;
  sessionId: mongoose.Types.ObjectId;
}



export type EmailConfig = {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
};

export type resetPasswordType = {
  password: string;
  resetVerificationCode: string;
};

export type createCategoryType = {
  name: string;
  slug: string;
  description?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  canonicalUrl?: string;
}

export enum Status {
  ACTIVE = "active",
  INACTIVE = "inactive"
}

export type createSubCategoryType = {
  name: string;
  slug: string;
  description?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  canonicalUrl?: string;
  categoryId: string;
  status: Status | "active" | "inactive";
}

export interface QueryParams {
  searchTerm: string;
  page: number;
  limit: number;
}
