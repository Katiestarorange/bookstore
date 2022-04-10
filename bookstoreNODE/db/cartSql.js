var cartSql = {
  insert: 'INSERT INTO cart(cid, uid, datetime) VALUES(?, ?, ?)',
  queryAll: 'SELECT * FROM cart',
  getCartByuid: 'SELECT * FROM cart WHERE uid=',
  getGoodsBycid: 'SELECT * FROM book_cart where cid=',
  // getGoodBybid: 'SELECT * FROM book_cart where bid=',
  getGoodBycbid: 'SELECT * FROM book_cart where bid=? && cid=?',// 改变数量
  addCart: 'INSERT INTO book_cart(cbid, bid, cid, quanity) VALUES(?, ?, ?, ?)',
  updateCart: 'UPDATE book_cart SET quanity=? WHERE bid=? && cid=?',
  deleteCart: 'DELETE FROM book_cart WHERE bid=? && cid=?'
}
module.exports = cartSql;