import { PropsWithChildren } from "react";
import { GlobalProviders } from "../shared";

export function BlankLayout({ children }: PropsWithChildren) {
  return <GlobalProviders>{children}</GlobalProviders>;
}
