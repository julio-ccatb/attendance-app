/*
  Warnings:

  - Added the required column `hoursValue` to the `Attendance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "durationHours" INTEGER;

-- AlterTable
ALTER TABLE "Attendance" ADD COLUMN     "hoursValue" INTEGER NOT NULL;
