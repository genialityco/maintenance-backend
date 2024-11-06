import express from "express";
import {
  createAdvance,
  getAdvances,
  getAdvanceById,
  getAdvancesByEmployee,
  updateAdvance,
  deleteAdvance,
} from "../controllers/advanceController.js";

const router = express.Router();

// Rutas CRUD para avances
router.post("/advance", createAdvance);
router.get("/advance", getAdvances);
router.get("/advance/:id", getAdvanceById);
router.get("/advance/employee/:employeeId", getAdvancesByEmployee);
router.put("/advance/:id", updateAdvance);
router.delete("/advance/:id", deleteAdvance);

export default router;
