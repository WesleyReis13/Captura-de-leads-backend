-- AlterTable
ALTER TABLE "public"."leads" ADD COLUMN     "plan_type" TEXT,
ADD COLUMN     "status" TEXT DEFAULT 'lead';
