"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oneHourFromNow = exports.fiveMinutesAgo = exports.thirtyDaysInMilliseconds = exports.fifteenMinutesInMilliseconds = exports.fifteenMinutesFromNow = exports.thirtyDaysFromNow = exports.twentyFourHoursFromNow = exports.oneYearFromNow = void 0;
const oneYearFromNow = () => {
    const now = new Date();
    return new Date(now.setFullYear(now.getFullYear() + 1));
};
exports.oneYearFromNow = oneYearFromNow;
const twentyFourHoursFromNow = () => {
    const now = new Date();
    return new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours in milliseconds
};
exports.twentyFourHoursFromNow = twentyFourHoursFromNow;
const thirtyDaysFromNow = () => {
    const now = new Date();
    return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days in milliseconds
};
exports.thirtyDaysFromNow = thirtyDaysFromNow;
const fifteenMinutesFromNow = () => {
    const now = new Date();
    return new Date(now.getTime() + 15 * 60 * 1000); // 15 mins in milliseconds
};
exports.fifteenMinutesFromNow = fifteenMinutesFromNow;
const fifteenMinutesInMilliseconds = () => 15 * 60 * 1000;
exports.fifteenMinutesInMilliseconds = fifteenMinutesInMilliseconds;
const thirtyDaysInMilliseconds = () => 30 * 24 * 60 * 60 * 1000;
exports.thirtyDaysInMilliseconds = thirtyDaysInMilliseconds;
const fiveMinutesAgo = () => {
    const now = new Date();
    return new Date(now.getTime() - 5 * 60 * 1000); // 5 mins in miliseconds
};
exports.fiveMinutesAgo = fiveMinutesAgo;
const oneHourFromNow = () => {
    const now = new Date();
    return new Date(now.getTime() + 60 * 60 * 1000); //1 hour in miliseconds
};
exports.oneHourFromNow = oneHourFromNow;
