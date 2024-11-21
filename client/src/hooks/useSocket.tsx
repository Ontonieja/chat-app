import { useContext } from "react";
import SocketContext from "../context/SocketContext";

export const useSocket = () => {
  const socketContext = useContext(SocketContext);
  if (!socketContext) {
    throw new Error("useChatContext must be used within an ChatContext");
  }
  return socketContext;
};
