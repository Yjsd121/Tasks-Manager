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

    if (!email || !password) {
      return res.status(400).json({
        ok: false,
        message: "email y password son requeridos",
      });
    }

    const user = await getCredentials(email);

    if (user.length === 0) {
      return res.status(404).json({
        ok: false,
        message: "usario no encontrado",
      });
    }

    const [credentials] = user;
    const isValid = await bcrypt.compare(password, credentials.User_pass ?? "");

    if (isValid) {
      const secret = process.env.JWT_SECRET;

      if (!secret) {
        return res.status(500).json({
          ok: false,
          message: "JWT_SECRET no configurado",
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
      return res.json({
        ok: true,
        token,
      });
    }

    return res.status(401).json({
      message: "Unauthorized",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      ok: false,
      message: "Error al iniciar sesion",
    });
  }
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
