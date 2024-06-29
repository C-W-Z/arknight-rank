import React from "react";
import ReactDOM from "react-dom/client";
import './main.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Stat from './pages/Stat';
import Menu from "./pages/Menu";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Menu />
  },
  {
    path: '/stat',
    element: <Stat />
  }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
