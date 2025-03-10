export type Theme = "light" | "dark";

export type User = {
  id: string;
  email: string;
  createdAt: string;
};

export interface UserContextProps {
  theme: Theme;
  toggleTheme: () => void;
  user: User | null;
  setUser: (user: User) => void;
}
