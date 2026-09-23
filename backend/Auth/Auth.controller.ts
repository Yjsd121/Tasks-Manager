import type { Request, Response } from "express";
import { getCredentials } from "../users/Users.service.js";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

export const authlogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as {
      email?: string;
      password?: string;
    };

    // La validación ya se hace en el middleware, por lo que email y password existen
    const user = await getCredentials(email!);

    // Mensaje de error genérico para prevenir enumeración
    if (user.length === 0) {
      return res.status(401).json({
        ok: false,
        message: "Correo o contraseña incorrectos",
      });
    }

    const [credentials] = user;
    const isValid = await bcrypt.compare(password!, credentials.User_pass ?? "");

    if (isValid) {
      const secret = process.env.JWT_SECRET;

      if (!secret) {
        return res.status(500).json({
          ok: false,
          message: "Error interno del servidor",
        });
      }

      const token = jwt.sign(
        {
          id: credentials.Client_id,
          role: credentials.Role,
        },
        secret,
        {
          expiresIn: "4h",
        },
      );

      // Enviamos el JWT como una cookie HttpOnly
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Solo en producción
        sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax", // Lax permite cross-port en localhost
        maxAge: 4 * 60 * 60 * 1000, // 4 horas
      });

      return res.json({
        ok: true,
        message: "Login exitoso",
      });
    }

    // Mismo mensaje genérico si falla la contraseña
    return res.status(401).json({
      ok: false,
      message: "Correo o contraseña incorrectos",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      ok: false,
      message: "Error al iniciar sesion",
    });
  }
};

// Controlador para cerrar sesión (borrar la cookie)
export const authlogout = async (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
  });
  return res.json({ ok: true, message: "Sesión cerrada correctamente" });
};


// export const verify = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization

//     if (!authHeader) {
//       return res.status(401).json({
//         message: 'required token'
//       })
//     }

//     const token = authHeader.split(' ')[1]

//     if (!token) {
//       return res.status(401).json({
//         ok: false,
//         message: 'required token'
//       })
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//       if (err) {
//         return res.status(401).json({
//           message: 'unauthorized'
//         })
//       }

//       req.user = decoded;
//       next()
//     })

//   } catch (err) {
//     console.log(err)
//   }
// }
