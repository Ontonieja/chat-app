import useAuth from "../hooks/useAuth";
import AvatarWithName from "./ui/AvatarWithName";
import { AttachmentIcon, SendIcon } from "./ui/Icons";
import Message from "./ui/Message";
import Separator from "./ui/Separator";

export default function ChatElement() {
  const { user } = useAuth();
  return (
    <section className="w-full h-full flex flex-col p-3 text-sm max-sm:hidden">
      {user && <AvatarWithName user={user} />}

      <Separator />

      <div className="flex-1 overflow-y-auto mt-8 space-y-8 px-3">
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
