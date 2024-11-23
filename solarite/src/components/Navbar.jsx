import { navList } from "@/constants/constants";
import { Link } from "react-router-dom";

export function Navbar() {
    return(
        <nav className="flex gap-14">
        {navList.map((nav) => (
          <Link
            key={nav.name}
            to={nav.path}
            className=" hover:text-blue-900 transition-all duration-500"
          >
            {nav.name}
          </Link>
        ))}
      </nav>
    )
}