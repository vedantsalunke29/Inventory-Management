import { Request, Response, NextFunction } from "express";

export function errorMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err);

  if (err.message === "Insufficient stock") {
    return res.status(400).json({ error: err.message });
  }

  if (err.message === "Product not found") {
    return res.status(404).json({ error: err.message });
  }

  res.status(500).json({ error: "Internal Server Error" });
}
