import React, { useEffect, useState } from "react";
import { socket } from "../utils/socket";
import useAuth from "../hooks/useAuth";
import { MessageProps } from "../utils/types";
import { useChatContext } from "../hooks/useChatContext";

const SocketContext = React.createContext<{
  isConnected: boolean;
}>({
  isConnected: false,
});

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const { user } = useAuth();
  const { setContactMessages, selectedUserData } = useChatContext();

  useEffect(() => {
    if (user) {
      socket.io.opts.query = { userId: user.id };
      socket.connect();
      socket.on("disconnect", () => {
        console.log("Socket disconnected");
      });
      setIsConnected(true);

      socket.on("connect", () => {
        console.log("Socket connected", socket.id);
      });

      socket.on("connect_error", (error) => {
        console.error("Socket connection error", error);
      });
    } else {
      socket.disconnect();
      setIsConnected(false);
    }

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
    };
  }, [user]);

  useEffect(() => {
    const handleReceiveMessage = (message: MessageProps) => {
      setContactMessages((prevMessages) => {
        const contactId =
          message.senderId === user?.id ? message.recipentId : message.senderId;

        return {
          ...prevMessages,
          [contactId]: [...(prevMessages[contactId] || []), message],
        };
      });
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [selectedUserData, user]);

  return (
    <SocketContext.Provider value={{ isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
