import { IconType } from "react-icons";
import { Link } from "react-router-dom";

interface MenuItemProps {
  name: string;
  Icon: IconType;
  href: string;
  onClick?: () => void;
}
export default function MenuItem({ name, Icon, href, onClick }: MenuItemProps) {
  return (
    <Link
      to={href}
      className="flex gap-2 items-center hover:text-secondary-blue duration-300 ease-in-out"
      onClick={onClick}
    >
      <Icon />
      <p className="font-medium  ">{name}</p>
    </Link>
  );
}
