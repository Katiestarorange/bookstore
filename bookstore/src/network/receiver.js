import { request } from './request';

export function getAllReceivers(uid) {
  return request({
    url: '/receiver',
    params: {
      uid
    }
  })
}

export function addReceiver(uid, receiver) {
  return request({
    url: '/receiver/add',
    method: 'post',
    data: {
      uid,
      receiver
    }
  })
}

export function updateReceiver(rid, rname, rphone, region, addr) {
  return request({
    url: '/receiver/update',
    method: 'post',
    data: {
      rid,
      rname, 
      rphone, 
      region, 
      addr
    }
  })
}