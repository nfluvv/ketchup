/*
  Warnings:

  - You are about to drop the column `isPremium` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "isPremium",
ADD COLUMN     "premiumUntil" TIMESTAMP(3);
