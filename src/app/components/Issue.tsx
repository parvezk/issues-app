import { useState } from "react";
import { useMutation } from "urql";
import { ISSUES_QUERY, UPDATE_ISSUE_STATUS_MUTATION } from "@/gql";
import { IssueStatus } from "@/lib/schema";

const Issue = ({ issue }) => {
  const [status, setStatus] = useState(issue.status);
  const [, updateIssueStatus] = useMutation(UPDATE_ISSUE_STATUS_MUTATION);

  const handleStatusChange = (issueId: string, newStatus: IssueStatus) => {
    console.log("handleStatusChange called with:", issueId, newStatus);
    updateIssueStatus({ id: issueId, status: newStatus }).then((result) => {
      console.log("Mutation result:", result);
    });
    /* updateIssueStatus(
      { id: issueId, status: newStatus },
      {
        // Optimistically update the cache without refetching
        update: (cache, mutationResult) => {
          console.log("UPDATE cache", mutationResult);
          if (!mutationResult.data) return;

          const currentData = cache.readQuery({
            query: ISSUES_QUERY,
            variables: { email: "admin@admin.com" },
          });

          if (currentData) {
            const updatedIssues = currentData.issuesForUser.map((issue: any) =>
              issue.id === issueId ? { ...issue, status: newStatus } : issue
            );
            console.log(
              "UPDATED",
              updatedIssues.filter((i) => i.id === issueId)
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
            console.log("Selected new status:", newStatus);
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
    </li>
  );
};

export default Issue;
