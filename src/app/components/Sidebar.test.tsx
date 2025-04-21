import React from "react";
import { render } from "@/utils/testUtils";
import Sidebar from "./Sidebar";

describe("Sidebar", () => {
  test("renders without errors", () => {
    expect(() => render(<Sidebar />)).not.toThrow();
  });
});
