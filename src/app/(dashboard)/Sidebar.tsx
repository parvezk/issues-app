import { Boxes, LayoutGrid, Settings } from "lucide-react";
import Link from "next/link";

const links = [
  { href: "/", name: "Issues", Icon: Boxes },
  { href: "/projects", name: "Projects", Icon: LayoutGrid },
  { href: "/settings", name: "Settings", Icon: Settings },
];

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div>Parallel</div>
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
