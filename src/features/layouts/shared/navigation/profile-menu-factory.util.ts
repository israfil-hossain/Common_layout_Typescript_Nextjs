import { NextRouter } from "next/router";
import { MenuItem } from "primereact/menuitem";

export function profileMenuFactory(router: NextRouter): MenuItem[] {
  return [
    {
      label: "Profile",
      className: "text-base py-0",
    },
    {
      label: "Logout",
      className: "text-base py-0",
      command(event) {
        router.push("/auth/logout");
      },
    },
  ];
}
