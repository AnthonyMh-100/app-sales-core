export type ProductStatus = "ACTIVE" | "INACTIVE" | "OUT_OF_STOCK";

export interface Product {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  stock: number;
  imgUrl?: string | null;
  status: ProductStatus;
  active: boolean;
  categoryId: string;
}
