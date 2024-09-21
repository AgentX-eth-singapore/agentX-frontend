// import { Button } from "@nextui-org/button";
// import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
// import { Input } from "@nextui-org/input";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
// import { link as linkStyles } from "@nextui-org/theme";
// import clsx from "clsx";

// import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
// import {
//   SearchIcon,
// } from "@/components/icons";
import { Logo } from "@/components/icons";
import ConnectButton from "./Connect";
import { Button } from "@nextui-org/button";

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
      if (key !== "theme") {
        localStorage.removeItem(key);
      }
    });
    window.location.reload();
  };

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/"
          >
            <Logo />
            <p className="font-bold text-inherit">AGENT X</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        {stage !== "world-id" && <ConnectButton />}

        <NavbarItem className="hidden sm:flex gap-2 ml-8">
          <ThemeSwitch />
        </NavbarItem>

        <NavbarItem className="hidden sm:flex gap-2 ml-8">
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
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
};
