import { Router } from "express";
import { ProductController } from "../controllers/product.controller";

const router = Router();

router.post("/", ProductController.create);
router.get("/", ProductController.getAll);
router.get("/:id", ProductController.getById);
router.put("/:id", ProductController.update);
router.delete("/:id", ProductController.delete);
router.post("/:id/increase", ProductController.increaseStock);
router.post("/:id/decrease", ProductController.decreaseStock);
router.get("/low-stock/list", ProductController.getLowStock);

export default router;
