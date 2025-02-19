ALTER TABLE `issues` RENAME COLUMN "text" TO "status";--> statement-breakpoint
ALTER TABLE `issues` DROP COLUMN `projectId`;