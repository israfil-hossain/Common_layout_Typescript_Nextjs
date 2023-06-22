import { Sidebar } from "primereact/sidebar";
import { useNavigation } from "../shared";
import { SidebarPanel } from "./sidebar-panel.component";

export const SidebarDrawer = () => {
  const { drawerOpen, toggleDrawer } = useNavigation();

  return (
    <div className="card flex justify-content-center">
      <Sidebar
        visible={drawerOpen}
        onHide={toggleDrawer}
        pt={{
          content() {
            return {
              className: "px-1",
            };
          },
        }}
        className="w-15rem"
      >
        <SidebarPanel />
      </Sidebar>
    </div>
  );
};
