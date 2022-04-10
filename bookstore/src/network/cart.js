import { request } from './request';

export function getAllCarts() {
  return request({
    url: '/cart'
  })
}

// 获取用户购物车，返回cid
export function getCart(uid, datetime) {
  return request({
    url: '/cart/get',
    params: {
      uid,
      datetime
    }
  })
}


export function addCart(bid, uid, quanity) {
  return request({
    url: '/cart/add',
    data: {
      bid,
      uid,
      quanity
    },
    method: 'post'
  })
}

export function getAllItems(uid) {
  return request({
    url: '/cart/items',
    params: {
      uid
    }
  })
}

export function deleteCart(bid, uid) {
  return request({
    url: '/cart/delete',
    params: {
      bid,
      uid
    }
  })
}

export function changeQuanity(bid, uid, quanity) {
  return request({
    url: '/cart/change',
    params: {
      bid,
      uid,
      quanity
    }
  })
}