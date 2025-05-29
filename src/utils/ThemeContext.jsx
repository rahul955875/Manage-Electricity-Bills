import { createContext, useContext, useState } from "react";

const themeContext = createContext('lkjgljsf');
export const ThemeContext = ({ children }) => {
  const [isDark, setIsDark] = useState(true);
  return (
    <themeContext.Provider value={[isDark, setIsDark]}>
      {children}
    </themeContext.Provider>
  );
};

export const useTheme = () => useContext(themeContext);
