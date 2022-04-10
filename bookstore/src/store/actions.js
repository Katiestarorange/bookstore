import {ADD_COUNTER, ADD_TO_CART, REMOVE_FROM_CART, REMOVE_FROM_COLLECT, ADD_TO_COLLECT} from './mutition-types'

export default {
  addCart(context, payload) {
    // 对象解构法：context = {state, commit};
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.bid === payload.bid);
      if(oldProduct) {
        context.commit(ADD_COUNTER, oldProduct);
        resolve('商品数量+'+payload.num);
      }else {
        payload.count = 1;
        context.commit(ADD_TO_CART, payload);
        resolve('加入购物车成功');
      }
    })
  },
  removeFromCart(context, payload) {
    return new Promise((resolve, reject) => {
      let product = context.state.cartList.find(item => item.bid === payload.bid);
      context.commit(REMOVE_FROM_CART, product);
      resolve('成功把商品移出购物车');
    })
  },
  addCollect(context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.collectList.find(item => item.bid === payload.bid);
      if(oldProduct) {
        context.commit(REMOVE_FROM_COLLECT, payload);
        resolve('取消收藏成功');
      }else {
        payload.isCollect = true;
        context.commit(ADD_TO_COLLECT, payload);
        resolve('收藏成功');
      }
    })
  },
  removeFromCollect(context, payload) {
    return new Promise((resolve, reject) => {
      let product = context.state.collectList.find(item => item.bid === payload.bid);
      context.commit(REMOVE_FROM_COLLECT, product);
      resolve('取消收藏成功');
    })
  }
}
