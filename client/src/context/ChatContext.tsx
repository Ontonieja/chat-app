import { createContext, useEffect, useState } from "react";
import { ContactProps, MessageProps, UserProps } from "../utils/types";
import { useAxios } from "../hooks/useAxios";
import { GET_CONTACTS, GET_MESSAGES } from "../utils/constants";
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
  contactMessages: Record<number, MessageProps[]>;
  setContactMessages: React.Dispatch<
    React.SetStateAction<Record<number, MessageProps[]>>
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
  contactMessages: {},
  setContactMessages: () => {},
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
  const [contactMessages, setContactMessages] = useState<
    Record<number, MessageProps[]>
  >({});

  const { fetchData } = useAxios();
  const { user } = useAuth();

  const clearChatContext = () => {
    setSelectedUserData(null);
    setUserContacts(null);
  };

  useEffect(() => {
    if (user) {
      const fetchMessagesAndContacts = async () => {
        try {
          const messagesResponse = await fetchData({
            url: GET_MESSAGES,
            method: "GET",
          });

          const contactsResponse = await fetchData({
            url: GET_CONTACTS,
            method: "GET",
          });

          const groupedMessages = messagesResponse.reduce(
            (
              acc: { [contactId: number]: MessageProps[] },
              message: MessageProps
            ) => {
              const contactId =
                message.senderId === user.id
                  ? message.recipentId
                  : message.senderId;

              if (!acc[contactId]) {
                acc[contactId] = [];
              }
              acc[contactId].push(message);
              return acc;
            },
            {} as { [contactId: string]: MessageProps[] }
          );

          if (contactsResponse)
            setUserContacts(contactsResponse as ContactProps[]);
          setContactMessages(groupedMessages);
        } catch (error) {
          console.error("Error fetching messages", error);
        }
      };

      fetchMessagesAndContacts();
    }
  }, [user]);

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
        contactMessages,
        setContactMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
