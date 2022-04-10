import { request } from './request';

export function getReview(bid) {
  // console.log(bid);
  return request({
    url: '/review',
    params: {
      bid
    },
    method: 'get'
  })
}

export function addReview(reviewInfo) {
  return request({
    url: '/review/add',
    data: {
      reviewInfo
    },
    method: 'post'
  })
}

