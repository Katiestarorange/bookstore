var userSql = {
  insert: 'INSERT INTO user(user_name, user_password) VALUES(?, ?)',
  queryAll: 'SELECT * FROM user',
  getUserByuser_name: 'SELECT * FROM user WHERE user_name=?',
  getUserByuid: 'SELECT * FROM user WHERE uid=',
  updateUserByuid: 'UPDATE user SET user_name=?,phone_number=?,address=?,sex=?,birthday=? WHERE uid ='
}
module.exports = userSql
