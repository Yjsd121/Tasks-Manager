import type { Request, Response } from "express";
import * as tasksservice from "./getTasks.service.js";
import type { TaskInput } from "../models/Task.js";

interface ValidationResult { errors: string[] }

const getAuthenticatedUserId = (req: Request): string | null => {
  return typeof req.user?.id === "string" ? req.user.id : null;
};

const getRouteParam = (req: Request, name: string): string | null => {
  const value = req.params[name];

  return typeof value === "string" ? value : null;
};

const hasErrors = (value: unknown): value is ValidationResult => {
  return (
    typeof value === "object" &&
    value !== null &&
    "errors" in value &&
    Array.isArray(value.errors)
  );
};

export const gettasks = async (req: Request, res: Response) => {
  try {
    const userId = getAuthenticatedUserId(req);

    if (!userId) {
      return res.status(401).json({
        ok: false,
        message: "Usuario no autenticado",
      });
    }

    const data = await tasksservice.gettasks(userId);

    if (data.length === 0) {
      return res.status(404).json({
        ok: false,
        message: "Sin tareas",
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
      message: "Error al obtener tareas",
    });
  }
};

export const createtask = async (req: Request, res: Response) => {
  try {
    const task = await tasksservice.createtask(req.body as TaskInput, req.user);

    if (hasErrors(task)) {
      return res.status(400).json({
        ok: false,
        message: task.errors,
      });
    }

    return res.status(201).json({
      ok: true,
      data: task,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      ok: false,
      message: "Error al crear tarea",
    });
  }
};

export const updatetask = async (req: Request, res: Response) => {
  try {
    const id = getRouteParam(req, "id");

    if (!id) {
      return res.status(400).json({
        ok: false,
        message: "Id de tarea invalido",
      });
    }

    const task = await tasksservice.updatetask(id, req.body as TaskInput);

    if (hasErrors(task)) {
      return res.status(400).json({
        ok: false,
        message: task.errors,
      });
    }

    if (!task) {
      return res.status(404).json({
        ok: false,
        message: "Tarea no encontrada",
      });
    }

    return res.status(200).json({
      ok: true,
      data: task,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      ok: false,
      message: "Error al actualizar tarea",
    });
  }
};

export const deletetask = async (req: Request, res: Response) => {
  try {
    const id = getRouteParam(req, "id");

    if (!id) {
      return res.status(400).json({
        ok: false,
        message: "Id de tarea invalido",
      });
    }

    const deleted = await tasksservice.deletetask(id);

    if (!deleted) {
      return res.status(404).json({
        ok: false,
        message: "Tarea no encontrada",
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Tarea eliminada",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      ok: false,
      message: "Error al eliminar tarea",
    });
  }
};
