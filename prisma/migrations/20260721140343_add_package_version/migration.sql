-- CreateTable
CREATE TABLE "PackageVersion" (
    "id" SERIAL NOT NULL,
    "version" TEXT NOT NULL,
    "packageId" INTEGER NOT NULL,

    CONSTRAINT "PackageVersion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PackageVersion" ADD CONSTRAINT "PackageVersion_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
