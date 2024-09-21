// import { Button } from "@nextui-org/button";
// import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
// import { Input } from "@nextui-org/input";
// import {
//   Navbar as NextUINavbar,
//   NavbarBrand,
//   NavbarContent,
//   NavbarItem,
// } from "@nextui-org/navbar";
// import { link as linkStyles } from "@nextui-org/theme";
// import clsx from "clsx";

// import { siteConfig } from "@/config/site";
// import { ThemeSwitch } from "@/components/theme-switch";
// import {
//   SearchIcon,
// } from "@/components/icons";
import { Logo } from "@/components/icons";
import ConnectButton from "./Connect";
import { Button } from "@nextui-org/button";
// import { useEffect, useState } from "react";

export const Navbar = ({ stage }: { stage: string }) => {
  // const searchInput = (
  //   <Input
  //     aria-label="Search"
  //     classNames={{
  //       inputWrapper: "bg-default-100",
  //       input: "text-sm",
  //     }}
  //     endContent={
  //       <Kbd className="hidden lg:inline-block" keys={["command"]}>
  //         K
  //       </Kbd>
  //     }
  //     labelPlacement="outside"
  //     placeholder="Search..."
  //     startContent={
  //       <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
  //     }
  //     type="search"
  //   />
  // );

  const handleLogout = () => {
    // Remove specific items from local storage
    Object.keys(localStorage).forEach((key) => {
      if (key !== "theme" && key !== "ens") {
        localStorage.removeItem(key);
      }
    });
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 flex h-16 justify-center z-50">
      <div
        className={`w-4/6 absolute top-8 items-center justify-center rounded-lg transition-all delay-100 ease-in-out bg-opacity-10 backdrop-blur-md border-gray-800 shadow`}
      >
        <div className="flex items-center justify-between py-3 m-auto text-lg px-8">
          <div className="flex items-center">
            <Link
              className="flex justify-start items-center gap-1"
              color="foreground"
              href="/"
            >
              <Logo />
              <p className="font-bold text-inherit">AGENT X</p>
            </Link>
          </div>

          <div className="flex items-center">
            {stage !== "world-id" && <ConnectButton />}
            {stage !== "world-id" && (
                <Button isIconOnly aria-label="Logout" onClick={handleLogout}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="black"
                  >
                    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
                  </svg>
                </Button>
              
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
