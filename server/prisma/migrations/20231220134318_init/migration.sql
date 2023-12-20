-- CreateEnum
CREATE TYPE "Vergadering_tak" AS ENUM ('kapoenen', 'wouters', 'jonggivers', 'givers', 'jins');

-- CreateEnum
CREATE TYPE "Ouder_functie" AS ENUM ('moeder', 'vader', 'voogd', 'grootouder', 'andere');

-- CreateEnum
CREATE TYPE "User_role" AS ENUM ('admin', 'kapoen', 'wouter', 'jonggiver', 'giver', 'jin', 'groepsleiding', 'board', 'parent');

-- CreateEnum
CREATE TYPE "Lid_tak" AS ENUM ('kapoenen', 'wouters', 'jonggivers', 'givers', 'jins');

-- CreateEnum
CREATE TYPE "Lid_geslacht" AS ENUM ('man', 'vrouw', 'onbekend');

-- CreateEnum
CREATE TYPE "Kamp_type" AS ENUM ('overgangsweekend', 'paaskamp', 'zomerkamp_kort', 'zomerkamp_lang');

-- CreateTable
CREATE TABLE "Lid" (
    "lidnummer" TEXT NOT NULL,
    "voornaam" TEXT NOT NULL,
    "achternaam" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "geboortedatum" TIMESTAMP(3) NOT NULL,
    "tak" "Lid_tak" NOT NULL DEFAULT 'kapoenen',
    "geslacht" "Lid_geslacht" NOT NULL DEFAULT 'onbekend',
    "straat" TEXT NOT NULL,
    "huisnummer" TEXT NOT NULL,
    "busnummer" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "gemeente" TEXT NOT NULL,
    "rijksregisternummer" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lid_pkey" PRIMARY KEY ("lidnummer")
);

-- CreateTable
CREATE TABLE "Ouder" (
    "id" TEXT NOT NULL,
    "voornaam" TEXT NOT NULL,
    "achternaam" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "functie" "Ouder_functie" NOT NULL DEFAULT 'andere',
    "gsm" TEXT NOT NULL,
    "straat" TEXT NOT NULL,
    "huisnummer" TEXT NOT NULL,
    "busnummer" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "gemeente" TEXT NOT NULL,
    "rijkregisternummer" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lidnummer" TEXT NOT NULL,

    CONSTRAINT "Ouder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "User_role" NOT NULL DEFAULT 'kapoen',
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
    "lidnummer" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vergadering_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kamp" (
    "id" TEXT NOT NULL,
    "name" "Kamp_type" NOT NULL DEFAULT 'overgangsweekend',
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "cost_per_day" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Kamp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_KampToLid" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Lid_email_key" ON "Lid"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Ouder_gsm_key" ON "Ouder"("gsm");

-- CreateIndex
CREATE INDEX "Ouder_lidnummer_fkey" ON "Ouder"("lidnummer");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Vergadering_lidnummer_fkey" ON "Vergadering"("lidnummer");

-- CreateIndex
CREATE INDEX "Vergadering_userUpdated_fkey" ON "Vergadering"("userUpdated");

-- CreateIndex
CREATE UNIQUE INDEX "_KampToLid_AB_unique" ON "_KampToLid"("A", "B");

-- CreateIndex
CREATE INDEX "_KampToLid_B_index" ON "_KampToLid"("B");

-- AddForeignKey
ALTER TABLE "Ouder" ADD CONSTRAINT "Ouder_LidConstraint" FOREIGN KEY ("lidnummer") REFERENCES "Lid"("lidnummer") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vergadering" ADD CONSTRAINT "Vergadering_LidConstraint" FOREIGN KEY ("lidnummer") REFERENCES "Lid"("lidnummer") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KampToLid" ADD CONSTRAINT "_KampToLid_A_fkey" FOREIGN KEY ("A") REFERENCES "Kamp"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KampToLid" ADD CONSTRAINT "_KampToLid_B_fkey" FOREIGN KEY ("B") REFERENCES "Lid"("lidnummer") ON DELETE CASCADE ON UPDATE CASCADE;
