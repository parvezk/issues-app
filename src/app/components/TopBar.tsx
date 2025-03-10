import React, { useEffect, useMemo } from "react";
import { useQuery } from "urql";
import { useUserContext } from "@/context/UserContext";
import { USERS_QUERY } from "@/gql/USERS_QUERY";

const TopBar = () => {
  const { theme, toggleTheme, setUser } = useUserContext();

  const [{ data, fetching, error }, replay] = useQuery({
    query: USERS_QUERY,
  });

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (data?.user) setUser(data.user);
  }, [data, setUser]);

  const renderText = useMemo(() => {
    let txt = theme === "light" ? "dark" : "light";
    return txt.charAt(0).toUpperCase() + txt.slice(1);
  }, [theme]);

  if (fetching) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <header className="top-bar">
      <h3 className="logo">Parallel</h3>
      <div className="top-right">
        <p className="info">
          User: <strong>{data.user.email}</strong>
        </p>
        <button onClick={toggleTheme}>{`${renderText} Theme`} </button>
        <button>Logout</button>
      </div>
    </header>
  );
};

export default TopBar;
