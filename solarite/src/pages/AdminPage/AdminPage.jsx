import { useNavigate } from "react-router-dom";


export const AdminPage = () => {
  const navigate = useNavigate();
  return (
    <div>
     <button onClick={navigate('/appointments')}></button>
      Admin Page
    </div>
  )
}
