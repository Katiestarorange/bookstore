var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var dbConfig = require('../db/dbConfig')
var userSql = require('../db/userSql')


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

//  url: /user/
router.get('/', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var data = {};
        connection.query(userSql.queryAll, function (err, e) {
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

// 一、实现登录
// 1. 连接数据库
// 2. 接收前端传来的数据（用户名和密码）
// 3. 查询该条数据是否存在，能够打印一下结果
// 4. 不存在使用res.json()返回数据
// 5. 存在判断密码是否一致，返回数据
// 6. 数据库名称和前端post的名称和node查询的名称须要一致，过程能够打印查询的结果在进一步操作
// url: /user/login/
router.get('/login', (req, res) => { 
    var param = req.query;
    console.log(param); 
    // responseJSON(res, {status: 1, msg: '登录成功'})
    var username = param.username;
    var password = param.password;
    pool.getConnection( (err, connection) => {
        var data = {};
        // console.log(userSql.getUserByuser_name+`${username}`)
        connection.query(userSql.getUserByuser_name, [username], (err, re) => {
          // console.log('re=',re);
          // if (err) {
          //     data.result = err;
          //     console.log(data);
          //     //   发送数据
          //     responseJSON(res, data);
          // }
          if(re && re.length !== 0) {
            if(re[0].user_password === password) {
              data.result = {
                status: 1,
                msg: '登陆成功',
                userInfo: re[0]
              }
            }else {
              data.result = {
                status: 1,
                msg: '密码错误'
              } 
            }
            //   发送数据
            responseJSON(res, data);
          } else {
            data.result = {
              status: 1,
              msg: '登陆失败，用户不存在'
            }
            //   发送数据
            responseJSON(res, data);
          }

          
        })
        //   断开数据库
        connection.release();
    })
})

// 二、实现注册功能
// 1. 先查询用户名是否存在
// 2. 存在则不能注册，返回给客户端信息
// 3. 不存在，经过接收传入来的数据，插入该条数据进入数据库
// 4. 判断数据库受影响的行数affectedRows是否为1，是的话，表示插入成功
// 5. 保证名称一致，能够打印结果来测试
// url: /user/register/
router.post('/register', (req, res) => {
  var param = req.body;
  console.log(param);
  var username = param.username;
  var password = param.password;

    pool.getConnection(function (err, connection) {
        var data = {};
        connection.query(userSql.getUserByuser_name, [username], function (err, re) {
          console.log('re');
          if(err) {
            data.result = err;
            responseJSON(res, data);
          }else {
            if(!re || re.length === 0) {
              connection.query(userSql.insert, [username, password], function (err, e) {
                console.log(e);
                if (err) {
                  // console.log(err)
                  data.result = {
                    status: 1,
                    msg: '注册失败'
                  }
                  responseJSON(res, data);
                } else {
                  data.result = {
                    status: 1,
                    msg: '注册成功'
                  }
                  console.log('data = ', data);
                  //   发送数据
                  responseJSON(res, data);
                }
              })
            }else {
              data.result = {
                status: 1, 
                msg: '该用户名已经存在'
              }
              responseJSON(res, data);
            }
          }
          
          
        })
        //   断开数据库
        connection.release();
    })  
})



// 修改用户信息
// url: /user/update
router.post('/update', (req, res) => {
  var param = req.body;
  console.log(param);
  var user= [
    param.username,
    param.phone,
  param.address,
  param.sex,
  param.birthday
  ];
  console.log(user);
  
  const uid = param.uid;

  pool.getConnection(function (err, connection) {
    var data = {};
    connection.query(userSql.getUserByuid + `${uid}`, function (err, re){
      if(err) {
        data.result = {
          status: 1,
          msg: '找不到该用户'
        }
        responseJSON(res, data);
      }
      console.log('要修改的用户信息：',re);
      if(re.length !== 0) {
        connection.query(userSql.updateUserByuid + `${uid}`, user, (err, result) => {
          if(err) {
            data.result = {
              status: 1,
              msg: '修改失败'
            }
          }else {
            data.result = {
              status: 1, 
              msg: '修改成功'
            }
          }
          console.log(result);
          responseJSON(res, data);
        })
      }
    })
    connection.release();
  })
  
})







module.exports = router