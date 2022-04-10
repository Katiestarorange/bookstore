<template>
  <div id="short-cut">
      <div class="left">
        <left-short-cut></left-short-cut>
      </div>
      <div class="right">
        <right-short-cut> </right-short-cut>
      </div>
  </div>
</template>

<script>
  import LeftShortCut from '@/components/common/shortcut/LeftShortCut';
  import RightShortCut from '@/components/common/shortcut/RightShortCut';

  export default {
    name: 'ShortCut',
    components: {
      LeftShortCut,
      RightShortCut
    },
    data () {
      return {
        
      }
    }
  }
</script>

<style  scoped>
  #short-cut {
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
