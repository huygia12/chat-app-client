import ScrollToTop from "@/components/effect/ScrollToTop";
import DarkModeToggle from "@/components/ui/darkModeToggle";
import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

const UserLayout: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <DarkModeToggle />
      <main className="flex justify-center w-full dark:bg-bkg-2-dark">
        <Outlet />
      </main>
      {/* <AppFooter /> */}
      <Toaster richColors />
    </>
  );
};

export default UserLayout;
