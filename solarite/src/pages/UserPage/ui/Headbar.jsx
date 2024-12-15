import { Link } from "react-router-dom";
import solariteLogo from "/solarite-logo-w.svg";
import { FaUserCircle } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useState } from "react";
import { useLoginForm } from "@/hooks/useLoginForm";

export function HeadBar() {
  const [toggleDropdown, SetToggleDropdown] = useState(false);
  const { handleSignOut } = useLoginForm({ setUser: () => {} });

  const handleDropDown = () => {
    SetToggleDropdown((prevState) => !prevState);
  };

  return (
    <>
      <header className="flex justify-between w-full items-center z-10 text-white p-3 sticky bg-sky-900">
        <Link to="/userPage">
          <img src={solariteLogo} alt="solarite logo" className="w-h-14 h-14" />
        </Link>

        <div id="user--account" className="flex items-center gap-2 p-1">
          <FaUserCircle className="text-[1.3em]" />
          <RiArrowDropDownLine
            className="text-[1.5em] cursor-pointer"
            onClick={handleDropDown}
          />
        </div>
      </header>

      {toggleDropdown && (
        <div className="w-full flex justify-end">
          <div
            role="dropdown menu"
            className="dropdown bg-sky-900 text-white flex flex-col items-center absolute w-36 h-fit gap-3"
          >
            <Link
              to={"/profile-settings"}
              className="hover:bg-sky-950 w-full py-2 text-center"
            >
              Profile
            </Link>
            
            <Link
              onClick={handleSignOut}
              className="hover:bg-sky-950 w-full py-2 text-center"
            >
              Logout
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
