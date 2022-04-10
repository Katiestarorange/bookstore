var reviewSql = {
  insert: 'INSERT INTO review(vid, bid, uid, user_name, score, content, date) VALUES(?, ?, ?, ?, ?, ?, ?)',
  queryAll: 'SELECT * FROM review WHERE bid=',
  getreviewBybid: 'SELECT * FROM review WHERE bid=',
  getCategory: 'SELECT * FROM type',
  updatereviewBybid: 'UPDATE review SET isFavorited=? WHERE bid ='
}
module.exports = reviewSql;
