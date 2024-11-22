import Dashboard from "../components/Dashboard";
import ContactList from "../components/ContactList";
import ChatElement from "../components/ChatElement";
import { useChatContext } from "../hooks/useChatContext";
import EmptyChat from "../components/EmptyChat";
import ContactModal from "../components/ContactModal";
import { useState } from "react";

export default function Chat() {
  const { selectedUserData, setSelectedUserData } = useChatContext();
  const [isChatOpen, setIsChatOpen] = useState(false);
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <ContactModal />
      <section className="bg-white h-[100vh] w-[100vw] lg:h-[90vh] lg:w-[90vw] flex rounded-2xl shadow-">
        <Dashboard />
        <ContactList onContactClick={() => setIsChatOpen(true)} />
        {!selectedUserData && <EmptyChat />}
        {selectedUserData && (
          <ChatElement
            isChatOpen={isChatOpen}
            closeChat={() => {
              setIsChatOpen(false);
              setSelectedUserData(null);
            }}
          />
        )}
      </section>
    </main>
  );
}
