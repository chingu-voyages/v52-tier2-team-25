import { Link } from "react-router-dom";
import solariteLogo from "/solarite-logo-w.svg";

const SignUpNav = () => {
  return (
    <div className="px-10 pt-6 pb-6 border-b-[1px] border-slate-50/25 flex items-start">
      <Link to="/">
        <img src={solariteLogo} alt="solarite logo" className="h-14 w-h-14" />
      </Link>
    </div>
  );
};

export default SignUpNav;
