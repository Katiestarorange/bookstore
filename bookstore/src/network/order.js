import { request } from './request.js';
import dayjs from 'dayjs';

export function getAllOrders(uid) {
  return request({
    url: '/order/get',
    params: {
      uid
    }
  })
}

export function getOrderGoodList(oid) {
  return request({
    url: '/order/getGood',
    params: {
      oid
    }
  })
}

export function deleteOrder(oid) {
  return request({
    url: '/order/delete',
    params: {
      oid
    }
  })
}

export function addOrder(orderInfo, goodList) {
  return request({
    url: '/order/addOrder',
    method: 'post',
    data: {
      orderInfo,
      goodList
    }
  })
}

export function addGoodToOrder(oid, goodList) {
  return request({
    url:'/order/addBook',
    method: 'post',
    data: {
      oid,
      goodList
    }
  })
}

export class Order {
  constructor(itemInfo) {
    // console.log(itemInfo);
    this.oid = itemInfo.oid;
    this.datetime = dayjs(itemInfo.datetime).format('YYYY-MM-DD HH:mm:ss');
    this.order_number = itemInfo.order_number;
    this.num = itemInfo.quanity;
    this.goodList = itemInfo.goodList;
    this.payment = itemInfo.payment;
    this.expired = itemInfo.expired;
    switch(itemInfo.state){
      case 0:
        this.status = '待付款';
        break;
      case 1:
        this.status = '待发货';
        break;
      case 2:
        this.status = '待收货';
        break;
    }
  }
}

