import { NextRouter } from "next/router";
import { MenuItem } from "primereact/menuitem";
import { MdSpaceDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

export const sidebarMenuFactory = (router: NextRouter): MenuItem[] => {
  return [
    {
      label: "Dashboard",
      icon: () => <MdSpaceDashboard />,
      className: "without-items",
      command: () => {
        router.push("/");
      },
    },
    {
      label: "Users",
      items: [
        {
          icon: () => <FaUsers />,
          label: "List",
          command: () => {
            router.push("/users");
          },
        },
      ],
    },
    {
      label: "Logout",
      icon: () => <FiLogOut />,
      command: () => {
        router.push("/auth/logout");
      },
    },
  ];
};
