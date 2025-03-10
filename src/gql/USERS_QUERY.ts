import { gql } from "urql";

export const USERS_QUERY = gql`
  query UsersQuery {
    user {
      email
      id
      createdAt
    }
  }
`;
