import DashboardElement from "./DashboardElement";
import { UserProps } from "../utils/types";
import {
  ChatIcon,
  ContactIcon,
  LogoutIcon,
  ProfileIcon,
} from "../components/ui/Icons";
import { useState } from "react";
import MenuItem from "./MenuItem";

interface DashboardProps {
  user: UserProps;
  logout: () => void;
}
export default function Dashboard({ user, logout }: DashboardProps) {
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  return (
    <section className="w-1/5 lg:w-1/3 2xl:w-[25%] p-6 flex h-full min-w-[200px] justify-between flex-col max-lg:hidden text-sm">
      <div>
        <div className="size-8 bg-[#0372c122] rounded-full">
          <img src="logo.webp"></img>
        </div>
        <div className="mt-14 flex-col flex gap-6">
          <DashboardElement title="Contacts" Icon={ContactIcon} />
          <DashboardElement title="Chat" Icon={ChatIcon} />
        </div>
      </div>

      <div className="flex gap-3 relative items-center cursor-pointer">
        <img
          src={user?.avatar}
          alt="avatar"
          className="rounded-full size-10"
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
            <MenuItem
              name="Logout"
              Icon={LogoutIcon}
              href="/"
              onClick={logout}
            />
          </div>
        </div>
        <div className="flex flex-col max-lg:text-xs">
          <h2 className="font-semibold">{`${user?.firstName} ${user?.lastName} `}</h2>
          <p className="text-light-gray font-medium">@{user?.userName}</p>
        </div>
      </div>
    </section>
  );
}
