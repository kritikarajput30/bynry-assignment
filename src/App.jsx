import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import User from "./pages/User";
import Admin from "./pages/Admin";
import Map from "./pages/Map";

function App() {

  return (
   <div>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/user" element={<User/>} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/map" element={<Map />} />

      </Routes>
    </Router>
   </div>
  )
}

export default App
