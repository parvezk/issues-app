// import { gql } from "urql";
import { gql } from "graphql-tag";

export const USERS_QUERY = gql`
  query UsersQuery {
    user {
      email
      id
      createdAt
    }
  }
`;
