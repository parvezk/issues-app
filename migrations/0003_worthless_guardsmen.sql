DROP INDEX "users_email_unique";--> statement-breakpoint
ALTER TABLE `issues` ALTER COLUMN "status" TO "status" text NOT NULL DEFAULT 'BACKLOG';--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);