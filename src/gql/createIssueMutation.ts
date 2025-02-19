import { gql } from "urql";

export const CreateIssueMutation = gql`
  mutation CreateIssue($input: CreateIssueInput!) {
    createIssue(input: $input) {
      createdAt
      id
      title
      status
    }
  }
`;
