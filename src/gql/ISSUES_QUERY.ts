// import { gql } from "urql";
import { gql } from "graphql-tag";

export const ISSUES_QUERY = gql`
  query IssuesQuery {
    issues {
      id
      title
      content
      status
      createdAt
    }
  }
`;
