import { create } from "zustand";

const getInitialTheme = () => {
  const stored = localStorage.getItem("theme");
  if (stored === "dark" || stored === "light") return stored;
  return "dark";
};

const applyTheme = (theme) => {
  document.documentElement.classList.toggle("dark", theme === "dark");
  localStorage.setItem("theme", theme);
};

const initialTheme = getInitialTheme();
applyTheme(initialTheme);

const useThemeStore = create((set, get) => ({
  theme: initialTheme,

  toggleTheme: () => {
    const next = get().theme === "dark" ? "light" : "dark";
    applyTheme(next);
    set({ theme: next });
  },
}));

export default useThemeStore;
