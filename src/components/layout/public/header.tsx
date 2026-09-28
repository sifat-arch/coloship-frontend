"use client";
import Logo from "@/assets/svg/logo";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useGetMe, useLogout } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

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

  const { data, isLoading } = useGetMe();

  const { mutate: logout, isPending: logoutLoading } = useLogout();

  const queryClient = useQueryClient();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.add({
          title: "Logged out",
          description: "Logout successfully",
        });

        queryClient.removeQueries({ queryKey: ["user"] });
      },
      onError: () => {
        toast.add({
          title: "Logged Failed",
          description: "Something went wrong",
        });
      },
    });
  };

  return (
    <header className="w-full h-16 border border-b">
      <div className="flex justify-between items-center h-full max-w-7xl mx-auto">
        <div className="flex items-center gap-1">
          <Logo />
        </div>
        <div className="flex gap-4">
          {routes.map((route) => (
            <Link key={route.name} href={route.url}>
              {route.name}
            </Link>
          ))}
        </div>

        {logoutLoading ? (
          "Loading..."
        ) : (
          <div>
            {!isLoading && !data && (
              <Button
                variant="outline"
                render={<Link href="/login">Login</Link>}
                nativeButton={false}
              ></Button>
            )}

            {!isLoading && data && (
              <Button variant="destructive" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
