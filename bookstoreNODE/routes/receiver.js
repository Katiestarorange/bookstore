const express = require('express');
var router = express.Router();
const mysql = require('mysql');

const dbConfig = require('../db/dbConfig');
const receiverSql = require('../db/receiverSql');

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
//  url: /receiver/
router.get('/', function (req, res) {
    var query = req.query;
    pool.getConnection(function (err, connection) {
        var data = {};
        connection.query(receiverSql.queryAllByuid + query.uid, function (err, e) {
            if (err) {
                data.result = {
                    status: 5, 
                    msg: '获取地址失败',
                    content: err
                }
                responseJSON(res, data);
            }else {
                data.result = {
                    status: 5, 
                    msg: '获取地址成功',
                    content: e
                }
                responseJSON(res, data);
            }
        })
        //   断开数据库
        connection.release();
    })
});

//  url: /receiver/add
router.post('/add', function (req, res) {
    var params = req.body;
    console.log(params);
    pool.getConnection(function (err, connection) {
        var data = {};
        var rid;
        connection.query(receiverSql.queryAll, function (err, re) {
            if(!re || re.length === 0) {
                rid = 1;
            }else {
                rid = re.length + 1;
            }
            console.log()
            console.log('rid=', rid);
            connection.query(receiverSql.insert, [rid, params.uid, params.receiver.rname, params.receiver.rphone, params.receiver.region, params.receiver.addr], function (err, e) {
                if (e) {
                    data.result = {
                        status: 5,
                        msg: '添加收货人失败',
                        content: e
                    };
                    //   发送数据
                    responseJSON(res, data);
                }else {
                    data.result = {
                        status: 5,
                        msg: '添加收货人成功',
                        content: rid
                    }
                    responseJSON(res, data);
                }
            })
        })

        //   断开数据库
        connection.release();
    })
});

router.post('/update', function (req, res) {
    var params = req.body;
    console.log(params);
    pool.getConnection(function (err, connection) {
        var data = {};
        connection.query(receiverSql.updateReceiverByrid + params.rid, [params.rname, params.rphone, params.region, params.addr], function (err, e) {
            if (err) {
                data.result = {
                    status: 5, 
                    msg: '修改收获人信息失败',
                    content: err
                }
                responseJSON(res, data);
            }else {
                data.result = {
                    status: 5, 
                    msg: '修改收获人信息成功',
                    content: e
                }
                responseJSON(res, data);
            }
        })
        //   断开数据库
        connection.release();
    })
});


module.exports = router;