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

  const handleChangeValues = (event) => {
    const { name, value } = event.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleBlur = (field, value) => {
    const dataToValidate = {
      ...values,
      [field]: value,
    };
    validateData(dataToValidate, field);
  };

  const validateData = (dataToValidate, field) => {
    const validation = signUpSchema.safeParse(dataToValidate);

    if (!validation.success) {
      // Find errors specific to this field
      const fieldErrors = validation.error.errors.filter(
        (error) => error.path[0] === field
      );

      if (fieldErrors.length > 0) {
        const newErrors = { ...errors };
        newErrors[field] = fieldErrors[0].message;
        setErrors(newErrors);
      }
      return;
    }

    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const handleFormRegisterSubmit = async (e) => {
    e.preventDefault();

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
    validateData,
    setErrors,
  };
};
