import React, { useState } from "react";
import { useMutation } from "urql";
import { CREATE_ISSUE_MUTATION } from "@/gql/CREATE_ISSUE_MUTATION";
import { IssueStatus } from "@/db/schema";

const CreateIssue = ({ isOpen, onOpenChange }) => {
  const [issueTitle, setIssueTitle] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [_, createNewIssue] = useMutation(CREATE_ISSUE_MUTATION);

  const onCreate = async (close) => {
    const input = {
      title: issueTitle,
      content: issueDescription,
      status: IssueStatus.BACKLOG,
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
    <div
      className={`modal ${isOpen ? "modal-open" : "modal-closed"}`}
      role="dialog"
    >
      <div className="modal-content">
        <form>
          <div className="modal-header">
            <span>New Issue</span>
          </div>
          <div className="modal-body">
            <div>
              <input
                autoFocus
                required
                type="text"

                placeholder="Issue Title"
                value={issueTitle}
                onChange={(e) => setIssueTitle(e.target.value)}
              />
            </div>
            <div>
              <textarea

                placeholder="Issue Description"
                rows={3}
                cols={30}
                value={issueDescription}
                onChange={(e) => setIssueDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" name="cancel" onClick={() => onOpenChange()}>
              Cancel
            </button>
            <button
              type="button"
              name="create"
              onClick={() => onCreate(() => onOpenChange())}
            >
              Create Issue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateIssue;
