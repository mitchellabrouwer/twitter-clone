import Link from "next/link";
import React from "react";

interface linkProps {
  name: string;
  icon: JSX.Element;
}

export const NavLink: React.FC<linkProps> = ({ name, icon }) => {
  return (
    <li className="list-none p-2">
      <Link href="/">
        <a className="flex items-center justify-start gap-2 capitalize">
          {icon}
          {name}
        </a>
      </Link>
    </li>
  );
};
