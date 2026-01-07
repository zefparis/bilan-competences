-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "generationCount" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "hasExtraGenerationPaid" BOOLEAN NOT NULL DEFAULT false;
