import { request } from './request';

export function getAllBooks() {
  return request({
    url: '/book'
  })
}

export function getTypeOfBooks(tid) {
  return request({
    url: '/book/type',
    params: {
      tid
    }
  })
}

export function getDetailData(bid) {
  return request({
    url: '/book/detail',
    params: {
      bid
    }
  })
}


export function getRecommend() {
  return request({
    url: '/book/recommend'
  })
}

export function getCategory() {
  return request({
    url: '/book/category'
  })
}

export class Goods {
  constructor(itemInfo) {
    this.title = itemInfo.book_name;
    this.cover = itemInfo.cover;
    this.author = itemInfo.author;
    this.summary = itemInfo.summary;
    this.price = itemInfo.price;
    this.imgs = itemInfo.imgs;
  }
}


