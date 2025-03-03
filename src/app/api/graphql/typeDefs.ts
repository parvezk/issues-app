/**
 * Type definitions for GraphQL Schema (Data Model) ./src/gql
 * Rename to schema.graphql file?
 */
const schema = `#graphql

type User {
  id: String!
  email: String!
  createdAt: String!
}

enum IssueStatus {
  BACKLOG
  TODO
  IN_PROGRESS
  DONE
}

scalar ID

type Issue {
  id: String!
  title: String!
  userId: String!
  content: String!
  status: IssueStatus!
  createdAt: String!
}

input CreateIssueInput {
  userId: String!
  title: String!
  content: String!
  status: IssueStatus!
}

type Query {
  users: [User!]!
  issuesForUser(email: String!): [Issue!]!
}

type Mutation {
  updateIssueStatus(id: String!, status: IssueStatus!): Issue!
  createIssue(input: CreateIssueInput!): Issue!
  deleteIssue(id: ID!): Issue!
}
`;

export default schema;
