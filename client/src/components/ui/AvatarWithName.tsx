import { ContactProps } from "../../utils/types";

export default function AvatarWithName({
  user,
  className,
  onClick,
}: {
  user: ContactProps;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      className={`${className} flex gap-3 relative items-center`}
      onClick={onClick}
    >
      <img
        src={user?.avatar}
        alt="avatar"
        className="rounded-full size-10"
      ></img>

      <div className="flex flex-col max-lg:text-xs">
        <h2 className="font-semibold text-sm">{`${user?.firstName} ${user?.lastName} `}</h2>
        <p className="text-primary-blue font-medium text-sm">
          @{user?.userName}
        </p>
      </div>
    </div>
  );
}
