import { request } from './request';

export function getUserInfo(username, password) {
  // console.log(typeof username);
  return request({
    url: '/user/login',
    params: {
      username, 
      password
    },
    method: 'get'
  })
}

export function setUserInfo(username, password) {
  return request({
    url: '/user/register',
    data: {
      username, 
      password
    },
    method: 'post'
  })
}

export function updateUserInfo(uid,username, phone,address,sex,birthday) {
  return request({
    url: '/user/update',
    data: {
      uid,
      username, 
      phone,
      address,
      sex,
      birthday
    },
    method: 'post'
  })
}
