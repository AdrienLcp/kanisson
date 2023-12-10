/*
  Warnings:

  - You are about to drop the column `creator` on the `Playlist` table. All the data in the column will be lost.
  - Added the required column `youtubeDuration` to the `Track` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Playlist" DROP COLUMN "creator",
ADD COLUMN     "tracksDuration" INTEGER NOT NULL DEFAULT 30;

-- AlterTable
ALTER TABLE "Track" ADD COLUMN     "start" INTEGER NOT NULL DEFAULT 30,
ADD COLUMN     "youtubeDuration" INTEGER NOT NULL,
ALTER COLUMN "image" DROP NOT NULL;
