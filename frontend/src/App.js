import logo from './logo.svg';
import EventHome from "./event_home";
import { Routes, Route } from "react-router-dom";
import "./App.css";

// pages
import LoginOrRegister from "./components/LoginOrRegister/LoginOrRegister";

function App() {
    return (
        <Routes>
            <Route path="/" element={<LoginOrRegister />} />
            <Route path="/event_home" element={<EventHome />} />
            {/* <Route path="about" element={<About />} /> */}
        </Routes>
    );
}

export default App;
