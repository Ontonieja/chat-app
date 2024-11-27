/*
  Warnings:

  - You are about to drop the column `fileKey` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `fileUrl` on the `Message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "fileKey",
DROP COLUMN "fileUrl";
