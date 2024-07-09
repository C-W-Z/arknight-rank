import React from "react";
import ReactDOM from "react-dom/client";
import './main.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { GlobalProvider } from "./components/GlobalContext";
import Menu from "./pages/Menu";
import CharList from "./pages/CharList";
import Stat from './pages/Stat';
import Battle from "./pages/Battle";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Menu />
  },
  {
    path: '/battle',
    element: <Battle />
  },
  {
    path: '/charlist',
    element: <CharList />
  },
  {
    path: '/stat',
    element: <Stat />
  }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GlobalProvider>
      <RouterProvider router={router} />
    </GlobalProvider>
  </React.StrictMode>,
);
