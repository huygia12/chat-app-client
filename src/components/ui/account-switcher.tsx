import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FC, HTMLAttributes, ReactNode, useState } from "react";

interface Account {
  label: string;
  email: string;
  icon: ReactNode;
}

interface AccountSwitcherProps extends HTMLAttributes<HTMLSelectElement> {
  isCollapsed: boolean;
  accounts: Account[];
}

const AccountSwitcher: FC<AccountSwitcherProps> = ({ className, ...props }) => {
  const [selectedAccount, setSelectedAccount] = useState<string>(
    props.accounts[0].email
  );

  return (
    <Select defaultValue={selectedAccount} onValueChange={setSelectedAccount}>
      <SelectTrigger
        className={cn(
          "flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0",
          props.isCollapsed &&
            "flex h-9 w-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden"
        )}
        aria-label="Select account"
      >
        <SelectValue placeholder="Select an account">
          {
            props.accounts.find((account) => account.email === selectedAccount)
              ?.icon
          }
          <span className={cn("ml-2", props.isCollapsed && "hidden")}>
            {
              props.accounts.find(
                (account) => account.email === selectedAccount
              )?.label
            }
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {props.accounts.map((account) => (
          <SelectItem key={account.email} value={account.email}>
            <div className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
              {account.icon}
              {account.email}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default AccountSwitcher;
