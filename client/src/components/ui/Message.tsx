import { useChatContext } from "../../hooks/useChatContext";
import useAuth from "../../hooks/useAuth";
import { MessageProps } from "../../utils/types";
import FileContent from "./FileContent";

interface MessageComponentProps {
  otherUser: boolean;
  message: MessageProps;
}

export default function Message({ otherUser, message }: MessageComponentProps) {
  const { selectedUserData } = useChatContext();
  const { user } = useAuth();

  const { message: messageContent } = message;

  return (
    <div className="w-full ">
      <div className={`flex gap-2  ${!otherUser && "flex-row-reverse"}`}>
        <img
          src={otherUser ? selectedUserData?.avatar : user?.avatar}
          className="size-10 rounded-full"
          alt="User avatar"
        ></img>
        <div
          className={`${
            otherUser
              ? "bg-light-blue !text-text-gray rounded-tr-3xl"
              : "bg-secondary-blue rounded-tl-3xl"
          } items-center inline-block xl:max-w-[60%] 2xl:max-w-[50%] text-white rounded-b-3xl`}
        >
          {message.type === "FILE" ? (
            <FileContent
              messageContent={messageContent}
              otherUser={otherUser}
            />
          ) : (
            <p className="py-3 px-4">{messageContent}</p>
          )}
        </div>
      </div>
    </div>
  );
}
