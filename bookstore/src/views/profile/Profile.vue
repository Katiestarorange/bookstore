<template>
  <div id="profile">
    
    <el-row class="tac">
      <el-col :span="4">
        <h2 style="margin-bottom: 20px"><i class="el-icon-menu"></i> 功能选项</h2>
        <el-menu
          router
          :default-active="this.$route.path"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
          <template v-for="(item, index) in nav_menu_data">
            <el-menu-item :index = "item.path" :key = "index">
              <i :class="item.icon"></i>
              {{item.title}}
            </el-menu-item>
          </template>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <router-view></router-view>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  export default {
    name: 'Profile',
    data () {
      return {
        nav_menu_data: [
          {
            title: '基本信息',
            path: '/profile/user',
            icon: 'el-icon-document'
          },
          {
            title: '购物车',
            path: '/profile/shopcart',
            icon: 'el-icon-shopping-cart-2'
          },
          {
            title: '我的订单',
            path: '/profile/order',
            icon: 'el-icon-s-order'
          },
          {
            title: '我的收藏',
            path: '/profile/favorites',
            icon: 'el-icon-star-on'
          }                              
        ]

      }
    },
    computed: {
      currentUserInfo() {
        return this.$store.state.user
        //  === "null"
        //   ? null
        //   : JSON.parse(this.$store.state.user)
        }
    },
    methods: {
      
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style  scoped>
  #profile {
    width: 1200px;
  }

  .tac {
    margin-left: 28px;
    /* background-color: pink; */
  }

  
</style>
