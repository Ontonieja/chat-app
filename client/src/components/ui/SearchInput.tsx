import { SearchIcon } from "./Icons";

export default function SearchInput({
  className,
  onChange,
}: {
  className?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div className="w-full relative">
      <input
        type="text"
        placeholder="Search..."
        className={`${className} w-full bg-white p-3 rounded-xl pl-10 hover:outline-none focus:outline-none`}
        onChange={onChange}
      />
      <div className="absolute left-3 top-3">
        <SearchIcon />
      </div>
    </div>
  );
}
