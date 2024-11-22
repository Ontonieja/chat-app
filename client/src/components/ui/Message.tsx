import { useChatContext } from "../../hooks/useChatContext";
import useAuth from "../../hooks/useAuth";
import { MessageProps } from "../../utils/types";

interface MessageComponentProps {
  other: boolean;
  message: MessageProps;
}

export default function Message({ other, message }: MessageComponentProps) {
  const { selectedUserData } = useChatContext();
  const { user } = useAuth();

  return (
    <div className="w-full ">
      <div className={`flex gap-2  ${other ? "flex-row-reverse" : ""}`}>
        <img
          src={other ? user?.avatar : selectedUserData?.avatar}
          className="size-10 rounded-full"
        ></img>
        <div
          className={`${
            other ? "!bg-secondary-blue" : "bg-light-blue !text-text-gray"
          } items-center inline-block xl:max-w-[60%] 2xl:max-w-[50%] text-white rounded-b-3xl ${
            other ? "rounded-tl-3xl" : "rounded-tr-3xl"
          }`}
        >
          <p className="py-3 px-4">{message.message}</p>
        </div>
      </div>
    </div>
  );
}
