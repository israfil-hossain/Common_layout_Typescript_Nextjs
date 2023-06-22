import { PropsWithChildren } from "react";

export const Row = ({
  children,
  className = "",
}: PropsWithChildren<{
  className?: string;
}>) => {
  return <div className={`grid ${className}`}>{children}</div>;
};
