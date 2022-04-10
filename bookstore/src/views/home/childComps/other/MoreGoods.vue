<template>
  <div>
    <h3 style="margin-left: 20px; margin-top: 20px;">全部商品</h3>
    <div class="bookList">
      <el-card :body-style="{padding: 0}" class="item" shadow="hover" v-for="(item, index) in bookList" :key="index" @click.native="itemClick(index)">
        <img class="pic" :src="item.cover" :alt="item.cover">
        <div class="goods-info">
          <p class="title">{{item.book_name}}</p>
          <p class="author">{{item.author}}</p>
          <p class="price">￥{{ Number.parseFloat(item.price).toFixed(2) }}</p>     
      </div>
    </el-card>      
      </div>
  </div>
</template>

<script>
  import { getAllBooks } from '@/network/book.js'
  export default {
    name: 'MoreGoods',
    data () {
      return {
        bookList: []
      }
    },
    created() {
      getAllBooks().then(res => {
        // console.log(res);
        this.bookList = res.result.content;
      })
    },
    methods: {
      itemClick(index) {
        // console.log(index);
        // console.log( this.booklist);
        this.$router.push({
          path: '/detail',
          query: {
            bid: this.bookList[index].bid
          }
        });
      }
    }
  }
</script>

<style  scoped>
  .bookList {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-top: 20px;
  }

  .bookList .item {
    width: 225px;
    height: 320px;
    padding: 20px;
    margin-right: 10px;
    margin-bottom: 10px;
    text-align: center;
  }

  .bookList .item:hover {
    cursor: pointer;
  }
  
  .bookList .item .pic {
    width: 180px;
    height: 180px;
  }

  .goods-info {
    margin-top: 5px;
  }

  .goods-info p {
    font-size: 14px;
    text-align: left;
    margin-top: 5px;
    padding-bottom: 5px;
  }

  .title {
    padding-top: 15px;
    margin-bottom:2px;
    padding-bottom: 10px;
    height: 50px;
  }

  .title:hover {
    color: red;
    text-decoration: underline;
  }

  .author {
    height: 25px;
  }

  .price {
    color:red;
  }
  
</style>
