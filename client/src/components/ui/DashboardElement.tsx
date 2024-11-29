import { IconType } from "react-icons";
import { useChatContext } from "../../hooks/useChatContext";
import useAuth from "../../hooks/useAuth";

interface DashboardElementProps {
  title: string;
  Icon: IconType;
  onClick?: () => void;
}
export default function DashboardElement({
  title,
  Icon,
  onClick,
}: DashboardElementProps) {
  const { selectedUserData, contactMessages } = useChatContext();
  const { user } = useAuth();

  const allMessages = Object.values(contactMessages).flatMap(
    (message) => message
  );

  const unreadMessages = allMessages.filter(
    (message) => !message.isRead && message.senderId !== user?.id
  ).length;
  return (
    <div
      onClick={onClick}
      className={`flex justify-between p-2 cursor-pointer hover:bg-light-blue duration-200 rounded-xl group ease-in-out ${
        selectedUserData && "bg-light-blue  rounded-xl"
      }`}
    >
      <div className="flex gap-2 items-center">
        <Icon />
        <span className="font-medium">{title}</span>
      </div>
      <div
        className={`mr-2 bg-[#f2f7fa] rounded-xl flex items-center group-hover:bg-primary-blue group-hover:text-white duration-200 ease-linear ${
          selectedUserData && "bg-primary-red text-white"
        }`}
      >
        <div className="px-2 py-1 rounded-xl  bg-primary-blue text-white text-xs">
          {unreadMessages}
        </div>
      </div>
    </div>
  );
}
