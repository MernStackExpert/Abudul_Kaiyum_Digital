import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../lang/translations";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const toggleLang = () => {
    const newLang = lang === "en" ? "bn" : "en";
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  const t = translations[lang];

  return (
    <AppContext.Provider value={{ theme, toggleTheme, lang, toggleLang, t }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
