-- CreateTable
CREATE TABLE "TrustSignal" (
    "id" SERIAL NOT NULL,
    "downloads" INTEGER,
    "stars" INTEGER,
    "forks" INTEGER,
    "maintainers" INTEGER,
    "packageId" INTEGER NOT NULL,

    CONSTRAINT "TrustSignal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TrustSignal_packageId_key" ON "TrustSignal"("packageId");

-- AddForeignKey
ALTER TABLE "TrustSignal" ADD CONSTRAINT "TrustSignal_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
