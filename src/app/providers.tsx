import React from "react";
import GQLProvider from "@/app/gqlProvider";
import { UserProvider } from "@/app/context/UserContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <GQLProvider>
      <UserProvider>{children}</UserProvider>
    </GQLProvider>
  );
};

export default Providers;
