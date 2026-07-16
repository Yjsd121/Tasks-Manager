import * as Usersservice from './Users.service.js'

export const getUsers = async (req, res) => {
  try {
    const query = await Usersservice.getusers()
    return res.status(200).json({
      ok: true,
      data: query
    })
  } catch (err) {
    console.log(err)

    return res.status(401)
  }
}

export const createUser = async (req, res) => {
  try {
    const {
      User_names,
      User_lastnames,
      User_email,
      Password,
      Role
    } = req.body

    const userData = {
      User_names,
      User_lastnames,
      User_email,
      Password,
      Role,
      Img_rute: req.file?.filename || null
    }

    const user = await Usersservice.createUser(userData)

    if (user?.errors) {
      return res.status(400).json({
        ok: false,
        message: user.errors
      })
    }

    return res.status(201).json({
      ok: true,
      data: user
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      ok: false,
      message: 'Error al crear usuario'
    })
  }
}

export const updateUser = async (req, res) => {
  try {
    const {
      User_names,
      User_lastnames,
      User_email,
      Password,
      Role
    } = req.body

    const userData = {
      User_names,
      User_lastnames,
      User_email,
      Password,
      Role
    }

    if (req.file) {
      userData.Img_rute = req.file.filename
    }

    const user = await Usersservice.updateUser(req.params.id, userData)

    if (user?.errors) {
      return res.status(400).json({
        ok: false,
        message: user.errors
      })
    }

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: 'Usuario no encontrado'
      })
    }

    return res.status(200).json({
      ok: true,
      data: user
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      ok: false,
      message: 'Error al actualizar usuario'
    })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const deleted = await Usersservice.deleteUser(req.params.id)

    if (!deleted) {
      return res.status(404).json({
        ok: false,
        message: 'Usuario no encontrado'
      })
    }

    return res.status(200).json({
      ok: true,
      message: 'Usuario eliminado'
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      ok: false,
      message: 'Error al eliminar usuario'
    })
  }
}
