import { Link } from "react-router-dom";
import solariteLogo from "/solarite-logo-w.svg";
import { FaUserCircle } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";



export function HeadBar() {

    return(
      <header className="flex justify-between w-full items-center z-10 text-white p-5 fixed backdrop-blur-[5px]">
      <Link to="/userPage">
        <img
          src={solariteLogo}
          alt="solarite logo"
          className="w-h-14 h-14"
        />
      </Link>

      <div id="user--account" className="flex gap-2">
        <FaUserCircle className="text-[1.3em]"/>
        <RiArrowDropDownLine className="text-[1.5em] cursor-pointer"/>
      </div>
    </header>

    )
}