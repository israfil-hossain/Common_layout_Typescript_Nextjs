import { Image } from "features/ui";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { Menubar } from "primereact/menubar";
import { useRef } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { useMedia } from "react-use";
import { profileMenuFactory, useNavigation } from "../shared";
import DefaultLogo from "./images/tn.svg";

export const Navbar = ({ fixed }: { fixed?: boolean }) => {
  return (
    <div
      className={`w-full  ${fixed ? "fixed" : ""}`}
      style={{
        zIndex: fixed ? 1 : -5,
      }}
    >
      <Menubar
        start={Start}
        end={End}
        pt={{
          button() {
            return {
              className: "hidden",
            };
          },
          menu() {
            return {
              className: "hidden",
            };
          },
        }}
      />
    </div>
  );
};

const Start = () => {
  const isMediumScreen = useMedia("(min-width: 768px)", true);
  const { toggleDrawer, toggleSidebar } = useNavigation();

  const onClick = () => {
    if (isMediumScreen) {
      toggleSidebar();
    } else {
      toggleDrawer();
    }
  };

  return (
    <div className="flex gap-1 align-items-center">
      <div>
        <Image
          src={DefaultLogo}
          alt="dummy image"
          width={70}
          height={40}
          style={{
            borderRadius: 10,
          }}
        />
      </div>

      <div className="">
        <Button
          onClick={onClick}
          icon={<RxHamburgerMenu className="text-lg text-primary-900" />}
          className="p-1 bg-transparent text-black border-none"
        />
      </div>
    </div>
  );
};

const End = () => {
  const menuLeft = useRef<Menu>(null);
  const router = useRouter();
  const items = profileMenuFactory(router);
  const { data } = useSession();

  return (
    <div>
      <Menu model={items} popup ref={menuLeft} className="navbar-fixed-menu" />

      <Avatar
        image={data?.user?.avatar}
        label="J"
        size="normal"
        shape="circle"
        onClick={(event) => menuLeft?.current?.toggle(event)}
        className="border-circle bg-primary"
      />
    </div>
  );
};
