import { gql } from "urql";

export const DELETE_ISSUE_MUTATION = gql`
  mutation DeleteIssue($id: ID!) {
    deleteIssue(id: $id) {
      id
    }
  }
`;
