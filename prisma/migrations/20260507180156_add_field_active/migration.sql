-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "active" BOOLEAN DEFAULT true;

-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "active" BOOLEAN DEFAULT true;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "active" BOOLEAN DEFAULT true;
