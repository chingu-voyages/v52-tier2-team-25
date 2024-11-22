import { Login } from "./pages/Login/Login"
import { Router } from "./Router";


const App = () => {

  return (
    <div className="bg-black text-center h-screen w-full flex justify-center items-center flex-col">
      <h1 className="text-white">SOLARITE</h1>
      <Router/>
    </div>
  )
}

export default App;
 