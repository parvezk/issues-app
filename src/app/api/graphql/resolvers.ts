import { db } from "../../../lib/db";
import { eq } from "drizzle-orm";
import { users, issues, IssueStatus } from "../../../lib/schema";
/**
 * API Routes: Process incoming GraphQL queries/mutations requests
 * Interact with the SQLite Turso DB using Drizzle ORM
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
      ...input,
      status: input.status || IssueStatus.BACKLOG,
    };

    const [newIssue] = await db.insert(issues).values(issueData).returning();

    if (!newIssue) throw new Error("CUSTOM Failed to create issue");

    return newIssue;
  },

  updateIssueStatus: async ({ id, status }) => {
    const [updatedIssue] = await db
      .update(issues)
      .set({ [issues.status.name]: status })
      .where(eq(issues.id, id))
      .returning();

    if (!updatedIssue) throw new Error("Failed to update issue status");

    return updatedIssue;
  },

  deleteIssue: async ({ id }) => {
    const [deletedIssue] = await db
      .delete(issues)
      .where(eq(issues.id, id))
      .returning();

    if (!deletedIssue) throw new Error("Failed to delete issue");

    return deletedIssue;
  },

  users: async () => {
    return await db.select().from(users); // Fetch users from the database
  },
};

export default resolvers;
