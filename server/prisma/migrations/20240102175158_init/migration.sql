-- CreateEnum
CREATE TYPE "Kamp_type" AS ENUM ('overgangsweekend', 'paaskamp', 'zomerkamp_kort', 'zomerkamp_lang');

-- CreateEnum
CREATE TYPE "Lid_tak" AS ENUM ('kapoenen', 'wouters', 'jonggivers', 'givers', 'jins');

-- CreateEnum
CREATE TYPE "User_role" AS ENUM ('admin', 'kapoen', 'wouter', 'jonggiver', 'giver', 'jin', 'groepsleiding', 'rvb', 'parent');

-- CreateEnum
CREATE TYPE "Vergadering_tak" AS ENUM ('kapoenen', 'wouters', 'jonggivers', 'givers', 'jins');

-- CreateTable
CREATE TABLE "Camps" (
    "id" TEXT NOT NULL,
    "name" "Kamp_type" NOT NULL DEFAULT 'overgangsweekend',
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "cost_per_day" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "total_days" INTEGER NOT NULL,

    CONSTRAINT "Camps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Members" (
    "id" TEXT NOT NULL,
    "member_id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "group" "Lid_tak" NOT NULL DEFAULT 'kapoenen',
    "national_number" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parents" (
    "id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "house_number" TEXT NOT NULL,
    "box_number" TEXT,
    "zip_code" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "rijkregisternummer" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "member_id" TEXT NOT NULL,

    CONSTRAINT "Parents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "User_role"[] DEFAULT ARRAY['kapoen']::"User_role"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vergadering" (
    "id" TEXT NOT NULL,
    "titel" TEXT NOT NULL,
    "datum" TIMESTAMP(3) NOT NULL,
    "tak" "Vergadering_tak" NOT NULL DEFAULT 'kapoenen',
    "userUpdated" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "member_id" TEXT NOT NULL,

    CONSTRAINT "Vergadering_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CampsToMembers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Members_member_id_key" ON "Members"("member_id");

-- CreateIndex
CREATE UNIQUE INDEX "Members_national_number_key" ON "Members"("national_number");

-- CreateIndex
CREATE INDEX "Ouder_member_id_fkey" ON "Parents"("member_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Vergadering_member_id_fkey" ON "Vergadering"("member_id");

-- CreateIndex
CREATE INDEX "Vergadering_userUpdated_fkey" ON "Vergadering"("userUpdated");

-- CreateIndex
CREATE UNIQUE INDEX "_CampsToMembers_AB_unique" ON "_CampsToMembers"("A", "B");

-- CreateIndex
CREATE INDEX "_CampsToMembers_B_index" ON "_CampsToMembers"("B");

-- AddForeignKey
ALTER TABLE "Parents" ADD CONSTRAINT "Ouder_MemberConstraint" FOREIGN KEY ("member_id") REFERENCES "Members"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vergadering" ADD CONSTRAINT "Vergadering_MemberConstraint" FOREIGN KEY ("member_id") REFERENCES "Members"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CampsToMembers" ADD CONSTRAINT "_CampsToMembers_A_fkey" FOREIGN KEY ("A") REFERENCES "Camps"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CampsToMembers" ADD CONSTRAINT "_CampsToMembers_B_fkey" FOREIGN KEY ("B") REFERENCES "Members"("id") ON DELETE CASCADE ON UPDATE CASCADE;
