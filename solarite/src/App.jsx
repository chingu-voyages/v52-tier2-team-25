import { Login } from "./pages/Login/Login"
import { Landing } from "./pages/Landing/Landing"


const App = () => {

  return (
    <div className="bg-gray-800 text-center h-screen w-full flex justify-center items-center flex-col">
      <Landing />
      <Login/>
    </div>
  )
}

export default App;
 