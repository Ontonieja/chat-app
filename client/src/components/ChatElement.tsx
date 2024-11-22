import { useEffect, useRef, useState } from "react";
import { useChatContext } from "../hooks/useChatContext";
import AvatarWithName from "./ui/AvatarWithName";
import { AttachmentIcon, CloseIcon, SendIcon } from "./ui/Icons";
import Message from "./ui/Message";
import Separator from "./ui/Separator";
import { socket } from "../utils/socket";
import useAuth from "../hooks/useAuth";

interface ChatElementProps {
  isChatOpen: boolean;
  closeChat: () => void;
}
export default function ChatElement({
  isChatOpen,
  closeChat,
}: ChatElementProps) {
  const { selectedUserData, selectedUserMessages } = useChatContext();
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);
  const { user } = useAuth();

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const formValues = Object.fromEntries(formData);

    const { message } = formValues;

    if (typeof message === "string" && message.length) {
      socket.emit("sendMessage", {
        message: formValues.message,
        recipentId: selectedUserData?.id,
        type: "TEXT",
        sentAt: new Date().toISOString(),
        isRead: false,
        senderId: user?.id,
      });
    }
    setMessage("");
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      (messagesEndRef.current as HTMLElement).scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [selectedUserMessages]);

  const contactMessages = selectedUserMessages?.filter(
    (message) =>
      message.senderId === selectedUserData?.id ||
      message.recipentId === selectedUserData?.id
  );

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
        {contactMessages?.map((message, index) => (
          <Message
            other={message.senderId === user?.id}
            key={index}
            message={message}
          />
        ))}

        <div ref={messagesEndRef}></div>
      </div>

      <form className="flex items-center mt-4" onSubmit={sendMessage}>
        <div className="w-full relative">
          <input
            type="text"
            placeholder="Type here..."
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-light-blue p-3 rounded-xl pl-3 hover:outline-none focus:outline-none"
          />
          <div className="absolute right-3 top-3">
            <AttachmentIcon />
          </div>
        </div>
        <button
          type="submit"
          className="ml-2 p-3 bg-light-blue rounded-2xl cursor-pointer hover:bg-[#ecf1f5] duration-300 ease-out hover:scale-105"
        >
          <SendIcon />
        </button>
      </form>
    </section>
  );
}
