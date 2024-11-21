import { useEffect, useState } from "react";
import { useAxios } from "./useAxios";
import { GET_CONTACTS } from "../utils/constants";
import { ContactProps } from "../utils/types";
import useAuth from "./useAuth";
import { useChatContext } from "./useChatContext";

export const useFetchAndSortContacts = () => {
  const { fetchData } = useAxios();
  const { user } = useAuth();
  const { selectedUserMessages, userContacts, setUserContacts } =
    useChatContext();
  const [sortedContacts, setSortedContacts] = useState<ContactProps[]>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await fetchData({ method: "GET", url: GET_CONTACTS });
        if (data) setUserContacts(data as ContactProps[]);
      } catch (err) {
        console.error("Error fetching contacts" + err);
      }
    };
    fetchContacts();
  }, [user, userContacts, setUserContacts]);

  useEffect(() => {
    if (userContacts && selectedUserMessages) {
      const lastMessagesByContact = userContacts.map((contact) => {
        const contactMessages = selectedUserMessages.filter(
          (message) =>
            message.senderId === contact.id || message.recipentId === contact.id
        );
        const lastMessage = contactMessages.sort(
          (a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime()
        )[0];
        return { contact, lastMessage };
      });

      const sorted = lastMessagesByContact
        .sort(
          (a, b) =>
            new Date(b.lastMessage?.sentAt || 0).getTime() -
            new Date(a.lastMessage?.sentAt || 0).getTime()
        )
        .map(({ contact }) => contact);

      setSortedContacts(sorted);
    }
  }, [selectedUserMessages, userContacts]);

  return { sortedContacts };
};
