<template>
  <div id="detail">
    <el-backtop></el-backtop>
    <el-row>
      <el-col :span="8">
        <detail-left @share="share" :book="book"  @removeFromCollect="removeFromCollectList" @addToCollect="addToCollectList"></detail-left>
      </el-col>
      <el-col :span="16">
        <detail-right :book="book" @addCart="addToCart" ></detail-right>
      </el-col>
    </el-row>
    <detail-more @recommend="recommend" :length="length" :book="book"></detail-more>
  </div>
</template>

<script>
  import DetailLeft from '@/views/detail/childComps/DetailLeft';
  import DetailRight from '@/views/detail/childComps/DetailRight';
  import DetailMore from '@/views/detail/childComps/DetailMore';

  import { getDetailData, Goods } from '@/network/book.js';
  import { addCart } from '@/network/cart.js';
  import { getFavoriteGoods, addFavorite, deleteFavorite } from '@/network/favorite.js';
  import { getReview, addReview } from '@/network/review.js';

  // import { mapActions } from 'vuex';

  export default {
    name: 'Detail',
    components: {
      DetailLeft,
      DetailRight,
      DetailMore
    },
    data () {
      return {
        bid: null,
        book: {},
        user: null,
        length: null,
        imgLength: null,
        user: null
      }
    },
    created() {
      this.user = JSON.parse(window.localStorage.getItem('user'));
      this.bid = this.$route.query.bid;
      this.getDetailData(this.bid);
      getReview(this.bid).then(data => {
        // console.log(data);
        this.book.reviews = data.result.content;
        // console.log(this.book.reviews.length);
        this.length = this.book.reviews.length;
      })
    },
    beforeMount() {
      // this.$router.go(0)
    },
    methods: {
      share() {
        // console.log(this.user);
        // console.log(this.WXConfig);
        if(!this.user) {
          this.$message({
            showClose: true,
            message: '您还未登录，请先进行登录或者注册',
            type: 'warning'
          });
        }else {
          let url = window.location.href.split('#')[0];
          // console.log(url);
          let obj = {
            title: this.user.user_name,		//分享标题
            desc: this.book.book_name,						//分享内容
            linkurl: location.protocol+"//"+location.host+'/dist/#/show?bid=' + this.bid,//分享链接
            img: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",				//分享内容显示的图片
          }
          this.WXConfig.getJSSDK(url, obj);
        }
        
      },
      // ...mapActions(['addCart', 'addCollect', 'removeFromCollect']),
     recommend(score, content) {
       let date = this.dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss');
      console.log(date);

      this.dialogFormVisible = false;
      let reviewInfo = {
        bid: this.book.bid,
        uid: this.user.uid,
        user_name: this.user.user_name,
        score: score,
        content: content,
        date: date
      }
      addReview(reviewInfo).then(data => {
        // console.log(data);
        this.$message({
          message: '评论成功',
          type: 'success'
        })
        this.$router.go(0);
      })
     },
      getDetailData(bid) {
        getDetailData(bid).then(data => {
          console.log(data);
          // 获取商品信息
          this.book = data.result.content;
          this.imgLength = this.book.imgs.length;
          this.$bus.$emit('getImgs', this.book.imgs);
          // console.log('2', this.book);
          getFavoriteGoods(this.user.uid).then(data => {
            // console.log('获取用户的收藏：', data);
            let flag = false;
            let favorites = data.result.content;
            for(let k in favorites) {
              if(favorites[k].bid == this.bid){
                flag = true;
              }
            }
            // console.log(flag);
            this.book.isFavorited = flag;
            
          })
          // console.log('1', this.book);
        })
      },
      addToCart(num) {
        // console.log(Number.parseInt(this.bid));
        // console.log(num);
        addCart(Number.parseInt(this.bid), this.user.uid, num).then(data => {
          console.log('添加购物车：',data);
          
          this.$message({
            message: data.result.msg,
            type: 'success'
          });
          this.$router.go(0);
        })
        // 1. 获取购物车需要展示的信息
        // const product = {};
        // product.title = this.book.title;
        // product.img = this.book.cover;
        // product.price = this.book.price;
        // product.bid = this.bid;
        // product.num = num;
        // product.money = num * this.book.price;
        // console.log(product);

        // // 2. 将商品添加到购物车
        // this.addCart(product).then(res => {
        //   this.$message({
        //     message: res,
        //     type: 'success'
        //   });
        // })
      },
      addToCollectList() {
        addFavorite(Number.parseInt(this.bid), this.user.uid).then(data => {
          console.log('添加收藏：', data);
          this.$message({
            message: data.result.msg,
            type: 'success'
          });
          this.$router.go(0);
        })
        // const product = {};
        // product.img = this.book.cover;
        // product.title = this.book.title;
        // product.price = this.book.price;
        // product.show = false;
        // product.bid = this.bid;
        // product.isActive = isActive;
        // // console.log(product);

        // this.addCollect(product).then(res => {
        //   this.$message({
        //     message: res,
        //     type: 'success'
        //   });
        //   // console.log(this.$store.state.collectList);
        // })
      },
      removeFromCollectList() {
        deleteFavorite(Number.parseInt(this.bid), this.user.uid).then(data => {
          console.log('移出收藏：', data);
          this.$message({
            message: data.result.msg,
            type: 'success'
          });
          this.$router.go(0);
        })
      }
    }  
  }
</script>

<style  scoped>
  #detail {
    position: relative;
    height: 100%;
    margin-left: 50px;
  }



  .top {
    position: absolute;
    top: 48px;
  }

  .top-right {
    left: 450px;
  }



</style>
