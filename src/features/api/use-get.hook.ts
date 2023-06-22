import { AxiosError, AxiosRequestConfig } from "axios";
import useSWR, { SWRConfiguration } from "swr";
import { ApiClient } from "./client";
import { useSession } from "next-auth/react";
import { InferErrorType } from "./infer-error.type";

/**
 * Wrapper for GET request to the API
 *
 * @param url - API endpoint. i.e - /api/user/me
 * @param params - Optional search queries.
 * @param options - SWR options
 */
export function useGet<ResponseType = Record<string, unknown>>(
  url: string,
  params?: AxiosRequestConfig["params"],
  options?: SWRConfiguration<ResponseType>
) {
  const { data } = useSession();
  const access_token = data?.access_token;
  const ctx = useSWR(
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
      }).then((r) => r.data as ResponseType),
    options
  );

  const { error, ...rest } = ctx;

  // collect error message from server response
  const errorData = (error as AxiosError)?.response?.data as
    | Omit<InferErrorType<never>, "validationErrors">
    | undefined;

  return {
    ...rest,
    error: errorData,
  };
}
