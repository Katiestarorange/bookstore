<template>
  <div id="settlement">
    <!-- head -->
    <div class="head">
      <el-steps :space="200" :active="1" finish-status="success">
        <el-step title="购物车"></el-step>
        <el-step title="填写核对订单信息"></el-step>
        <el-step title="完成订单"></el-step>
      </el-steps>
    </div>

    <!-- 收货人信息 -->
    <div class="recipientInfo">
      <h1 class="title">收货人信息</h1>
      <div>
        <div class="content" v-if="recipientInfo.length">
          <el-card :body-style="{ padding: '15px' }" class="box-card" shadow="hover" v-for="(item, index) in recipientInfo" :key="index">        
            <p class="text">
              <span>{{ item.rname }}</span>
              <span class="telephone">{{ item.rphone }}</span>
            </p>
            <p>{{ item.region }}{{ item.addr }}</p>
            <el-button type="text" class="edit" @click="edit(index)">编辑</el-button>
            <el-dialog title="修改收货地址" :visible.sync="dialogtempFormVisible">
              <el-form :model="tempForm">
                <el-form-item  required label="收货人" :label-width="formLabelWidth">
                  <el-input v-model="tempForm.rname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item required label="手机号码" :label-width="formLabelWidth">
                  <el-input v-model="tempForm.rphone" autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item required label="所在地区" :label-width="formLabelWidth">
                  <el-select v-model="tempForm.region" placeholder="请选择" >
                    <el-option v-for="(item, index) in area" :key="index" :label="item" :value="item"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item required  label="详细地址" :label-width="formLabelWidth">
                  <el-input class="address" v-model="tempForm.addr"  required autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="modify(index)">确定修改</el-button>
                <el-button class="cancel" @click="dialogtempFormVisible = false">取消</el-button>  
              </div>
            </el-dialog>
            <el-button type="text" class="edit" @click="setAsDefault">设为默认地址</el-button>        
          </el-card>
        </div>
        <div v-else>
          <el-card>
            <div slot="header"></div>
            <div></div>
          </el-card>
        </div>
      </div>
      <el-button class="add" size="small" @click="add">新增收货地址 <i class="el-icon-plus icon"></i></el-button>
      <el-dialog title="新增收货地址" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item  required label="收货人" :label-width="formLabelWidth">
            <el-input v-model="form.rname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item required label="手机号码" :label-width="formLabelWidth">
            <el-input v-model="form.rphone" autocomplete="off" ></el-input>
          </el-form-item>
          <el-form-item required label="所在地区" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择" >
              <el-option v-for="(item, index) in area" :key="index" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item required  label="详细地址" :label-width="formLabelWidth">
            <el-input class="addr" v-model="form.addr"  required autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addRegion">确定新增收货地址</el-button>
          <el-button class="cancel" @click="dialogFormVisible = false">取消</el-button>  
        </div>
      </el-dialog>
     
    </div>

    <div class="deliveryOrder" ref="order">
      <h1 class="title" style="margin-bottom: 0px">送货清单<el-button class="toCart" @click="$router.push('/profile/shopcart')" type="text">返回购物车</el-button></h1>
      <div class="tips"><i class="el-icon-s-opportunity red"></i> 以下商品 预计<span class="red">{{ currentDate.year }}</span>年<span class="red">{{ currentDate.month }}</span>月<span class="red">{{ currentDate.day }}</span>日送达<span style="margin-left: 10px">运费：6.00</span></div>
        <el-card :body-style="{ padding: '10px 15px' }" class="order-box-card" shadow="never" v-for="(item, index) in goodList" :key="index">        
          <el-descriptions title="" direction="vertical" :column="6" :colon="false">
            <el-descriptions-item label="" class="img" ><img :src="item.cover" alt=""></el-descriptions-item>
            <el-descriptions-item label="商品名称" :span="2">{{ item.book_name }}</el-descriptions-item>
            <el-descriptions-item label="单价">{{ item.price }}</el-descriptions-item>
            <el-descriptions-item label="数量">{{ item.num }}</el-descriptions-item>
            <el-descriptions-item label="总价">{{ Number.parseFloat(item.num * item.price).toFixed(2) }}</el-descriptions-item>
          </el-descriptions>     
        </el-card>
        <div style="padding-left: 600px; padding-top: 20px">
          全部商品共计：  <span style="color: red; font-size: 18px">￥{{ Number.parseFloat(money).toFixed(2) }}</span>
        </div>
    </div>

    <div class="footer" ref="pay" :style="footStyle" v-if="recipientInfo.length!==0">
      <el-row>
        <el-col :span="13">
          <div class="left">
            寄送至：<span>{{ recipientInfo[0].addr }}</span><br>
            <span style="margin-left: 50px; line-height:50px">{{ recipientInfo[0].rname }} {{ recipientInfo[0].rphone }}</span>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="center"><span>共{{ goodList.length }}件商品</span></div>
          </el-col>
        <el-col :span="5">
          <div class="right">
            <span style="font-weight: 700">实付：<span class="red">￥<span style="font-size: 18px;;">{{ sum }}</span></span></span>（含运费<span class="red">6.00</span>元）
            <br>
            <span style="line-height: 50px; margin-left: 30px">热销品订单请在<span class="red">1天</span>内完成支付</span>
          </div>
        </el-col>
        <el-col :span="3" class="pay">
          <el-button type="text" class="payBtn" @click="toPay">去支付</el-button>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
  import { getAllReceivers, addReceiver, updateReceiver } from '@/network/receiver.js';
  export default {
    name: 'Settlement',
    data () {
      return {
        freight: 6, // 运费 
        money: this.$route.params.money,
        area:  [
          '北京', 
          '天津', 
          '河北', 
          '山西', 
          '内蒙古', 
          '辽宁',
          '吉林',
          '上海',
          '江苏', 
          '黑龙江', 
          '浙江',
          '安徽',
          '福建',
          '江西',
          '山东',
          '河南',
          '湖北',
          '湖南',
          '广东',
          '广西',
          '海南',
          '重庆',
          '四川',
          '贵州',
          '云南',
          '西藏',
          '陕西',
          '甘肃',
          '青海',
          '宁夏',
          '新疆',
          '台湾',
          '香港',
          '澳门',
          '钓鱼岛'
        ],
        footStyle: {

        },
        dialogFormVisible: false,
        dialogtempFormVisible: false,
        form: {
          rame: '',
          rphone: '',
          region: '',
          addr: ''
        },
        tempForm: {
          name: '',
          telephone: '',
          region: '',
          address: ''
        },
        formLabelWidth: '120px',
        active: 0,
        hasRecipient: false,
        recipientInfo: [
          // {
          //   name: 'karry',
          //   telephone: 19990921921,
          //   address: '重庆市九龙坡区重庆市九龙坡区重庆市九龙坡区'
          // },
          // {
          //   name: 'karry',
          //   telephone: 19990921921,
          //   address: '重庆市九龙坡区重庆市九龙坡区重庆市九龙坡区'
          // },
          // {
          //   name: 'karry',
          //   telephone: 19990921921,
          //   address: '重庆市九龙坡区重庆市九龙坡区重庆市九龙坡区'
          // },
        ],
        goodList: this.$route.params.goodList,
        user: JSON.parse(window.localStorage.getItem('user'))
      }
    },
    computed: {
      currentDate() {
        const date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let day = date.getDate()+3;
        month = month > 9 ? month : '0'+month;
        day = day > 9 ? day : '0' + day;
        return {year, month, day};
      },
      sum() {
        return Number.parseFloat(this.money + this.freight).toFixed(2)
      }
    },
    created() {
      
      getAllReceivers(this.user.uid).then(data => {
        console.log(data);
        this.recipientInfo = data.result.content;
        if(this.recipientInfo.length === 0) {
          this.$alert('还没有收货地址', '请先填写一个收货地址', {
            confirmButtonText: '确定',
            callback: action => {
              console.log(action);
              this.dialogFormVisible = true;
            }
          });
        }
      })
      console.log('this.goodList:', this.goodList);
    },
    
    mounted(){    
      window.addEventListener('scroll',this.handleScroll); 
    },
    methods: {
      modify(index) {
        console.log(index);
        this.recipientInfo[index] = this.tempForm;
        this.dialogtempFormVisible = false;
        console.log(this.recipientInfo[index]);
        updateReceiver(this.recipientInfo[index].rid, this.recipientInfo[index].rname, this.recipientInfo[index].rphone, this.recipientInfo[index].region, this.recipientInfo[index].addr).then(data => {
          console.log(data);
        })
      },
      toPay() {
        this.$router.push({
          name: 'Pay', 
          params: { 
            payment: this.sum,
            goodList: this.goodList 
          }
        })
      },
      handleScroll(e){      
        // const order = this.$refs.order;
        // this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        // console.log(' this.scrollTop=',  this.scrollTop, 'order.offsetHeight=',order.offsetHeight, 'order.scrollHeight=', order.scrollHeight);
        // if( this.scrollTop + order.offsetHeight >= order.scrollHeight){
        //   this.footStyle = {
        //     position: 'absolute', 
        //     left: 60+'px',
        //     top: order.scrollHeight + 520 + 'px'  
        //   }
        //   console.log(this.footStyle);
        // } else {
        //   this.footStyle = {
        //     position: 'fixed',
        //     left: 60 + 'px',
        //     bottom: 0
        //   }
        // }
        // console.log(this.footStyle);
      }, 
      next() {
        if (this.active++ > 2) this.active = 0;
      }, 
      edit(index) {
        console.log(index);
        this.dialogtempFormVisible = true;
        this.tempForm = this.recipientInfo[index];
        console.log(this.tempForm);
      },
      setAsDefault() {},
      add() {
        this.dialogFormVisible=true;
      },
      addRegion() {
        this.dialogFormVisible = false;
        let rname = this.form.rname;
        let rphone = this.form.rphone;
        let region = this.form.region;
        let addr =  this.form.addr;
        let uid = this.user.uid;
        // this.form = null;
        let receiver = {rname, rphone, region, addr };
        // console.log(this.recipientInfo);
        addReceiver(uid, receiver).then(data => {
          console.log(data);
          let rid = data.result.content;
          
          this.recipientInfo.push({ rid, rname, rphone, region, addr });
        })
      }
    }
  }
