import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { ThemeProvider as ThemeProviderType } from '../types';

const ThemeContext = createContext<ThemeProviderType>({
  theme: 'light',
  toggleTheme: () => {},
});

const useTheme = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return { theme, toggleTheme };
};

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  }, [theme]);

  const values = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);
  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
};

export { useTheme };
export default ThemeProvider;
