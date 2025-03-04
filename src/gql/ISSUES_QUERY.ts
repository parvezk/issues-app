import { gql } from "urql";

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
