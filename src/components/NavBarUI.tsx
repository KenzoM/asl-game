"use client";
import Link from "next/link";
import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";

const NavbarUI = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const mobileMenuItems = [
    {
      url: "/",
      urlLabel: "Home",
    },
    {
      url: "/about",
      urlLabel: "About",
    },
    {
      url: "/",
      urlLabel: "Sign up",
    },
  ];

  return (
    <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent style={{ justifyContent: "flex-end" }}>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand className="sm:flex hidden">
          <Link href="/">
            <p className="font-bold text-inherit hidden sm:flex gap-">
              ASL Game
            </p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <NavbarItem isActive={pathname.includes("scenario")}>
          <Link href="/about" aria-current="page">
            About
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="pt-5">
        {mobileMenuItems.map((item, index) => (
          <NavbarMenuItem
            className="text-right px-6"
            key={`${item.urlLabel}-${index}`}
          >
            <Link
              className="w-full"
              href={item.url}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.urlLabel}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default NavbarUI;
