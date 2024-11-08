import { IconContext } from "react-icons";
import { RiContactsBookLine } from "react-icons/ri";
import { BiSearch } from "react-icons/bi";
import { TbMenuDeep } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { GrAttachment } from "react-icons/gr";
import { IoIosSend } from "react-icons/io";

import { IoChatboxEllipsesOutline } from "react-icons/io5";

export const ContactIcon = () => {
  return (
    <IconContext.Provider value={{ className: "size-5" }}>
      <div>
        <RiContactsBookLine />
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
        <TbMenuDeep />
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

/*************  ✨ Codeium Command ⭐  *************/
/**
 * HamburgerIcon is a functional component that renders a
 * hamburger menu icon using the TbMenuDeep icon from
 * react-icons. The icon is styled with a className of "size-6"
 * using the IconContext.Provider.
 */
/******  223950e2-787a-45c0-a889-e8cee14e3a2b  *******/ export const ProfileIcon =
  () => {
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
