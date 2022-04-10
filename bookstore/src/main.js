import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from '@/router';
import store from '@/store';
import toast from '@/components/common/toast/index';
// 引入 dayjs （一个轻量的处理时间和日期的javascript库）
import dayjs from 'dayjs'
import WXConfig from '@/assets/js/sdk' // 微信分享
import md5 from 'js-md5';
Vue.prototype.$md5 = md5;
// 事件总线
Vue.prototype.$bus = new Vue();

Vue.prototype.dayjs = dayjs;

// 安装toast插件
Vue.use(toast);

Vue.prototype.WXConfig = WXConfig;
// Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
  router,
  store, // 挂载store,等同于 Vue.prototype.$store = store
  render: h => h(App),
}).$mount('#app')
