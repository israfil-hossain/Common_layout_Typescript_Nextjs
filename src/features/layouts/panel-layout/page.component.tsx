import { PropsWithChildren } from "react";
import { useNavigation } from "../shared";
import { SidebarWidth } from "./constants";

export const Page = ({ children }: PropsWithChildren) => {
  const { drawerOpen } = useNavigation();

  const pageWidth = drawerOpen ? `calc(100vh - ${SidebarWidth})` : "100vw";

  return (
    <div
      style={{
        width: pageWidth,
      }}
    >
      {children}
    </div>
  );
};
