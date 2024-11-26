import { Input } from "../Input";

const Email = () => {
  return (
    <div className="flex flex-col space-y-4">
      <Input label="Email" name="email" type="email" />
      <Input label="Confirm Email" name="emailConfirm" type="email" />
      <Input label="Name" name="name" type="text" />
    </div>
  );
};

const Password = () => (
  <div className="flex flex-col space-y-4">
    <Input label="Password" name="password" type="password" />
    <Input label="Confirm Password" name="passwordConfirm" type="password" />
  </div>
);

const Address = () => (
  <div className="flex flex-col space-y-4">
    <Input label="Address" name="address" type="text" />
    <Input label="Phone number" name="phone" type="tel" />
  </div>
);

const Profile = () => (
  <div>
    <Input label="Profile name" name="profileName" type="text" />
  </div>
);

export { Email, Password, Address, Profile };
