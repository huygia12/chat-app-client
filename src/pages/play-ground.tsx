import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Playground = () => {
  return (
    <div className="mt-40 h-full">
      <ul></ul>

      <form className="flex gap-4">
        <Input type="text" placeholder="Enter the room key" />
        <Input type="text" placeholder="Enter the message" />
        <Button className="whitespace-nowrap px-2">Send message</Button>
      </form>
    </div>
  );
};

export default Playground;
