import { CookieOptions, Response } from "express";
import { fifteenMinutesInMilliseconds, thirtyDaysInMilliseconds } from "./date";

export const REFRESH_PATH = "/auth/refresh";

// Set secure cookies unless in development mode
const secure = process.env.NODE_ENV !== "development";

const defaults: CookieOptions = {
  sameSite: "none" as const,
  httpOnly: true,
  secure,
};

// Access token cookie options (expires in 15 minutes)
export const getAccessTokenCookiesOptions = (): CookieOptions => ({
  ...defaults,
  path: "/", // Accessible to all routes
  maxAge: fifteenMinutesInMilliseconds(),
});


// Refresh token cookie options (expires in 30 days)
export const getRefreshTokenCookiesOptions = (): CookieOptions => ({
  ...defaults,
  maxAge: thirtyDaysInMilliseconds(),
  path: REFRESH_PATH, //increses the security of our token
});

type SetAuthCookiesParams = {
  res: Response;
  accessToken: string;
  refreshToken: string;
};

export const setAuthCookies = ({ res, accessToken, refreshToken }: SetAuthCookiesParams) => {
  return res
    .cookie("accessToken", accessToken, getAccessTokenCookiesOptions())
    .cookie("refreshToken", refreshToken, getRefreshTokenCookiesOptions());
};


// Function to clear authentication cookies
export const clearAuthCookies = (res: Response) => {
  return res
  .clearCookie("accessToken", { path: "/"})
  .clearCookie("refreshToken", { path: REFRESH_PATH });
};