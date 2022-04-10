export default {
  cartLength(state) {
    return state.cartList.length;
  },
  cartList(state) {
    return state.cartList;
  },
  collectList(state) {
    return state.collectList;
  },
  collectLength(state) {
    return state.collectList.length;
  }
}
