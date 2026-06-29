const authservices = require('./Auth.service')
const jwt = require('jsonwebtoken')

exports.authlogin = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await authservices.getusers(email)
    if (user.length === 0) {
      return res.status(404).json({
        ok: false,
        message: 'usario no encontrado'
      })
    }

    if (password != user[0].User_pass) {
      return res.status(401).json({
        message: 'Unauthorized'
      })
    } else {
      const token = jwt.sign({
        id: user[0].Client_id,
        email: user[0].User_email,
        role: user[0].Role
      },
        process.env.JWT_SECRET,
        {
          expiresIn: '1h'
        }
      )
      return res.json({
        ok: true,
        token,
        id: user[0].Client_id,
        email: user[0].User_email,
        role: user[0].Role,
        name: user[0].User_names,
        img: user[0].Img_rute
      })
    }
  } catch (err) {
    console.log(err)
  }
}

exports.verify = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(401).json({
        message: 'required token'
      })
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
      return res.status(401).json({
        ok: false,
        message: 'required token'
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: 'unauthorized'
        })
      }

      req.user = decoded;
      next()
    })

  } catch (err) {
    console.log(err)
  }
}