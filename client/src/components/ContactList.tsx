import { UserProps } from "../utils/types";
import ContactElement from "./ContactElement";
import { HamburgerIcon, SearchIcon } from "./ui/Icons";

export default function ContactList({ user }: { user: UserProps | undefined }) {
  return (
    <section className="w-full sm:w-3/5 xl:w-2/5 2xl:w-2/6 h-full min-w-[180px] justify-between text-sm bg-light-blue overflow-y-scroll max-lg:rounded-2xl">
      <div className="lg:hidden flex justify-between pt-3 px-3 items-center">
        <img
          src={user?.avatar}
          alt="avatar"
          className="rounded-full size-10"
        ></img>
        <h2 className="font-medium text-lg">Chats</h2>
        <HamburgerIcon />
      </div>

      <div className="flex mt-4 px-3">
        <div className="w-full relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-white p-3 rounded-xl pl-10 hover:outline-none focus:outline-none"
          />
          <div className="absolute left-3 top-3">
            <SearchIcon />
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full mt-6 px-1">
        <ContactElement />
        <ContactElement />
      </div>
    </section>
  );
}
