import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import MenuItem from "../MenuItem";
import { LogoutIcon, ProfileIcon } from "./Icons";

export default function ProfileModal() {
  const { user, logout } = useAuth();
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  return (
    <div className="flex gap-3 relative items-center">
      <img
        src={user?.avatar}
        alt="avatar"
        className="rounded-full size-10 cursor-pointer"
        onClick={() => setProfileModalOpen(!profileModalOpen)}
      ></img>

      {/* Profile Modal PopUp */}
      <div
        className={`absolute h-28 w-40 bg-light-blue rounded-xl -translate-y-3/4 mb-6
                transition-all duration-300 ease-in-out transform p-4
                ${
                  profileModalOpen
                    ? "opacity-100 scale-100 visible"
                    : "opacity-0 scale-90 invisible"
                }`}
      >
        <div className="flex flex-col gap-3">
          <MenuItem name="Profile" Icon={ProfileIcon} href="/profile" />
          <MenuItem name="Logout" Icon={LogoutIcon} href="/" onClick={logout} />
        </div>
      </div>
      <div className="flex flex-col max-lg:text-xs">
        <h2 className="text-sm font-semibold">{`${user?.firstName} ${user?.lastName} `}</h2>
        <p className="text-light-gray font-medium">@{user?.userName}</p>
      </div>
    </div>
  );
}
