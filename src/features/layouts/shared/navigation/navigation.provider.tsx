import { PropsWithChildren, useState } from "react";
import { NavigationContext } from "./navigation.context";

export const NavigationProvider = ({ children }: PropsWithChildren) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  const value = {
    drawerOpen,
    sidebarOpen,
    toggleDrawer,
    toggleSidebar,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};
