import Homepage from "./pages/homepage";
import Event from "./pages/event";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Profile from "./pages/profile";

// pages
// import LoginOrRegister from "./components/LoginOrRegister/LoginOrRegister";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/event/:id" element={<Event />} />
      <Route path="/profile" element={<Profile />} />
      {/* <Route path="about" element={<About />} /> */}
    </Routes>
  );
}

export default App;
