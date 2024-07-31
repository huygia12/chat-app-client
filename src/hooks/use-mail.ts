import { atom, useAtom } from "jotai";
import { Mail, mails } from "../components/chat/data";

type Config = {
  selected: Mail["id"] | null;
};

const configAtom = atom<Config>({
  selected: mails[0].id,
});

const useMail = () => {
  return useAtom(configAtom);
};

export default useMail;
