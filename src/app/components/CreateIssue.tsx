import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import { useMutation } from "urql";
import { CREATE_ISSUE_MUTATION } from "@/gql";
import { IssueStatus } from "@/lib/schema";

const CreateIssue = ({ isOpen, onOpenChange }) => {
  const [issueTitle, setIssueTitle] = useState("");
  const [issueDescription, setIssueDescription] = useState("");

  const [_, createNewIssue] = useMutation(CREATE_ISSUE_MUTATION);

  const onCreate = async (close) => {
    const input = {
      title: issueTitle,
      content: issueDescription,
      status: IssueStatus.BACKLOG,
      // TODO: move to schema def
      userId: "admin", // Replace with CTX; actual user ID
    };

    const result = await createNewIssue({ input });

    if (result.error) {
      console.error("Failed to create issue", result.error);
    } else {
      console.log("Issue created", result.data.createIssue);
      close();
    }
  };

  return (
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
  );
};

export default CreateIssue;
