import React, { useState } from "react";
import { useMutation } from "urql";
import {
  UPDATE_ISSUE_STATUS_MUTATION,
  DELETE_ISSUE_MUTATION,
} from "@/gql";
import { IssueStatus } from "@/db/schema";

const Issue = ({ issue }) => {
  const [issueStatus, setIssueStatus] = useState(issue.status);
  // GraphQL Mutations
  const [, updateIssueStatus] = useMutation(UPDATE_ISSUE_STATUS_MUTATION);
  const [__, deleteIssue] = useMutation(DELETE_ISSUE_MUTATION);

  const handleStatusChange = (issueId: string, newStatus: IssueStatus) => {
    updateIssueStatus({ id: issueId, status: newStatus });
  };

  const onDelete = async (id: string) => {
    const result = await deleteIssue({ id });

    if (result.error) console.error("Failed to delete issue", result.error);
    else console.log("Issue deleted successfully", result.data.deleteIssue);
    // replay(); // Refresh the issues list
  };

  const { id, title, content, status } = issue;
  const { BACKLOG, TODO, IN_PROGRESS, DONE } = IssueStatus;
  return (
    <li key={id}>
      <h4>{title}</h4>
      <p>{content}</p>
      <div>
        <select
          value={issueStatus}
          onChange={(e) => {
            const newStatus = e.target.value as IssueStatus;
            setIssueStatus(newStatus);
            handleStatusChange(id, newStatus);
          }}
        >
          <option value={BACKLOG}>BACKLOG</option>
          <option value={TODO}>TODO</option>
          <option value={IN_PROGRESS}>IN_PROGRESS</option>
          <option value={DONE}>DONE</option>
        </select>
      </div>
      <div>
        <button
          name="delete"
          className="deleteBtn"
          onClick={() => onDelete(id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default Issue;

// caching updated data
/* updateIssueStatus(
      { id: issueId, status: newStatus },
      {
        // Optimistically update the cache without refetching
        update: (cache, mutationResult) => {

          if (!mutationResult.data) return;

          const currentData = cache.readQuery({
            query: ISSUES_QUERY,
            variables: { email: "admin@admin.com" },
          });

          if (currentData) {
            const updatedIssues = currentData.issuesForUser.map((issue: any) =>
              issue.id === issueId ? { ...issue, status: newStatus } : issue
            );

            cache.writeQuery({
              query: ISSUES_QUERY,
              variables: { email: "admin@admin.com" },
              data: { issuesForUser: updatedIssues },
            });
          }
        },
      }
    ); */
