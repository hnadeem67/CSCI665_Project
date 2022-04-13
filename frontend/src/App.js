import { Routes, Route } from "react-router-dom";
import "./App.css";

// pages
import LoginOrRegister from "./components/LoginOrRegister/LoginOrRegister";

function App() {
    return (
        <Routes>
            <Route path="/" element={<LoginOrRegister />} />
            {/* <Route path="about" element={<About />} /> */}
        </Routes>
    );
}

export default App;
