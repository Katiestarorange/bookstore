var bookSql = {
  // insert: 'INSERT INTO book(CUSID, OPENID, NICKNAME) VALUES(?, ?, ?)',
  queryAll: 'SELECT * FROM book',
  getbookBybid: 'SELECT * FROM book WHERE bid=',
  getCategory: 'SELECT * FROM type',
  getbooksBytid: 'SELECT * FROM book WHERE tid=',
  updateBookBybid: 'UPDATE book SET isFavorited=? WHERE bid =',
  getPicBybid: 'SELECT * FROM picture WHERE bid='
}
module.exports = bookSql