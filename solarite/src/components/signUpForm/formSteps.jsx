import { Input } from "../Input";

const Email = () => (
  <div className="flex flex-col space-y-4">
    <Input label="Email" name="email" type="email" required />
    <Input label="Confirm Email" name="emailConfirm" type="email" required />
    <Input label="Name" name="name" type="text" required />
  </div>
);

const Password = () => (
  <div className="flex flex-col space-y-4">
    <Input label="Password" name="password" type="password" required />
    <Input
      label="Confirm Password"
      name="passwordConfirm"
      type="password"
      required
    />
  </div>
);

const Address = () => (
  <div className="flex flex-col space-y-4">
    <Input label="Address" name="address" type="text" required />
    <Input label="Phone number" name="phone" type="tel" required />
  </div>
);

const Profile = () => (
  <div>
    <Input label="Profile name" name="profileName" type="text" required />
  </div>
);

export { Email, Password, Address, Profile };
