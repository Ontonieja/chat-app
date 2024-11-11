import { useChatContext } from "../hooks/useChatContext";
import SearchInput from "./ui/SearchInput";
import Lottie from "lottie-react";
import contactAnimation from "../assets/contact-animation.json";
import React, { useEffect, useState } from "react";
import { ADD_CONTACT, SEARCH_CONTACT } from "../utils/constants";
import { useAxios } from "../hooks/useAxios";
import { ContactProps, UserProps } from "../utils/types";
import AvatarWithName from "./ui/AvatarWithName";
import axios from "axios";

export default function ContactModal() {
  const {
    modalOpen,
    setModalOpen,
    setSelectedUserData,
    userContacts,
    setUserContacts,
  } = useChatContext();
  const [searchTerm, setSearchTerm] = useState("");
  const { response, error, fetchData } = useAxios();
  const [searchedUsers, setSearchedUsers] = useState<UserProps[]>([]);

  const debounce = (onChange: (value: string) => void) => {
    let timeout: ReturnType<typeof setTimeout>;
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const form = e.currentTarget.value as string;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 500);
    };
  };

  const handleSearch = async (searchValue: string) => {
    setSearchTerm(searchValue);

    if (searchValue.length > 0) {
      await fetchData({
        method: "POST",
        url: SEARCH_CONTACT,
        data: { searchValue },
      });
      if (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (response) {
      setSearchedUsers(response as UserProps[]);
    }

    if (searchTerm.length <= 0) {
      setSearchedUsers([]);
    }
  }, [response, searchTerm]);

  const handleContactClick = async (user: UserProps) => {
    setSelectedUserData(user);
    setModalOpen(false);
    setSearchedUsers([]);
    setUserContacts([...(userContacts as ContactProps[]), user]);

    try {
      await axios.post(
        ADD_CONTACT,
        {
          contactId: user.id,
        },
        {
          withCredentials: true,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      className={`${
        modalOpen ? "opacity-100" : "opacity-0 invisible"
      } ease-in-out duration-300 fixed inset-0 bg-black bg-opacity-50 shadow-md flex flex-col items-center justify-center z-50 transition-all`}
    >
      <div className="h-96 w-80  md:size-[480px] bg-white flex flex-col rounded-lg shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-600 text-xl hover:text-gray-900"
          onClick={() => {
            setModalOpen(false);
          }}
        >
          ×
        </button>
        <h2 className="text-base: md:text-lg font-semibold mb-4 p-6 text-center">
          Please select a contact
        </h2>
        <div className="px-6 w-full">
          <SearchInput
            className="!bg-light-blue "
            onChange={debounce(handleSearch)}
          />
        </div>

        {searchTerm.length <= 0 ? (
          <>
            <div className="flex flex-1 flex-col items-center gap-4 justify-center">
              <div className="md:-mt-12 xl:-mt-32">
                <Lottie
                  animationData={contactAnimation}
                  loop={true}
                  className="w-[200px] md:w-[300px]"
                />
              </div>
              <h2 className="text-base md:text-lg font-semibold mb-4 -mt-14 md:-mt-20 xl:-mt-20 text-center">
                Who’s your next{" "}
                <span className="text-primary-blue">wave? </span>
                Choose a contact!
              </h2>
            </div>
          </>
        ) : (
          <>
            {Array.isArray(searchedUsers) && searchedUsers.length > 0 && (
              <div className="flex justify-start flex-col flex-1 mt-6 gap-3 pr-6 pl-3 overflow-y-auto">
                {searchedUsers.map((user) => (
                  <AvatarWithName
                    key={user.id}
                    user={user}
                    className="hover:bg-light-blue px-3 py-1 rounded-2xl cursor-pointer"
                    onClick={() => handleContactClick(user)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
