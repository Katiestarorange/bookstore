<template>
  <div id="user">
    <h3 class="title">个人信息</h3>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="昵称">
        <el-input v-model="form.user_name" style="width: 20%;"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.phone_number" style="width: 20%;"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
          <el-radio label="保密"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="生日">
        <el-date-picker :default-value="birthday" value-format="yyyy-MM-dd" type="date" placeholder="请选择日期" v-model="form.birthday" style="width: 20%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="所在地">
       <el-input v-model="form.address" placeholder="" style="width: 20%;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateInfo">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { updateUserInfo } from '@/network/user.js';

  export default {
    name: 'User',
    data () {
      return {
        form: JSON.parse(window.localStorage.getItem('user'))
      }
    },
    computed: {
      currentDate() {
        const date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let day = date.getDate();
        month = month > 9 ? month : '0'+month;
        day = day > 9 ? day : '0' + day;
        return `${year}-${month}-${day}`;
      },
      birthday() { 
        return this.form.birthday === null ? this.currentDate.split('-') : this.form.birthday.split('-');
      }
    },  
    created() {
      console.log(this.form);
    },
    methods: {
      updateInfo() {
        console.log(this.form);
        console.log('保存个人信息');
        // this.$store.commit('GET_USER', this.form);
        window.localStorage.setItem('user', JSON.stringify(this.form));
        updateUserInfo(
          this.form.uid,
          this.form.user_name,
          this.form.phone_number,
          this.form.address,
          this.form.sex,
          this.form.birthday).then(res => {
            console.log(res);
            this.$message({
            message: '保存成功',
            type: 'success'
          });
        })
      }
    }
  }
</script>

<style  scoped>
  #user {
    margin-left: 20px;
  }
  .title{
    margin-bottom: 20px;
  }
</style>
