import useAppointments from "@/hooks/useAppointments";
import { useAuth } from "../../hooks/useAuth"; 
import { useLoginForm } from "../../hooks/useLoginForm"; 
import { useState, useEffect } from "react";
import { supabase } from "../../services/supabase"; 

const AdminInfo = () => {
  const { user } = useAuth(); 
  const { handleSignOut } = useLoginForm({ setUser: () => {} }); 
  const { appointments, loading, role, refreshAppointments } = useAppointments(user);

  const [employeeName, setEmployeeName] = useState(null); 
  const [loadingName, setLoadingName] = useState(true); 

  useEffect(() => {
    const fetchEmployeeName = async () => {
      if (user && user.id) {
        setLoadingName(true); 

        const { data, error } = await supabase
          .from("employee")
          .select("name")
          .eq("id", user.id) 
          .single();

        if (error) {
          console.error("Error:", error.message);
          setEmployeeName("Null"); 
        } else {
          setEmployeeName(data?.name || "Null"); 
        }

        setLoadingName(false);
      }
    };

    fetchEmployeeName();
  }, [user]); 

  return (
    <div className="flex flex-col items-center justify-center gap-2 fixed bottom-8">
      {user ? (
        <>
          {loadingName ? (
            <p className="text-sm">Loading...</p>
          ) : (
            <p className="text-sm text-white"><span className="font-bold text-md">Name: {employeeName }</span></p>
          )}
          <button
            onClick={handleSignOut}
            className="  text-white px-4 rounded hover:bg-sky-500 transition"
          >
            Logout
          </button>
        </>
      ) : (
        <p className="text-sm text-gray-400">Nenhum usuário logado.</p>
      )}
    </div>
  );
};

export default AdminInfo;
