import React from "react";
import ReactDOM from "react-dom/client";
import './main.css'
// import App from "./App";
import Stat from './pages/Stat';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Stat />
  </React.StrictMode>,
);
