-- DropIndex
DROP INDEX "User_publicId_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "publicId" DROP NOT NULL;
