import { useState } from "react";
import { AiFillBell, AiFillHome, AiFillMail } from "react-icons/ai";
import { BsFillBookmarkFill, BsHash, BsTwitter } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from "./NavLink";
import ToggleDark from "./ToggleDark";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const menu = [
    { name: "home", icon: <AiFillHome /> },
    { name: "explore", icon: <BsHash /> },
    { name: "notifications", icon: <AiFillBell /> },
    { name: "messages", icon: <AiFillMail /> },
    { name: "bookmarks", icon: <BsFillBookmarkFill /> },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <BsTwitter className="m-2 text-sky-400" size="40" />
        <GiHamburgerMenu
          className="m-2 cursor-pointer md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          size={"35"}
        />
      </div>
      <nav className={`${!isOpen ? "hidden" : ""} md:block`}>
        {menu.map((item) => (
          <NavLink name={item.name} icon={item.icon} />
        ))}
        <li className="list-none p-2">
          <ToggleDark />
        </li>
      </nav>
    </div>
  );
}
