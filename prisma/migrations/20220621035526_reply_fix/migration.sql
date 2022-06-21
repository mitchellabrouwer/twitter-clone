/*
  Warnings:

  - You are about to drop the column `parent` on the `Reply` table. All the data in the column will be lost.
  - You are about to drop the column `parent` on the `Tweet` table. All the data in the column will be lost.
  - Added the required column `parentId` to the `Reply` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reply" DROP COLUMN "parent",
ADD COLUMN     "parentId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Tweet" DROP COLUMN "parent";

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
