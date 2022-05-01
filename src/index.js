import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./utils/authentication/AuthContext";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Modified ReactDOM. Reference: https://stackoverflow.com/questions/66112804/material-ui-lab-date-picker-cant-resolve-material-ui-lab-adapterdatefns
// and: https://codesandbox.io/s/youthful-wave-8xjy4?file=/src/index.js:97-149

// const root = ReactDOM.createRoot(document.getElementById('root'));
const rootElement = document.getElementById("root");

ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
