<<<<<<< HEAD
import logo from './logo.svg';
import './App.css';
import PricingContent from "./event_home";

function App() {
  return (
    <PricingContent/>
  );
=======
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
>>>>>>> a970763722c9b65fd9d117a68f1078b3df02a9da
}

export default App;
