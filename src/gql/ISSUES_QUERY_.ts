// import { gql } from "urql";
import { gql } from "graphql-tag";

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
