"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseQueryParams = void 0;
const parseQueryParams = (query) => {
    const searchTerm = String(query.searchTerm || "");
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    return { searchTerm, page, limit };
};
exports.parseQueryParams = parseQueryParams;
