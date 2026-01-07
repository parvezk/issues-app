import { db } from "@/db/db";
import { eq, desc } from "drizzle-orm";
import { users, issues, IssueStatus } from "@/db/schema";
import { GraphQLError } from "graphql";
import { signin, signup } from "@/utils/auth";
import { GQLContext } from "@/types/GQLContext";
/**
 * API Routes: Process incoming GraphQL queries/mutations requests
 * Interact with the SQLite Turso DB using Drizzle ORM
 */

const resolvers = {
  Query: {
    issues: async (_parent, _args, context: GQLContext) => {
      if (!context.user)
        throw new GraphQLError("ISSUES UNAUTHORIZED", {
          extensions: { code: 401 },
        });

      try {
        return await db
          .select()
          .from(issues)
          .where(eq(issues.userId, context.user.id))
          .orderBy(desc(issues.createdAt));
      } catch (err) {
        console.error("Failed to fetch issues:", err);
        throw new GraphQLError("Failed to fetch issues", {
          extensions: { code: "DB_ERROR" },
        });
      }
    },

    user: async (_parent, _args, context: GQLContext) => {
      if (!context.user)
        throw new GraphQLError("UNAUTHORIZED", {
          extensions: { code: 401 },
        });

      const user = await db.query.users.findFirst({
        where: eq(users.id, context.user.id),
      });

      if (!user) throw new Error("User not found");

      return user;
    },
  },

  Mutation: {
    createIssue: async (_parent, { input }, context: GQLContext) => {
      if (!context.user)
        throw new GraphQLError("UNAUTHORIZED", { extensions: { code: 401 } });

      const issueData = {
        ...input,
        userId: context.user.id,
        status: input.status || IssueStatus.BACKLOG,
      };

      const [newIssue] = await db.insert(issues).values(issueData).returning();
      if (!newIssue) throw new Error("CUSTOM Failed to create issue");
      console.log("issue created", newIssue);
      return newIssue;
    },

    updateIssueStatus: async (_parent, { id, status }, context: GQLContext) => {
      if (!context.user)
        throw new GraphQLError("UNAUTHORIZED", { extensions: { code: 401 } });
      const [updatedIssue] = await db
        .update(issues)
        .set({ [issues.status.name]: status })
        .where(eq(issues.id, id))
        .returning();

      if (!updatedIssue) throw new Error("Failed to update issue status");
      return updatedIssue;
    },

    deleteIssue: async (_parent, { id }, context: GQLContext) => {
      if (!context.user)
        throw new GraphQLError("UNAUTHORIZED", { extensions: { code: 401 } });

      const [deletedIssue] = await db
        .delete(issues)
        .where(eq(issues.id, id))
        .returning();

      if (!deletedIssue) throw new Error("Failed to delete issue");
      return deletedIssue;
    },

    createUser: async (_parent, args) => {
      const data = await signup(args.input);

      if (!data || !data.user || !data.token) {
        throw new GraphQLError("could not create user", {
          extensions: { code: "AUTH_ERROR" },
        });
      }

      return { ...data.user, token: data.token };
    },

    signin: async (_parent, args) => {
      const data = await signin(args.input);

      if (!data || !data.user || !data.token) {
        throw new GraphQLError("UNAUTHORIZED", {
          extensions: { code: "AUTH_ERROR" },
        });
      }

      return { ...data.user, token: data.token };
    },
  },
};

export default resolvers;

// TODO: filter issues by user
/* issuesForUser: async ({ email }: { email: string }, _, context) => {
  if (!context.user)
    throw new GraphQLError("UNAUTHORIZED", { extensions: { code: 401 } });

  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  if (user.length === 0) {
    throw new Error("User not found");
  }

  return await db.select().from(issues).where(eq(issues.userId, user[0].id));
}, */
