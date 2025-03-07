// import { NextUIProvider } from "@nextui-org/react";

// export function Providers({ children }: { children: React.ReactNode }) {
//   return <NextUIProvider>{children}</NextUIProvider>;
// }

import React from "react";
import { ThemeProvider } from "./context/ThemeContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default Providers;
