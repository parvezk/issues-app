import React from "react";
import TopBar from "./TopBar";
// import { render, screen, fireEvent } from "@testing-library/react";
import { render, screen, fireEvent } from "@/utils/testUtils";
import { useQuery } from "urql";
import { useUserContext } from "@/app/context/UserContext";

/* jest.mock("urql", () => ({
  useQuery: jest.fn(),
})); */

jest.mock("urql", () => {
  const actualUrql = jest.requireActual("urql");
  return {
    ...actualUrql,
    useQuery: jest.fn(),
  };
});
/*
jest.mock("@/app/context/UserContext", () => ({
  useUserContext: jest.fn(),
})); */

jest.mock("@/app/context/UserContext", () => {
  const actualContext = jest.requireActual("@/app/context/UserContext");
  return {
    ...actualContext,
    useUserContext: jest.fn(),
  };
});

describe("TopBar", () => {
  const mockSetUser = jest.fn();
  const mockToggleTheme = jest.fn();

  beforeEach(() => {
    (useUserContext as jest.Mock).mockReturnValue({
      theme: "light",
      toggleTheme: mockToggleTheme,
      setUser: mockSetUser,
    });

    (useQuery as jest.Mock).mockReturnValue([
      {
        data: { user: { email: "test@example.com" } },
        fetching: false,
        error: null,
      },
      jest.fn(),
    ]);
  });

  test("renders without error", () => {
    render(<TopBar />);
    expect(screen.getByText("Parallel")).toBeInTheDocument();
    // screen.debug();
  });

  test("displays user email", () => {
    render(<TopBar />);
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
  });

  test("displays loading state", () => {
    (useQuery as jest.Mock).mockReturnValue([
      { data: null, fetching: true, error: null },
      jest.fn(),
    ]);
    render(<TopBar />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("displays error state", () => {
    (useQuery as jest.Mock).mockReturnValue([
      { data: null, fetching: false, error: { message: "Error occurred" } },
      jest.fn(),
    ]);
    render(<TopBar />);
    expect(screen.getByText("Error: Error occurred")).toBeInTheDocument();
  });

  test("toggles theme on button click", () => {
    render(<TopBar />);
    const button = screen.getByText("Dark Theme");
    fireEvent.click(button);
    expect(mockToggleTheme).toHaveBeenCalled();
  });

  test("sets user on data change", () => {
    render(<TopBar />);
    expect(mockSetUser).toHaveBeenCalledWith({ email: "test@example.com" });
  });
});
