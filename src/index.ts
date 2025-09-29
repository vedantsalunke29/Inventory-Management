import express, { Application } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { prisma } from "./utils/prisma";
import productRoutes from "./routes/product.routes";
import { errorMiddleware } from "./middlewares/errorMiddleware";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT ?? 3000;


app.use(express.json());
app.use(morgan("dev"));


app.use("/api/products", productRoutes);


app.get("/", (req, res) => {
  res.json({ message: "Inventory Management Server is Live" });
});


app.use(errorMiddleware);


process.on("SIGINT", async () => {
  await prisma.$disconnect();
  console.log("Prisma disconnected. Server shutting down...");
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
