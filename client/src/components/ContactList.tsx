import ContactElement from "./ContactElement";
import SearchInput from "./ui/SearchInput";
import { useState } from "react";
import { useSortContacts } from "../hooks/useSortContacts";
import MobileDashboard from "./MobileDashboard";

interface ContactListProps {
  onContactClick: () => void;
}

export default function ContactList({ onContactClick }: ContactListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const { sortedContacts } = useSortContacts();

  const filteredContacts = sortedContacts.filter(
    (contact) =>
      contact?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact?.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section
      className="w-full sm:w-3/5 xl:w-2/5 2xl:w-2/6 h-full min-w-[180px] justify-between text-sm bg-light-blue overflow-y-scroll relative overflow-hidden"
      onClick={onContactClick}
    >
      <MobileDashboard />

      <div className="flex mt-4 px-4">
        <SearchInput onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      {sortedContacts && !sortedContacts.length && (
        <div className="flex justify-center mt-20 px-4 text-center ">
          <p className="font-medium">
            No contacts yet. Add a contact to begin{" "}
            <span className="text-secondary-blue">chatting</span>!
          </p>
        </div>
      )}
      <div className="flex flex-col w-full gap-1 mt-6 px-2">
        {filteredContacts &&
          filteredContacts.map((userContact) => (
            <ContactElement key={userContact.id} contact={userContact} />
          ))}
      </div>
    </section>
  );
}
