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
      <div className="flex h-full gap-4 justify-center items-center">
        {routes.map((route) => (
          <Link key={route.name} href={route.url}>
            {route.name}
          </Link>
        ))}
      </div>
    </header>
  );
};

export default Header;
