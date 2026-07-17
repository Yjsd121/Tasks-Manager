import * as MinichartService from './MinichartDara.service.js'

export const MinichartTaskview = async (req, res) => {
  try {
    const data = await MinichartService.TasksInfo(req.user.email)

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
