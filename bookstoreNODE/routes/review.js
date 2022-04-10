const express = require('express');
const mysql = require('mysql');

const dbConfig = require('../db/dbConfig');
const reviewSql = require('../db/reviewSql');

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
//  url: /review/
router.get('/', function (req, res, next) {
    const query = req.query;
    console.log('review',query);
    pool.getConnection(function (err, connection) {
        var data = {};
        connection.query(reviewSql.queryAll + query.bid, function (err, e) {
            if (err) {
                data.result = {
                    status: 7,
                    msg: '获取评论失败',
                    content: []
                };
                responseJSON(res, data);
            }else {
                if(!e || e.length === 0) {
                    data.result = {
                        status: 7,
                        msg: '获取评论成功',
                        content: []
                    };
                    responseJSON(res, data);
                }else {
                    data.result = {
                        status: 7,
                        msg: '获取评论成功',
                        content: e
                    };
                    responseJSON(res, data);
                }
                
            }
        })
        //   断开数据库
        connection.release();
    })
});

router.post('/add', function (req, res, next) {
    const params = req.body.reviewInfo;
    console.log(params);
    pool.getConnection(function (err, connection) {
        var data = {};
        connection.query('SELECT * FROM review', function (err, e) {
            var vid;
            if(!e || e.length === 0) {
                vid = 1;
            }else {
                vid = e.length + 1;
            }
            connection.query(reviewSql.insert, [vid, params.bid, params.uid, params.user_name, params.score, params.content, params.date], (err, re) => {
                if (err) {
                    data.result = {
                        status: 7,
                        msg: '评论失败',
                        content: err
                    };
                    responseJSON(res, data);
                }else {
                    data.result = {
                        status: 7,
                        msg: '评论成功',
                        content: e
                    };
                    responseJSON(res, data);
                }
            })
        })
        //   断开数据库
        connection.release();
    })
});

module.exports = router;