import { IconContext } from "react-icons";
import { BiSearch } from "react-icons/bi";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { LuUserPlus2 } from "react-icons/lu";
import { GrAttachment } from "react-icons/gr";
import { IoIosSend } from "react-icons/io";
import { IoClose } from "react-icons/io5";

import { IoChatboxEllipsesOutline } from "react-icons/io5";

export const ContactIcon = () => {
  return (
    <IconContext.Provider value={{ className: "size-5" }}>
      <div>
        <LuUserPlus2 />
      </div>
    </IconContext.Provider>
  );
};

export const ChatIcon = () => {
  return (
    <IconContext.Provider value={{ className: "size-5" }}>
      <div>
        <IoChatboxEllipsesOutline />
      </div>
    </IconContext.Provider>
  );
};

export const SearchIcon = () => {
  return (
    <IconContext.Provider value={{ className: "size-5 text-light-gray" }}>
      <div>
        <BiSearch />
      </div>
    </IconContext.Provider>
  );
};

export const AttachmentIcon = () => {
  return (
    <IconContext.Provider value={{ className: "size-5 text-light-gray" }}>
      <div>
        <GrAttachment />
      </div>
    </IconContext.Provider>
  );
};

export const HamburgerIcon = () => {
  return (
    <IconContext.Provider value={{ className: "size-6" }}>
      <div>
        <HiOutlineMenuAlt2 />
      </div>
    </IconContext.Provider>
  );
};

export const SendIcon = () => {
  return (
    <IconContext.Provider value={{ className: "size-5" }}>
      <div className="text-primary-blue hover:animate-pulse">
        <IoIosSend />
      </div>
    </IconContext.Provider>
  );
};
export const ProfileIcon = () => {
  return (
    <IconContext.Provider value={{ className: "size-6" }}>
      <div>
        <CgProfile />
      </div>
    </IconContext.Provider>
  );
};

export const LogoutIcon = () => {
  return (
    <IconContext.Provider value={{ className: "size-6" }}>
      <div>
        <FiLogOut />
      </div>
    </IconContext.Provider>
  );
};

export const CloseIcon = () => {
  return (
    <IconContext.Provider value={{ className: "size-5" }}>
      <div>
        <IoClose />
      </div>
    </IconContext.Provider>
  );
};
