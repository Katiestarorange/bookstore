<template>
  <div id="swiper">
    <el-carousel :interval="2000" @change="handleChange" :autoplay="!isHover" :initial-index="currentIndex" arrow="never" indicator-position="none" ref="carousel">
      <el-carousel-item v-for="(item, index) in bannerList" :key="index" name="index">
        <!-- <h3>{{ item }}</h3>       -->
        <img :src="item.pic" alt="" style="width: 100%; height: 100%;">
      </el-carousel-item>
    </el-carousel>
    <div class="text indicator" >
      <ul>
          <li v-for="(item, index) in bannerList" :key="index" 
          @mouseenter="clickChange(index)" 
          @mouseleave="isHover=false"
         >
            <a :class="{active: index===currentIndex}" href="javascript:void(0);"> {{item.title}}</a>
          </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { getSwiper } from '@/network/public.js';

  export default {
    name: 'Swiper',
    props: {
      banners: {
        type: Array,
        default() {
          return [11, 22, 33, 44]
        }
      },
      list: {
        type: Array,
        default() {
          return [
            {articleTitle: 'first'},
            {articleTitle: 'second'},
            {articleTitle: 'third'},
            {articleTitle: 'fourth'}
          ]
        }
      }
    },
    data () {
      return {
        currentIndex: 0,
        isHover: false,
        bannerList: []
      }
    },
    created() {
      getSwiper().then(data => {
        console.log(data);
        this.bannerList = data.result.content;
      })
    },
    methods: {
      handleChange(index){
        this.currentIndex = index;
      },
      clickChange(index) {
        this.isHover = true;
        this.currentIndex = index;
        this.$refs.carousel.setActiveItem(index);//调动setActiveItem方法，动态切换图片
        // this.articleTitle = this.list[index]["articleTitle"];
      }
    }
  }
</script>

<style  scoped>
  #swiper {
    position: relative;
    width: 990px;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .text {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 180px;
    z-index: 9;
    font-size: 12px;
  }

  .text li {
    margin-top: 3px;
  }

  .text li a{
    text-align: left;
    display: block;
    width: 100%;
    padding:10px 12px;
    background-color: rgba(240, 233, 233, 0.6);
    color: #666;
    line-height: 20px;
    /* text-align: center; */
  }

  .text li a.active {
    background-color: #fff;
    color: #505050;
  }

</style>
 