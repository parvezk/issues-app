import { gql } from "urql";

export const SIGNUP_MUTATION = gql`
    mutation Mutation($input: AuthInput!) {
        createUser(input: $input) {
            token
        }
    }
`;
