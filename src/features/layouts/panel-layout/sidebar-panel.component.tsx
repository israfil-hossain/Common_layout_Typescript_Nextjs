import { sidebarMenuFactory } from "../shared";
import { useRouter } from "next/router";
import { PanelMenu } from "primereact/panelmenu";

export const SidebarPanel = () => {
  const router = useRouter();
  const sidebarMenuItemList = sidebarMenuFactory(router);

  return (
    <PanelMenu
      model={sidebarMenuItemList}
      className="w-full main-sidebar p-1"
      pt={{
        menuitem() {
          return {
            className: "font-normal text-xs ",
          };
        },
        headerAction() {
          return {
            style: {
              background: "white",
              borderTop: "none",
              borderRight: "none",
              borderLeft: "none",
              borderBottom: "1px solid #eee",
              padding: "13px 15px",
            },
            className: "text-sm font-medium hover:bg-primary-50",
          };
        },
      }}
    />
  );
};
