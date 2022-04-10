var favoriteSql = {
  insert: 'INSERT INTO favorite(fid, uid) VALUES(?, ?)',
  queryAll: 'SELECT * FROM favorite',
  getFavoriteByuid: 'SELECT * FROM favorite WHERE uid=',
  getGoodsByfid: 'SELECT * FROM book_favorite WHERE fid=',
  addFavorite: 'INSERT INTO book_favorite(fbid, bid, fid) VALUES(?, ?, ?)',
  deleteFavorite: 'DELETE FROM book_favorite WHERE bid=? && fid=?',
  getGoodsByfbid: 'SELECT * FROM book_favorite WHERE bid=? && fid=?'
}
module.exports = favoriteSql;