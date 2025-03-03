import { gql } from "urql";
import { IssueStatus } from "@/lib/schema";

export const UPDATE_ISSUE_STATUS_MUTATION = gql`
  mutation UpdateIssueStatus($id: String!, $status: IssueStatus!) {
    updateIssueStatus(id: $id, status: $status) {
      id
      status
    }
  }
`;
