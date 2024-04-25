import { createContext, useContext, useEffect, useState } from "react";

export const DarkModeContext = createContext();
export const useDarkMode = () => useContext(DarkModeContext);

export function DarkModeProvider(props) {
    const [darkMode, setDarkMode] = useState(() => {
        const savedDarkMode = localStorage.getItem('darkMode');
        return savedDarkMode ? JSON.parse(savedDarkMode) : false;
    });

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
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
