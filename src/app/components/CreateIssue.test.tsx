import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider, createClient, cacheExchange, fetchExchange } from "urql";
import CreateIssue from "./CreateIssue";

const client = createClient({
  url: "http://localhost:3000/api/graphql",

  exchanges: [cacheExchange, fetchExchange],
});

describe("CreateIssue", () => {
  test("renders Create Issue component", () => {
    render(
      <Provider value={client}>
        <CreateIssue isOpen={false} onOpenChange={() => {}} />
      </Provider>
    );

    // const linkElement = screen.getByText(/new issue/i);
    // expect(linkElement).toBeInTheDocument();
  });
});
