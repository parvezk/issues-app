"use client";

import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Textarea,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { PlusIcon } from "lucide-react";
import { Provider, useQuery, useMutation } from "urql";
import urqlClient from "@/lib/urqlClient";
import "./globals.css";
import "./issues.css";
import {
  ISSUES_QUERY,
  CreateIssueMutation,
  UPDATE_ISSUE_STATUS_MUTATION,
} from "@/gql";
import { IssueStatus } from "@/lib/schema";
import Issue from "./components/Issue";

const HomePage = () => {
  const [{ data, fetching, error }, replay] = useQuery({
    query: ISSUES_QUERY,
    variables: { email: "admin@admin.com" },
  });

  const [_, createNewIssue] = useMutation(CreateIssueMutation);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [issueTitle, setIssueTitle] = useState("");
  const [issueDescription, setIssueDescription] = useState("");

  const onCreate = async (close) => {
    const input = {
      title: issueTitle,
      content: issueDescription,
      status: IssueStatus.BACKLOG,
      // TODO: move to schema def
      userId: "12345qwert", // Replace with CTX; actual user ID
    };

    const result = await createNewIssue({ input });

    if (result.error) {
      console.error("Failed to create issue", result.error);
    } else {
      console.log("Issue created", result.data.createIssue);
      close();
    }
  };

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
            <Issue key={issue.id} issue={issue} />
          ))}
        </ol>
      </main>
      <Modal
        size="2xl"
        isOpen={isOpen}
        placement="top-center"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <span className="text-sm text-black/70">New issue</span>
              </ModalHeader>
              <ModalBody>
                <div>
                  <input
                    autoFocus
                    type="text"
                    className="w-full border-none outline-none focus:outline-none focus:border-none py-2 text-xl text-black/70"
                    placeholder="Issue Title"
                    value={issueTitle}
                    onChange={(e) => setIssueTitle(e.target.value)}
                  />
                </div>
                <div className="bg-white">
                  <Textarea
                    size="lg"
                    variant="bordered"
                    placeholder="Issue description"
                    className="bg-white"
                    value={issueDescription}
                    onChange={(e) => setIssueDescription(e.target.value)}
                    classNames={{
                      inputWrapper: "bg-white border-none shadow-none p-0",
                      base: "bg-white p-0",
                      input: "bg-white p-0",
                      innerWrapper: "bg-white p-0",
                    }}
                  />
                </div>
              </ModalBody>
              <ModalFooter className="border-t">
                <Button variant="ghost" onPress={() => onOpenChange()}>
                  Cancel
                </Button>
                <Button
                  variant="solid"
                  className="bg-black text-white"
                  onPress={() => onCreate(onClose)}
                >
                  Create Issue
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
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
