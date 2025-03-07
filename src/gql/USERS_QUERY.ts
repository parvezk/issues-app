import { gql } from "urql";

export const USERS_QUERY = gql`
  query UsersQuery {
    users {
      email
      id
      createdAt
    }
  }
`;
