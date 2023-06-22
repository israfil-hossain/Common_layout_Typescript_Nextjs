import { PropsWithChildren } from "react";

export const Col = ({
  className = "",
  children,
}: PropsWithChildren<{
  className?: string;
}>) => {
  return <div className={`col ${className}`}>{children}</div>;
};
