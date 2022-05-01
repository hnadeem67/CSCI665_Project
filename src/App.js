import Homepage from "./pages/homepage";
import Event from "./pages/event";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Profile from "./pages/profile";
import EventEdit from "./pages/eventedit";

// pages
// import LoginOrRegister from "./components/LoginOrRegister/LoginOrRegister";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/event/:id" element={<Event />} />
      <Route path="/event/:id/edit" element={<EventEdit />} />
      <Route path="/profile" element={<Profile />} />
      {/* <Route path="about" element={<About />} /> */}
    </Routes>
  );
}

export default App;
