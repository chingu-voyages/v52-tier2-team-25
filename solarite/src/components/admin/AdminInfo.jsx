import useAppointments from "@/hooks/useAppointments";
import { useAuth } from "../../hooks/useAuth";
import { useLoginForm } from "../../hooks/useLoginForm";
import { useState, useEffect } from "react";
import { supabase } from "../../services/supabase";

const AdminInfo = () => {
  const { user } = useAuth();
  const { handleSignOut } = useLoginForm({ setUser: () => {} });
  const { appointments, loading, role, refreshAppointments } =
    useAppointments(user);

  const [employeeName, setEmployeeName] = useState(null);
  const [loadingName, setLoadingName] = useState(true);
  const [showOptions, setShowOptions] = useState(false);

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
    <div
      className="flex items-center justify-center gap-2 fixed bottom-4 w-[90%] bg-cyan-950 rounded-lg
    px-4 py-3 hover:bg-sky-800 transition cursor-pointer active:bg-sky-800 focus:bg-sky-800
    "
      onClick={() => {
        setShowOptions(!showOptions);
      }}
    >
      {user ? (
        <>
          {loadingName ? (
            <p className="text-sm">Loading...</p>
          ) : (
            <>
              <div className="rounded-full bg-gray-500 text-white w-10 h-10 flex items-center justify-center">
                AD
              </div>
              <p className="text-sm text-white">
                <span className="font-bold text-md">{employeeName}</span>
              </p>
            </>
          )}
          <AdminOptions
            handleSignOut={handleSignOut}
            showOptions={showOptions}
          />
        </>
      ) : (
        <p className="text-sm text-gray-400">Nenhum usuário logado.</p>
      )}
    </div>
  );
};

export default AdminInfo;

const AdminOptions = ({ handleSignOut, showOptions }) => {
  return (
    <div
      className={`${
        showOptions ? "absolute" : "hidden"
      } -top-12 rounded-lg py-2 px-2 text-left bg-cyan-950 w-full
      `}
    >
      <button
        onClick={handleSignOut}
        className=" text-white text-left px-6 rounded hover:bg-sky-800 transition w-full"
      >
        Logout
      </button>
    </div>
  );
};
