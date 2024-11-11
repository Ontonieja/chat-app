import { IconType } from "react-icons";
import { useChatContext } from "../../hooks/useChatContext";

interface DashboardElementProps {
  title: string;
  Icon: IconType;
  count?: boolean;
  onClick?: () => void;
}
export default function DashboardElement({
  title,
  Icon,
  count = true,
  onClick,
}: DashboardElementProps) {
  const { selectedUserData } = useChatContext();
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
      {count && (
        <div
          className={`mr-2 bg-[#f2f7fa] rounded-xl flex items-center group-hover:bg-primary-blue group-hover:text-white duration-200 ease-linear ${
            selectedUserData && "bg-primary-blue text-white"
          }`}
        >
          <div className="px-2 py-0.5 text-[0.82rem] ">43</div>
        </div>
      )}
    </div>
  );
}
