import { PageGuard } from "features/auth";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";

export function GlobalProviders({ children, session }: PropsWithChildren<any>) {
  return (
    <SessionProvider session={session}>
      <PageGuard>{children}</PageGuard>
      <ToastContainer />
    </SessionProvider>
  );
}
