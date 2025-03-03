"use client";

import { Spinner, Tooltip, useDisclosure } from "@nextui-org/react";
import { PlusIcon } from "lucide-react";
import { Provider, useQuery } from "urql";
import urqlClient from "@/lib/urqlClient";
import "./globals.css";
import "./issues.css";
import { ISSUES_QUERY } from "@/gql";
import Issue from "./components/Issue";
import CreateIssue from "./components/CreateIssue";

const HomePage = () => {
  const [{ data, fetching, error }, replay] = useQuery({
    query: ISSUES_QUERY,
    variables: { email: "admin@admin.com" },
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <header>
        <h1>Issues App</h1>
        <h2>Issues</h2>
        <Tooltip content="New Issue">
          <button
            className="text-white bg-black p-1 rounded-md"
            onClick={onOpen}
          >
            <PlusIcon size={14} />
          </button>
        </Tooltip>
      </header>
      <main>
        <ol className="issues-list">
          <li>
            <h4>Title</h4>
            <h4>Content</h4>
            <h4>Status</h4>
          </li>
          {data?.issuesForUser.map((issue: any) => (
            <Issue key={issue.id} issue={issue} replay={replay} />
          ))}
        </ol>
      </main>
      <CreateIssue isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
};

export default function App() {
  return (
    <Provider value={urqlClient}>
      <HomePage />
    </Provider>
  );
}
