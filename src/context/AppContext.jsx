import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../lang/translations";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");

  const [adminUser, setAdminUser] = useState(() => {
    const savedUser = localStorage.getItem("adminData");
    return savedUser ? JSON.parse(savedUser) : null;
  });

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

  const login = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("adminData", JSON.stringify(userData));
    setAdminUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminData");
    setAdminUser(null);
  };

  const t = translations[lang];

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        lang,
        toggleLang,
        t,
        adminUser,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
