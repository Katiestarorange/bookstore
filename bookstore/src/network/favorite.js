import { request } from './request';

export function getFavorite(uid) {
  return request({
    url: '/favorite',
    params: {
      uid
    }
  })
}

export function getFavoriteGoods(uid) {
  return request({
    url: '/favorite/get',
    params: {
      uid
    }
  })
}

export function addFavorite(bid, uid) {
  return request({
    url: '/favorite/addFavorite',
    method:'POST',
    data: {
      bid,
      uid
    }
  })
}

export function deleteFavorite(bid, uid) {
  return request({
    url: '/favorite/deleteFavorite',
    params: {
      bid,
      uid
    }
  })
}