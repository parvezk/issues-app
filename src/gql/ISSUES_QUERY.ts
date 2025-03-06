import { gql } from "urql";

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
