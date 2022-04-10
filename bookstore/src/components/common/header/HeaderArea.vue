<template>
  <div id="header-area">
      <div class="left logo">
        <a href="javascript:void(0)" @click="toHome">
          <img src="@/assets/img/logo.png" alt="logo.png">
        </a>
      </div>
      <div class="center">
        <el-autocomplete
          v-model="inputData"
          :fetch-suggestions="querySearchAsync"
          placeholder="论语"
          @select="handleSelect"
          clearable
          @keyup.enter.native="search">
        </el-autocomplete>
        <el-button type="primary" @click.native="search">搜索</el-button>
      </div>
      <div class="right" @click="toCart">
        <el-badge :value="length" >
          <el-button size="medium" type="primary" plain><i class="el-icon-shopping-cart-2"></i> 购物车</el-button>
        </el-badge>
      </div>
  </div>    
</template>

<script>
  import { mapGetters } from 'vuex';
  import { getAllBooks } from '@/network/book.js';
  import { getAllItems } from '@/network/cart.js';

  export default {
    name: 'HeaderArea',
    components: {
      
    },
    data () {
      return {
        books: [],
        timeout:  null,
        inputData: '',
        length: 0
      }
    },
    computed: {
      ...mapGetters({
        // length: 'cartLength',
        // cartList: 'cartList'
      })
    }, 
    created() {
      this.getAllBooks();
      if(JSON.parse(window.localStorage.getItem('user'))) {
        getAllItems(JSON.parse(window.localStorage.getItem('user')).uid).then(data => {
          // console.log(data);
          this.length = data.result.content.length;
        })
      }
    },
    
    methods: {
       getAllBooks(){
        getAllBooks().then(res => {
          // console.log(res);
          for(let i of  res.result.content) {
            i.value =  i.book_name ;
          }
          this.books = res.result.content;
        })
      },

      // 页面跳转方法
      toHome() {
        this.$router.push('/home/');
      },
      toCart() {
        this.$router.push('/profile/shopcart');
      },
     
      // 输入框自动匹配方法
      querySearchAsync(queryString, cb) {
        this.queryString=queryString;
        // console.log(queryString);
        var books = this.books;
        this.results = queryString ? books.filter(this.createStateFilter(queryString)) : books;
        // console.log(this.results);

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(this.results);
        }, 1000 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
          // return state.book_name.indexOf(queryString) > -1;
        };
      },
      handleSelect(item) {
        console.log('item=',item);
        this.res = item ? null : item;
      },

      // 搜索功能
      search() {
        console.log(this.inputData);
        if(this.createStateFilter(this.inputData)) {
          let target = this.books.filter(this.createStateFilter(this.inputData))[0];
          
          console.log(target);
          this.$router.push('/detail/'+target.bid);
        } else {
          const h = this.$createElement;

          this.$notify({
            title: '未找到该图书',
            message: h('i', { style: 'color: teal'}, '抱歉，没有您要找的书')
          });
        }
        
      }
    },
  }
</script>

<style  scoped>
  #header-area {
    width: 1200px;
    margin: 0px auto;
    margin-top: 10px;
    display: flex;
    height: 100px;
    line-height: 100px;
    text-align: center; 
    background-color: #fff;
  }

  /* left part */
  .left{
    padding-top: 20px;
    width: 300px;
  }
  .item {
    margin-top: 10px;
    margin-right: 40px;
  }

  .logo img{
    width: 280px;
    height: 66px;
  }

  /* center part */
  .center {
    flex: 1;
  }

  .el-autocomplete {
    width: 350px;
    padding-left: 20px;
  }


  /* right part */
  .right {
    width: 300px;
  }

  .item {
    margin-top: 10px;
    margin-right: 20px;
  }

  .el-button {
    border-radius: 0;
  }

  ::v-deep .el-input__inner {
    border-radius: 0;
  }

  ::v-deep .el-badge__content.is-fixed {
    top: 28px;
  }

</style>
