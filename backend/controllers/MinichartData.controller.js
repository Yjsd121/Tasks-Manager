const MinichartService = require('../services/MinichartDara.service')

exports.MinichartTaskview = async (req, res) => {
  try {
    const data = await MinichartService.TasksInfo()

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