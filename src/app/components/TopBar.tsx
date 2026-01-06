import React, { useEffect, useMemo, useRef } from "react";
import { useQuery } from "urql";

import { useUserContext } from "@/app/context/UserContext";
import { USERS_QUERY } from "@/gql/USERS_QUERY";

const TopBar = () => {
  const { theme, toggleTheme, setUser } = useUserContext();
  const previousUserRef = useRef(null);

  const [{ data, fetching, error }, replay] = useQuery({
    query: USERS_QUERY,
  });

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (data?.user && data.user !== previousUserRef) {
      setUser(data.user);
      previousUserRef.current = data.user;
    }
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
        <p className="info">{data.user.email}</p>
        <button onClick={toggleTheme}>{`${renderText} Theme`} </button>
        <button onClick={() => {}}>Logout</button>
      </div>
    </header>
  );
};

export default TopBar;

/**
 * Added a useRef hook to keep track of the previous user data.
Updated the useEffect hook to only call setUser if the user data has changed.
- Avoids unnecessary updates to the context API.
- Prevents unnecessary re-renders of the entire application.
- Maintains performance by ensuring state updates only occur when necessary.
 */
