/*
  Warnings:

  - The values [FAMILIA,EVENTO,PARCEIRO,OUTRO] on the enum `TipoTransacao` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TipoTransacao_new" AS ENUM ('ENTRADA', 'SAIDA');
ALTER TABLE "Transacao" ALTER COLUMN "tipo" TYPE "TipoTransacao_new" USING ("tipo"::text::"TipoTransacao_new");
ALTER TYPE "TipoTransacao" RENAME TO "TipoTransacao_old";
ALTER TYPE "TipoTransacao_new" RENAME TO "TipoTransacao";
DROP TYPE "public"."TipoTransacao_old";
COMMIT;
