import React, { useState } from "react";
import { useMutation } from "urql";
import {
  ISSUES_QUERY,
  UPDATE_ISSUE_STATUS_MUTATION,
  DELETE_ISSUE_MUTATION,
} from "@/gql";
import { IssueStatus } from "@/db/schema";

const Issue = ({ issue, replay }) => {
  const [status, setStatus] = useState(issue.status);
  // GraphQL Mutations
  const [, updateIssueStatus] = useMutation(UPDATE_ISSUE_STATUS_MUTATION);
  const [__, deleteIssue] = useMutation(DELETE_ISSUE_MUTATION);

  const handleStatusChange = (issueId: string, newStatus: IssueStatus) => {
    updateIssueStatus({ id: issueId, status: newStatus });
  };

  const onDelete = async (id) => {
    const result = await deleteIssue({ id });

    if (result.error) {
      console.error("Failed to delete issue", result.error);
    } else {
      console.log("Issue deleted", result.data.deleteIssue);
      // replay(); // Refresh the issues list
    }
  };

  return (
    <li key={issue.id}>
      <h4>{issue.title}</h4>
      <p>{issue.content || "No content"}</p>
      <div>
        <select
          value={status || issue.status}
          onChange={(e) => {
            const newStatus = e.target.value as IssueStatus;
            setStatus(newStatus);
            handleStatusChange(issue.id, newStatus);
          }}
        >
          <option value={IssueStatus.BACKLOG}>BACKLOG</option>
          <option value={IssueStatus.TODO}>TODO</option>
          <option value={IssueStatus.IN_PROGRESS}>IN_PROGRESS</option>
          <option value={IssueStatus.DONE}>DONE</option>
        </select>
      </div>
      <div>
        <button onClick={() => onDelete(issue.id)}>Delete</button>
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
