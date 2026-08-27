import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "required token",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        ok: false,
        message: "Token requerido",
      });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      return res.status(500).json({
        ok: false,
        message: "JWT_SECRET no configurado",
      });
    }

    const decoded = jwt.verify(token, secret);
    req.user = typeof decoded === "string" ? { id: decoded } : decoded;

    next();
  } catch (err) {
    console.log(err);

    return res.status(401).json({
      ok: false,
      message: "Token invalido o expirado",
    });
  }
}
export default authMiddleware;
