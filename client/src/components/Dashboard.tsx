import DashboardElement from "./ui/DashboardElement";
import { ChatIcon, ContactIcon } from "../components/ui/Icons";
import SecondDashboardElement from "./ui/SecondDashboardElement";
import ProfileModal from "./ui/ProfileModal";
import { useChatContext } from "../hooks/useChatContext";

export default function Dashboard() {
  const { setModalOpen } = useChatContext();

  return (
    <section className="w-1/5 lg:w-1/3 2xl:w-[25%] p-6 flex h-full min-w-[200px] justify-between flex-col max-lg:hidden text-sm">
      <div>
        <div className="size-8 bg-[#0372c122] rounded-full">
          <img src="logo.webp"></img>
        </div>
        <div className="mt-14 flex-col flex gap-6">
          <DashboardElement title="Chat" Icon={ChatIcon} />
          <SecondDashboardElement
            title="Add new contact"
            Icon={ContactIcon}
            onClick={() => setModalOpen(true)}
          />
        </div>
      </div>
      <ProfileModal />
    </section>
  );
}
