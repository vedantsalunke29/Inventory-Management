import { Product } from "@prisma/client";

export interface IProductService {
  createProduct(data: { name: string; description?: string; stock_quantity: number; low_stock_threshold?: number }): Promise<Product>;
  getProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | null>;
  updateProduct(id: number, data: Partial<Product>): Promise<Product | null>;
  deleteProduct(id: number): Promise<Product | null>;
  increaseStock(id: number, quantity: number): Promise<Product>;
  decreaseStock(id: number, quantity: number): Promise<Product>;
  getLowStockProducts(): Promise<Product[]>;
}
