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