-- DropForeignKey
ALTER TABLE "Transacao" DROP CONSTRAINT "Transacao_usuarioId_fkey";

-- AlterTable
ALTER TABLE "Transacao" ALTER COLUMN "usuarioId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Transacao" ADD CONSTRAINT "Transacao_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
