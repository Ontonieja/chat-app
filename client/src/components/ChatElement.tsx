import { useEffect, useRef } from "react";
import { useChatContext } from "../hooks/useChatContext";
import AvatarWithName from "./ui/AvatarWithName";
import { CloseIcon } from "./ui/Icons";
import Message from "./ui/Message";
import Separator from "./ui/Separator";
import useAuth from "../hooks/useAuth";

import MessageSendForm from "./MessageSendForm";
import { useAxios } from "../hooks/useAxios";
import { SET_MESSAGES_READ } from "../utils/constants";

interface ChatElementProps {
  isChatOpen: boolean;
  closeChat: () => void;
}
export default function ChatElement({
  isChatOpen,
  closeChat,
}: ChatElementProps) {
  const { selectedUserData, contactMessages, setContactMessages } =
    useChatContext();
  const messagesEndRef = useRef(null);
  const { user } = useAuth();
  const { fetchData } = useAxios();

  const isMessageToRead =
    selectedUserData &&
    contactMessages[selectedUserData.id]?.filter(
      (message) => !message.isRead && message.recipentId === user?.id
    );

  // Scroll to bottom when new message arrives
  useEffect(() => {
    if (messagesEndRef.current) {
      (messagesEndRef.current as HTMLElement).scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [contactMessages]);

  useEffect(() => {
    if (!isMessageToRead || !isMessageToRead.length) return;
    fetchData({
      url: SET_MESSAGES_READ,
      method: "PUT",
      data: { senderId: selectedUserData?.id },
    });

    setContactMessages((prevContactMessages) => ({
      ...prevContactMessages,
      [selectedUserData?.id as number]: prevContactMessages[
        selectedUserData?.id as number
      ].map((message) =>
        !message.isRead ? { ...message, isRead: true } : message
      ),
    }));
  }, [selectedUserData]);

  const messages = selectedUserData
    ? [...(contactMessages[selectedUserData.id] || [])].sort(
        (a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime()
      )
    : [];

  return (
    <section
      className={`w-full h-full flex flex-col p-4 text-sm transition-transform duration-300 ease-in-out ${
        isChatOpen ? "translate-x-0" : "max-md:translate-x-full"
      } max-sm:fixed max-sm:top-0 lg:rounded-r-2xl  transition duration-200 max-sm:left-0 max-sm:w-full max-sm:h-full max-sm:z-50 bg-white`}
    >
      <div
        className="absolute top-6 right-6 size-4 z-50 max-sm:block hidden"
        onClick={closeChat}
      >
        <CloseIcon />
      </div>
      {selectedUserData && <AvatarWithName user={selectedUserData} />}

      <Separator />
      <div className="flex-1 overflow-y-auto mt-8 space-y-8">
        {messages?.map((message, index) => (
          <Message
            otherUser={message.senderId !== user?.id}
            key={index}
            message={message}
          />
        ))}

        <div ref={messagesEndRef}></div>
      </div>

      <MessageSendForm />
    </section>
  );
}
