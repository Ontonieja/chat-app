import { IconType } from "react-icons";

interface DashboardElementProps {
  title: string;
  Icon: IconType;
}
export default function DashboardElement({
  title,
  Icon,
}: DashboardElementProps) {
  return (
    <div
      className={`flex justify-between cursor-pointer hover:text-secondary-blue duration-300 group ease-in-out `}
    >
      <div className="flex gap-2 items-center ">
        <Icon />
        <span className="font-medium">{title}</span>
      </div>
      <div className="mr-2 bg-[#f2f7fa] rounded-xl flex items-center group-hover:bg-primary-blue group-hover:text-white duration-300 ease-linear">
        <div className="px-2 py-0.5 text-[0.82rem]">43</div>
      </div>
    </div>
  );
}
