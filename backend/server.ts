import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authmiddleware from "./middlewares/Auth.middleware.js";

import AuthRoutes from "./Auth/Auth.routes.js";
import TaskRoutes from "./tasks/tasks.routes.js";
import UserRoutes from "./users/user.routes.js";
import MinichartRoutes from "./charts/Minichart/minichart.routes.js";
import DashboardRoutes from "./charts/Dashboard/Dashboard.routes.js";

import { connectDB } from "./utils/bdConnection.js";

const app = express();
const port = 3000;

void connectDB();

// Configuración CORS dinámica para permitir el cliente sin importar el puerto/IP
app.use(cors({ 
  origin: true, // Refleja dinámicamente el origen de la petición
  credentials: true 
}));
app.use(express.json());
app.use(cookieParser()); // Habilitar lectura de cookies

app.use("/uploads", express.static("uploads"));

app.use("/Auth", AuthRoutes);

app.use(authmiddleware);

app.use("/tasksview", TaskRoutes);
app.use("/Adminview", UserRoutes);
app.use("/Minichart", MinichartRoutes);
app.use("/Dashboard", DashboardRoutes);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server listening on http://localhost:${port}`);
});
