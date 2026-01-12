// import { gql } from "urql";
import { gql } from "graphql-tag";

// TODO: Refactor this query for fetching issues per user if multiple users are added
export const ISSUES_QUERY = gql`
  query IssuesForUser($email: String!) {
    issuesForUser(email: $email) {
      id
      title
      content
      status
    }
  }
`;
