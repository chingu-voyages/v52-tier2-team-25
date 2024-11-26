import { useState, useEffect } from "react";
import { supabase } from "../services/supabase"; 

const useAppointments = (user) => {
  const [appointments, setAppointments] = useState([]);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUserRole = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("employee")
        .select("role")
        .eq("id", user.id)
        .single(); //fetch a single row

      if (error) {
        console.error("Erro ao buscar role do usuário:", error.message);
      } else {
        setRole(data.role);
      }
    } catch (err) {
      console.error("Erro inesperado:", err.message);
    }
  };

  const getAppointments = async (role) => {
    if (!user || !role) return;

    try {
      let query = supabase.from("appointment").select(`
        id,
        created_at,
        appointment_date,
        appointment_time,
        admin_id,
        user: user_id (name, email, address, contact),
        employee: admin_id (name) 
      `);

      if (role === "employee") {
        query = query.or(`admin_id.eq.${user.id},admin_id.is.null`); //filter employee
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error:", error.message);
      } else {
        setAppointments(data);
      }
    } catch (err) {
      console.error("Error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getUserRole();
    };
    fetchData();
  }, [user]);

  useEffect(() => {
    if (role) {
      getAppointments(role);
    }
  }, [role]);

  return { appointments, loading, role };
};

export default useAppointments;
