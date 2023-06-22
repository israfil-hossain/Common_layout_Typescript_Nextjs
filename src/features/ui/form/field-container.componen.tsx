import { PropsWithChildren } from "react";

export const FieldContainer = ({
  className = "",
  children,
}: PropsWithChildren<{
  className?: string;
}>) => {
  return <div className={`flex flex-column gap-1 ${children}`}>{children}</div>;
};
