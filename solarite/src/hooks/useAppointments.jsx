import { useState, useEffect } from "react";
import { supabase } from "../services/supabase"; 

const useAppointments = (user, statusFilter = null) => {
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
        console.error("Error:", error.message);
      } else {
        setRole(data.role);
      }
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  const getAppointments = async (role, statusFilter) => {
    if (!user || !role) return;

    try {
      let query = supabase.from("appointment").select(`
        id,
        created_at,
        appointment_date,
        appointment_time,
        admin_id,
        status,
        type,
        user: user_id (name, email, address, contact),
        employee: admin_id (name) 
      `);

      if (role === "employee") {
        query = query.or(`admin_id.eq.${user.id},admin_id.is.null`); 
      }

      if (statusFilter) {
        query = query.eq("status", statusFilter); 
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

  const refreshAppointments = () => {
    setLoading(true);
    getAppointments(role, statusFilter); 
  };

  useEffect(() => {
    const fetchData = async () => {
      await getUserRole(role);
    };
    fetchData();
  }, [user]);

  useEffect(() => {
    if (role) {
      getAppointments(role, statusFilter); 
    }
  }, [role, statusFilter]);

  return { appointments, loading, role, refreshAppointments };
};

export default useAppointments;
