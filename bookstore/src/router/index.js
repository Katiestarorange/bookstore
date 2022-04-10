import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store"
import {
  Message
} from 'element-ui'

const Home = () => import('@/views/home/Home')
const Detail = () => import('@/views/detail/Detail')
const Category = () => import('@/views/category/Category')
const ShopCart = () => import('@/views/shopcart/ShopCart')
const Profile = () => import('@/views/profile/Profile')
const Order = () => import('@/views/profile/childComps/order/Order.vue')
const Favorites = () => import('@/views/profile/childComps/favorites/Favorites')
const User = () => import('@/views/profile/childComps/User')
const Settlement = () => import('@/views/settlement/Settlement')
const Pay = () => import('@/views/pay/Pay')
const NotFound = () => import('@/components/common/notFound/NotFound')
const login = () => import('@/components/content/login')
const MoreGoods = () => import('@/views/home/childComps/other/MoreGoods')


Vue.use(VueRouter);

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push;
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err);
}

const routes = [
  {
    path: '',
    redirect: '/home',
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/category',
    name: 'Category',
    component: Category,
    meta: {
      keepAlive: false
    }
  },

  {
    path: '/profile',
    component: Profile,
    name: 'Profile',
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      keepAlive: false
    },
    children: [
      {
        path: 'user',
        name: 'User',
        component: User,
        meta: {
          requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
          keepAlive: false
        }
      },
      {
        path: 'order',//以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
        name: 'Order',
        component: Order,
        meta: {
          requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
          keepAlive: false
        }
      },
      {
        path: 'favorites',
        name: 'Favorites',
        component: Favorites,
        meta: {
          requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
          keepAlive: false
        }
      },
      {
        path: 'shopcart',
        name: 'Shopcart',
        component: ShopCart,
        meta: {
          requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
          keepAlive: false
        }
      },
    ]
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail,
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/more',
    name: 'MoreGoods',
    component: MoreGoods,
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/settlement',
    name: 'Settlement',
    component: Settlement,
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/pay',
    name: 'Pay',
    component: Pay
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      keepAlive: false
    }
  },
  {
    path:'*',
    component: NotFound,
    meta: {
      keepAlive: false
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/bookstore',
  routes
})

// 注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
  const user = JSON.parse(window.localStorage.getItem('user'));
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (user) { // 通过vuex state获取当前的token是否存在
      // this.$router.push({path: to.fullPath})
      next()
    } else {
      console.log('该页面需要登陆');
      Message({
        message: '您还未登录',
        type: 'warning'
      });
      if(from.path !== '/home') {
        next('/');
      }
      // router.replace('/').catch(err => {
      //   console.log(err);
      // })
      // next('/');
      // query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      
    }
  } else {
    next()
  }
})


/*

登陆流程为：
1、提交登陆表单，拿到后台返回的数据
2、将数据存入vuex

用 router.beforeEach 来实现拦截登陆，
1、在需要验证的路由的 meta 里加入我们自己的 requireAuth
2、router.beforeEach 里通过 requireAuth 验证该组件是否需要登陆
3、验证 user 如果为 flase 就表示未登陆跳转到登录页
*/ 

export default router