var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var dbConfig = require('../db/dbConfig')
var bookSql = require('../db/bookSql')


var pool = mysql.createPool(dbConfig.mysql)

var responseJSON = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '-200',
      msg: '操作失败'
    })
  } else {
    res.json(ret)
  }
}

//  url: /book/
router.get('/', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var data = {};
        connection.query(bookSql.queryAll, function (err, e) {
            if (err) {
                data.result = {
                  status: 2,
                  msg: '查询出错',
                  reason: err
                };
            }
            data.result = {
              status: 2,
              msg: '查询成功',
              content: e
            }
            //   发送数据
            responseJSON(res, data);
        })
        //   断开数据库
        connection.release();
    })
});




// url: /book/detail
router.get('/detail', (req, res) => {
  var query = req.query;
  // console.log(query);
  var bid = query.bid;
  pool.getConnection((err, connection) => {
    var data = {};
    connection.query(bookSql.getbookBybid + `${bid}`, (err, re) => {
      if (err) {
        data.result = {
          status: 2,
          msg: '获取失败，其他原因'
        };
        responseJSON(res, data);   
      }
      // console.log('查询结果是'+ re);
      if(!re || re.length === 0){
        data.result = {
          status: 2,
          msg: '获取失败，没有找到这本书'
        }
        responseJSON(res, data);   
      }else {
        connection.query(bookSql.getPicBybid + query.bid, (err, e) => {
          if(err) {
            data.result = {
              status: 2,
              msg: '获取失败，其他原因'
            };
            responseJSON(res, data);   
          } else {
            console.log(e)
            let bookInfo = re[0];
            bookInfo.imgs = e;
            data.result = {
              status: 2,
              msg: '成功获取图书的信息',
              content: bookInfo
            }
            console.log(data)
            responseJSON(res, data);   
          }
        })
      }
    })
    //   断开数据库
    connection.release();
  })
})

router.get('/category', (req, res) => {
  pool.getConnection((error, connection) => {
    var data = {};
    connection.query(bookSql.getCategory, (err, result) => {
      if(err) {
        data.result = {
          status: 3,
          msg: '获取分类失败',
          err: err
        },
        responseJSON(res, data);
      }else {
        data.result = {
          status: 3,
          msg: '获取分类成功',
          content: result
        }
        responseJSON(res,data);
      }
    })
    // 断开数据库
    connection.release();
  })

})

router.get('/type', (req, res) => {
  var query = req.query;
  console.log(query);
  pool.getConnection((error, connection) => {
    var data = {};
    connection.query(bookSql.getbooksBytid + query.tid, (err, result) => {
      if(err) {
        data.result = {
          status: 3,
          msg: '获取分类图书失败',
          err: err
        },
        responseJSON(res, data);
      }else {
        data.result = {
          status: 3,
          msg: '获取分类图书成功',
          content: result
        }
        responseJSON(res,data);
      }
      
    })
    // 断开数据库
    connection.release();
  })

})


module.exports = router;