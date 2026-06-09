const query = require('../utils/Query')

exports.getusers = async (email) => {
  return await query('SELECT * FROM todoapp.users WHERE User_email = ? ', [email])
}