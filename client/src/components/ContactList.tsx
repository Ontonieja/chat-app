import { ContactProps, UserProps } from "../utils/types";
import ContactElement from "./ContactElement";
import { ChatIcon, CloseIcon, ContactIcon, HamburgerIcon } from "./ui/Icons";
import SearchInput from "./ui/SearchInput";
import { useChatContext } from "../hooks/useChatContext";
import { useEffect, useState } from "react";
import { GET_CONTACTS } from "../utils/constants";
import useAuth from "../hooks/useAuth";
import { useAxios } from "../hooks/useAxios";
import DashboardElement from "./ui/DashboardElement";
import SecondDashboardElement from "./ui/SecondDashboardElement";
import ProfileModal from "./ui/ProfileModal";

interface ContactListProps {
  user: UserProps | undefined;
  onContactClick: () => void;
}

export default function ContactList({
  user,
  onContactClick,
}: ContactListProps) {
  const { userContacts, setUserContacts, setModalOpen } = useChatContext();
  const [menuOpen, setMenuOpen] = useState(false);

  const { response, fetchData, error } = useAxios();
  const { user: currentUser } = useAuth();

  const getContacts = async () => {
    await fetchData({
      method: "GET",
      url: GET_CONTACTS,
    });
    if (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getContacts();
  }, [currentUser]);

  useEffect(() => {
    if (response) {
      setUserContacts(response as ContactProps[]);
    }
  }, [response]);

  return (
    <section
      className="w-full sm:w-3/5 xl:w-2/5 2xl:w-2/6 h-full min-w-[180px] justify-between text-sm bg-light-blue overflow-y-scroll relative overflow-hidden"
      onClick={onContactClick}
    >
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

      <div className="flex mt-4 px-4">
        <SearchInput />
      </div>

      {userContacts !== null && userContacts.length === 0 && (
        <div className="flex justify-center mt-20 px-4 text-center ">
          <p className="font-medium">
            No contacts yet. Add a contact to begin{" "}
            <span className="text-secondary-blue">chatting</span>!
          </p>
        </div>
      )}
      <div className="flex flex-col w-full gap-1 mt-6 px-2">
        {userContacts &&
          userContacts.map((userContact) => (
            <ContactElement contact={userContact} />
          ))}
      </div>
    </section>
  );
}
