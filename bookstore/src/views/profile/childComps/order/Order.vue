<template>
  <div id="order">
    <h3 style="font-weight: 400; margin-bottom: 20px">我的订单</h3>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick(activeName)">
      <el-tab-pane v-for="(item, index) in tabPanes" :key="index" :name="item.name">
        <span slot="label"> {{ item.label }}</span>
        <tab-content :allOrders="allOrders" :orders="orderList"></tab-content>
      </el-tab-pane>
    </el-tabs>
    <div class="search">
      <el-input clearable size="small" @change="searchOrder(input)" placeholder="订单号/商品名称" v-model="input" class="input">
        <el-button @click="searchOrder(input)" slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
  </div>
</template>

<script>
  import TabContent from '@/views/profile/childComps/order/childComps/TabContent';
  import { getAllOrders, Order, getOrderGoodList } from '@/network/order.js';

  export default {
    name: 'Order',
    components: {
      TabContent
    },
    data () {
      return {
        user: JSON.parse(window.localStorage.getItem('user')),
        activeName: 'allOrders',
        input: '',
        tabPanes: [
          {
            name: 'allOrders',
            label: '所有订单'
          },
          {
            name: 'pendingPayment',
            label: '待付款'
          },
          {
            name: 'toBeDelivered',
            label: '待发货'
          },
          {
            name: 'pendingReceipt',
            label: '待收货'
          }
        ],
        orderList: [],
        allOrders: []
      }
    },
    created() {
      getAllOrders(this.user.uid).then(data => {
        // console.log(data);
        // this.orderList = data.result.content.map( item => {
        //   new Promise((resovle, reject) => {
        //     getOrderGoodList(item.oid).then(data => {
        //       // console.log(data);
        //       item.goodList = data.result.content;
        //       resovle(item);
        //     })
        //   }).then(item => {
        //     // console.log(item);
        //     console.log(new Order(item));
        //     return new Order(item);
        //   })
        // })
        for(let i of data.result.content) {
          getOrderGoodList(i.oid).then(async data1 => {
            // console.log(data1);
            i.goodList =await data1.result.content;
            // console.log(i);
            this.orderList.push(new Order(i));
            this.allOrders.push(new Order(i));
          })
        }
        // console.log('orderList:',this.orderList);
      })
    },
    methods: {
      handleClick(activeName) {
        // console.log(activeName);
        switch(activeName) {
          case 'allOrders':
            this.orderList = this.allOrders;
            break;
          case 'pendingPayment':
            this.orderList = this.allOrders.filter(item => item.status === '待付款');
            break;
          case 'toBeDelivered':
            this.orderList = this.allOrders.filter(item => item.status === '待发货');
            break;    
          case 'pendingReceipt':
            this.orderList = this.allOrders.filter(item => item.status === '待收货');
            break;     
        }
      },
      searchOrder(value) {
        // console.log(typeof(value));
        // console.log(typeof(this.allOrders[0].order_number));
        // this.orderList = [];
        // for(let item of this.allOrders) {
        //   console.log(item.order_number );
        //   if(item.order_number === value) {
        //     this.orderList.push(item);
        //   }
        // }
        this.orderList = this.allOrders.filter(item => item.order_number === value);
        // console.log(this.orderList);
      }
    }
  }
</script>

<style  scoped>
  #order {
    position: relative;
    margin-left: 10px;
  }

  .search {
    position: absolute;
    top: 40px;
    right: 10px;
  }

  .search .el-input {
    width: 280px;
  }
</style>
