const express = require('express');
const mysql = require('mysql');

const dbConfig = require('../db/dbConfig');
const cartSql  = require('../db/cartSql');

const pool = mysql.createPool(dbConfig.mysql);

const responseJSON = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '-200',
            msg: '操作失败'
        });
    } else {
        // console.log(JSON.stringify(ret));
        res.json(ret);
    }
}

const router = express.Router();

/* GET cart page. */
//  url: /cart/
router.get('/', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var data = {};
        connection.query(cartSql.queryAll, function (err, e) {
            if (e) {
                data.res = e;
            }
            //   发送数据
            responseJSON(res, data);
        })
        //   断开数据库
        connection.release();
    })
});


// 参数：uid、datetime
router.get('/get', (req, res) => {
    // console.log('/cart/get');
    const query = req.query;
    // console.log(query);
    pool.getConnection(function (err, connection) {
        var data = {};
        // console.log(cartSql.getCartByuid + query.uid);
        connection.query(cartSql.getCartByuid + query.uid, function (err, re) {
            if (err) {
                data.res = {
                    status: 3,
                    msg: '获取购物车信息失败',
                    reason: err
                };
                responseJSON(res, data);
            } else {
                // console.log('re=',re);
                connection.query(cartSql.queryAll, function (err, resu) {
                    if (err) {
                        console.log(err);
                    }
                    var cid = resu.length + 1;
                    // console.log('cid=', cid);
                    // 不存在，创建一条记录保存该用户的购物车，返回cid
                    if(!re || re.length === 0) {
                  
                      connection.query(cartSql.insert, [cid, query.uid, query.datetime], function (err, e) {
                        // console.log(e);
                        if (err) {
                          data.result = {
                            status: 3,
                            msg: '获取购物车信息失败',
                            reason: err
                          }
                          // console.log('data = ', data);
                          //   发送数据
                          responseJSON(res, data);
                        }else{
                            data.result = {
                              status: 3,
                              msg: '购物车为空',
                              cid: cid
                            }
                            // console.log('data = ', data);
                            //   发送数据
                            responseJSON(res, data);
                        }
                      })
                    }
                    // 存在，查找到的 cid 获取并返回用户的所有购物车商品
                    else {
                        let cid = re[0].cid;
                        data.result = {
                            status: 3,
                            msg: '购物车已创建',
                            cid: cid
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


// /cart/add
//  url: /cart/
// 3 个参数： uid -> cid 和 bid 和 quanity
router.post('/add', function (req, res, next) {
    let params = req.body;
    console.log('addCart params: ', params);
    pool.getConnection(function (err, connection) {
        var data = {};
        connection.query(cartSql.getCartByuid + params.uid, function(err, re) {
            connection.query(cartSql.getGoodBycbid, [params.bid, re[0].cid], (err, resu) => {
                if(!resu || resu.length === 0) {
                    var cbid;
                    connection.query('SELECT * FROM book_cart', (err, resul) => {
                        if(!resul || resul.length === 0) {
                            cbid = 1;
                        }else {
                            cbid = resul.length + 1;
                        }
                        connection.query(cartSql.addCart, [cbid, params.bid, re[0].cid, params.quanity], function (err, resu) {
                            if (err) {
                                data.result = {
                                    status: 3, 
                                    msg: '添加到购物车错误',
                                    content: err
                                }
                                //   发送数据
                                responseJSON(res, data);
                            }else {
                                data.result = {
                                    status: 3, 
                                    msg: '成功添加到购物车',
                                    content: cbid
                                }
                                //   发送数据
                                responseJSON(res, data);
                            }
                        })
                    })
                    
                }else {
                    connection.query(cartSql.updateCart, [params.quanity+resu[0].quanity, params.bid, re[0].cid], function(err, e){
                        if (err) {
                            data.result = {
                                status: 3, 
                                msg: '添加到购物车错误',
                                content: err
                            }
                            //   发送数据
                            responseJSON(res, data);
                        }else {
                            data.result = {
                                status: 3, 
                                msg: '商品数量+'+params.quanity,
                                content: e
                            }
                            //   发送数据
                            responseJSON(res, data);
                        }
                    })
                }
            })

        })
        //   断开数据库
        connection.release();
    })
});


// /cart/items 获取购物车里的所有商品
// 参数： uid 
router.get('/items', function (req, res, next) {
    let query = req.query;
    // console.log(query);
    pool.getConnection(function (err, connection) {
        var data = {};
        connection.query(cartSql.getCartByuid + query.uid, (err, e) => {
            if(!e || e.length === 0) {

            }else {
               connection.query(cartSql.getGoodsBycid + e[0].cid, function (err, re) {
                    if (err) {
                        data.result = {
                            status: 3,
                            msg: '获取购物车商品发生了错误',
                            content: err
                        };
                        //   发送数据
                        responseJSON(res, data);
                    }else {
                        if(!re || re.length === 0) {
                            data.result = {
                                status: 3,
                                msg: '购物车为空',
                                content: []
                            }
                        }else {
                            data.result = {
                                status: 3,
                                msg: '成功获取购物车的所有商品',
                                content: re
                            }
                        }
                        responseJSON(res, data);
                    }
                    
                })
            }
        })
        //   断开数据库
        connection.release();
    })
});

// /cart/remove
// uid bid
router.get('/delete', function(req, res) {
    let query = req.query;
    // console.log(query);
    pool.getConnection((err, connection) => {
        var data = {};
        connection.query(cartSql.getCartByuid + query.uid, (err, e) => {
            if(!e || e.length === 0){

            }else {
                connection.query(cartSql.deleteCart, [query.bid, e[0].cid], (err, re) => {
                    // console.log(re);
                    data.result = {
                        status: 3,
                        msg: '删除成功'
                    }
                    responseJSON(res, data);
                })
            }
        })

        //   断开数据库
        connection.release();
    })
})

// /cart/change 改变数量
router.get('/change', (req, res) => {
    let query = req.query;
    pool.getConnection((err, connection) => {
        var data = {};
        connection.query(cartSql.getCartByuid + query.uid, (err, e) => {
            if(!e || e.length === 0) {

            }else {
                connection.query(cartSql.updateCart, [ query.quanity, query.bid, e[0].cid], (err, re) => {
                    data.result = {
                        status: 3, 
                        msg: '商品数量：'+query.quanity
                    }
                    //   发送数据
                    responseJSON(res, data);
                })
            }
        })

        connection.release();
    })
})


module.exports = router;