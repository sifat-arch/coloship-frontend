import Logo from "@/assets/svg/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Header = () => {
  const routes = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "About-Us",
      url: "/about-us",
    },
  ];

  return (
    <header className="w-full h-16 border border-b">
      <div className="flex justify-between items-center h-full max-w-7xl mx-auto">
        <div className="flex items-center gap-1">
          <Logo />
          <span className="text-lg font-bold">Coloship</span>
        </div>
        <div className="flex gap-4">
          {routes.map((route) => (
            <Link key={route.name} href={route.url}>
              {route.name}
            </Link>
          ))}
        </div>

        <div>
          <Button
            variant="outline"
            render={<Link href="/login">Login</Link>}
            nativeButton={false}
          ></Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
