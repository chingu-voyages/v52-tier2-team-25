import { MailIcon } from "lucide-react";

const SignUpFooter = () => {
  return (
    <footer className="fixed bottom-0 px-8 py-10 text-gray-500">
      <div className="flex gap-20">
        <p>© 2024 Solarite. All rights reserved</p>

        <p className="flex gap-2 items-center hover:underline">
          <MailIcon size={16} /> fakesupport@email.com
        </p>
      </div>

      <div></div>
    </footer>
  );
};

export default SignUpFooter;
