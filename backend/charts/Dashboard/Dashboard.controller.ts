import type { Request, Response } from "express";
import * as TasksService from "../../tasks/getTasks.service.js";
import * as UserService from "../../users/Users.service.js";

export const TotalTasks = async (_req: Request, res: Response) => {
  try {
    const data = await TasksService.TotalTask();

    if (data.length === 0) {
      return res.status(404).json({
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
      message: "Error al obtener total de tareas",
    });
  }
};

export const UsersTaks = async (_req: Request, res: Response) => {
  try {
    const data = await TasksService.TasksUser();

    if (data.length === 0) {
      return res.status(404).json({
        ok: false,
        message: " No data",
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
      message: "Error al obtener tareas por usuario",
    });
  }
};

export const minicards = async (_req: Request, res: Response) => {
  try {
    const data = await UserService.MinicardsUsers();

    if (data.length === 0) {
      return res.status(404).json({
        ok: false,
        message: " No data",
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
      message: "Error al obtener minicards",
    });
  }
};
