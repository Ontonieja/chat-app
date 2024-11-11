import { useChatContext } from "../../hooks/useChatContext";
import useAuth from "../../hooks/useAuth";

export default function Message({ other }: { other: boolean }) {
  const { selectedUserData } = useChatContext();
  const { user } = useAuth();

  return (
    <div className="w-full ">
      <div className={`flex gap-2  ${other ? "flex-row-reverse" : ""}`}>
        <img
          src={other ? selectedUserData?.avatar : user?.avatar}
          className="size-10 rounded-full"
        ></img>
        <div
          className={`bg-secondary-blue ${
            other ? "!bg-light-blue !text-text-gray" : "bg-light-blue"
          } items-center inline-block xl:max-w-[60%] 2xl:max-w-[50%] text-white rounded-b-3xl ${
            other ? "rounded-tl-3xl" : "rounded-tr-3xl"
          }`}
        >
          <p className="py-3 px-4">
            Hello, my pillow is a little rough ich bin max Hello, my pillow is a
            little Hello, my and i cant to see if youda dasd asd asdasd asdas d
          </p>
        </div>
      </div>
    </div>
  );
}
