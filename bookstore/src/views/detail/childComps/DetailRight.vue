<template>
  <div id="detail-right">
    <h3 style="margin-bottom: 20px; margin-top: 40px;">{{book.book_name}}</h3>
    <p style="margin-bottom: 20px">{{book.author}} 著</p>
    <!-- <h4 style="margin-bottom: 10px; font-weight: 400">内容简要 </h4> -->
    <!-- <p style="margin-bottom: 20px; margin-left:5px; font-size: 14px">{{book.summary}}</p> -->
    <div class="price"><span style="margin-left: 20px;">价格 </span> <span style="margin-left: 10px;color: red; font-weight: 700; font-size: 16px"> ￥{{ price }}</span></div>
    <div style="margin-bottom: 50px; font-size: 14px; margin-left: 20px;"><span style="margin-right: 10px;">数量 </span> <el-input-number size="mini"  :min="1" v-model="num"></el-input-number></div>
    <el-button class="shopcart" @click.native="addToCart">加入购物车</el-button>
    <el-button class="buy" @click.native="toPay" type="primary" plain>立即购买</el-button>
  </div>
</template>

<script>
export default {
  name: 'DetailRight',
  props:{
    book: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  data () {
    return {
      num: 1,
      isLogin: false
    }
  },
  computed: {
    price() {
      // console.log(typeof(this.book.price));//number
      return Number.parseFloat(this.book.price).toFixed(2)
    }
  },
  created() {
    // console.log('3', this.book);
  },  
  mounted() {
    const user = JSON.parse(window.localStorage.getItem('user'));
    if(user === null) {
      this.isLogin = false;
    }else {
      this.isLogin = true;
    }
  },
  methods: {
    addToCart() {
      if(this.isLogin) {
        // this.num++;
        // console.log('num=', this.num);
        this.$emit('addCart', this.num);
      } else {
        const h = this.$createElement;
        this.$notify({
          title: '您还未登录',
          message: h('i', { style: 'color: teal'}, '请先登录再把宝贝加入购物车')
        });
      }
    },
    toPay(){
      this.book.num = this.num;
      console.log(this.book);
      this.$router.push({
        name: 'Settlement',
        params: {
          goodList: [this.book],
          money: this.num * this.book.price
        }
      });
    }
  }
}
</script>

<style  scoped>
  #detail-right {
    width: 500px;
    margin-top: 40px;
    margin-left: 100px;
    /* background-color: rgb(245, 240, 240); */
  }

  .price {
    margin-bottom: 20px;
    height: 50px; 
    font-size: 14px; 
    background-color: rgb(245, 240, 240);
    
    line-height: 50px;
  }

  .shopcart {
    margin-left: 30px;
  }

  .buy {
    margin-left: 60px;
  }
</style>
