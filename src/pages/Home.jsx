import { useApp } from "../context/AppContext";

export default function Home() {
  const { theme, toggleTheme, lang, toggleLang, t } = useApp();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
      <header className="p-6 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">{t.title}</h1>
        <div className="flex gap-4">
          <button
            onClick={toggleLang}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white cursor-pointer font-medium"
          >
            {lang === "en" ? "বাংলা" : "English"}
          </button>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 cursor-pointer font-medium"
          >
            {theme === "light" ? t.darkMode : t.lightMode}
          </button>
        </div>
      </header>
      <main className="p-10 text-center">
        <h2 className="text-3xl font-semibold mb-6">{t.welcome}</h2>
      </main>
    </div>
  );
}
