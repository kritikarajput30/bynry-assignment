import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import User from "./pages/User";
import Admin from "./pages/Admin";
import Map from "./pages/Map";
import Profile from "./pages/Profile";
import { Toaster } from "react-hot-toast";

function App() {

  return (
   <div className="bg-gray-100">
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/user" element={<User/>} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/map" element={<Map />} />
        <Route path="/profile/:id" element={<Profile/>} />

      </Routes>
    </Router>
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
   </div>
  )
}

export default App
