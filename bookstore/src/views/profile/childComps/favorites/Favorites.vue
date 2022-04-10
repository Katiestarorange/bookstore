<template>
  <div id="favorites">
    <div v-if="length === 0" class="empty">
      <i class="el-icon-star-off collect"></i>
      <p>您暂未收藏任何商品~</p>
      <el-button @click.native="$router.push('/')" type="text" class="shopping">去购物<i class="el-icon-arrow-right"></i> </el-button>
    </div>
   <div v-else >
      <el-row>
        <el-col :span="4" v-for="(item, index) in collectList" :key="index" :offset="index > 0 ? 2 : 0">
          <el-card  :body-style="{ position: 'relative', padding: '0px', width: '160px', height: '200px' }" shadow="hover" @mouseenter.native="item.show = true" @mouseleave.native="item.show = false">
            <el-popconfirm
              title="确定把商品移出收藏吗？"
              @confirm= "cancelCollect(index)"
            >
            <el-button v-show="item.show" slot="reference" size="mini" class="delete" type="info" circle><i class="el-icon-close" style="font-size: 12px;"></i></el-button>
            </el-popconfirm>
            
            <el-button v-show="item.show" @click="toBuy(index)" size="medium" class="buy" type="text">去购买</el-button>
            <img @click="toBuy(index)"  :src="item.cover" class="image">
            <div @click="toBuy(index)"  style="padding: 14px;">
              <p style="height: 28px; font-size: 14px">{{ item.book_name }}</p>
              <div class="bottom clearfix">
                <span style="color: red; margin-top: 10px">￥{{ Number.parseFloat(item.price).toFixed(2) }}</span>
                
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>  
   </div>
  </div>
</template>

<script> 
  import { getFavoriteGoods, deleteFavorite } from '@/network/favorite.js';

  export default {
    name: 'Favorites',
    data () {
      return {
        collectList: []
      }
    },
    computed: {
      length() {
        return this.collectList.length;
      }
      // ...mapGetters({
      //   length: 'collectLength',
      //   collectList: 'collectList'
      // })
    },
    created() {
      // console.log(JSON.parse(window.localStorage.getItem('user')));
      getFavoriteGoods(JSON.parse(window.localStorage.getItem('user')).uid).then(data => {
        console.log('获取收藏所有的商品；', data);
        this.collectList = data.result.content;
        this.collectList.forEach(item => {
          item.show = false;
        })
        // console.log(this.collectList);
      })
    },
    methods: {
      cancelCollect(index) {
        // this.removeFromCollect(this.collectList[index]).then(res => {
        //   console.log(res);
        // })
        deleteFavorite(this.collectList[index].bid, JSON.parse(window.localStorage.getItem('user')).uid).then(data => {
          console.log('移出收藏：', data);
          this.$router.go(0);
        })
      },
      toBuy(index) {
        const bid = this.collectList[index].bid;
        this.$router.push({
          path: '/detail',
          query: {
            bid: bid
          }
        });
      }
    }
  }
</script>

<style  scoped>
  #favorites {
    margin-left: 10px;
  }

  .el-card {
    height: 280px;
  }

  .buy {
    position: absolute;
    left: 15px;
    bottom: 40px;
    width: 80%;
    text-align: center;
    background-color: #C62E2D;
    opacity: .8;
    color: #fff;
    font-size: 14px;
  }

  .delete {
    width: 18px;
    height: 18px;
    position: absolute;
    right: 3px;
    top: -12px;
    font-size: 15px;
    text-align: center;
    line-height: 15px;
    padding: 0;
  }

  .empty {
    padding-top: 120px;
    text-align: center;
    
    font-size: 16px;
  }

  .empty .collect{
    margin-bottom: 10px;
    font-size: 80px;
    color: #ccc;
  }

  .shopping:hover {
    text-decoration: none;
  }

  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 20px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 80%;
    height:80%;
    display: block;
    margin-left: 15px;
    margin-top: 15px;
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
