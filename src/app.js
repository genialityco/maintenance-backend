import { config } from "dotenv";
config({ path: `.env.${process.env.NODE_ENV}` });

import webPush from "web-push";
import dbConnection from "./config/db.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import routes from "./routes/indexRoutes.js";

const app = express();

// Configura web-push con las claves VAPID
webPush.setVapidDetails(
  "mailto:tu-email@ejemplo.com", // Correo de contacto
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Rutas principales
app.use("/api", routes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("API galaxia glamour");
});

// Endpoint para gestionar suscripciones de usuarios
app.post("/api/subscribe", async (req, res) => {
  try {
    const subscription = req.body;
    // Guarda la suscripción en tu base de datos (o en un archivo temporal para pruebas)
    // Aquí podrías usar un servicio que maneje las suscripciones
    await saveSubscriptionToDatabase(subscription);
    res.status(201).json({ message: "Subscription saved successfully" });
  } catch (error) {
    console.error("Error saving subscription:", error);
    res.status(500).json({ error: "Failed to save subscription" });
  }
});

// Endpoint para enviar notificación a una suscripción específica
app.post("/api/notify", async (req, res) => {
  const { subscription, payload } = req.body;

  try {
    await webPush.sendNotification(subscription, JSON.stringify(payload));
    res.status(200).json({ message: "Notification sent" });
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).json({ error: "Failed to send notification" });
  }
});

// Endpoint para enviar notificaciones masivas
app.post("/api/notify-all", async (req, res) => {
  const payload = req.body.payload;

  try {
    const subscriptions = await getAllSubscriptionsFromDatabase();
    subscriptions.forEach(async (subscription) => {
      try {
        await webPush.sendNotification(subscription, JSON.stringify(payload));
      } catch (error) {
        console.error("Error sending notification to subscription:", error);
      }
    });
    res.status(200).json({ message: "Notifications sent to all users" });
  } catch (error) {
    console.error("Error sending notifications:", error);
    res.status(500).json({ error: "Failed to send notifications" });
  }
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack || err);
  const statusCode = err.statusCode || 500;
  let message = err.message;

  if (process.env.NODE_ENV === "production" && !err.statusCode) {
    message = "Ocurrió un error en el servidor";
  }

  res.status(statusCode).json({ result: "error", message: message });
});

// Conectar a la base de datos y luego arrancar el servidor
dbConnection()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(
        `✨ Server listening on port ${PORT}, ${process.env.NODE_ENV} ✨`
      );
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database", err);
    process.exit(1);
  });
