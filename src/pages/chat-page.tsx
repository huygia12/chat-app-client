import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMail } from "../hooks";
import MailList from "../components/chat/mail-list";
import { MailDisplay } from "../components/chat";
import { HTMLAttributes, FC } from "react";
import { mails } from "@/components/chat/data";

const ChatPage: FC<HTMLAttributes<HTMLDivElement>> = () => {
  const [mail] = useMail();

  return (
    <ResizablePanelGroup direction="horizontal">
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
      <ResizablePanel defaultSize={80}>
        <MailDisplay
          mail={mails.find((item) => item.id === mail.selected) || null}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default ChatPage;
