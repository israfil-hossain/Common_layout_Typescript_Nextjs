import { AxiosRequestConfig } from "axios";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { ApiClient } from "./client";

/**
 * Call API endpoints from nextjs's server side props functions.
 *
 * @template ResponseType - API response type definition
 * @template RequestType - API request body type definition
 * @param context - Nextjs's server side props context
 * @param config - Axios configuration
 */
export async function callApi<
  ResponseType = Record<string, unknown>,
  RequestType = Record<string, unknown>
>(
  context: GetServerSidePropsContext,
  { headers, ...rest }: AxiosRequestConfig<RequestType>
) {
  const session = await getSession(context);
  const accessToken = session?.access_token;

  return ApiClient.request<ResponseType>({
    ...rest,
    headers: {
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...headers,
    },
  }).then((resp) => resp.data);
}
