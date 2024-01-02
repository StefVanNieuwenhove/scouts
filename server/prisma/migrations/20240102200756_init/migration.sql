/*
  Warnings:

  - You are about to drop the column `rijkregisternummer` on the `Parents` table. All the data in the column will be lost.
  - You are about to drop the `Vergadering` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Parents` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[national_number]` on the table `Parents` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `national_number` to the `Parents` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Vergadering" DROP CONSTRAINT "Vergadering_MemberConstraint";

-- AlterTable
ALTER TABLE "Parents" DROP COLUMN "rijkregisternummer",
ADD COLUMN     "national_number" TEXT NOT NULL;

-- DropTable
DROP TABLE "Vergadering";

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "titel" TEXT NOT NULL,
    "datum" TIMESTAMP(3) NOT NULL,
    "tak" "Vergadering_tak" NOT NULL DEFAULT 'kapoenen',
    "userUpdated" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "member_id" TEXT NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Vergadering_member_id_fkey" ON "Activity"("member_id");

-- CreateIndex
CREATE INDEX "Vergadering_userUpdated_fkey" ON "Activity"("userUpdated");

-- CreateIndex
CREATE UNIQUE INDEX "Parents_email_key" ON "Parents"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Parents_national_number_key" ON "Parents"("national_number");

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Vergadering_MemberConstraint" FOREIGN KEY ("member_id") REFERENCES "Members"("id") ON DELETE CASCADE ON UPDATE CASCADE;
