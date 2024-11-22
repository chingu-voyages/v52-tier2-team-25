import solariteLogo from "/solarite-logo.svg";
import { navList } from "@/constants/constants";

export function Landing() {
  return (
    <div className="container w-full h-full">
      <header className="border">
        <img src={solariteLogo} alt="solarite logo" className="w-16 h-16" />
        <nav className="flex">
          {navList.map((nav) => (
            <a key={nav.name} to={nav.path}>
              {nav.name}
            </a>
          ))}
        </nav>
      </header>
    </div>
  );
}
