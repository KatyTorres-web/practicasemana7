import { createContext, useContext, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("day");

  function toggleTheme() {
    setTheme((current) => (current === "day" ? "night" : "day"));
  }

  const value = {
    theme,
    toggleTheme,
    isNight: theme === "night",
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// The context hook belongs beside its provider for a cohesive public API.
// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === null) {
    throw new Error("useTheme debe utilizarse dentro de ThemeProvider");
  }

  return context;
}
