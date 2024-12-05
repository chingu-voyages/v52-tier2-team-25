import { Link } from "react-router-dom";
import solariteLogo from "/solarite-logo-w.svg";

const Logo = () => {
  return (
    <Link to="/">
      <img src={solariteLogo} alt="solarite logo" className="h-14 w-h-14" />
    </Link>
  );
};

export default Logo;
