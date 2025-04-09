// import { gql } from "urql";
import { gql } from "graphql-tag";

export const DELETE_ISSUE_MUTATION = gql`
  mutation DeleteIssue($id: ID!) {
    deleteIssue(id: $id) {
      id
    }
  }
`;
