import { QueryParams } from "../types";

export const parseQueryParams = (
  query: any
): QueryParams => {
  const searchTerm = String(query.searchTerm || "");
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;

  return { searchTerm, page, limit };
};