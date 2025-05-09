CREATE TABLE `issues` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`projectId` text,
	`userId` text NOT NULL,
	`content` text NOT NULL,
	`text` text DEFAULT 'backlog' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);