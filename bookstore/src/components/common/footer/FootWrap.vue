<template>
  <div class="foot-wrap">
    <el-divider></el-divider>
    <div class="foot-pic">
      <a href="#" class="foot-pic01" target="_blank"></a>
      <a href="#" class="foot-pic02" target="_blank"></a>
      <a href="#" class="foot-pic03" target="_blank"></a>
      <a href="#" class="foot-pic04" target="_blank"></a>
    </div>

    <div class="foot-text">
      <p class="text-content">京公网安备 11010202007572号 丨 京ICP证 京B2-20171652号 丨  京ICP备16042375号-2</p>
      <p class="text-content">出版物经营许可证 新出发 京批字第直200352号 丨 广播电视节目制作经营许可证 （京）字第07439号</p>
      <p class="text-content">网视备（京）02021000046-1号</p>
      <p class="text-content">营业执照 丨 网络出版服务许可证 （京）字第290号</p>
      <p class="text-content">Copyright © 2021 - 2022 橙星电子商务有限责任公司 版权所有</p>
      <p class="text-content">客服热线：4006666505</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FootWrap',
    data () {
      return {

      }
    }
  }
</script>

<style  scoped>
  .foot-wrap {
    position:relative;
    top: 550px;
    margin-top: 100px;
    float: left;
    background-color: #f5f5f5;
    height: 320px;
    width: 100%;
  }

  .el-divider {
    /* background-color: rgb(75, 151, 250); */
    background-color: #ccc;
    height: 2px;
    margin-bottom: 10px;
    margin-top: 0;
  }

  .foot-pic {
    padding: 5px 0 5px 30px;
    margin-left: 220px;
    height: 52px;
    /* background: url("../../../assets/img/footer_bg.png") no-repeat; */
  }

  .foot-pic a {
    display: block;
    width: 187px;
    height: 52px;
    float: left;
    padding: 7px 0 7px 48px;
  }

  .foot-pic01 {
    background: url("../../../assets/img/footer_bg.png") no-repeat;
  }

  .foot-pic02 {
    background: url("../../../assets/img/footer_bg.png") no-repeat;
    background-position: 0px -52px;
  }

  .foot-pic03 {
    background: url("../../../assets/img/footer_bg.png") no-repeat;
    background-position: 0px -104px;
  }

  .foot-pic04 {
    background: url("../../../assets/img/footer_bg.png") no-repeat;
    background-position: 0px -155px;
  }  


  .foot-text {
    margin-top: 35px;
    padding-top: 10px;
    font-size: 12px;
    font-weight:700;
    color: rgb(153, 153, 153);
  }

  .text-content {
    text-align: center;
    line-height: 26px;
  }

</style>
