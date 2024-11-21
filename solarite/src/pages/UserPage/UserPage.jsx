import { supabase } from "../../services/supabase";

export const UserPage = () =>{

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
    <div>
      <h1 className="text-white">USER PAGE</h1>
      <button className="bg-white p-2 rounded">Add Appointment</button>
    </div>
  )
}
