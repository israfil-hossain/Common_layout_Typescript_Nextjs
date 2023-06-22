import { AxiosError, AxiosRequestConfig } from "axios";
import { useSession } from "next-auth/react";
import useSWRMutation from "swr/mutation";
import { ApiClient } from "./client";
import { InferErrorType } from "./infer-error.type";

/**
 * Wrapper for lazy GET request to the API.
 * Collected from - https://github.com/vercel/swr/issues/176
 *
 * @param url - API endpoint. i.e - /api/user/me
 * @param params - Optional search queries.
 */
export function useLazyGet<T = Record<string, unknown>>(
  url: string,
  params?: AxiosRequestConfig["params"]
) {
  const { data } = useSession();
  const access_token = data?.access_token;
  const ctx = useSWRMutation(
    url,
    (url) =>
      ApiClient.request({
        url,
        params,
        ...(access_token && {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }),
      }).then((r) => r.data as T),
    { throwOnError: false }
  );

  const { error, isMutating, ...rest } = ctx;

  // collect error message from server response
  const errorData = (error as AxiosError)?.response?.data as
    | Omit<InferErrorType<never>, "validationErrors">
    | undefined;

  return {
    ...rest,
    isLoading: isMutating,
    error: errorData,
  };
}
