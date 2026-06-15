const tasksservice = require('../services/getTasks.service')

exports.gettasks = async (req, res) => {
  try {
    const data = await tasksservice.gettasks(req.params.name)

    if (data.length === 0) {
      return res.status(404).json({
        ok: false,
        message: 'Sin tareas'
      })
    }
    return res.status(200).json({
      ok: true,
      data: data
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      ok: false,
      message: 'Error al obtener tareas'
    })
  }
}

exports.createtask = async (req, res) => {
  try {
    const task = await tasksservice.createtask(req.body, req.user)

    if (task?.errors) {
      return res.status(400).json({
        ok: false,
        message: task.errors
      })
    }

    return res.status(201).json({
      ok: true,
      data: task
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      ok: false,
      message: 'Error al crear tarea'
    })
  }
}

exports.updatetask = async (req, res) => {
  try {
    const task = await tasksservice.updatetask(req.params.id, req.body)

    if (task?.errors) {
      return res.status(400).json({
        ok: false,
        message: task.errors
      })
    }

    if (!task) {
      return res.status(404).json({
        ok: false,
        message: 'Tarea no encontrada'
      })
    }

    return res.status(200).json({
      ok: true,
      data: task
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      ok: false,
      message: 'Error al actualizar tarea'
    })
  }
}

exports.deletetask = async (req, res) => {
  try {
    const deleted = await tasksservice.deletetask(req.params.id)

    if (!deleted) {
      return res.status(404).json({
        ok: false,
        message: 'Tarea no encontrada'
      })
    }

    return res.status(200).json({
      ok: true,
      message: 'Tarea eliminada'
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      ok: false,
      message: 'Error al eliminar tarea'
    })
  }
}
