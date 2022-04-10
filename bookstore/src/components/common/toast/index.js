import Toast from "./Toast";

const obj = {}

obj.install = function (Vue) {
  // 1. 创建组件构造器
  const toastContrustor = Vue.extend(Toast);

  // 2. new的方式，根据组件构造器可以创建出来一个组件对象
  const toast = new toastContrustor();

  // 3. 将组件对象，挂载dom, 手动挂载到某一个元素上
  toast.$mount(document.createElement('div'));

  // 4. toast.$el对应的就是div，添加到body后面
  document.body.appendChild(toast.$el);

  // 5. 给vue原型添加Toast对象
  Vue.prototype.$toast = toast;

}

export default obj;
