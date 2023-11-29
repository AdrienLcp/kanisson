/*
  Warnings:

  - A unique constraint covering the columns `[publicId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `publicId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "publicId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_publicId_key" ON "User"("publicId");
