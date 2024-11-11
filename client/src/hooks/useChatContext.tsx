import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

export const useChatContext = () => {
  const chatContext = useContext(ChatContext);
  if (!ChatContext) {
    throw new Error("useChatContext must be used within an ChatContext");
  }
  return chatContext;
};
