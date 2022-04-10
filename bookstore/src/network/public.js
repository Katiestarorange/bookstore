import { request } from './request';

// 获取图片
export function getBookCover(cover) {
  return request({
    url: '/public/img/'+cover
  })
}

export function getSwiper() {
  return request({
    url: '/public/swiper',
  })
}

export function getAd() {
  return request({
    url: '/public/ad',
  })
}