<template>
  <div id="nav-top">
    <div class="dropdown">
      <div class="dt">全部商品分类</div>
      <div class="dd">
        <ul>
          <li @mouseover="typeClick(index)" @mouseout="leave(index)" v-for="(item, index) in categoryList" :key="index">
            <div>
              <a href="javascript:void(0);">{{ item.type_name }}</a>
              <span v-show="isHover[index]"  class="arrow"></span>
            </div>
            
            <div v-show="isHover[index]" class="type-of-book">
              
                <div @click="itemClick(bookIndex)" class="book-item" v-for="(bookItem, bookIndex) in bookList" :key="bookIndex">
                  <a href="javascript:void(0);">
                    {{ bookItem.book_name }}
                  </a>
                </div>
            </div>
          </li>
          
        </ul>
      </div>
    </div>
    <!-- <div class="navitems">
      <ul>
        <li><a href="#">服装城</a></li>
        <li><a href="#">美妆馆</a></li>
        <li><a href="#">传智超市</a></li>
        <li><a href="#">全球购</a></li>
        <li><a href="#">闪购</a></li>
        <li><a href="#">团购</a></li>
        <li><a href="#">拍卖</a></li>
        <li><a href="#">有趣</a></li>
      </ul>
    </div> -->
  </div>
</template>

<script>
  import { getCategory, getTypeOfBooks } from '@/network/book.js';

  export default {
    name: 'NavTop',
    data () {
      return {
        categoryList: [],
        bookList: [],
        isHover: null
      }
    },
    created() {
      getCategory().then(res => {
        // console.log(res);
        this.categoryList = res.result.content;
        // console.log(this.categoryList);
        this.isHover = new Array(this.categoryList.length).fill(false);
      })
    },
    methods: {
      typeClick(index) {
        this.isHover[index] = true;
        // console.log(this.categoryList[index], this.isHover);
        getTypeOfBooks(this.categoryList[index].tid).then(data => {
          // console.log(data);
          this.bookList = data.result.content;
        })
      },
      leave(index) {
        this.isHover[index]=false;
        // console.log(this.isHover);
      },
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
  #nav-top {
    height: 47px;
    border-bottom: 2px solid rgb(75, 151, 250);

  }

  .dropdown {
    float: left;
    width: 210px;
    height: 45px;
    background-color: rgb(13, 109, 235);
  }
  .dropdown .dt {
    width: 100%;
    height: 100%;
    color: #fff;
    text-align: center;
    line-height: 45px;
    font-size: 16px;
    
  }

  .dropdown .dd {
    width: 210px;
    /* height: 300px; */
    background-color: rgb(75, 151, 250);
    margin-top: 2px;
    padding-bottom: 10px;
  }

  .dropdown .dd ul li {
    position: relative;
    height: 42px;
    line-height: 42px;
    margin-left: 2px;
    padding-left: 10px;
  }

  .dropdown .dd ul li::after {
    position: absolute;
    top: 1px;
    right: 10px;
    color: #fff;
    font-family: 'icomoon';
    content: '\e920';
    font-size: 16px;
  }

  .dropdown .dd ul li:hover {
    background-color: #fff;
  }

  .dropdown .dd ul li a {
    font-size: 16px;
    color: #fff;
  }

  .dropdown .dd ul li:hover a {
    color: rgb(75, 151, 250);
  }  

  .type-of-book {
    padding-top: 10px;
    position: relative;
    left: 200px;
    top: -150px;
    z-index: 99;
    width: 300px;
    /* height: 100px; */
    background-color: #fff;
    /* color: rgb(110, 160, 226); */
    border: 1px solid rgb(211, 207, 207);
    border-left: none;
    font-size: 14px;
  }

  .type-of-book a {
    color: rgb(75, 151, 250);
  }

  .type-of-book a:hover {
    color: red;
    text-decoration: underline;
  }

  .arrow {
    border: 0;
    border-left: 15px solid rgb(75, 151, 250);
    border-top: 12px solid transparent;
    width: 0;
    height: 0;
    border-bottom: 12px solid transparent;
    position: absolute;
    left: 210px;
    top: calc(50% - 11px);
    z-index: 100;
    opacity: .9;
  }

  .type-of-book .book-item {
    padding: 3px;
    /* padding-top: 15px; */
    margin-left: 30px;
    /* margin-bottom: 10px; */
    font-size: 14px;
  }

  .navitems {
    float: left;
    font-weight: 700;
  }

  .navitems ul li {
    float: left;
  }

  .navitems ul li a {
    display: block;
    height: 45px;
    line-height: 45px;
    font-size: 16px;
    padding: 0 25px;
  }

  .navitems ul li:hover a{
    color:rgb(75, 151, 250);
  }

</style>
