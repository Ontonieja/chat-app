import { IconType } from "react-icons";

interface DashboardElementProps {
  title: string;
  Icon: IconType;
  onClick?: () => void;
}
export default function SecondDashboardElement({
  title,
  Icon,
  onClick,
}: DashboardElementProps) {
  return (
    <div
      onClick={onClick}
      className={`flex justify-between p-2 cursor-pointer hover:text-secondary-blue duration-200 rounded-xl group ease-in-out `}
    >
      <div className="flex gap-2 items-center">
        <Icon />
        <span className="font-medium">{title}</span>
      </div>
    </div>
  );
}
