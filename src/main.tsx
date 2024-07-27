import React from "react";
import ReactDOM from "react-dom/client";
import './main.css';
import './utils/skin.css';
import './utils/icon.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { GlobalProvider } from "./components/GlobalContext";
import Menu from "./pages/Menu";
import CharList from "./pages/CharList";
import Stat from './pages/Stat';
import Battle from "./pages/Battle";
import Terminal from "./pages/Terminal";
import CharPrepare from "./pages/terminal/CharPrepare";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Menu />
  },
  {
    path: '/terminal',
    element: <Terminal />
  },
  {
    path: '/terminal/charprepare',
    element: <CharPrepare />
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
