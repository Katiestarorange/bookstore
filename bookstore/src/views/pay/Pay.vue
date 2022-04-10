<template>
  <div id="pay">
    <h2>收银台</h2>
    <el-divider></el-divider>
    <el-descriptions title="" size="medium">
      <el-descriptions-item label="支付金额"><span style="color: red; font-size: 18px">￥{{ payment }}</span></el-descriptions-item>
      <el-descriptions-item label="订单号"><span style="color: rgb(0, 140, 255);">{{ order_number }}</span> </el-descriptions-item>
    </el-descriptions>
    <div style="margin-top: 100px; width: 800px; height: 200px; border: 1px solid #ddd">
      <h3>推荐扫码支付：</h3>
      <img src="" alt="二维码" style="margin-right: 20px"> 
      <i class="el-icon-full-screen"></i>
      <span>打开手机支付宝<br>扫一扫继续付款</span>
    </div>
  </div>
</template>

<script>
  import { addOrder, addGoodToOrder } from '@/network/order.js';

  export default {
    name: 'Pay',
    data () {
      return {
        payment: this.$route.params.payment
      }
    },
    computed: {
      order_number() {
        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth()+1;
        let date = now.getDate();
        let hour = now.getHours();
        let minute = now.getMinutes();
        let second = now.getSeconds();
        
        console.log(''+year+month+date+hour+minute+second);
        return ''+year+month+date+hour+minute+second;
      },
      datetime() {
        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth()+1;
        let date = now.getDate();
        let hour = now.getHours();
        let minute = now.getMinutes();
        let second = now.getSeconds();
        month = month > 9 ? month : '0'+month;
        date = date > 9 ? date : '0' + date;
        hour = hour > 9 ? hour : '0' + hour;
        minute = minute > 9 ? minute : '0' + minute;
        second = second > 9 ? second : '0' + second;
        return year+'-'+month+'-'+date+' '+hour+':'+minute+':'+second;
      }
    },
    created() {
      let goodList = this.$route.params.goodList;

      let orderInfo = {
        order_number: this.order_number,
        uid: JSON.parse(window.localStorage.getItem('user')).uid,
        datetime: this.datetime,
        payment: Number.parseFloat(this.payment),
        state: 0,
        expired: 1
      }
      // console.log(this.order_number);
      console.log(orderInfo);
      addOrder(orderInfo, goodList).then(data => {
        console.log(data.result.content);
        // let oid = data.result.content;
        // addGoodToOrder(oid, goodList).then(data => {
        //   console.log(data);
        // })
      })
    }
  }
</script>

<style  scoped>
  #pay {
    margin-top: 30px;
    width: 100%;

  }
  h2 {
    
    padding-left: 20px;
  }

  .el-divider {
    height: 3px;
    background-color: rgb(0, 140, 255);
  }

  .el-descriptions {
    font-size: 14px;
    
  }

  ::v-deep .el-descriptions__body {
    width: 800px;
    color: #000;
    background-color: rgb(229, 226, 226);
  }
</style>
