import avatar from "../assets/avatar3.png";

export default function ContactElement() {
  return (
    <div className="flex gap-3 w-full hover:bg-white rounded-2xl px-2 py-3">
      <img src={avatar} className="size-10 rounded-full "></img>
      <div className="flex-1">
        <div className="flex justify-between">
          <h3 className="font-medium">John Doe</h3>
          <span className="text-light-gray text-xs">2min</span>
        </div>
        <p className="text-light-gray line-clamp-1">Thank you so much </p>
      </div>
    </div>
  );
}
