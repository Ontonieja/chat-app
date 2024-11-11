import { useChatContext } from "../hooks/useChatContext";
import { ContactProps } from "../utils/types";

export default function ContactElement({ contact }: { contact: ContactProps }) {
  const { selectedUserData, setSelectedUserData } = useChatContext();

  const userId = selectedUserData?.id;
  const { firstName, lastName, avatar, id: contactId } = contact;

  return (
    <div
      className={`flex gap-3 w-full ${
        userId === contactId && "bg-white"
      } hover:bg-white rounded-2xl transition duration-200 ease-in-out cursor-pointer px-2 py-3`}
      onClick={() => setSelectedUserData(contact)}
    >
      <img src={avatar} className="size-10 rounded-full "></img>
      <div className="flex-1">
        <div className="flex justify-between">
          <h3 className="sm:text-xs md:text-sm  font-medium">{`${firstName} ${lastName}`}</h3>
          <span className="text-light-gray text-xs">2min</span>
        </div>
        <p className="sm:text-xs md:text-sm text-light-gray line-clamp-1">
          Thank you so much{" "}
        </p>
      </div>
    </div>
  );
}
