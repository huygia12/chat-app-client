import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ClientToServerEvents,
  Message,
  ServerToClientEvents,
} from "@/types/api";
import { FormEvent, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  "http://localhost:8000"
);

socket.on("connect", () => {
  console.debug(socket.id);
});

const Playground = () => {
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [serverMessages, setServerMessages] = useState<string[]>([]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("clientMsg", { message, room });
    setMessage("");
    setRoom("");
  };

  useEffect(() => {
    socket.on("serverMsg", (data: Message) => {
      setServerMessages([...serverMessages, data.message]);
    });
  }, [serverMessages]);

  return (
    <div className="mt-40 h-full">
      <ul>
        {serverMessages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className="flex gap-4">
        <Input
          type="text"
          value={room}
          placeholder="Enter the room key"
          onChange={(e) => setRoom(e.target.value)}
        />
        <Input
          type="text"
          value={message}
          placeholder="Enter the message"
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button className="whitespace-nowrap px-2">Send message</Button>
      </form>
    </div>
  );
};

export default Playground;
