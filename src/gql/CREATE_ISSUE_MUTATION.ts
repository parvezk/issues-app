import { gql } from "urql";

export const CREATE_ISSUE_MUTATION = gql`
  mutation CreateIssue($input: CreateIssueInput!) {
    createIssue(input: $input) {
      createdAt
      id
      title
      content
      status
    }
  }
`;
