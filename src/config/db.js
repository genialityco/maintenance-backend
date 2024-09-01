import { connect, connection } from "mongoose";
// const customEmitter = require("../utils/eventEmitter");
import dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

// const { DB_URI } = process.env;

// connect(DB_URI)
//   .then(() => {
//     console.log(`📡 Established connection to the database`);

//     const db = connection;
//     const changeStream = db.collection("bingos").watch();

//     changeStream.on("change", (change) => {
//       customEmitter.emit("ballotUpdate", change);
//     });
//   })
//   .catch((err) => {
//     console.error(`MongoDB connection error: ${err}`);
//     process.exit(1);
//   });

const dbConnection = async () => {
  try {
    const dbURI = process.env.DB_URI;

    if (!dbURI) {
      throw new Error("La variable de entorno DB_URI no está definida");
    }

    await connect(dbURI);

    console.log(`📡 Established connection to the database`);
  } catch (error) {
    console.error("Error al conectar a la base de datos", error);
    process.exit(1);
  }
};

export default dbConnection;
