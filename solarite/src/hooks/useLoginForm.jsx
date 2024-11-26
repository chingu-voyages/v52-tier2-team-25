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

<<<<<<< HEAD
=======
  const handleFormRegisterSubmit = async (e) => {
    e.preventDefault();

    if (values.password !== values.passwordConfirm) {
      console.log("Passwords do not match.");
      return;
    }
    if (values.password.length < 6) {
      console.log("Password must be at least 6 characters long.");
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
    const { error: insertError } = await supabase
      .from('user')
      .insert([
        {
          id: user.id,
          name: values.name,
          email: values.email,
          contact: values.contact,
          address: values.address,
          profile_name: values.profileName
        }
      ]);

    if (insertError) {
      console.error("Error:", insertError.message);
      return;
    }

    console.log("Sign-up successful:", data);
  };

>>>>>>> 3722e7387df504a8100acb40974bc376896321dd
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

<<<<<<< HEAD
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
=======
    try {
      const { data: employeeData, error: employeeError } = await supabase
        .from('employee')
        .select('id')
        .eq('id', user.id)
        .single();

      if (employeeError) {
        if (employeeError.code === 'PGRST116') {  
          console.warn("User not found in employee table, redirecting to user page.");
          navigate("/userPage");
        } else {
          throw new Error(employeeError.message);
        }
      } else {
        navigate("/adminPage");
        console.log("Admin login successful:", user);
      }
    } catch (err) {
      console.error("Error checking employee table:", err.message);
      alert("An unexpected error occurred. Please try again later.");
>>>>>>> 3722e7387df504a8100acb40974bc376896321dd
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
