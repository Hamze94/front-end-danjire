import { createContext, useContext, useState } from "react";

export const DarkModeContext = createContext();
export const useDarkMode = () => useContext(DarkModeContext);
export function DarkModeProvider(props) {
    const [darkMode, setdarkMode] = useState(false);

    const toggleDarkMode = () => {
        setdarkMode(!darkMode);
    }
    return (
        <DarkModeContext.Provider
            value={{
                darkMode,
                toggleDarkMode,
            }}
        >
            {props.children}
        </DarkModeContext.Provider>
    );
}