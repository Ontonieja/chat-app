import useAuth from "../hooks/useAuth";
import Dashboard from "../components/Dashboard";
import ContactList from "../components/ContactList";
import ChatElement from "../components/ChatElement";

export default function Chat() {
  const { user, logout } = useAuth();

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <section className="bg-white h-[90vh] w-[90vw] flex rounded-2xl shadow-">
        {user && <Dashboard user={user} logout={logout} />}
        <ContactList user={user} />
        {/* <EmptyChat /> */}
        <ChatElement />
      </section>
    </main>
  );
}
