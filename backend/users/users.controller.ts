import type { Request, Response } from "express";
import * as Usersservice from "./Users.service.js";
import type { UserInput } from "../models/User.js";

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

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const query = await Usersservice.getusers();
    return res.status(200).json({
      ok: true,
      data: query,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      ok: false,
      message: "Error al obtener usuarios",
    });
  }
};

export const gettingMe = async (req: Request, res: Response) => {
  try {
    const userId = getAuthenticatedUserId(req);

    if (!userId) {
      return res.status(401).json({
        ok: false,
        message: "Usuario no autenticado",
      });
    }

    const Me = await Usersservice.getMe(userId);

    if (Me.length === 0) {
      return res.status(204).json({
        ok: false,
        message: "No data",
      });
    }

    return res.status(200).json({
      ok: true,
      data: Me,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      ok: false,
      message: "Error al obtener usuario",
    });
  }
};

export const getuserIDS = async (_req: Request, res: Response) => {
  try {
    const UsersId = await Usersservice.getuserIDS();

    if (UsersId.length === 0) {
      return res.status(204).json({
        ok: false,
        message: "no content",
      });
    }
    return res.status(200).json({
      ok: true,
      data: UsersId,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      message: "Error al obtener IDs de usuarios",
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const {
      User_names,
      User_lastnames,
      User_email,
      Password,
      Role,
    } = req.body as UserInput;

    const userData: UserInput = {
      User_names,
      User_lastnames,
      User_email,
      Password,
      Role,
      Img_rute: req.file?.filename || null,
    };

    const user = await Usersservice.createUser(userData);

    if (hasErrors(user)) {
      return res.status(400).json({
        ok: false,
        message: user.errors,
      });
    }

    return res.status(201).json({
      ok: true,
      data: user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      ok: false,
      message: "Error al crear usuario",
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const {
      User_names,
      User_lastnames,
      User_email,
      Password,
      Role,
    } = req.body as UserInput;

    const userData: UserInput = {
      User_names,
      User_lastnames,
      User_email,
      Password,
      Role,
    };

    if (req.file) {
      userData.Img_rute = req.file.filename;
    }

    const id = getRouteParam(req, "id");

    if (!id) {
      return res.status(400).json({
        ok: false,
        message: "Id de usuario invalido",
      });
    }

    const user = await Usersservice.updateUser(id, userData);

    if (hasErrors(user)) {
      return res.status(400).json({
        ok: false,
        message: user.errors,
      });
    }

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: "Usuario no encontrado",
      });
    }

    return res.status(200).json({
      ok: true,
      data: user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      ok: false,
      message: "Error al actualizar usuario",
    });
  }
};

export const changeFirstPass = async (req: Request, res: Response) => {
  try {
    const { Password } = req.body as { Password?: string };
    const userId = getAuthenticatedUserId(req);

    if (!userId) {
      return res.status(401).json({
        ok: false,
        message: "Usuario no autenticado",
      });
    }

    if (!Password) {
      return res.status(400).json({
        ok: false,
        message: "Password es requerido",
      });
    }

    const Firstchange = await Usersservice.changeFirstPass(userId, Password);

    if (!Firstchange) {
      return res.status(304).json({
        ok: false,
        message: "Not changed",
      });
    }
    return res.status(200).json({
      ok: true,
      message: "Password changed",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      ok: false,
      message: "Error al cambiar password",
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = getRouteParam(req, "id");

    if (!id) {
      return res.status(400).json({
        ok: false,
        message: "Id de usuario invalido",
      });
    }

    const deleted = await Usersservice.deleteUser(id);

    if (!deleted) {
      return res.status(404).json({
        ok: false,
        message: "Usuario no encontrado",
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Usuario eliminado",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      ok: false,
      message: "Error al eliminar usuario",
    });
  }
};
