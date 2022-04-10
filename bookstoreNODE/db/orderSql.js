var orderSql = {
  insert: 'INSERT INTO goodsorder(oid, order_number, uid, datetime, payment, state, expired) VALUES(?, ?, ?, ?, ?, ?, ?)',
  queryAll: 'SELECT * FROM goodsorder',
  getorderByuid: 'SELECT * FROM goodsorder WHERE uid=',
  getorderBystatus: 'SELECT * FROM goodsorder WHERE status=? && uid=?',
  getgoodsByoid: 'SELECT * FROM book_order WHERE oid=',
  addOrder: 'INSERT INTO book_order(obid, bid, oid, quanity) VALUES(?, ?, ?, ?)',
  deleteOrder: 'DELETE FROM book_order WHERE oid=',
  getGoodsByobid: 'SELECT * FROM book_order WHERE bid=? && oid=?'
}
module.exports = orderSql;