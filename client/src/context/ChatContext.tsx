import { createContext, useEffect, useState } from "react";
import { ContactProps, MessageProps, UserProps } from "../utils/types";
import { useAxios } from "../hooks/useAxios";
import { GET_MESSAGES } from "../utils/constants";
import useAuth from "../hooks/useAuth";

export interface ChatContextValue {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedUserData: UserProps | ContactProps | null;
  setSelectedUserData: React.Dispatch<
    React.SetStateAction<UserProps | ContactProps | null>
  >;
  userContacts: ContactProps[] | null;
  setUserContacts: React.Dispatch<React.SetStateAction<ContactProps[] | null>>;
  clearChatContext: () => void;
  selectedUserMessages: MessageProps[] | null;
  setSelectedUserMessages: React.Dispatch<
    React.SetStateAction<MessageProps[] | null>
  >;
}

export const ChatContext = createContext<ChatContextValue>({
  modalOpen: false,
  setModalOpen: () => {},
  selectedUserData: {} as UserProps | ContactProps | null,
  setSelectedUserData: () => {},
  userContacts: null as ContactProps[] | null,
  setUserContacts: () => {},
  clearChatContext: () => {},
  selectedUserMessages: null,
  setSelectedUserMessages: () => {},
});

export function ChatContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState<
    UserProps | ContactProps | null
  >(null);
  const [userContacts, setUserContacts] = useState<ContactProps[] | null>(null);
  const [selectedUserMessages, setSelectedUserMessages] = useState<
    MessageProps[] | null
  >(null);

  const { fetchData, response, isLoading } = useAxios();
  const { user } = useAuth();

  const clearChatContext = () => {
    setSelectedUserData(null);
    setUserContacts(null);
  };

  useEffect(() => {
    if (user) {
      const fetchMessages = async () => {
        try {
          await fetchData({
            url: GET_MESSAGES,
            method: "GET",
          });
        } catch (error) {
          console.error("Błąd podczas ładowania wiadomości:", error);
        }
      };

      fetchMessages();
    }
  }, [user]);

  useEffect(() => {
    if (!isLoading && response) {
      if (Array.isArray(response) && response.length > 0) {
        setSelectedUserMessages(response as MessageProps[]);
      } else {
        console.warn("Response is empty or invalid:", response);
        setSelectedUserMessages([]);
      }
    }
  }, [response, isLoading]);

  return (
    <ChatContext.Provider
      value={{
        modalOpen,
        setModalOpen,
        selectedUserData,
        setSelectedUserData,
        userContacts,
        setUserContacts,
        clearChatContext,
        selectedUserMessages,
        setSelectedUserMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
