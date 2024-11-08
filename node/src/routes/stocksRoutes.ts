import { Router } from "express";
import {
  createStocks,
  deleteAllStocks,
  deleteStocksByName,
  getAllStocks,
  getStocksByName,
  updateStocks,
} from "../controllers/stocksController";

const router = Router();

router.get("/", getAllStocks);
router.get("/:name", getStocksByName);

router.post("/", createStocks);

router.patch("/", updateStocks);

router.delete("/", deleteAllStocks);
router.delete("/:name", deleteStocksByName);

export default router;
