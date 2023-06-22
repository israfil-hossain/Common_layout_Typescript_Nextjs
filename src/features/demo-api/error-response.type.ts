export type ErrorResponse = {
  status?: number;
  message?: string;
  validationErrors?: Record<string, unknown>;
};
