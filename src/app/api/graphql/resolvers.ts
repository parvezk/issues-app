import { db } from "../../../lib/db";
import { eq } from "drizzle-orm";
import { users, issues } from "../../../lib/schema";
/**
 * processes incoming GraphQL queries/mutations and interacts with the SQLite DB using Drizzle ORM
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

  createIssue: async ({
    input,
  }: {
    input: { title: string; content: string; status?: string; userId: string };
  }) => {
    const [newIssue] = await db
      .insert(issues)
      .values({
        title: input.title,
        content: input.content,
        status: input.status,
        userId: input.userId,
        createdAt: new Date().toISOString(),
      })
      .returning();
    if (!newIssue) {
      throw new Error("Failed to create issue");
    }
    return newIssue;
  },

  updateIssueStatus: async ({ id, status }: { id: string; status: string }) => {
    const [updatedIssue] = await db
      .update(issues)
      //@ts-ignore
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
