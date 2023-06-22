export type PaginationResponse<T> = {
  docs: T[];
  page: number;
  limit: number;
  totalPages: number;
  totalDocs: number;
  hasNext: boolean;
  hasPrev: boolean;
};
