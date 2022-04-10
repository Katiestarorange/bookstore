<template>
  <div id="app"  ref="app">
    <el-backtop></el-backtop> 
    <short-cut></short-cut>
    <header-area class="sticky-nav"></header-area>
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <foot-wrap></foot-wrap>
  </div>
</template>

<script>

  import ShortCut from './components/common/shortcut/ShortCut';
  import HeaderArea from '@/components/common/header/HeaderArea';
  import FootWrap from '@/components/common/footer/FootWrap';

  export default {
    name: 'app',
    components: {
      ShortCut,
      HeaderArea,
      FootWrap
    },

  }
</script>

<style>
  @import "assets/css/base.css";
  
  #app {
    height: 2000px;
  }

  .el-backtop {
    z-index: 999;
  }

  .sticky-nav {
    position: sticky;
    top: 0px;
    z-index: 99;
  }

</style>
