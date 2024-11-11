import { useChatContext } from "../hooks/useChatContext";
import AvatarWithName from "./ui/AvatarWithName";
import { AttachmentIcon, CloseIcon, SendIcon } from "./ui/Icons";
import Message from "./ui/Message";
import Separator from "./ui/Separator";

interface ChatElementProps {
  isChatOpen: boolean;
  closeChat: () => void;
}
export default function ChatElement({
  isChatOpen,
  closeChat,
}: ChatElementProps) {
  const { selectedUserData } = useChatContext();
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
        <Message other={false} />
        <Message other={true} />
      </div>

      <div className="flex items-center mt-4">
        <div className=" w-full relative">
          <input
            type="text"
            placeholder="Type here..."
            className="w-full bg-light-blue p-3 rounded-xl pl-3 hover:outline-none focus:outline-none"
          />
          <div className="absolute right-3 top-3">
            <AttachmentIcon />
          </div>
        </div>
        <div className="ml-2 p-3 bg-light-blue rounded-2xl cursor-pointer  hover:bg-[#ecf1f5] duration-300 ease-out hover:scale-105">
          <SendIcon />
        </div>
      </div>
    </section>
  );
}
