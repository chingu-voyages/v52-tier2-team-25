import { useDebounce } from "@uidotdev/usehooks";
import { SignUpInput } from "../inputs/SignUpInput";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

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

const Address = () => {
  const [input, setInput] = useState("");
  const [debouncedInput] = useDebounce(input, 300);

  const { data, isLoading } = useQuery({
    queryKey: ["addresses", debouncedInput],
    queryFn: async () => {
      if (!debouncedInput) return [];
      const endpoint = `https://data.lacity.org/resource/4ca8-mxuh.json?$where=lower(street_address) like '%${debouncedInput.toLowerCase()}%'&$limit=10`;
      const response = await fetch(endpoint);
      return response.json();
    },
    enabled: !!debouncedInput,
  });

  if (data) console.log(data);
  return (
    <div className="flex flex-col space-y-4">
      <SignUpInput
        label="Address"
        name="address"
        type="text"
        setInput={setInput}
      />
      {/* {input && (
        <ul>
          {data.map((address) => (
            <li key={address.street_address}>{address.street_address}</li>
          ))}
        </ul>
      )} */}
      <SignUpInput label="Phone number" name="phone" type="tel" />
    </div>
  );
};

const Profile = () => (
  <div>
    <SignUpInput label="Profile name" name="profileName" type="text" />
  </div>
);

export { Email, Password, Address, Profile };
