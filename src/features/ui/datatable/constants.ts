import { PaginationParams } from "./types";

export const DefaultPageSize = 10;

export const RowsPerPageOptions = [5, 10, 25, 50];

export const InitialParams: PaginationParams = {
  page: 1,
  limit: DefaultPageSize,
};

export const DataTableSettingsKeys = [
  "tableTitle",
  "url",
  "isLoading",
  "columns",
  "topFilter",
  "bottomFilter",
  "hideSearch",
  "hidePagination",
  "params",
  "pageMeta",
];

export const PageMetaKeys = [
  "page",
  "limit",
  "totalPages",
  "totalDocs",
  "hasNext",
  "hasPrev",
];

export const FixedParamKeys = [
  "page",
  "limit",
  "sortBy",
  "sortOrder",
  "search",
];
