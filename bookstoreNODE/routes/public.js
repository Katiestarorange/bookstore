const express = require('express');
const router = express.Router();
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

//  url: /swiper/
router.get('/swiper', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var data = {};
        connection.query('SELECT * FROM `swiper`', function (err, e) {
            if (err) {
                data.result = {
                    status: 9,
                    msg: '获取轮播图失败',
                    content: err
                };
            }else {
               data.result = {
                    status: 9,
                    msg: '获取轮播图成功',
                    content: e
                }; 
            }
            //   发送数据
            responseJSON(res, data);
        })
        //   断开数据库
        connection.release();
    })
});

router.get('/ad', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var data = {};
        connection.query('SELECT * FROM `ad`', function (err, e) {
            if (err) {
                data.result = {
                    status: 9,
                    msg: '获取广告图失败',
                    content: err
                };
            }else {
                e.forEach(item => {
                    item.show = false;
                })
                console.log(e);
               data.result = {
                    status: 9,
                    msg: '获取广告图成功',
                    content: e
                }; 
            }
            //   发送数据
            responseJSON(res, data);
        })
        //   断开数据库
        connection.release();
    })
});

module.exports = router;