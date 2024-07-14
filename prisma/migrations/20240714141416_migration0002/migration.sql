/*
  Warnings:

  - You are about to drop the column `isValid` on the `Track` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Track" DROP COLUMN "isValid",
ALTER COLUMN "duration" SET DEFAULT 30,
ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "artist" DROP NOT NULL,
ALTER COLUMN "source" SET DEFAULT E'youtube',
ALTER COLUMN "start" SET DEFAULT 10;
