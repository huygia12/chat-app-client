import ScrollToTop from "@/components/effect/scroll-to-top";
import DarkModeToggle from "@/components/ui/dark-mode-toggle";
import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

const UserLayout: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <DarkModeToggle />
      <main className="flex justify-center w-full min-h-[100vh] dark:bg-bkg-2-dark">
        <Outlet />
      </main>
      {/* <AppFooter /> */}
      <Toaster richColors />
    </>
  );
};

export default UserLayout;
