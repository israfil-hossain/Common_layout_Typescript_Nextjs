import { signOut, useSession } from "next-auth/react";
import { PropsWithChildren, useEffect } from "react";
import { RefreshTokenError } from "./next-auth";
import { PageLoader } from "features/ui";

export function PageGuard({ children }: PropsWithChildren) {
  const { data, status } = useSession();

  useEffect(() => {
    if (data?.error === RefreshTokenError) {
      // example says to use signIn, but we will signOut with
      // redirection enabled, so theres no confusion that the tokens
      // are invalid or something like that
      // idea taken from next-auth's experiemental doc -
      // https://authjs.dev/guides/basics/refresh-token-rotation
      signOut({ redirect: true });
    }
  }, [data]);

  return (
    <PageLoader fullHeight loading={status === "loading"}>
      {children}
    </PageLoader>
  );
}
