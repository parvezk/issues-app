import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  ReactNode,
} from "react";
import { Theme, User, UserContextProps } from "./UserContextType";

type UserProviderType = {
  children: ReactNode;
};
const UserContext = createContext<UserContextProps | undefined>(undefined);
// TODO: make theme value passable than default to light
export const UserProvider = ({ children }: UserProviderType) => {
  const [theme, setTheme] = useState<Theme>("light");
  const [user, setUser] = useState<User | null>(null);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const value = useMemo(
    () => ({ theme, toggleTheme, user, setUser }),
    [theme, user]
  );
  // Alternative: value={{ user, setUser, theme, toggleTheme }}>
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useUserContext must be used within a UserProvider");

  return context;
};
