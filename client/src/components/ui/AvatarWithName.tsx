import { UserProps } from "../../utils/types";

export default function AvatarWithName({ user }: { user: UserProps }) {
  return (
    <div className="flex gap-3 relative items-center cursor-pointer">
      <img
        src={user?.avatar}
        alt="avatar"
        className="rounded-full size-10"
      ></img>

      <div className="flex flex-col max-lg:text-xs">
        <h2 className="font-semibold">{`${user?.firstName} ${user?.lastName} `}</h2>
        <p className="text-primary-blue font-medium">@{user?.userName}</p>
      </div>
    </div>
  );
}
