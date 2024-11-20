import { createContext, useState, useContext, useEffect } from "react";
import { supabase } from "../services/supabase";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error) {
                console.error("Error fetching user:", error.message);
            } else {
                setUser(data.user);
                console.log("User:", data.user);
            }
        };

        fetchUser();
    }, []); 

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
