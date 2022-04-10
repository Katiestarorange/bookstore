<template>
  <div id="tab-content">
    <el-table
      :header-cell-style="{color: '#666', background: '#F5F5F5'}" 
      style="width: 100%; font-size: 14px"
      :cell-style="cellStyle"
      :data="orderList"
      :default-sort = "{prop: 'datetime', order: 'descending'}">
      <el-table-column
        align="left">
        <template slot="header">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              {{ selectedMenuItem.value }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="menuItemClick(index, dropMenu); filterHandler(item)" v-for="(item, index) in dropMenu" :key="index">{{ item.value }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span style="width: 400px">商品信息</span>
        </template>
        <template slot-scope="scope"> 
          <el-descriptions class="order-title" size="small">
            <el-descriptions-item label="下单时间">{{ scope.row.datetime }}</el-descriptions-item>
            <el-descriptions-item label="订单号">{{scope.row.order_number}}</el-descriptions-item>
            <el-descriptions-item label="商家">贴贴网上书城</el-descriptions-item>
          </el-descriptions>
          <div v-for="(item, index) in scope.row.goodList" :key="index" class="order-info">
            <div class="good-img"><img :src="item.cover" alt=""></div>
            <div class="good-title">{{ item.book_name }}</div>
            <div class="good-price">￥{{ Number.parseFloat(item.price).toFixed(2) }}</div>
            <div class="good-count">x{{ item.num }}</div>
          </div>
        </template>

      </el-table-column>
      <el-table-column
        label="实付款(元)"
        width="120">
        <template slot-scope="scope">
          <div class="order-price"><span style="color: red">￥{{ Number.parseFloat(scope.row.payment).toFixed(2) }} </span><br> 含运费：￥{{ Number.parseFloat(freight).toFixed(2) }}</div>
        </template>
      </el-table-column>
      <el-table-column
        align="left"
        width="120">
        <template slot="header" slot-scope="scope">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              {{ selectedStatusItem.value }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="menuItemClick(index, statusMenu); filterMethod(item)" v-for="(item, index) in statusMenu" :key="index">{{ item.value }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template slot-scope="scope">
          {{ scope.row.status }}
          <!-- <br>
          <el-button type="text">订单详情</el-button> -->
        </template>
      </el-table-column>
      <el-table-column
        label="交易操作"
        width="120">
        <template slot-scope="scope">
          <div v-if="scope.row.expired===1">
            <el-button
              size="mini"
              @click="handlePay(scope.$index, scope.row)">支付</el-button>
            <el-dialog
              title="支付"
              :visible.sync="dialogVisible"
              width="30%"
              :before-close="handleClose">
              <span>支付金额；￥{{ Number.parseFloat(scope.row.payment).toFixed(2) }}</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
              </span>
            </el-dialog>
            <el-popconfirm
              title="确定取消订单吗？"
              @confirm="handleCancel(scope.$index, scope.row)"
            >
              <el-button
                size="mini"
                type="text" 
                slot="reference"
                >取消订单</el-button>
            </el-popconfirm>
            
          </div>
          <div v-else>  
            <el-popconfirm
              title="确定删除订单吗？"
              @confirm="handleCancel(scope.$index, scope.row)"
            >
              <el-button
                size="mini"
                type="text" 
                slot="reference">删除订单</el-button>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { deleteOrder } from '@/network/order.js';

  export default {
    name: 'TabContent',
    props: {
      orders: {
        type: Array,
        default: []
      },
      allOrders: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        orderList: [],
        dialogVisible: false,
        freight: 6.00,
        // orderList: [
        //   {
        //     oid: 1,
        //     goods: [
        //       {
        //         title: 'JavaScript高级程序设计',
        //         price: 48.60,
        //         count: 1
        //       },
        //       {
        //         title: 'ES6',
        //         price: 99,
        //         count: 2
        //       }
        //     ],
        //     payment: 53.60,
        //     freight: 6.00,
        //     status: '待付款',
        //     expired: false
        //   },
        //   {
        //     oid: 2,
        //     goods: [
        //       {
        //         title: 'JavaScript高级程序设计',
        //         price: 48.60,
        //         count: 1
        //       }
        //     ],
        //     payment: 53.60,
        //     freight: 6.00,
        //     status: '待付款',
        //     expired: false
        //   }
        // ],
        dropMenu: [{text: '近三个月订单', value: '近三个月订单'}, {text: '今年订单', value: '今年订单'}, {text: '去年订单', value: '去年订单'}, {text: '更早以前', value: '更早以前'}],
        statusMenu: [{text: '交易状态', value: '交易状态'}, {text: '待付款', value: '待付款'}, {text: '待发货', value: '待发货'}, {text: '待收货', value: '待收货'}],
        selectedMenuItem: {text: '近三个月订单', value: '近三个月订单'},
        selectedStatusItem: {text: '交易状态', value: '交易状态'}
      }
    },
    created() {
      this.orderList = this.orders;
      // console.log(this.orderList);
    },
    methods: {
      filterHandler(item) {
        console.log(item);
        let nowDate = new Date();
        let year = nowDate.getFullYear();
        let month = nowDate.getMonth() + 1;
        let date = nowDate.getDate();

        console.log(this.orderList[0].datetime);
        switch(item.value) {
          case '近三个月订单':
            this.orderList = this.allOrders.filter(item => {
              let y = Number.parseInt(item.datetime.slice(0, 4));
              let m = Number.parseInt(item.datetime.slice(5, 7));

              if(year === y && month - m <= 3) {
                return item;
              }
            })
            break;
          case '今年订单':
            this.orderList = this.allOrders.filter(item => {
              let y = Number.parseInt(item.datetime.slice(0, 4));

              if(year === y) {
                return item;
              }
            })
            break; 
          case '去年订单':
            this.orderList = this.allOrders.filter(item => {
              let y = Number.parseInt(item.datetime.slice(0, 4));

              if(year - y === 1) {
                return item;
              }
            })
            break;  
          case '更早以前':
            this.orderList = this.allOrders.filter(item => {
              let y = Number.parseInt(item.datetime.slice(0, 4));

              if(year - y >= 2) {
                return item;
              }
            })
            break;   
        }
      },
      filterMethod(item) {
        // console.log(item);
        this.orderList = this.allOrders.filter(i => i.status === item.value);
        // switch(item.value) {
        //   case '待付款':
        //     this.orderList = this.allOrders.filter(item => {
        //       if(item.status === ) {
        //         return item;
        //       }
        //     })
        //     break;
        // }
      },
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if (rowIndex % 2 === 0) {
          if (columnIndex === 0) {
            return [1, 4];
          } else if (columnIndex === 1) {
            return [0, 0];
          }
        }
      },
      // rowStyle(row, rowIndex) {
      //   if(rowIndex % 2 === 0) {
      //     return {
      //       'height': '60px',
      //       'background-color': 'pink'
      //     }
      //   }else {

      //   }
      // },
      cellStyle() {
        return {
          'margin-bottom': '20px',
          'border': '1px solid #ddd'
        }
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      menuItemClick(index, menu) {
        // console.log(index, menu);
        if(menu == this.dropMenu) {
          this.selectedMenuItem = this.dropMenu[index];
        }else {
          this.selectedStatusItem = this.statusMenu[index];
        }
      },
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0 || rowIndex === 1) {
          if (columnIndex === 0) {
            return [1, 5]
          }
          
        }
      },
      handlePay(index, row) {
        // console.log(index, row);
        this.dialogVisible = true;
      },
      handleClose(done) {
        this.$confirm('确认放弃支付吗？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      handleCancel(index, row) {
        deleteOrder(row.oid).then(data => {
          if(data.result.msg == '订单删除失败') {
            this.$message.error(data.result.msg);
          }
          else {
            this.$message({
              message: data.result.msg,
              type: 'success'
            });
            this.$router.go(0);
          }
          
        })
      }
    },
    watch: {
      orderList(newVal, oldVal) {
        // console.log(newVal, oldVal);
      }
    } 
  }
</script>

<style  scoped>
  #tab-content {
    margin-left: 10px;
    font-size: 14px;
  }

  .el-table .thead {
    color: #666;
    background-color: #F5F5F5;
    font-size: 14px;
  }

  .spacing-line {
    height: 15px;
    border: 0px;
    background-color: red;
  }

  .el-descriptions .order-title {
    height: 60px;
  }

  .order-info {
    position: relative;
    width: 400px;
    height: 100px;
    font-size: 14px;
  }

  .good-img {
    position: absolute;
    top: 0;
    width: 100px;
    height: 100px;
  }

  .good-img img {
    width: 100%;
    height: 100%;
  }

  .good-title {
    position: absolute;
    left: 120px;
    top: 30px;
    width: 240px;
  }

  .good-price {
    position: absolute;
    left: 360px;
    top: 30px;
    width: 80px;
  }

  .good-count {
    position: absolute;
    left: 460px;
    top: 30px;
    width: 30px;
  }

  .el-dropdown {
    width: 120px;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

  .pay {
    margin-left: 10px;
  }
</style>
