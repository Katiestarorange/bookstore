<template>
  <div id="good-item">
    <el-card :body-style="{ padding: '0px' }" shadow="never" style="border:0px">
      <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
      <p class="name">
        <a href="#" target="_blank">书名: 回到种子离去</a>
      </p>
      <p class="author"><a href="#" target="_blank">作者：加西亚·马尔克斯</a></p>
      <p class="price"><a href="#" target="_blank">价格：￥25.00</a></p>
      <slot name="cart"></slot>
      <slot name="collect"></slot> 
    </el-card>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        
      }
    }
  }
</script>

<style  scoped>
  #good-item {
    margin-bottom: 16px;
    padding: 10px;
    width: 150px;
    height: 250px;
    font-size: 14px;
  }

  p {
    margin-top: 5px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    height: 150px;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>
