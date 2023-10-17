-- CreateEnum
CREATE TYPE "Vergadering_tak" AS ENUM ('kapoenen', 'wouters', 'jonggivers', 'givers', 'jins');

-- CreateEnum
CREATE TYPE "Ouder_functie" AS ENUM ('moeder', 'vader', 'voogd', 'grootouder', 'andere');

-- CreateEnum
CREATE TYPE "User_role" AS ENUM ('admin', 'kapoen', 'wouter', 'jonggiver', 'giver', 'jin');

-- CreateEnum
CREATE TYPE "Lid_tak" AS ENUM ('kapoenen', 'wouters', 'jonggivers', 'givers', 'jins');

-- CreateEnum
CREATE TYPE "Lid_geslacht" AS ENUM ('man', 'vrouw', 'onbekend');

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
    "lidnummer" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

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

-- CreateIndex
CREATE UNIQUE INDEX "Lid_email_key" ON "Lid"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Ouder_email_key" ON "Ouder"("email");

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

-- AddForeignKey
ALTER TABLE "Ouder" ADD CONSTRAINT "Ouder_LidConstraint" FOREIGN KEY ("lidnummer") REFERENCES "Lid"("lidnummer") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vergadering" ADD CONSTRAINT "Vergadering_LidConstraint" FOREIGN KEY ("lidnummer") REFERENCES "Lid"("lidnummer") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vergadering" ADD CONSTRAINT "Vergadering_UserConstraint" FOREIGN KEY ("userUpdated") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
