import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { UserPage } from './pages/UserPage/UserPage'
import { Login } from './pages/Login/Login'



export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/userPage" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  )
} 