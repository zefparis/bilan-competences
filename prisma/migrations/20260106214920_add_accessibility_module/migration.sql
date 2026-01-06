-- CreateTable
CREATE TABLE "Accessibility" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "hasDisability" BOOLEAN NOT NULL DEFAULT false,
    "disabilityType" TEXT,
    "hasRQTH" BOOLEAN NOT NULL DEFAULT false,
    "rqthNumber" TEXT,
    "rqthExpiryDate" TIMESTAMP(3),
    "needsWorkstationAdaptation" BOOLEAN NOT NULL DEFAULT false,
    "needsScheduleFlexibility" BOOLEAN NOT NULL DEFAULT false,
    "needsRemoteWork" BOOLEAN NOT NULL DEFAULT false,
    "needsAccessibleTransport" BOOLEAN NOT NULL DEFAULT false,
    "needsAssistiveTechnology" BOOLEAN NOT NULL DEFAULT false,
    "otherNeeds" TEXT,
    "compensatorySkills" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "preferDisabilityFriendlyCompanies" BOOLEAN NOT NULL DEFAULT false,
    "interestedInAGEFIPHAid" BOOLEAN NOT NULL DEFAULT false,
    "shareWithEmployers" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Accessibility_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Accessibility_userId_key" ON "Accessibility"("userId");

-- CreateIndex
CREATE INDEX "Accessibility_userId_idx" ON "Accessibility"("userId");

-- AddForeignKey
ALTER TABLE "Accessibility" ADD CONSTRAINT "Accessibility_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
