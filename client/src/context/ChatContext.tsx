import { createContext, useState } from "react";
import { ContactProps, UserProps } from "../utils/types";

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
}

export const ChatContext = createContext<ChatContextValue>({
  modalOpen: false,
  setModalOpen: () => {},
  selectedUserData: {} as UserProps | ContactProps | null,
  setSelectedUserData: () => {},
  userContacts: null as ContactProps[] | null,
  setUserContacts: () => {},
  clearChatContext: () => {},
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

  const clearChatContext = () => {
    setSelectedUserData(null);
    setUserContacts(null);
  };

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
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
