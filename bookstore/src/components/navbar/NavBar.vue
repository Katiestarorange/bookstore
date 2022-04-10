<template>
  <div class="nav-bar">
    <div class="left"><slot name="left">1</slot></div>
    <div class="right"><slot name="right">2</slot></div>
  </div>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped>
  .nav-bar {
    width: 1200px;
    height: 34px;
    line-height: 34px;
    margin: 0 auto;
    text-align: center;
    background-color: #f9f9f9;   
    border-bottom: 1px solid #f2f2f2;
  }
  .left {
    float: left;
    /* background-color: rgb(168, 235, 129); */
  }
  .right{
    float: right;
    /* background-color: rgb(230, 121, 252); */
  }
</style>
