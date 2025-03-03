import { db } from "../../../lib/db";
import { eq } from "drizzle-orm";
import { users, issues, IssueStatus } from "../../../lib/schema";

/**
 * Processes incoming GraphQL queries/mutations
 * Interacts with the SQLite Turso DB using Drizzle ORM
 */

const resolvers = {
  issuesForUser: async ({ email }: { email: string }) => {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    if (user.length === 0) {
      throw new Error("User not found");
    }

    return await db.select().from(issues).where(eq(issues.userId, user[0].id));
  },

  createIssue: async ({ input }) => {
    const issueData = {
      title: input.title,
      content: input.content,
      status: input.status || IssueStatus.BACKLOG,
      userId: input.userId,
    };

    const [newIssue] = await db.insert(issues).values(issueData).returning();

    if (!newIssue) {
      throw new Error("CUSTOM Failed to create issue");
    }
    return newIssue;
  },

  updateIssueStatus: async ({
    id,
    status,
  }: {
    id: string;
    status: IssueStatus;
  }) => {
    const [updatedIssue] = await db
      .update(issues)
      .set({ status })
      .where(eq(issues.id, id))
      .returning();

    if (!updatedIssue) {
      throw new Error("Failed to update issue status");
    }
    return updatedIssue;
  },

  users: async () => {
    return await db.select().from(users); // Fetch users from the database
  },
};

export default resolvers;
