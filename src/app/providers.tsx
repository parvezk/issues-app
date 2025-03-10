// import { NextUIProvider } from "@nextui-org/react";

// export function Providers({ children }: { children: React.ReactNode }) {
//   return <NextUIProvider>{children}</NextUIProvider>;
// }

import React from "react";
import { UserProvider } from "./context/UserContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <UserProvider>{children}</UserProvider>;
};

export default Providers;
