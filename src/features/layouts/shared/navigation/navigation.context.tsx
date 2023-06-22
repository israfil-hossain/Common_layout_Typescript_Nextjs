import { createContext } from "react";

export const NavigationContext = createContext({
  drawerOpen: false,
  sidebarOpen: true,
  toggleSidebar: () => {},
  toggleDrawer: () => {},
});
