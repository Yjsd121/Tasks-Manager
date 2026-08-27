import type { Request, Response } from "express";
import * as MinichartService from "./MinichartDara.service.js";

export const MinichartTaskview = async (req: Request, res: Response) => {
  try {
    const userId = typeof req.user?.id === "string" ? req.user.id : null;

    if (!userId) {
      return res.status(401).json({
        ok: false,
        message: "Usuario no autenticado",
      });
    }

    const data = await MinichartService.TasksInfo(userId);

    if (data.length === 0) {
      return res.status(401).json({
        ok: false,
        message: "Sin Datos",
      });
    }

    return res.status(200).json({
      ok: true,
      data,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      ok: false,
      message: "Error al obtener minichart",
    });
  }
};
