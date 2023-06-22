import { useNavigation } from "../shared";
import { SidebarWidth } from "./constants";
import { SidebarPanel } from "./sidebar-panel.component";

export const Sidebar = () => {
  const { sidebarOpen } = useNavigation();

  return (
    <div
      className="sidebar border-right-1 border-primary-50 overflow-auto hidden md:block"
      style={{
        width: sidebarOpen ? SidebarWidth : 0,
        minHeight: "calc(100vh - 64px)",
      }}
    >
      <SidebarPanel />
    </div>
  );
};
