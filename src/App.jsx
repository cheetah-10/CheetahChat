import React, { useContext, useEffect } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Sidebar from './components/Sidebar/Sidebar';
import Main from './components/Main/Main';
import { ModeContext } from "./context/ModeContext";

const App = () => {
  const { darkMode } = useContext(ModeContext);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  return (
    <>
      <Sidebar/>
      <Main/>
    </>
  )
}

export default App