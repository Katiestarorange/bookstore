import {ADD_COUNTER, ADD_TO_CART, REMOVE_FROM_CART, REMOVE_FROM_COLLECT, ADD_TO_COLLECT} from './mutition-types'

export default  {
  [ADD_COUNTER](state, payload) {
    payload.count++;
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = true;
    state.cartList.push(payload);
    // window.localStorage.setItem('cartList', JSON.stringify(state.cartList));
  },
  [REMOVE_FROM_CART](state, payload) {
    payload.checked = false;
    let index = state.cartList.findIndex(item =>{
      if(item.bid == payload.bid){
        return true;
      }
    })
    state.cartList.splice(index, 1);
  },
  [REMOVE_FROM_COLLECT](state, payload) {
    // payload.isCollect = false;
    // state.collectList.pop();
    let index = state.collectList.findIndex(item =>{
      if(item.bid == payload.bid){
        return true;
      }
    })
    state.collectList.splice(index, 1);
  },
  [ADD_TO_COLLECT](state, payload) {
    state.collectList.push(payload);
  }
}
