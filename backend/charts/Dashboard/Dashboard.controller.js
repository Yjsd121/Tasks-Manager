import * as TasksService from '../../tasks/getTasks.service.js'
import * as UserService from '../../users/Users.service.js'

export const TotalTasks = async (req, res) => {
  try {
    const data = await TasksService.TotalTask()

    if (data.length === 0) {
      return res.status(401).json({
        ok: false,
        message: 'Sin Datos'
      })
    }

    return res.status(200).json({
      ok: true,
      data: data
    })
  } catch (err) {
    console.log(err)
  }
}

export const UsersTaks = async (req, res) => {
  try {
    const data = await TasksService.TasksUser()
    if (data.length === 0) {
      return res.status(401).json({
        ok: false,
        message: ' No data'
      })

    }
    return res.status(200).json({
      ok: true,
      data: data
    })
  } catch (err) {
    console.log(err)
  }
}

export const minicards = async (req, res) => {
  try {
    const data = await UserService.MinicardsUsers()

    if (data.length === 0) {
      return res.status(401).json({
        ok: false,
        message: ' No data'
      })

    }
    return res.status(200).json({
      ok: true,
      data: data
    })
  } catch (err) {
    console.log(err)
  }
}