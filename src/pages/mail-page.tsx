import {
  House,
  MessageCircleMore,
  MessagesSquare,
  Search,
  UserRoundPen,
  Users2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useMail } from "../components/ui/chat/use-mail";
import MailList from "../components/ui/chat/mail-list";
import { MailDisplay } from "../components/ui/chat/mail-display";
import Nav from "../components/ui/nav";
import { HTMLAttributes, FC, useState } from "react";
import { mails } from "@/components/ui/chat/data";
import { MainNavItem } from "@/utils/declare";

const chatFunctionItems: MainNavItem[] = [
  {
    title: "Inbox",
    label: "12",
    icon: MessagesSquare,
    variant: "primary",
  },
  {
    title: "Online Friends",
    label: "9",
    icon: Users2,
    variant: "ghost",
  },
  {
    title: "Waiting",
    label: "0",
    icon: MessageCircleMore,
    variant: "ghost",
  },
];

const otherFunctionItems: MainNavItem[] = [
  {
    title: "Home Page",
    icon: House,
    variant: "ghost",
  },
  {
    title: "My Profile",
    icon: UserRoundPen,
    variant: "ghost",
  },
];

const MailPage: FC<HTMLAttributes<HTMLDivElement>> = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mail] = useMail();

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        // onLayout={(sizes: number[]) => {
        //   document.cookie = `react-resizable-panels:layout=${JSON.stringify(
        //     sizes
        //   )}`;
        // }}
        className="max-h-[100vh] h-full"
      >
        {/** NAVBAR */}
        <ResizablePanel
          defaultSize={10}
          collapsedSize={5}
          collapsible={true}
          minSize={5}
          maxSize={15}
          onExpand={() => setIsCollapsed(isCollapsed && !isCollapsed)}
          onCollapse={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            isCollapsed &&
              "min-w-[5rem] transition-all duration-300 ease-in-out"
          )}
        >
          <Nav isCollapsed={isCollapsed} links={chatFunctionItems} />
          <Separator className="mt-10" />
          <Nav isCollapsed={isCollapsed} links={otherFunctionItems} />
        </ResizablePanel>
        <ResizableHandle withHandle />

        {/** LIST OF CONVERSATION */}
        <ResizablePanel defaultSize={20}>
          <Tabs defaultValue="all">
            <div className="flex items-center px-4 py-2">
              <h1 className="text-xl font-bold text-h1">Inbox</h1>
              <TabsList className="ml-auto">
                <TabsTrigger
                  value="all"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="unread"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  Unread
                </TabsTrigger>
              </TabsList>
            </div>
            <Separator />
            <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <form>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search" className="pl-8" />
                </div>
              </form>
            </div>
            <TabsContent value="all" className="m-0">
              <MailList items={mails} />
            </TabsContent>
            <TabsContent value="unread" className="m-0">
              <MailList items={mails.filter((item) => !item.read)} />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle />

        {/** MAIN CONTENT OF CONVERSATION */}
        <ResizablePanel defaultSize={70}>
          <MailDisplay
            mail={mails.find((item) => item.id === mail.selected) || null}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
};

export default MailPage;
