import { MoveLeft } from "lucide-react";

const SignUpNav = () => {
  return (
    <a
      href="/"
      className="flex gap-2 items-center cursor-pointer hover:text-green-600 hover:underline"
    >
      <MoveLeft color="rgb(22 163 74)" /> Back
    </a>
  );
};

export default SignUpNav;
