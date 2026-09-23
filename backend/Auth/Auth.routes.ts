import express from "express";
import * as controller from "./Auth.controller.js";
import rateLimit from "express-rate-limit";
import { z } from "zod";

const router = express.Router();

// Middleware: Rate Limiter para prevenir ataques de fuerza bruta (Max 5 intentos por 15 min)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // Limita cada IP a 5 peticiones por ventana
  message: { ok: false, message: "Demasiados intentos, por favor intenta de nuevo más tarde." },
});

// Esquema de validación estricta con Zod
const loginSchema = z.object({
  email: z.string().email("Formato de correo inválido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

// Middleware: Validación de datos
const validateLogin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    loginSchema.parse(req.body);
    next();
  } catch (err: any) {
    return res.status(400).json({ ok: false, message: err.errors[0].message });
  }
};

// Inyectamos los middlewares en la ruta
router.post("/login", loginLimiter, validateLogin, controller.authlogin);
// router.get("/verify", controller.verify);

export default router;
