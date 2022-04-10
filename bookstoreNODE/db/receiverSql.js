var receiverSql = {
  insert: 'INSERT INTO receiver(rid,uid, rname, rphone, region, addr) VALUES(?,?, ?, ?, ?, ?)',
  queryAllByuid: 'SELECT * FROM receiver WHERE uid=',
  queryAll: 'SELECT * FROM receiver',
  getReceiverByrid: 'SELECT * FROM receiver WHERE rid=',
  updateReceiverByrid: 'UPDATE receiver SET rname=?, rphone=?, region=?, addr=? WHERE rid ='
}
module.exports = receiverSql;