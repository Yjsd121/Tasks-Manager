import { getCredentials } from '../users/Users.service.js'
import jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'

export const authlogin = async (req, res) => {
  try {

    const { email, password } = req.body
    const user = await getCredentials(email)

    if (user.length === 0) {
      return res.status(404).json({
        ok: false,
        message: 'usario no encontrado'
      })
    }
    const isValid = await bcrypt.compare(password, user[0].User_pass)

    if (isValid) {
      const token = jwt.sign({
        id: user[0].Client_id,
        role: user[0].Role
      },
        process.env.JWT_SECRET,
        {
          expiresIn: '4h'
        }
      )
      return res.json({
        ok: true,
        token
      })

    } else {
      return res.status(401).json({
        message: 'Unauthorized'
      })
    }
  } catch (err) {
    console.log(err)
  }
}


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