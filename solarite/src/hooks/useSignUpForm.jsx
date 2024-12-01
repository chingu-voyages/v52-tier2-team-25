import { useState } from "react";
import { supabase } from "../services/supabase";
import { signUpSchema } from "../schemas/signUpSchema";

export const useSignUpForm = () => {
  const [values, setValues] = useState({
    email: "",
    emailConfirm: "",
    name: "",

    // Step 2: Password
    password: "",
    passwordConfirm: "",

    // Step 3: Contact
    phone: "",
    address: "",

    // Step 4: Profile
    profileName: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    if (!touched[name] && !value) return;

    try {
      const fieldSchema = signUpSchema.shape[name];
      fieldSchema.parse(value);
      setErrors((prev) => ({ ...prev, [name]: null }));
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        [name]: error.errors[0].message,
      }));
    }
  };

  const handleChangeValues = (event) => {
    const { name, value } = event.target;
    setErrors((prev) => ({ ...prev, [name]: null }));

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleBlur = (name, value) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const handleFormRegisterSubmit = async (e) => {
    e.preventDefault();
    console.log(values);

    if (values.password !== values.passwordConfirm) {
      console.log("Passwords do not match.");
      return;
    }
    if (values.password.length <= 6) {
      console.log("Password must be at least 6 characters long.");
      console.log(values.password);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    });

    if (error) {
      console.error("Error signing up:", error.message);
      return;
    }

    const { user } = data;

    //add to the user table
    const { error: insertError } = await supabase.from("user").insert([
      {
        id: user.id,
        name: values.name,
        email: values.email,
        contact: values.contact,
        address: values.address,
        profile_name: values.profileName,
      },
    ]);

    if (insertError) {
      console.error("Error:", insertError.message);
      return;
    }

    console.log("Sign-up successful:", data);
  };

  return {
    values,
    errors,
    handleChangeValues,
    handleFormRegisterSubmit,
    handleBlur,
  };
};
