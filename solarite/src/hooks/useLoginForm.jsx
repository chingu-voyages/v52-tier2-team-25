import { useState } from "react";
import { supabase } from "../services/supabase";
import { useNavigate } from "react-router-dom";

export const useLoginForm = ({ setUser }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const navigate = useNavigate();
  const handleChangeValues = (event) => {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  const handleFormLoginSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      console.error("Error logging in:", error.message);
      return;
    }

    const { user } = data;
    setUser(user);

    //new part
    const { data: employeeData, error: employeeError } = await supabase
      .from("employee")
      .select("id")
      .eq("id", user.id)
      .single();

    if (employeeError) {
      console.error("Error:", employeeError.message);
      return;
    }

    if (employeeData) {
      navigate("/adminPage");
      console.log("Admin login successful:", user);
    } else {
      navigate("/userPage");
      console.log("User login successful:", user);
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error signing out:", error.message);
      return;
    }

    navigate("/");

    console.log("Sign-out successful.");
    setUser(null);
  };

  return {
    values,
    setValues,
    handleChangeValues,
    handleFormLoginSubmit,
    handleSignOut,
  };
};
