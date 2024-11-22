import express from "express";
import cronController from "../controllers/cronController.js";

const router = express.Router();

// Ruta para ejecutar el cron job
router.get("/cron/daily-reminder", cronController.runDailyReminder);

export default router;
