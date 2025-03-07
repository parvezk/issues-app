import React, { useEffect } from "react";

import { Boxes, LayoutGrid, Settings } from "lucide-react";
import Link from "next/link";
import { useThemeContext } from "@/context/ThemeContext";

const links = [
  { href: "/", name: "Issues", Icon: Boxes },
  { href: "/projects", name: "Projects", Icon: LayoutGrid },
  { href: "/settings", name: "Settings", Icon: Settings },
];

const Sidebar = () => {
  const { theme, toggleTheme } = useThemeContext();

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const renderText = (theme) => {
    let txt = theme === "light" ? "dark" : "light";
    return txt.charAt(0).toUpperCase() + txt.slice(1);
  };

  return (
    <div className="sidebar">
      <div>Parallel</div>
      <button onClick={toggleTheme}>{`${renderText(theme)} Theme`} </button>
      <ul>
        {links.map((link) => {
          return (
            <li key={link.href}>
              <Link href={link.href}>
                <link.Icon size={16} />
                <span>{link.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
