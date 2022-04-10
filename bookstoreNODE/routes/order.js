const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const dbConfig = require('../db/dbConfig');
const orderSql = require('../db/orderSql');
const bookSql = require('../db/bookSql');

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

/* GET home page. */
//  url: /order/
router.get('/get', function (req, res, next) {
    const query = req.query;
    console.log(query);
    pool.getConnection(function (err, connection) {
        var data = {};
        connection.query(orderSql.getorderByuid + query.uid, function (err, re) {
            if (err) {
                data.result = {
                    status: 6,
                    msg: '订单获取失败',
                    content: err
                }
                responseJSON(res, data);
            }else {
                if(!re || re.length === 0) {
                    data.result = {
                      status: 6,
                      msg: '订单为空',
                      content: []
                    }
                    responseJSON(res, data);
                }else {
                    data.result = {
                        status: 6,
                        msg: '订单获取成功',
                        content: re
                    }
                    responseJSON(res, data);
                }
            }
            
        })
        //   断开数据库
        connection.release();
    })
});


// 参数： oid
router.get('/getGood', function (req, res, next) {
    const query = req.query;
    console.log(query);
    pool.getConnection(function (err, connection) {
        var data = {};
        
        connection.query(orderSql.getgoodsByoid + query.oid, (err, e) => {
            if(!e || e.length === 0) {
                data.result = {
                  status: 6,
                  msg: '订单的商品列表为空',
                  content: []
                }
                responseJSON(res, data);
            }else {
                // let list = [];
                Promise.all(e.map(item => {
                    return new Promise((resovle, reject) => {
                        connection.query(bookSql.getbookBybid + item.bid, (err, re) => {
                            console.log(re[0])
                            // list.push(re[0]);
                            // console.log(list)
                            re[0].num = item.quanity;
                            resovle(re[0]);
                        })
                    })
                })).then(goodList => {
                    console.log(goodList)
                    data.result = {
                        status: 6,
                        msg: '订单的商品列表获取成功',
                        content: goodList
                    }
                    console.log(data)
                    responseJSON(res, data);
                })
            }
        })

        //   断开数据库
        connection.release();
    })
});


// order/addOrder
router.post('/addOrder', function (req, res, next) {
    const params = req.body;
    console.log(params);
    pool.getConnection(function (err, connection) {
        var data = {};
        var oid;
        connection.query('SELECT * FROM goodsorder', (err, re) => {
            if(!re || re.length === 0) {
                oid = 1;
            }else {
                oid = re.length + 1;
            }
            connection.query(orderSql.insert, [oid, params.orderInfo.order_number, params.orderInfo.uid, params.orderInfo.datetime, params.orderInfo.payment, params.orderInfo.state, params.orderInfo.expired], function (err, e) {
                if (err) {
                    console.log(err);
                    data.result = {
                        status: 6,
                        msg: '订单添加失败',
                        content: err
                    }
                    responseJSON(res, data);
                }else {
                    Promise.all(params.goodList.map(item => {
                        return new Promise((resolve, reject) => {
                            let obid;
                            connection.query('SELECT * FROM book_order', (err, ress) => {
                                if(!ress || ress.length === 0) {
                                    obid = 1;
                                }else {
                                    obid = ress.length+1;
                                }
                                connection.query(orderSql.addOrder, [obid, item.bid, oid, item.num], function (err, resu) {
                                    if (err) {
                                        reject(err);
                                    }else {
                                        resolve(resu);
                                    }
                                })
                            })
                        })
                    })).then(result => {
                        console.log(result);
                        data.result = {
                            status: 6,
                            msg: '图书添加成功',
                            content: result
                        }
                        
                        responseJSON(res, data);
                    }, err => {
                        console.log(err);
                        data.result = {
                            status: 6,
                            msg: '图书添加失败',
                            content: err
                        }
                        responseJSON(res, data);
                    })
                    // data.result = {
                    //     status: 6,
                    //     msg: '订单添加成功',
                    //     content: oid
                    // }
                    // responseJSON(res, data);
                }
            })
        })
        //   断开数据库
        connection.release();
    })
});

// order/addBook
router.post('/addBook', function (req, res, next) {
    const params = req.body;
    console.log(params);
    const goodList = params.goodList;
    pool.getConnection(function (err, connection) {
        var data = {};
        Promise.all(goodList.map(item => {
            return new Promise((resolve, reject) => {
                connection.query('SELECT * FROM book_order', (err, ress) => {
                    var obid;
                    if(!ress || ress.length === 0) {
                        obid = 1;
                    }else {
                        obid = ress.length+1;
                    }
                    connection.query(orderSql.insertBook, [obid, item.bid, params.oid, params.quanity], function (err, re) {
                        if (err) {
                            reject(err);
                        }else {
                            resolve(re);
                        }
                    })
                })
                
            })
        })).then(result => {
            console.log(result);
            data.result = {
                status: 6,
                msg: '图书添加成功',
                content: result
            }
            
            responseJSON(res, data);
        }, err => {
            console.log(err);
            data.result = {
                status: 6,
                msg: '图书添加失败',
                content: err
            }
            responseJSON(res, data);
        })
        //   断开数据库
        connection.release();
    })
});

// 参数： oid
router.get('/delete', (req, res) => {
    let query = req.query;
    console.log(query);
    pool.getConnection((err, connection) => {
        var data = {};
        console.log(orderSql.deleteOrder + query.oid)
        connection.query(orderSql.deleteOrder + query.oid, (err, re) => {
            if(err) {
                console.log(err);
                data.result = {
                    status: 6, 
                    msg: '订单删除失败'
                }
                responseJSON(res, data);
            }
            else {
                connection.query('DELETE FROM goodsorder WHERE oid=' + query.oid, (err, e) => {
                    data.result = {
                        status: 6, 
                        msg: '订单删除成功'
                    }
                    responseJSON(res, data);
                })
            }
        })
        connection.release();
    })
})

module.exports = router;