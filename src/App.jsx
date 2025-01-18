import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {User} from "./pages/User";
import {Admin} from ".pages/Admin";
import {Home} from ".pages/Home";

function App() {

  return (
   <div>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/user" element={<User/>} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
   </div>
  )
}

export default App
