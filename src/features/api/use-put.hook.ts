import { RequestOptions, useMutation } from "./use-mutation.hook";

/**
 * Wrapper for PUT request to the API.
 *
 * Provides way to mutate remote data by trigger function.
 *
 * @template RequestType - Type of the request payload
 * @template ResponseType - Type of the server response
 * @param url - API endpoint. i.e - /api/user/me
 * @param [options] - Additional options to pass to axios
 */
export function usePut<
  RequestType = Record<string, unknown>,
  ResponseType = Record<string, unknown>
>(url: string, options?: RequestOptions<RequestType>) {
  const ctx = useMutation<RequestType, ResponseType>(url, "PUT", options);
  return ctx;
}
