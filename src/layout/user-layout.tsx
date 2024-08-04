import { ScrollToTop } from "@/components/effect";
import DarkModeToggle from "@/components/ui/dark-mode-toggle";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import {
  House,
  MessageCircleMore,
  MessagesSquare,
  UserRoundPen,
  Users2,
} from "lucide-react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { MainNavItem } from "@/types/component";
import NavLogoutItem from "./nav-logout-item";
import Nav from "./nav";

const chatNavItems: MainNavItem[] = [
  {
    title: "Inbox",
    label: "12",
    url: "/messages",
    icon: MessagesSquare,
  },
  {
    title: "Online Friends",
    label: "9",
    url: "/friends",
    icon: Users2,
  },
  {
    title: "Waiting",
    label: "0",
    url: "/test",
    icon: MessageCircleMore,
  },
];

const otherNavItems: MainNavItem[] = [
  {
    title: "Home Page",
    icon: House,
    url: "/",
  },
  {
    title: "My Profile",
    icon: UserRoundPen,
    url: "/:id",
  },
];

const UserLayout: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selectedNavItem, setSelectedNavItem] = useState<string>(
    chatNavItems[0].title
  );

  return (
    <>
      <ScrollToTop />
      <DarkModeToggle />
      <main className="flex justify-center w-full h-screen dark:bg-bkg-2-dark">
        <TooltipProvider delayDuration={0}>
          <ResizablePanelGroup
            direction="horizontal"
            // onLayout={(sizes: number[]) => {
            //   document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            //     sizes
            //   )}`;
            // }}
          >
            {/** NAVBAR */}
            <ResizablePanel
              defaultSize={5}
              collapsedSize={5}
              collapsible={true}
              minSize={5}
              maxSize={15}
              onExpand={() => isCollapsed && setIsCollapsed(!isCollapsed)}
              onCollapse={() => isCollapsed || setIsCollapsed(!isCollapsed)}
              className={cn(
                "!max-h-screen",
                isCollapsed && "transition-all duration-300 ease-in-out"
              )}
            >
              <Nav
                selectedUrl={selectedNavItem}
                setSelectedItem={setSelectedNavItem}
                isCollapsed={isCollapsed}
                navItems={chatNavItems}
              />
              <Separator className="mt-10" />
              <Nav
                selectedUrl={selectedNavItem}
                setSelectedItem={setSelectedNavItem}
                isCollapsed={isCollapsed}
                navItems={otherNavItems}
              />
              <div className="flex flex-col h-full">
                <div className="mt-auto mb-[20rem]">
                  <Separator className="" />
                  <NavLogoutItem
                    selectedUrl={selectedNavItem}
                    setSelectedUrl={setSelectedNavItem}
                    isCollapsed={isCollapsed}
                  />
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />

            {/** PAGES */}
            <ResizablePanel defaultSize={95}>
              <Outlet />
            </ResizablePanel>
          </ResizablePanelGroup>
        </TooltipProvider>
      </main>
      {/* <AppFooter /> */}
      <Toaster richColors />
    </>
  );
};

export default UserLayout;
