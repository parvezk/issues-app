import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider, createClient, cacheExchange, fetchExchange } from "urql";
import Issue from "./Issue";
import { IssueStatus } from "@/db/schema";

const urql = require("urql");

let fetchMock: jest.Mock,
  consoleLogSpy: jest.SpyInstance,
  consoleErrorSpy: jest.SpyInstance;

const issue = {
  id: "id",
  title: "issue title",
  content: "content",
  status: "BACKLOG",
};

const client = createClient({
  url: "http://localhost:4000/graphql",
  exchanges: [cacheExchange, fetchExchange],
});

const renderIssue = () =>
  render(
    <Provider value={client}>
      <Issue issue={issue} />
    </Provider>
  );

describe("Issue", () => {
  beforeAll(() => {
    // Mock fetch function
    fetchMock = jest.fn();
    (global as any).fetch = fetchMock;

    // Mock console.error and console.log
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    // Mock useMutation from urql
    jest
      .spyOn(urql, "useMutation")
      .mockImplementation(() => [
        jest.fn(),
        jest.fn().mockResolvedValue({ data: {}, error: {} }),
      ]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders component", () => {
    renderIssue();
    expect(screen.getByText("issue title")).toBeInTheDocument();
    expect(screen.getByText("content")).toBeInTheDocument();
  });

  test("changes issue status", async () => {
    renderIssue();
    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();

    await userEvent.selectOptions(select, IssueStatus.TODO);
    expect(select).toHaveValue(IssueStatus.TODO);
  });

  test("deletes issue", async () => {
    renderIssue();
    const deleteButton = screen.getByRole("button", { name: /delete/i });
    expect(deleteButton).toBeInTheDocument();
    await userEvent.click(deleteButton);
    expect(deleteButton).not.toBeDisabled();
  });

  test("changes issue status", async () => {
    renderIssue();
    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();

    await userEvent.selectOptions(select, IssueStatus.TODO);
    expect(select).toHaveValue(IssueStatus.TODO);
  });

  test("deletes issue", async () => {
    renderIssue();
    const deleteButton = screen.getByRole("button", { name: /delete/i });
    await userEvent.click(deleteButton);
  });

  test("logs error when delete issue fails", async () => {
    // Mock the deleteIssue mutation to return an error
    const mockDeleteIssue = jest.fn().mockResolvedValue({
      error: new Error("Failed to delete issue"),
    });
    urql.useMutation.mockReturnValue([{}, mockDeleteIssue]);

    renderIssue();
    const deleteButton = screen.getByRole("button", { name: /delete/i });
    await userEvent.click(deleteButton);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Failed to delete issue",
      expect.any(Error)
    );
  });

  test("logs success when delete issue succeeds", async () => {
    // Mock the deleteIssue mutation to return success
    const mockDeleteIssue = jest.fn().mockResolvedValue({
      data: { deleteIssue: { id: "id" } },
    });
    urql.useMutation.mockReturnValue([{}, mockDeleteIssue]);

    renderIssue();
    const deleteButton = screen.getByRole("button", { name: /delete/i });
    await userEvent.click(deleteButton);

    expect(consoleLogSpy).toHaveBeenCalledWith("Issue deleted successfully", {
      id: "id",
    });
  });
});
