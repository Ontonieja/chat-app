-- CreateTable
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "contactId" INTEGER NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Contact_userId_contactId_key" ON "Contact"("userId", "contactId");

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
