import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

export type NextPageWithLayout<Props = {}> = NextPage<Props> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
