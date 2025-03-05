import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider, createClient, cacheExchange, fetchExchange } from "urql";
import Issue from "./Issue";

const client = createClient({
  url: "http://localhost:3000/api/graphql",

  exchanges: [cacheExchange, fetchExchange],
});

describe("CreateIssue", () => {
  test("renders Create Issue component", () => {
    const issue = {
      id: "id",
      title: "issue title",
      content: "content",
      status: "BACKLOG",
    };
    render(
      <Provider value={client}>
        <Issue issue={issue} replay={jest.fn()} />
      </Provider>
    );
    // screen.debug();
    const title = screen.getByText(/issue title/i);
    expect(title).toBeInTheDocument();
  });
});
