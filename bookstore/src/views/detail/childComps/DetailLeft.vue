<template>
  <div>
    <detail-swiper :bookCover="book.cover"></detail-swiper>
    <div class="other">
      <el-button @click="share" type="text"><i class="el-icon-share"></i> 分享</el-button>
      <el-button v-if ="!book.isFavorited" type="text" @click="addToCollectList">
        <span><i class="el-icon-star-off"></i> 收藏宝贝</span>
      </el-button>
      <el-button v-else type="text" @click="removeFromCollectList">
        <span><i class="el-icon-star-on"></i> 取消收藏</span>
      </el-button>
    </div>
  </div>
</template>

<script>
  import DetailSwiper from '@/views/detail/childComps/DetailSwiper';
  
  export default {
    name: 'DetalLeft',
    components: {
      DetailSwiper
    },
    props: {
      book: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data () {
      return {
        isLogin: false,
        isFavorited: false
      }
    },
    computed: {
      
    },
    created() {
      this.isFavorited = this.book.isFavorited;
      // console.log(this.isFavorited);
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
      share() {
        this.$emit('share');
      },
      addToCollectList() {
        // console.log(this.book);
        // console.log(this.isFavorited);
        if(this.isLogin) {
          // this.book.isFavorited = 1;
          // console.log(this.isActive);
          this.$emit('addToCollect');
        } else {
          const h = this.$createElement;
          this.$notify({
            title: '您还未登录',
            message: h('i', { style: 'color: teal'}, '请先登录再收藏宝贝')
          });
        }

      },
      removeFromCollectList() {
        this.$emit('removeFromCollect');
      }
    }
  }
</script>

<style  scoped>
  .other {
    margin-top: 20px;
  }


</style>
