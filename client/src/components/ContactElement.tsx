import useAuth from "../hooks/useAuth";
import { useChatContext } from "../hooks/useChatContext";
import { ContactProps } from "../utils/types";

interface TimeAgoParams {
  daysAgo: number;
  hoursAgo: number;
  minutesAgo: number;
}

export default function ContactElement({ contact }: { contact: ContactProps }) {
  const { selectedUserData, setSelectedUserData, selectedUserMessages } =
    useChatContext();
  const { user } = useAuth();
  const userId = selectedUserData?.id;
  const { firstName, lastName, avatar, id: contactId } = contact;

  const contactMessages = selectedUserMessages?.filter((message) => {
    const { recipentId, senderId } = message;
    return (
      (recipentId === contactId && senderId === user?.id) ||
      (senderId === contactId && recipentId === user?.id)
    );
  });

  const lastMessage = contactMessages?.[contactMessages.length - 1];

  const lastMessageDisplay =
    lastMessage?.type === "FILE" ? "Sent file" : lastMessage?.message;

  const currentDate = new Date();
  const sentAt = new Date(lastMessage?.sentAt || 0);

  const timeDifference = currentDate.getTime() - sentAt.getTime();

  const minutesAgo = Math.floor(timeDifference / (1000 * 60));
  const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
  const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  function formatTimeAgo({ daysAgo, hoursAgo, minutesAgo }: TimeAgoParams) {
    if (daysAgo > 0) return `${daysAgo} d`;
    if (hoursAgo > 0) return `${hoursAgo} h`;
    return minutesAgo <= 0 ? "1 min" : minutesAgo + "min";
  }

  return (
    <div
      className={`flex gap-3 w-full ${
        userId === contactId && "bg-white"
      } hover:bg-white rounded-2xl transition duration-200 ease-in-out cursor-pointer px-2 py-3`}
      onClick={() => setSelectedUserData(contact)}
    >
      <img src={avatar} className="size-10 rounded-full "></img>
      <div className="flex-1">
        <div className="flex justify-between">
          <h3 className="sm:text-xs md:text-sm  font-medium">{`${firstName} ${lastName}`}</h3>
          <span className="text-light-gray text-xs">
            {!lastMessage ? (
              <span>0 d</span>
            ) : (
              formatTimeAgo({ daysAgo, hoursAgo, minutesAgo })
            )}
          </span>
        </div>
        <p className="sm:text-xs md:text-sm text-light-gray line-clamp-1">
          {lastMessage ? (
            lastMessage.senderId === user?.id ? (
              <>You: {lastMessageDisplay}</>
            ) : (
              lastMessageDisplay
            )
          ) : (
            <span>No messages yet</span>
          )}
        </p>
      </div>
    </div>
  );
}
