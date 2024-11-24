import { navList } from "@/constants/constants";
import { Link } from "react-router-dom";
import solariteLogo from "/solarite-logo-w.svg";
import { Button } from "@/components/Button";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();
  const gotToPath = (obj) => {
    navigate(obj.path, { state: obj.state });
  };
    return(

      <header className="flex justify-between w-full items-center z-10 text-white p-5 fixed backdrop-blur-[5px]">
      <Link to="/">
        <img
          src={solariteLogo}
          alt="solarite logo"
          className="w-h-14 h-14"
        />
      </Link>
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
      <Button
        onClick={() => gotToPath({ path: "/login", state: "login" })}
        label="Login"
        className="py-2 text-black transition-all duration-500 bg-white rounded-full px-9 hover:bg-transparent hover:border hover:text-white"
      />
    </header>

    )
}