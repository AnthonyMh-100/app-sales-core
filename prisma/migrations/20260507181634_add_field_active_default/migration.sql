/*
  Warnings:

  - Made the column `active` on table `categories` required. This step will fail if there are existing NULL values in that column.
  - Made the column `active` on table `customers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `active` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "categories" ALTER COLUMN "active" SET NOT NULL;

-- AlterTable
ALTER TABLE "customers" ALTER COLUMN "active" SET NOT NULL;

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "active" SET NOT NULL;
