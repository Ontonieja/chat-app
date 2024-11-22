import { useState } from "react";
import { useChatContext } from "../hooks/useChatContext";
import DashboardElement from "./ui/DashboardElement";
import { ChatIcon, CloseIcon, ContactIcon, HamburgerIcon } from "./ui/Icons";
import ProfileModal from "./ui/ProfileModal";
import SecondDashboardElement from "./ui/SecondDashboardElement";
import useAuth from "../hooks/useAuth";

export default function MobileDashboard() {
  const { setModalOpen } = useChatContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <>
      <div
        className={`lg:hidden w-2/3 sm:w-3/4 bg-white shadow-xl z-50 absolute transition-transform duration-300 ease-in-out ${
          menuOpen ? "" : "translate-x-[-100%]"
        } inset-0`}
      ></div>
      <div
        className={`lg:hidden w-2/3 sm:w-3/4 bg-white shadow-xl z-50 absolute transition-transform duration-300 ease-in-out ${
          menuOpen ? "" : "translate-x-[-100%]"
        } inset-0`}
      >
        <div className="flex flex-col justify-between h-full p-4">
          <div
            className="absolute top-3 right-3"
            onClick={() => setMenuOpen(false)}
          >
            <CloseIcon />
          </div>
          <div className="flex flex-col gap-2 mt-8">
            <DashboardElement
              title="Chat"
              Icon={ChatIcon}
              onClick={() => setMenuOpen(false)}
            />
            <SecondDashboardElement
              title="Add new contact"
              Icon={ContactIcon}
              onClick={() => {
                setMenuOpen(false);
                setModalOpen(true);
              }}
            />
          </div>

          <div className="mt-auto">
            <ProfileModal />
          </div>
        </div>
      </div>

      <div className="lg:hidden flex justify-between pt-4 px-4 z-50 items-center">
        <div onClick={() => setMenuOpen(!menuOpen)}>
          <HamburgerIcon />
        </div>

        <h2 className="font-medium text-lg">Chats</h2>
        <img
          src={user?.avatar}
          alt="avatar"
          className="rounded-full size-10 cursor-pointer"
        ></img>
      </div>
    </>
  );
}
