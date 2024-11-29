import { useEffect, useState } from "react";
import { useChatContext } from "./useChatContext";
import { ContactProps } from "../utils/types";

export const useSortContacts = () => {
  const { contactMessages, userContacts } = useChatContext();
  const [sortedContacts, setSortedContacts] = useState<ContactProps[]>([]);

  useEffect(() => {
    if (userContacts && contactMessages) {
      const sorted = userContacts
        .map((contact) => {
          const messages = contactMessages[contact.id] || [];
          const lastMessage = messages.sort(
            (a, b) =>
              new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime()
          )[0];
          return { contact, lastMessage };
        })
        .sort(
          (a, b) =>
            new Date(b.lastMessage?.sentAt || 0).getTime() -
            new Date(a.lastMessage?.sentAt || 0).getTime()
        )
        .map(({ contact }) => contact);

      setSortedContacts(sorted);
    }
  }, [contactMessages, userContacts]);

  return { sortedContacts };
};
