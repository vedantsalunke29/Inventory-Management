import { Request, Response, NextFunction } from "express";
import { ProductServiceImpl } from "../services/ProductImplementation.service";

const productService = new ProductServiceImpl();

export class ProductController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.createProduct(req.body);
      res.status(201).json(product);
    } catch (err) {
      next(err);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await productService.getProducts();
      res.json(products);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.getProductById(Number(req.params.id));
      if (!product) return res.status(404).json({ error: "Product not found" });
      res.json(product);
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.updateProduct(Number(req.params.id), req.body);
      res.json(product);
    } catch (err) {
      next(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.deleteProduct(Number(req.params.id));
      res.json(product);
    } catch (err) {
      next(err);
    }
  }

  static async increaseStock(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.increaseStock(Number(req.params.id), req.body.quantity);
      res.json(product);
    } catch (err) {
      next(err);
    }
  }

  static async decreaseStock(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.decreaseStock(Number(req.params.id), req.body.quantity);
      res.json(product);
    } catch (err) {
      next(err);
    }
  }

  static async getLowStock(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await productService.getLowStockProducts();
      res.json(products);
    } catch (err) {
      next(err);
    }
  }
}
