export default function Avatar({
  src,
  onClick,
  selectedAvatar,
}: {
  src: string;
  onClick?: () => void;
  selectedAvatar: string | null;
}) {
  return (
    <img
      src={src}
      alt="avatar"
      className={`size-20 md:size-24 rounded-full border cursor-pointer hover:scale-[103%] duration-300 ${
        selectedAvatar === src &&
        "border-primary-blue p-[6px] transition ease-in-out duration-5000"
      } `}
      onClick={onClick}
    ></img>
  );
}
