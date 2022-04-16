import Homepage from "./pages/homepage";
import Event from "./pages/event";
import { Routes, Route } from "react-router-dom";
import "./App.css";

// pages
// import LoginOrRegister from "./components/LoginOrRegister/LoginOrRegister";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/event/:id" element={<Event />} />
      {/* <Route path="about" element={<About />} /> */}
    </Routes>
  );
}

export default App;
