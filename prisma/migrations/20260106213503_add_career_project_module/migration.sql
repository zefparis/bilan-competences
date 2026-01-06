-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "passwordHash" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "title" TEXT,
    "bio" TEXT,
    "skills" TEXT,
    "linkedin" TEXT,
    "github" TEXT,
    "portfolio" TEXT,
    "role" TEXT NOT NULL DEFAULT 'BENEFICIAIRE',
    "resetToken" TEXT,
    "resetTokenExpiry" TIMESTAMP(3),
    "hasPaid" BOOLEAN NOT NULL DEFAULT false,
    "stripeCustomerId" TEXT,
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Assessment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'IN_PROGRESS',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Assessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LifePath" (
    "id" TEXT NOT NULL,
    "assessmentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LifePath_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LifeEvent" (
    "id" TEXT NOT NULL,
    "lifePathId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "sentiment" INTEGER NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LifeEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" TEXT NOT NULL,
    "assessmentId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "situation" TEXT,
    "task" TEXT,
    "action" TEXT,
    "result" TEXT,
    "skills" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserValue" (
    "id" TEXT NOT NULL,
    "assessmentId" TEXT NOT NULL,
    "valueName" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "gapScore" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserValue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RiasecResult" (
    "id" TEXT NOT NULL,
    "assessmentId" TEXT NOT NULL,
    "scoreR" INTEGER NOT NULL,
    "scoreI" INTEGER NOT NULL,
    "scoreA" INTEGER NOT NULL,
    "scoreS" INTEGER NOT NULL,
    "scoreE" INTEGER NOT NULL,
    "scoreC" INTEGER NOT NULL,
    "topCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RiasecResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CognitiveProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "form_score" INTEGER NOT NULL,
    "color_score" INTEGER NOT NULL,
    "volume_score" INTEGER NOT NULL,
    "sound_score" INTEGER NOT NULL,
    "dominant_cognition" TEXT NOT NULL,
    "profile_code" TEXT NOT NULL,
    "communication_style" TEXT,
    "detail_level" TEXT,
    "learning_preference" TEXT,
    "completed_at" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CognitiveProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CognitiveInsight" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "insight_type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CognitiveInsight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CognitiveTestResponse" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "questionId" INTEGER NOT NULL,
    "selectedOption" TEXT NOT NULL,
    "dimension" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CognitiveTestResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "assessmentId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "strengths" TEXT,
    "weaknesses" TEXT,
    "opportunities" TEXT,
    "threats" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActionStep" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "deadline" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'TODO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActionStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CognitiveTestSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'IN_PROGRESS',
    "stroopCompleted" BOOLEAN NOT NULL DEFAULT false,
    "reactionTimeCompleted" BOOLEAN NOT NULL DEFAULT false,
    "trailMakingCompleted" BOOLEAN NOT NULL DEFAULT false,
    "ranVisualCompleted" BOOLEAN NOT NULL DEFAULT false,
    "stroopData" JSONB,
    "reactionTimeData" JSONB,
    "trailMakingData" JSONB,
    "ranVisualData" JSONB,
    "generatedReport" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "CognitiveTestSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CognitiveSignature" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "inhibitoryControl" DOUBLE PRECISION NOT NULL,
    "processingSpeed" DOUBLE PRECISION NOT NULL,
    "cognitiveFlexibility" DOUBLE PRECISION NOT NULL,
    "accessFluency" DOUBLE PRECISION NOT NULL,
    "reactionVariance" DOUBLE PRECISION NOT NULL,
    "attentionDrift" DOUBLE PRECISION NOT NULL,
    "conflictErrors" DOUBLE PRECISION NOT NULL,
    "sequencingErrors" DOUBLE PRECISION NOT NULL,
    "rawMetrics" JSONB NOT NULL,
    "interpretation" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CognitiveSignature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sections" JSONB NOT NULL,
    "completeSections" JSONB NOT NULL,
    "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "version" TEXT NOT NULL DEFAULT '2.0',
    "tokensCost" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CertificationSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "riasecResultId" TEXT,
    "cognitiveProfileId" TEXT,
    "currentBloc" INTEGER NOT NULL DEFAULT 1,
    "answers" JSONB NOT NULL DEFAULT '{}',
    "devScore" INTEGER,
    "dataScore" INTEGER,
    "cyberScore" INTEGER,
    "infraScore" INTEGER,
    "coherenceScore" INTEGER,
    "primaryRole" TEXT,
    "secondaryRoles" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "level" TEXT,
    "strengths" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "developmentAreas" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "CertificationSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certificate" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "validUntil" TIMESTAMP(3) NOT NULL,
    "blockchainHash" TEXT NOT NULL,
    "blockchainTxHash" TEXT,
    "verificationUrl" TEXT NOT NULL,
    "pdfUrl" TEXT,

    CONSTRAINT "Certificate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobMatch" (
    "id" TEXT NOT NULL,
    "certificateId" TEXT NOT NULL,
    "externalJobId" TEXT NOT NULL,
    "matchScore" INTEGER NOT NULL,
    "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "jobData" JSONB NOT NULL,

    CONSTRAINT "JobMatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CareerProject" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "targetRomeCode" TEXT NOT NULL,
    "targetRomeLabel" TEXT NOT NULL,
    "targetDomain" TEXT NOT NULL,
    "motivation" TEXT,
    "timeline" TEXT,
    "constraints" TEXT,
    "currentSkills" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "requiredSkills" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "skillsGap" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "formations" JSONB,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CareerProject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_resetToken_key" ON "User"("resetToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_stripeCustomerId_key" ON "User"("stripeCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "LifePath_assessmentId_key" ON "LifePath"("assessmentId");

-- CreateIndex
CREATE UNIQUE INDEX "RiasecResult_assessmentId_key" ON "RiasecResult"("assessmentId");

-- CreateIndex
CREATE UNIQUE INDEX "CognitiveProfile_userId_key" ON "CognitiveProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CognitiveTestResponse_userId_questionId_key" ON "CognitiveTestResponse"("userId", "questionId");

-- CreateIndex
CREATE UNIQUE INDEX "CognitiveSignature_sessionId_key" ON "CognitiveSignature"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "Report_userId_key" ON "Report"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CertificationSession_riasecResultId_key" ON "CertificationSession"("riasecResultId");

-- CreateIndex
CREATE UNIQUE INDEX "CertificationSession_cognitiveProfileId_key" ON "CertificationSession"("cognitiveProfileId");

-- CreateIndex
CREATE INDEX "CertificationSession_userId_idx" ON "CertificationSession"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Certificate_sessionId_key" ON "Certificate"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "Certificate_blockchainHash_key" ON "Certificate"("blockchainHash");

-- CreateIndex
CREATE INDEX "Certificate_userId_idx" ON "Certificate"("userId");

-- CreateIndex
CREATE INDEX "Certificate_blockchainHash_idx" ON "Certificate"("blockchainHash");

-- CreateIndex
CREATE INDEX "JobMatch_certificateId_idx" ON "JobMatch"("certificateId");

-- CreateIndex
CREATE UNIQUE INDEX "JobMatch_certificateId_externalJobId_key" ON "JobMatch"("certificateId", "externalJobId");

-- CreateIndex
CREATE INDEX "CareerProject_userId_idx" ON "CareerProject"("userId");

-- CreateIndex
CREATE INDEX "CareerProject_targetRomeCode_idx" ON "CareerProject"("targetRomeCode");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LifePath" ADD CONSTRAINT "LifePath_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "Assessment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LifeEvent" ADD CONSTRAINT "LifeEvent_lifePathId_fkey" FOREIGN KEY ("lifePathId") REFERENCES "LifePath"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "Assessment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserValue" ADD CONSTRAINT "UserValue_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "Assessment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RiasecResult" ADD CONSTRAINT "RiasecResult_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "Assessment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CognitiveProfile" ADD CONSTRAINT "CognitiveProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CognitiveInsight" ADD CONSTRAINT "CognitiveInsight_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CognitiveTestResponse" ADD CONSTRAINT "CognitiveTestResponse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "Assessment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionStep" ADD CONSTRAINT "ActionStep_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CognitiveTestSession" ADD CONSTRAINT "CognitiveTestSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CognitiveSignature" ADD CONSTRAINT "CognitiveSignature_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "CognitiveTestSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CertificationSession" ADD CONSTRAINT "CertificationSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CertificationSession" ADD CONSTRAINT "CertificationSession_riasecResultId_fkey" FOREIGN KEY ("riasecResultId") REFERENCES "RiasecResult"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CertificationSession" ADD CONSTRAINT "CertificationSession_cognitiveProfileId_fkey" FOREIGN KEY ("cognitiveProfileId") REFERENCES "CognitiveProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "CertificationSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobMatch" ADD CONSTRAINT "JobMatch_certificateId_fkey" FOREIGN KEY ("certificateId") REFERENCES "Certificate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CareerProject" ADD CONSTRAINT "CareerProject_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
