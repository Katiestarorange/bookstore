var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../db/dbConfig');
var favoriteSql = require('../db/favoriteSql');
var bookSql = require('../db/bookSql');

var pool = mysql.createPool(dbConfig.mysql);

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

// 参数：uid
router.get('/', (req, res) => {
    // console.log('/favorite');
    const query = req.query;
    // console.log(query);
    pool.getConnection(function (err, connection) {
        var data = {};
        connection.query(favoriteSql.getFavoriteByuid + query.uid, function (err, re) {
            if (err) {
                data.res = {
                    status: 4,
                    msg: '获取收藏商品失败',
                    content: err
                };
                responseJSON(res, data);
            } else {
                // console.log('re=',re);
                connection.query(favoriteSql.queryAll, function (err, resu) {
                    if (err) {
                        // console.log(err);
                    }
                    var fid = resu.length + 1;
                    // console.log('fid=', fid);
                    // 不存在，创建一条记录保存该用户的购物车，返回fid
                    if(!re || re.length === 0) {
                  
                      connection.query(favoriteSql.insert, [fid, query.uid], function (err, e) {
                        // console.log(e);
                        if (err) {
                          data.result = {
                            status: 4,
                            msg: '获取收藏商品失败',
                            content: err
                          }
                          // console.log('data = ', data);
                          //   发送数据
                          responseJSON(res, data);
                        }else{
                            data.result = {
                              status: 4,
                              msg: '收藏空空如也',
                              content: fid
                            }
                            // console.log('data = ', data);
                            //   发送数据
                            responseJSON(res, data);
                        }
                      })
                    }
                    // 存在，查找到的 fid 获取并返回用户的所有购物车商品
                    else {
                        let fid = re[0].fid;
                        data.result = {
                            status: 4,
                            msg: '收藏已存在',
                            content: fid
                        }
                        responseJSON(res, data);
                    }
                })
            }
        })
        //   断开数据库
        connection.release();
    })
})

// 一个参数； uid 获取收藏
router.get('/get', (req, res) => {
  let query = req.query;
  pool.getConnection((err, connection) => {
    let data = {};
    connection.query(favoriteSql.getFavoriteByuid + query.uid, (err, re) => {
      // console.log(re);
      if(err) {
        data.result = {
          status: 4,
          msg: '获取收藏商品失败',
          content: err
        }
        responseJSON(res, data);
      } else {
        // 新用户需要先创建一个属于他的收藏
        if(!re || re.length === 0) {
          // 创建当前用户的 收藏且当时为空
          connection.query('SELECT * FROM favorite', (err, e) => {
            let fid = e.length + 1;
            connection.query(favoriteSql.insert, [fid, query.uid], (err, resu) => {
              data.result = {
                status: 4,
                msg: '收藏空空如也',
                content: []
              }
              responseJSON(res, data);
            })
          })
          
        }else {
          // 已有收藏 -> 先获取fid -> 查到 fid 的所有 bid 记录
          // console.log(re);
          connection.query(favoriteSql.getGoodsByfid + re[0].fid, (err, e) => {
            if(!e || e.length === 0){
              data.result = {
                status: 4,
                msg: '收藏空空如也',
                content: []
              }
              responseJSON(res, data);
            }else {
              Promise.all(e.map(item => {
                return new Promise((resolve, reject) => {
                  connection.query(bookSql.getbookBybid + item.bid,  (err, resu) => {
                    // console.log('e=',e[0]);
                    resu[0].show = false;
                    resolve(resu[0]);
                  })
                })
              })).then(values => {
                // console.log('values=',values);
                data.result = {
                  status: 4, 
                  msg: '成功获取收藏商品',
                  content: values
                }
                responseJSON(res, data);
              })
            }
          })
            
        }
      }
    })
    connection.release();
  })
})

// 2 个参数： uid 和 bid
router.post('/addFavorite', (req, res) => {
  let params = req.body;
  // console.log(req.body);
  pool.getConnection((err, connection) => {
    let data = {};
    // console.log(favoriteSql.getGoodsByuid + params.uid);
    connection.query(favoriteSql.getFavoriteByuid + params.uid, (err, e) => {
      if(err) {
        data.result = {
          status: 4,
          msg: '收藏商品失败',
          content: err
        }
        responseJSON(res, data);
      }else {
        // console.log(e);
        connection.query(favoriteSql.getGoodsByfbid, [params.bid, e[0].fid], (err, resu) => {
          // console.log(resu);
          var fbid;
          if(!resu || resu.length === 0) {
            connection.query('SELECT * FROM book_favorite', (err, ress) => {
              if(!ress || ress.length === 0) {
                fbid = 1;
              }else {
                fbid = ress.length + 1;
              }
              connection.query(favoriteSql.addFavorite, [fbid, params.bid, e[0].fid], (err, re) => {
                // console.log(re);
                if(err) {
                  data.result = {
                    status: 4,
                    msg: '收藏商品失败',
                    content: err
                  }
                  responseJSON(res, data);
                } else {       
                  data.result = {
                    status: 4, 
                    msg: '成功收藏商品'
                  }
                  responseJSON(res, data); 
                }
              })
            })
          } else {
            data.result = {
              status: 4,
              msg: '该商品已被收藏',

            }
            responseJSON(res, data);
          }
        })
      }
    })
    connection.release();
  })
})

router.get('/deleteFavorite', (req, res) => {
  let query = req.query;
  // console.log(query);
  pool.getConnection((err, connection) => {
    var data = {};
    connection.query(favoriteSql.getFavoriteByuid + query.uid, (err, resu) => {
      if(!resu || resu.length === 0) {

      }else {
        connection.query(favoriteSql.deleteFavorite,  [query.bid, resu[0].fid], (err, re) => {
          // console.log(re);
          if(err) {
            data.result = {
              status: 4,
              msg: '删除商品失败',
              content: err
            }
            responseJSON(res, data);
          } else {       
            data.result = {
              status: 4, 
              msg: '成功删除商品'
            }
            responseJSON(res, data);       
          }
        })
      }
    })
    
    connection.release();
  })
})

module.exports = router;
