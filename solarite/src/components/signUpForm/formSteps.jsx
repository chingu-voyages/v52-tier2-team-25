import { SignUpInput } from "../inputs/SignUpInput";

const Email = () => {
  return (
    <div className="flex flex-col space-y-4">
      <SignUpInput label="Email" name="email" type="email" />
      <SignUpInput label="Confirm Email" name="emailConfirm" type="email" />
      <SignUpInput label="Name" name="name" type="text" />
    </div>
  );
};

const Password = () => (
  <div className="flex flex-col space-y-4">
    <SignUpInput label="Password" name="password" type="password" />
    <SignUpInput
      label="Confirm Password"
      name="passwordConfirm"
      type="password"
    />
  </div>
);

const Address = () => (
  <div className="flex flex-col space-y-4">
    <SignUpInput label="Address" name="address" type="text" />
    <SignUpInput label="Phone number" name="phone" type="tel" />
  </div>
);

const Profile = () => (
  <div>
    <SignUpInput label="Profile name" name="profileName" type="text" />
  </div>
);

export { Email, Password, Address, Profile };