</script>

<style  scoped>
  #settlement {
    margin-left: 50px;
    /* height: 100%;
    overflow: scroll; */
  }

  h1.title {
    font-size: 16px;
    color: #000;
    line-height: 22px;
    padding: 10px 0;
    font-weight: bold;
  }

  .content{
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .text {
    padding-bottom: 5px;
    margin-bottom: 5px;
    border-bottom: 1px solid #ddd;
  }
  .telephone {
    margin-left: 65px;
  }

  .box-card {
    width: 200px;
    font-size: 12px;
    padding: 5px 0;
    margin-right: 10px;
  }

  .edit {
    margin-top: 5px;
    font-size: 12px;
    padding: 10px;
    padding-bottom: 0;
  }

  .add {
    margin-top: 10px;
    margin-bottom: 20px;
    border-radius: 0;
    padding: 5px 10px;

  }

  .add .icon {
    font-weight: 700;
  }

  .el-dialog {
    font-size: 14px;
  }

  ::v-deep .el-dialog__header {
    border-bottom: 1px solid rgb(235, 234, 234);
  }

  .el-input {
    width: 200px;
  }

  ::v-deep .address .el-input__inner {
    width: 400px;
  }

  ::v-deep .el-dialog__footer {
    padding-top: 0;
    text-align: center;
  }

  .cancel {
    margin-left: 60px;
  }

  .deliveryOrder {
    width: 800px;
  }

  .toCart {
     margin-left: 654px;
  }

  .tips {
    width: 100%;
    height:40px;
    font-size: 12px;
    line-height: 40px;
    padding-bottom: 10px;
    padding-left: 20px;
    background-color: rgba(243, 243, 243, 0.925);
  }

  .red {
    color: red;
  }

  .order-box-card {
    width: 800px;
  }

  .order-box-card .img {
    width: 100px;
  }

  .order-box-card img {
    width: 90px;
    height: 90px;
  }

  .footer {
    position: fixed;
    z-index: 4;
    bottom: 0;
    padding: 20px;
    padding-right: 0;
    height: 70px;
    width: 91%;
    /* line-height: 18px; */
    background-color: rgb(240, 240, 240);
    font-size: 12px;
  }

  .footer .left {
    line-height: 3px;
    padding-right: 30px;
  }

  .footer .center {
    text-align: right;
    line-height: 8px;
  }

  .footer .right {
    padding-left: 30px;
    padding-bottom: 5px;
    line-height: 3px;
  }

  .payBtn {
    margin-top: -20px;
    height: 70px;
    width: 100%;
    border-radius: 0;
    background-color: red;
    color: #fff;
    font-size: 16px;
    font-weight: 700;
  }

  .pay {
    height: 70px;
  }

</style>
