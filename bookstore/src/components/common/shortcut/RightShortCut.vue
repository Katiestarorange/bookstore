<template>
  <div id="right">
    <span class="welcome">欢迎光临贴贴，
       <span class="login" style="font-size:13px" v-if="currentUserInfo!==null">      
          <el-popover  
            placement="bottom"
            :title="currentUserInfo.user_name"
            width="100"
            trigger="click">
            <div>
              <el-button type="text" @click="toProfile">
                <i class="el-icon-postcard" ></i>
                个人信息
              </el-button>
              <el-button type="text" style="margin-left: 1px" @click="logout">
                <i class="el-icon-switch-button"></i>
                退出登录
              </el-button>
            </div>
            <el-button slot="reference" class="show">
              {{currentUserInfo.user_name}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
          </el-popover>
       </span>
       <span v-else>
         <el-button class="el-but" type="text" @click="loginFormVisible = true">登录</el-button>
          /
         <el-button class="el-but" type="text" @click="registerFormVisible = true">注册</el-button>
       </span>
    </span>
    
    <el-dialog title="登录" :visible.sync="loginFormVisible" center width="32%">
      <el-form :model="form">
        <el-form-item required label="用户名" :label-width="formLabelWidth">
          <el-input  v-model="form.name" name="username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item required label="密码" :label-width="formLabelWidth">
          <el-input placeholder="请输入密码" show-password v-model="form.password" name="password" type="password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="login">登 录</el-button>
      </div>
    </el-dialog>

    <el-dialog title="注册" :visible.sync="registerFormVisible" center width="35%">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item required label="用户名" prop="name" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item placeholder="请输入密码" show-password required label="密码" prop="pass" label-width="formLabelWidth">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item placeholder="请再次输入密码" show-password required label="确认密码" prop="checkPass" :label-width="formLabelWidth">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="dialog-footer">
          <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <ul>
      <li v-for="(item, index) in navList" :key="index">
        <a href="javascript:void(0);" @click="listClick(item)">{{item}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
  import { getUserInfo, setUserInfo } from '@/network/user.js';
  import { getCart } from '@/network/cart.js';
  import { getFavorite } from '@/network/favorite.js';
  import { mapGetters } from "vuex";
  import { format } from '@/common/utils.js';

  export default {
    name: 'RightShortCut',
    data () {
      var checkName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
        setTimeout(() => {
         callback();
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        currentUserInfo: JSON.parse(window.localStorage.getItem('user'))  === null ? null : JSON.parse(window.localStorage.getItem('user')),
        loginFormVisible: false,
        registerFormVisible: false,
        navList: ['我的订单', '购物车', '我的收藏'],
       
        form: {
          name: '',
          password: ''
        },
        formLabelWidth: '20%',
        ruleForm: {
          pass: '',
          checkPass: '',
          name: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          name: [
            { validator: checkName, trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      
      
    },
    methods: {
      listClick(item) {
        switch(item){
          case '我的订单':
            this.$router.push('/profile/order');
            break;
          case '购物车':
            this.$router.push('/profile/shopcart');
            break;    
          case '我的收藏':
            this.$router.push('/profile/favorites');
            break;   
            // default 
       }
      },
      login() {
        const username = this.form.name;
        const password = this.$md5(this.form.password);
        // console.log(password);
        getUserInfo(username, password).then(data => {
          // console.log(data);
          if(data.result.msg === '登陆成功') {
            let userInfo = data.result.userInfo;
            
            this.loginFormVisible = false;
            this.$message({
              message: '恭喜你，登录成功',
              type: 'success',
              center: true
            });
            let date = format(new Date());
            // console.log(date);
            getCart(userInfo.uid, date).then(data => {
              // console.log(data.result.cid);
              userInfo.cid = data.result.cid;
              getFavorite(userInfo.uid).then(data => {
                // console.log(data);
                userInfo.fid = data.result.content;
                window.localStorage.setItem('user', JSON.stringify(userInfo));
                setTimeout(() => {
                  this.$router.go(0);
                }, 3000)
              })
              
            })
            
          } else if (data.result.msg === '密码错误') {
            this.$message({
              message: '密码错误',
              type: 'warning'
            });
          }else {
            this.$message.error('该用户未注册，请先注册')
          }
          
        });
      },
      logout() {
        console.log('logout');
        window.localStorage.setItem('user', null);
        // this.$store.commit('LOGOUT');
        // this.$router.push('/');
        this.$router.go(0);
      },
      toProfile() {
        console.log('....');
        this.$router.push('/profile/user');
      },

      submitForm(formName) {
        this.registerFormVisible = false;
        const username = this.ruleForm.name;
        const password = this.$md5(this.ruleForm.pass);
        console.log(password);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('已提交注册');
            setUserInfo(username, password).then(res => {
              console.log(res);
              if(res.result.msg === '注册成功') {
               this.form.name = username;
               this.form.password = this.ruleForm.pass;
               this.login();
                
              } else if(res.result.msg === '该用户名已经存在') {
                // this.$message('用户已注册');
                this.$message({
                  message: '用户名已存在',
                  center: true
                })
              } else {
                this.$message.error({message: '注册发生错误', center: true});
              }
            })

          } else {
            console.log('error register!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    
    }
  }
</script>

<style  scoped>
  #right {
    width: 600px;
    color: #646464;
    font-size: 12px;
  }

  .welcome {
    /* display: block; */
    float: left;
    margin-top: -4px;
  }

  .el-but {
    font-size: 13px;
    color: red;
    margin-left: 0 !important;
  }

  .el-input {
    width: 240px;
  }

  .el-form {
    text-align: center;
    
  }

  .show {
    border: none;
  }

  ul {
    float: left;
    margin-left: 20px;
    height: 12px;
  }

  ul li {
    float: left;
   
  }

  ul li a {
    padding-right: 20px;
    margin-left: 20px; 
    border-right: 1px solid #c5c4c4;
    color: #646464;
  }

  ul li a:hover {
    color: red;
  }

  ul li:first-child a {
    border-left: 1px solid #c5c4c4;
    padding-left: 20px;
  }

  ul li:last-child a {
    border-right: none;
  }
</style>
