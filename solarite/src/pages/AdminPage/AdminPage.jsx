import { useNavigate } from "react-router-dom";
import Appointments from "../Appointments/Appointments";


export const AdminPage = () => {
  const navigate = useNavigate();
  return (
    <div>
     <button onClick={navigate('/appointments')}></button>
      Admin Page
      <Appointments/>
    </div>
  )
}
