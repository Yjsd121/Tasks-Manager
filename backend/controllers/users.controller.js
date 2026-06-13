const Usersservice = require('../services/Users.service')

exports.getUsers = async (req, res) => {
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
