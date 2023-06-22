import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";
import { NavigationProvider } from "../shared";
import { NavbarWrapper } from "./navbar-wrapper.component";
import { Page } from "./page.component";
import { SidebarDrawer } from "./sidebar-drawer.component";
import { Sidebar } from "./sidebar.component";

export const PanelLayout = ({ children }: PropsWithChildren) => {
  return (
    <SessionProvider>
      <NavigationProvider>
        <div className="flex flex-column">
          <SidebarDrawer />

          {/* Navbar */}
          <NavbarWrapper />
          {/* mobile screen sidebar drawer */}

          <div className="flex">
            {/* Sidebar */}
            <Sidebar />

            <Page>{children}</Page>
          </div>
        </div>
      </NavigationProvider>
    </SessionProvider>
  );
};
