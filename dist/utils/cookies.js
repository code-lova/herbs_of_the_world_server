"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearAuthCookies = exports.setAuthCookies = exports.getRefreshTokenCookiesOptions = exports.getAccessTokenCookiesOptions = exports.REFRESH_PATH = void 0;
const date_1 = require("./date");
exports.REFRESH_PATH = "/auth/refresh";
// Set secure cookies unless in development mode
const secure = process.env.NODE_ENV !== "development";
// Determine sameSite value based on NODE_ENV
const sameSiteValue = process.env.NODE_ENV === "development" ? "strict" : "none";
const defaults = {
    sameSite: sameSiteValue,
    httpOnly: true,
    secure,
};
// Access token cookie options (expires in 15 minutes)
const getAccessTokenCookiesOptions = () => ({
    ...defaults,
    path: "/", // Accessible to all routes
    maxAge: (0, date_1.fifteenMinutesInMilliseconds)(),
});
exports.getAccessTokenCookiesOptions = getAccessTokenCookiesOptions;
// Refresh token cookie options (expires in 30 days)
const getRefreshTokenCookiesOptions = () => ({
    ...defaults,
    maxAge: (0, date_1.thirtyDaysInMilliseconds)(),
    path: exports.REFRESH_PATH, //increses the security of our token
});
exports.getRefreshTokenCookiesOptions = getRefreshTokenCookiesOptions;
const setAuthCookies = ({ res, accessToken, refreshToken }) => {
    return res
        .cookie("accessToken", accessToken, (0, exports.getAccessTokenCookiesOptions)())
        .cookie("refreshToken", refreshToken, (0, exports.getRefreshTokenCookiesOptions)());
};
exports.setAuthCookies = setAuthCookies;
// Function to clear authentication cookies
const clearAuthCookies = (res) => {
    return res
        .clearCookie("accessToken", { ...defaults, path: "/" })
        .clearCookie("refreshToken", { ...defaults, path: exports.REFRESH_PATH });
};
exports.clearAuthCookies = clearAuthCookies;
