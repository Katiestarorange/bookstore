<template>
  <div id="nav-main">
    <nav-swiper></nav-swiper>
    <div class="content">
      <div class="category-title">
        好书推荐
        <el-button @click.native="more" type="text" class="more">更多</el-button>
      </div>
      <div class="bookList">
          <el-card :body-style="{padding: 0}" class="item" shadow="hover" v-for="(item, index) in booklist" :key="index" @click.native="itemClick(index)">
              <img class="pic" :src="item.cover" :alt="item.cover">
              <div class="goods-info">
                <p class="title">{{item.book_name}}</p>
                <p class="author">{{item.author}}</p>
                <p class="price">￥{{ Number.parseFloat(item.price).toFixed(2) }}</p>     
            </div>
        </el-card>      
      </div>
    </div>
  </div>
</template>

<script>
  import NavSwiper from '@/views/home/childComps/navComps/NavSwiper';

  import { getAllBooks } from '@/network/book.js'

  export default {
    name: 'NavMain',
    components: {
      NavSwiper
    },
    data () {
      return {
        booklist: null
      }
    },
    created() {
      this.getAllBooks();
    },
    methods: {
      getAllBooks(){
        getAllBooks().then(res => {
          // console.log(res);
          this.booklist = res.result.content.slice(0, 8);
        })
      },
      itemClick(index) {
        // console.log(index);
        // console.log( this.booklist);
        this.$router.push({
          path: '/detail',
          query: {
            bid: this.booklist[index].bid
          }
        });
      },
      more() {
        this.$router.push('/more');
      }
    }
  }
</script>

<style  scoped>
  #nav-main {
    position: relative;
    left: 210px;
    width: 990px;
  }

  .content {
    position: relative;
    top: 40px;
    left: 20px;
  }

  .category-title {
    position: absolute;
    top: -50px;
    left: 0;
    width: 98%;
    font-size: 18px;
    font-weight: 700;
    border-bottom: 1px solid #ccc ;
  }

  .category-title .more {
    margin-left: 858px;
  }

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
