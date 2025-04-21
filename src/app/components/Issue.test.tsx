import React from "react";
import { render, screen, act } from "@/utils/testUtils";
import userEvent from "@testing-library/user-event";
import { useMutation } from "urql";
import Issue from "./Issue";
import { IssueStatus } from "@/db/schema";

jest.mock("urql", () => ({
  ...jest.requireActual("urql"),
  useMutation: jest.fn(),
}));

let fetchMock: jest.Mock,
  consoleLogSpy: jest.SpyInstance,
  consoleErrorSpy: jest.SpyInstance;

const issue = {
  id: "id",
  title: "issue title",
  content: "content",
  status: "BACKLOG",
};

describe("Issue", () => {
  beforeAll(() => {
    fetchMock = jest.fn();
    (global as any).fetch = fetchMock;
    (useMutation as jest.Mock).mockReturnValue([{}, jest.fn()]);

    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders without error", () => {
    render(<Issue issue={issue} />);
    expect(screen.getByText("issue title")).toBeInTheDocument();
    expect(screen.getByText("content")).toBeInTheDocument();
  });

  test("changes issue status", async () => {
    render(<Issue issue={issue} />);
    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();

    await userEvent.selectOptions(select, IssueStatus.TODO);
    expect(select).toHaveValue(IssueStatus.TODO);
  });

  test("deletes issue here", async () => {
    const mockDeleteIssue = jest.fn().mockResolvedValue({
      data: { deleteIssue: { id: issue.id } },
    });

    // Update the useMutation mock to return the mockDeleteIssue function
    (useMutation as jest.Mock).mockReturnValue([{}, mockDeleteIssue]);
    render(<Issue issue={issue} />);
    const deleteButton = screen.getByRole("button", { name: /delete/i });
    expect(deleteButton).toBeInTheDocument();

    await userEvent.click(deleteButton);
    expect(deleteButton).not.toBeDisabled();

    expect(mockDeleteIssue).toHaveBeenCalledTimes(1);
    expect(mockDeleteIssue).toHaveBeenCalledWith({ id: issue.id });
  });

  test("changes issue status", async () => {
    render(<Issue issue={issue} />);
    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();

    await userEvent.selectOptions(select, IssueStatus.TODO);
    expect(select).toHaveValue(IssueStatus.TODO);
  });

  test("logs error when delete issue fails", async () => {
    // Mock the deleteIssue mutation to return an error
    const mockDeleteIssue = jest.fn().mockResolvedValue({
      error: new Error("Failed to delete issue"),
    });
    (useMutation as jest.Mock).mockReturnValue([{}, mockDeleteIssue]);

    render(<Issue issue={issue} />);
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
    (useMutation as jest.Mock).mockReturnValue([{}, mockDeleteIssue]);

    render(<Issue issue={issue} />);
    const deleteButton = screen.getByRole("button", { name: /delete/i });
    await userEvent.click(deleteButton);

    expect(consoleLogSpy).toHaveBeenCalledWith("Issue deleted successfully", {
      id: "id",
    });
  });
});
