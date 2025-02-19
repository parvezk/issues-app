const schema = `#graphql
type User {
      id: String!
      email: String!
      createdAt: String!
    }

  type Issue {
    id: String!
    title: String!
    userId: String!
    content: String!
    status: String!
    createdAt: String!
  }

  enum IssueStatus {
    BACKLOG
    TODO
    INPROGRESS
    DONE
  }

  input CreateIssueInput {
    userId: String!
    title: String!
    content: String!
    status: IssueStatus
  }

  type Query {
    users: [User!]!
    issuesForUser(email: String!): [Issue!]!
  }

  type Mutation {
    updateIssueStatus(id: String!, status: String!): Issue!
    createIssue(input: CreateIssueInput!): Issue!
    
  }

`;

export default schema;
