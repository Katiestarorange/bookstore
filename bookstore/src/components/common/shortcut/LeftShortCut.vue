<template>
  <div id="left">
    <a href="javascript:void(0);" id="area" @mouseover="isShow=true" @mouseout="isShow=false">
      送至: 
      <span class="current_area" :class="{active: isShow}">{{areas[currentIndex]}}</span>
    </a>
    <ul v-show="isShow"  @mouseover="isShow=true" @mouseout="isShow=false">
      <li v-for="(item, index) in areas" :key="index" >
        <a href="javascript:void(0)"  @click="changeArea(index)">
          {{item}}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'LeftShortCut',
    data () {
      return {
        areas: [
          '北京', 
          '天津', 
          '河北', 
          '山西', 
          '内蒙古', 
          '辽宁',
          '吉林',
          '上海',
          '江苏', 
          '黑龙江', 
          '浙江',
          '安徽',
          '福建',
          '江西',
          '山东',
          '河南',
          '湖北',
          '湖南',
          '广东',
          '广西',
          '海南',
          '重庆',
          '四川',
          '贵州',
          '云南',
          '西藏',
          '陕西',
          '甘肃',
          '青海',
          '宁夏',
          '新疆',
          '台湾',
          '香港',
          '澳门',
          '钓鱼岛'
        ],
        isShow: false,
        currentIndex: 0
      }
    },
    methods: {
      changeArea(index){
        this.currentIndex= index;
      }
    }
  }
</script>

<style  scoped>
  #left {
    position: relative;
    margin-top: 2px;
    z-index: 999;
  }

  a {
    text-decoration: none;
    color: #646464;
    font-size: 12px;
  }

  #area {
    position: absolute;
    width: 100px;
    left: 10px;
    padding: 7px 0;
    font-size: 12px;
    line-height: 12px;
  }

  #area:hover {
    background-color: #fff;
    border: 1px solid #e6e6e6;
    border-bottom: 1px solid transparent;
  }
  .current_area {
    padding-left: 5px;
  }

  .current_area::after {
    font-family: 'icomoon';
    content: '\e91b';
    padding-top: 5px;
    color: #646464;
  }

  .active::after  {
    font-family: 'icomoon';
    content: '\e926';
    padding-top: 5px;
    color: #646464;
  }

  ul {
    width: 300px;
    /* height: 100px; */
    position: absolute;
    left: 10px;
    top: 25px;
    padding: 3px 0;
    border: 1px solid #e6e6e6;
    z-index: 999;
    background-color: #fff;
  }

  li {
    float: left;
    margin-left: 28px;
    list-style-type: none;
  }

  ul li a:hover {
    color: red;
    cursor: pointer;
  }
</style>
