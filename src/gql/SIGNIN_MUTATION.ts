import { gql } from "urql";

export const SIGNIN_MUTATION = gql`
    mutation Mutation($input: AuthInput!) {
        signin(input: $input) {
            token
        }
    }
`;
