const express = require('express');
const mysql = require('mysql');

const dbConfig = require('../db/dbConfig');

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

/* GET home page. */
//  url: /admin/
router.get('/', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var data = {};
        connection.query('SELECT * FROM `admin`', function (err, e) {
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


router.get('/login', (req, res) => {
    responseJSON(res, {status: 1, msg: '登录功能'})
})

module.exports = router;