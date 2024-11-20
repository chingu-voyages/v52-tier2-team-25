import { useState } from "react";
import { supabase } from "../../services/supabase";
import { useAuth } from "../../hooks/useAuth";

export function Login() {
    const { user, setUser } = useAuth();
    const [currentScreen, setCurrentScreen] = useState(0);
    const [values, setValues] = useState({
        email: "",
        password: "",
        passwordConfirm: "",
    });

    const handleChangeValues = (event) => {
        setValues((prevValues) => ({
            ...prevValues,
            [event.target.name]: event.target.value,
        }));
    };

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

        console.log("Sign-up successful:", data);
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
        console.log("Login successful:", user);
    };

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("Error signing out:", error.message);
            return;
        }

        console.log("Sign-out successful.");
        setUser(null);
    };

    return (
        <div id="login-page" className="bg-sky-500">
            {user && (
                <div id="authenticated">
                    <h2>{user.email}</h2>
                    <button onClick={handleSignOut}>Sign out</button>
                </div>
            )}

            {!user && currentScreen === 0 && (
                <form onSubmit={handleFormLoginSubmit}>
                    <span className="flex gap-2 flex-col">
                        <label>Email</label>
                        <input
                            required
                            name="email"
                            type="email"
                            onChange={handleChangeValues}
                            value={values.email}
                        />
                    </span>

                    <span className="flex gap-2 flex-col">
                        <label>Password</label>
                        <input
                            required
                            name="password"
                            type="password"
                            onChange={handleChangeValues}
                            value={values.password}
                        />
                    </span>

                    <button type="submit">Log in</button>

                    <p className="space-between">
                        <span className="space-between row-direction">
                            Don't have an account?{" "}
                            <a
                                onClick={() => {
                                    setCurrentScreen(1);
                                    setValues({
                                        email: "",
                                        password: "",
                                        passwordConfirm: "",
                                    });
                                }}
                            >
                                Sign Up
                            </a>
                        </span>
                    </p>
                </form>
            )}

            {!user && currentScreen === 1 && (
                <form onSubmit={handleFormRegisterSubmit}>
                    <h2>Create New Account</h2>

                    <span className="flex gap-2 flex-col">
                        <label>Email</label>
                        <input
                            required
                            name="email"
                            type="email"
                            onChange={handleChangeValues}
                            value={values.email}
                        />
                    </span>

                    <span className="flex gap-2 flex-col">
                        <label>Password</label>
                        <input
                            required
                            name="password"
                            type="password"
                            onChange={handleChangeValues}
                            value={values.password}
                        />
                    </span>

                    <span className="flex gap-2 flex-col">
                        <label>Confirm Password</label>
                        <input
                            required
                            name="passwordConfirm"
                            type="password"
                            onChange={handleChangeValues}
                            value={values.passwordConfirm}
                        />
                    </span>

                    <button type="submit">Sign up</button>
                    <p>
                        Already have an account?{" "}
                        <a
                            onClick={() => {
                                setCurrentScreen(0);
                                setValues({
                                    email: "",
                                    password: "",
                                    passwordConfirm: "",
                                });
                            }}
                        >
                            Log in
                        </a>
                    </p>
                </form>
            )}
        </div>
    );
}
