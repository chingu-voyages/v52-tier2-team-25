import { HeadBar } from "../UserPage/ui/Headbar";
import { Link } from "react-router-dom";
import { IoHelpBuoy, IoCall } from "react-icons/io5";

export function UserProfile() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <HeadBar />
      <div className="content w-full h-[calc(100vh-100px)] flex flex-col items-center justify-center py-24">
        <h1 className="text-xl">Feature under construction. For help:</h1>

        <div className="pt-5 pb-20 content">
          <Link>
            <p className="flex gap-3 items-center text-sky-950">
              <IoCall />
              +1 265-555-6589
            </p>
            <p className="flex gap-3 items-center text-sky-950">
              <IoHelpBuoy />
              help.solarite@mail.com
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
