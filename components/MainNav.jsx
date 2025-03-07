"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const links = [
  {
    name: "tickets",
    path: "/",
  },
  {
    name: "bookings",
    path: "/bookings",
  },
  {
    name: "users",
    path: "/users",
  },
  {
    name: "transactions",
    path: "/transactions",
  },
];

const MainNav = () => {
  const currentPath = usePathname();

  return (
    <div className="flex gap-8 capitalize text-muted-foreground">
      {links.map((link, index) => {
        return (
          <Link
            href={link.path}
            key={index}
            className={`navbar ${
              currentPath === link.path && "text-foreground"
            } capitalize hover:text-primary transition-all`}
          >
            {link.name}
          </Link>
        );
      })}
    </div>
  );
};

export default MainNav;
