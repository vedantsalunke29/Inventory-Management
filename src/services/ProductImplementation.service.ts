import { prisma } from "../utils/prisma";
import { IProductService } from "./IProduct.service";
import { Product } from "@prisma/client";

export class ProductServiceImpl implements IProductService {
  async createProduct(data: { name: string; description?: string; stock_quantity: number; low_stock_threshold?: number }): Promise<Product> {
    return prisma.product.create({ data });
  }

  async getProducts(): Promise<Product[]> {
    return prisma.product.findMany();
  }

  async getProductById(id: number): Promise<Product | null> {
    return prisma.product.findUnique({ where: { id } });
  }

  async updateProduct(id: number, data: Partial<Product>): Promise<Product | null> {
    return prisma.product.update({
      where: { id },
      data,
    });
  }

  async deleteProduct(id: number): Promise<Product | null> {
    return prisma.product.delete({ where: { id } });
  }

  async increaseStock(id: number, quantity: number): Promise<Product> {
    const product = await prisma.product.update({
      where: { id },
      data: { stock_quantity: { increment: quantity } },
    });
    return product;
  }

  async decreaseStock(id: number, quantity: number): Promise<Product> {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) throw new Error("Product not found");

    if (product.stock_quantity < quantity) {
      throw new Error("Insufficient stock");
    }

    return prisma.product.update({
      where: { id },
      data: { stock_quantity: { decrement: quantity } },
    });
  }

  async getLowStockProducts(): Promise<Product[]> {
    return prisma.product.findMany({
      where: {
        stock_quantity: {
          lte: prisma.product.fields.low_stock_threshold, 
        },
      },
    });
  }
}
