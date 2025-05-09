// import { gql } from "urql";
import { gql } from "graphql-tag";
// TODO: remove and test
import { IssueStatus } from "@/db/schema";

export const UPDATE_ISSUE_STATUS_MUTATION = gql`
  mutation UpdateIssueStatus($id: String!, $status: IssueStatus!) {
    updateIssueStatus(id: $id, status: $status) {
      id
      status
    }
  }
`;
