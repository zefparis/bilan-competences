-- AlterTable
ALTER TABLE "CognitiveSignature" ADD COLUMN     "switchCost" DOUBLE PRECISION,
ADD COLUMN     "workingMemory" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "CognitiveTestSession" ADD COLUMN     "complexReactionCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "complexReactionData" JSONB,
ADD COLUMN     "digitSpanCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "digitSpanData" JSONB;
