import { PrismaClient } from "@prisma/client";
import { ProductServiceImpl } from "../src/services/ProductImplementation.service";

const prisma = new PrismaClient();
const productService = new ProductServiceImpl();

let productId: number;

describe("Stock Management Tests", () => {
  beforeAll(async () => {
    await prisma.product.deleteMany(); 

    const product = await productService.createProduct({
      name: "Stock Test Product",
      description: "Testing stock logic",
      stock_quantity: 10,
      low_stock_threshold: 5,
    });
    productId = product.id;
  });

  afterAll(async () => {
    await prisma.product.deleteMany();
    await prisma.$disconnect();
  });

  test("Increase stock", async () => {
    const updatedProduct = await productService.increaseStock(productId, 5);
    expect(updatedProduct.stock_quantity).toBe(15);
  });

  test("Increase stock by zero or negative should throw error", async () => {
    await expect(productService.increaseStock(productId, 0)).rejects.toThrow("Amount must be positive");
    await expect(productService.increaseStock(productId, -5)).rejects.toThrow("Amount must be positive");
  });

  test("Decrease stock", async () => {
    const updatedProduct = await productService.decreaseStock(productId, 5);
    expect(updatedProduct.stock_quantity).toBe(10);
  });

  test("Decrease stock below zero should throw error", async () => {
    await expect(productService.decreaseStock(productId, 50)).rejects.toThrow("Insufficient stock");
  });

  test("Decrease stock by zero or negative should throw error", async () => {
    await expect(productService.decreaseStock(productId, 0)).rejects.toThrow("Amount must be positive");
    await expect(productService.decreaseStock(productId, -3)).rejects.toThrow("Amount must be positive");
  });

  test("Decrease stock for nonexistent product should throw error", async () => {
    await expect(productService.decreaseStock(9999, 1)).rejects.toThrow("Product not found");
  });
});
