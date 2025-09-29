import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("");

  // Carrega preferência salva
  useEffect(() => {
    const saved = Cookies.get("theme");
    if (saved) setTheme(saved);
  }, []);

  // Salva sempre que mudar
  useEffect(() => {
    Cookies.set("theme", theme, { expires: 30 });
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`theme-${theme}`}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
