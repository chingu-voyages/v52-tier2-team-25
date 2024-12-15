import { MailIcon } from "lucide-react";

const SignUpFooter = () => {
  return (
    <footer className="px-8 py-10 text-gray-500">
      <div className="flex md:gap-10 lg:gap-20 justify-between md:justify-start text-xs sm:text-sm md:text-base">
        <p>
          © 2024 Solarite.
          <br className="black md:hidden" /> All rights reserved
        </p>

        <p className="flex gap-2 items-center hover:underline">
          <MailIcon size={16} /> fakesupport@email.com
        </p>
      </div>
    </footer>
  );
};

export default SignUpFooter;
