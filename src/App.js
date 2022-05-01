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
      <Route path="/event/create" element={<EventEdit />} />
      <Route path="/event/:id/edit" element={<EventEdit />} />
      <Route path="/event/:id" element={<Event />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
