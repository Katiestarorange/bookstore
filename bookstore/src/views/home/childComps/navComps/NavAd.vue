<template>
  <div id="ad">
    <el-card 
      shadow="hover" 
      v-for="(item, index) in adList" :key="index" 
      :body-style="{ padding: '0px' }"
      @mouseenter.native="item.show = true" 
      @mouseleave.native="item.show = false" >
        <el-popconfirm
          title="对此广告不感兴趣吗？"
          @confirm= "cancelCollect(index)">
          <el-button v-show="item.show" slot="reference" size="mini" class="delete" type="info" circle><i class="el-icon-close" style="font-size: 12px;"></i></el-button>
        </el-popconfirm>
      
      
        <img :src="item.url" class="image">
      
    </el-card>
  </div>
</template>

<script>
  import { getAd } from '@/network/public.js';

  export default {
    name: 'NavAd',
    data () {
      return {
        adList: []
      }
    },
    created() {
      getAd().then(data => {
        // console.log(data);
        
        // data.result.content.forEach(item => {
        //   item.show = false;
        // })
        this.adList = data.result.content;
        console.log(this.adList);
      })
    },
    methods: {
      cancelCollect(index) {
        this.adList.splice(index, 1);
      }
      // enter(index) {

      //   this.adList[index].show = true;
      //   console.log('enter: ', this.adList);
      // }
    }
  }
</script>

<style  scoped>
  #ad {
    position: relative;
    left: 0;
    top: -640px;
    /* background-color: pink; */
    width: 200px;
  }

  .el-card {
    margin-bottom: 20px;
    position: relative;
    
  }

  .el-card:hover {
    cursor: pointer;
  }

  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
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

  .delete {
    width: 18px;
    height: 18px;
    position: absolute;
    right: 0px;
    top: 0px;
    font-size: 15px;
    text-align: center;
    line-height: 15px;
    padding: 0;
  }

</style>
