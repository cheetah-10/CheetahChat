// ModeContext.jsx
import { createContext, useState } from "react";

export const ModeContext = createContext();

const ModeContextProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);



    return (
        <ModeContext.Provider value={{ darkMode, setDarkMode }}>
            {children}
        </ModeContext.Provider>
    );
};

export default ModeContextProvider;
