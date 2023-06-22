import { useSession } from "next-auth/react";
import useSWRMutation, { MutationFetcher } from "swr/mutation";
import { ApiClient } from "./client";
import { AxiosError, AxiosRequestConfig } from "axios";
import { InferErrorType } from "./infer-error.type";

/**
 * HTTP methods that may change server side data
 */
export type HTTPMutatingMethod = "POST" | "PUT" | "PATCH" | "DELETE";

/**
 * Supported additional options to pass to axios request
 */
export type RequestOptions<T> = Omit<
  AxiosRequestConfig<T>,
  "url" | "data" | "method"
>;

/**
 * Wrapper for mutating requests to the API.
 *
 * Provides way to mutate remote data by trigger function.
 *
 * @template RequestType - Type of the request payload
 * @template ResponseType - Type of the server response
 * @param url - API endpoint. i.e - /api/user/me
 * @param method - HTTP method
 * @param [options] - Axios request config
 */
export function useMutation<
  RequestType = Record<string, unknown>,
  ResponseType = Record<string, unknown>
>(
  url: string,
  method: HTTPMutatingMethod,
  options?: RequestOptions<RequestType>
) {
  const { data } = useSession();
  const access_token = data?.access_token;
  const { headers, ...restOfOptions } = options || {};
  const ctx = useSWRMutation(
    url,
    ((url, data) =>
      ApiClient.request({
        url,
        method: method,
        data: data.arg,
        ...(access_token && {
          headers: {
            Authorization: `Bearer ${access_token}`,
            ...headers,
          },
        }),
        ...restOfOptions,
      }).then((r) => r.data as ResponseType)) as MutationFetcher<
      ResponseType,
      RequestType,
      string
    >,
    { throwOnError: false }
  );

  const { error, ...rest } = ctx;

  // collect error message from server response
  const errorData = (error as AxiosError)?.response?.data as
    | InferErrorType<RequestType>
    | undefined;

  return {
    ...rest,
    error: errorData,
  };
}
