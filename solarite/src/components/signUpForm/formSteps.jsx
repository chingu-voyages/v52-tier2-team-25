import { SignUpInput } from "../inputs/SignUpInput";
import { AddressAutofill } from "@mapbox/search-js-react";
import { useFormContext } from "@/context/FormContext";
import { useState } from "react";
import Input, { isPossiblePhoneNumber } from "react-phone-number-input/input";

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
  const { handleChangeValues, errors, handleBlur, setErrors, values } =
    useFormContext();
  const [inputValue, setInputValue] = useState(values.address);
  const [phone, setPhone] = useState(values.phone);
  const [isAddressSelected, setIsAddressSelected] = useState(false);

  const handlePhoneBlur = () => {
    if (phone && !isPossiblePhoneNumber(phone)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone: "Invalid phone number",
      }));
      handleChangeValues({
        target: {
          name: "phone",
          value: "",
        },
      });
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone: null,
      }));
      handleBlur("phone", phone);
    }
    console.log(values);
  };

  const handleAddressSelect = (result) => {
    if (result.features && result.features[0]) {
      const selectedAddress = result.features[0].properties.place_name;
      setInputValue(selectedAddress);
      setIsAddressSelected(true);
      handleChangeValues({
        target: {
          name: "address",
          value: selectedAddress,
        },
      });
    }
    if (errors["address"]) {
      const newErrors = { ...errors };
      delete newErrors["address"];
      setErrors(newErrors);
    }
    console.log(values);
  };

  const handleAddressBlur = () => {
    if (!isAddressSelected) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        address: "Please select an address from the suggestions",
      }));
    }
  };

  const handleAddressChange = (e) => {
    if (!isAddressSelected) {
      setInputValue(e.target.value);
      setErrors((prev) => ({
        ...prev,
        address: null,
      }));
      handleChangeValues(e);
    }
    e.preventDefault();
  };

  const handlePhoneChange = (value) => {
    setPhone(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      phone: null,
    }));
    handleChangeValues({
      target: {
        name: "phone",
        value: value || "",
      },
    });
  };

  return (
    <div className="flex flex-col space-y-4">
      <div
        className={`flex flex-col gap-2 ${
          errors["address"] ? "text-red-500" : ""
        }`}
      >
        <label
          className={`text-[1.1em] ${
            errors["address"] !== null ? "text-red-500" : ""
          }`}
        >
          Address
        </label>

        {!isAddressSelected ? (
          <AddressAutofill
            accessToken={import.meta.env.VITE_MAPBOX_API_KEY}
            options={{
              country: "US",
              bbox: [-118.6682, 33.7037, -118.1553, 34.3373], // Los Angeles bounding box
            }}
            onRetrieve={handleAddressSelect}
          >
            <input
              name="address"
              type="text"
              value={inputValue}
              onChange={handleAddressChange}
              onBlur={handleAddressBlur}
              className={`p-2 text-black bg-white rounded border-0 ring-0 text-md focus:outline-none focus:ring-0 focus:border-0 ${
                errors["address"] ? "border-red-500" : ""
              }`}
              autoComplete="address-line1"
            />
          </AddressAutofill>
        ) : (
          <input
            name="address"
            type="text"
            value={inputValue}
            className={`p-2 text-black bg-white rounded border-0 ring-0 text-md focus:outline-none focus:ring-0 focus:border-0 ${
              errors["address"] ? "border-red-500" : ""
            }`}
            readOnly
            autoComplete="address-line1"
          />
        )}

        {isAddressSelected && (
          <button
            type="button"
            onClick={() => {
              setIsAddressSelected(false);
              setInputValue("");
              handleChangeValues({
                target: {
                  name: "address",
                  value: "",
                },
              });
            }}
            className="text-sm text-blue-500 hover:text-blue-700"
          >
            Change Address
          </button>
        )}
        {errors["address"] && (
          <span className="text-sm text-red-500">{errors["address"]}</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label
          className={`text-[1.1em]  ${errors["phone"] ? "text-red-500" : ""}`}
        >
          Phone number
        </label>
        <Input
          country="US"
          value={phone}
          onBlur={handlePhoneBlur}
          onChange={handlePhoneChange}
          className={`p-2 text-black bg-white rounded border-0 ring-0 text-md focus:outline-none focus:ring-0 focus:border-0 ${
            errors["phone"] ? "border-red-500" : ""
          }`}
        />
        {errors["phone"] && (
          <span className="text-sm text-red-500">{errors["phone"]}</span>
        )}
      </div>
    </div>
  );
};

const Profile = () => (
  <div>
    <SignUpInput label="Profile name" name="profileName" type="text" />
  </div>
);

export { Email, Password, Address, Profile };
