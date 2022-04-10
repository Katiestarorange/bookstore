<template>
  <div id="shopcart">
    <div v-if="cartLength === 0" class="empty">
      <i class="el-icon-shopping-cart-1 cart"></i>
      <p>购物车空空的哦~，去看看心仪的商品吧~</p>
      <el-button @click.native="$router.push('/')" type="text" class="shopping">去购物<i class="el-icon-arrow-right"></i> </el-button>
    </div>
    <el-form v-else>
      <h3>全部商品（{{ cartLength }}）</h3>
      <el-table
        ref="multipleTable"
        :data="cartList"
        tooltip-effect="dark"
        style="width: 120%"
        @selection-change="selectionLineChangeHandle">
        <el-table-column
          type="selection"
          width="55"
          label="全选">
          <div slot="header">
            全选
          </div>
        </el-table-column>
        <el-table-column
          label=""
          width="80">
          <template slot-scope="scope">
            <img :src="scope.row.cover" :alt="scope.row.book_name" style="width: 60px; height: 60px">
          </template>
        </el-table-column>
        <el-table-column
          label="商品信息"
          prop="book_name"
          width="150">
          <!-- show-overflow-tooltip -->
        </el-table-column>
        <el-table-column
          label="单价"
          width="120">
          <template slot-scope="scope">
            <span style="margin-left: 10px">￥{{ scope.row.price.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="num"
          label="数量"
          width="150">
        	<template slot-scope="scope">
            <el-input-number size="mini" v-model="scope.row.num" @change="handleChange(scope.row)" :min="1" label="商品数量"></el-input-number>
          </template>
         
        </el-table-column>
        <el-table-column
          label="金额"
          width="120">
          <template slot-scope="scope">
            <span style="margin-left: 10px">￥{{ (scope.row.price*scope.row.num).toFixed(2) }}</span>
          </template>          
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-popconfirm
              title="确定要删除商品吗？"
              @confirm="handleDelete(scope.$index, scope.row)">
              <el-button slot="reference" type="text" size="small">删除</el-button>
            </el-popconfirm>
            <br>
            <el-button type="text" size="small" @click="addToCollectList(scope.$index, scope.row)">移入收藏</el-button>
          </template>
        </el-table-column>
      </el-table> 
      <div style="padding: 5px 0 5px 30px; margin-top: 20px; border: 1px solid #dfdfdf; background-color: #F5F5F5;">
        <!-- <el-button type="text" @click="toggleAllSelection"> <el-checkbox :checked="checkAll" label="全选" name="type"></el-checkbox></el-button> -->
        <el-checkbox :indeterminate="isIndeterminate" @change="checkChange" v-model="checkAll" label="全选" border size="medium"></el-checkbox>
        <!-- <el-button type="text" @click="clearSelection()">批量删除</el-button> -->
        <span  style="margin: 0 100px 0 200px; font-size: 12px">已选 <span style="color: red; font-weight: 700">{{ dataonLineListSelections.length }}</span> 件商品</span>
        <span class="sum" style="dispaly: inline-block; margin: 0 30px; font-size: 12px; width: 200px">
          合计(不含运费): <span style="font-size: 16px; color: red">￥{{sum.toFixed(2)}}</span>
        </span>
        <el-button class="pay" type="primary" plain @click="pay">去结算</el-button>
      </div>   
    </el-form>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { mapActions } from 'vuex';
  import { getAllItems, deleteCart, changeQuanity } from '@/network/cart.js';
  import { getDetailData } from '@/network/book.js';
  import { addFavorite } from '@/network/favorite.js';

  export default {
    name: 'ShopCart',
    data() {
      return {
        cartList: [],
        cartLength: 0,
        dataonLineListSelections: [],
        checkAll: false,
        isIndeterminate: true,
        user: JSON.parse(window.localStorage.getItem('user'))
      }
    },
    computed: {
      
      sum() {
        return this.dataonLineListSelections.reduce((pre, item) => pre+item.num*item.price, 0);
      }
    },
    created(){
      getAllItems(this.user.uid).then(data => {
        console.log('获取购物车：', data.result.content);
        let goodList = data.result.content;
        for(let item of goodList) {
          getDetailData(item.bid).then(data => {
            data.result.bookInfo.num = item.quanity;
            this.cartList.push(data.result.bookInfo);
          })
        }
        this.cartLength = goodList.length;
      })
    },
    methods: {
      ...mapActions(['removeFromCart', 'addCollect']),
      handleDelete(index, row) {
        // console.log(index, row);
        deleteCart(row.bid, this.user.uid).then(data => {
          console.log('移出购物车:', data);
          this.$message({
            message: data.result.msg,
            type: 'success'
          });
          this.$router.go(0);
        })
      },
      addToCollectList(index, row) {
        console.log(index, row);
        addFavorite(Number.parseInt(row.bid), this.user.uid).then(data => {
          console.log('添加收藏：', data);
          this.$message({
            message: data.result.msg,
            type: 'success'
          });
          // this.$router.go(0);
        })
        // const product = {};
        // product.image = row.cover;
        // product.title = row.title;
        // product.price = row.price;
        // product.show = false;
        // product.bid = row.bid;
        // // console.log(product);

        // this.addCollect(product).then(res => {
        //   this.$message({
        //     message: res,
        //     type: 'success'
        //   });
        //   // console.log(this.$store.state.collectList);
        // })
      },
      selectionLineChangeHandle (val) {
        // console.log('val=', val);
        this.dataonLineListSelections = val;
        let checkedCount = this.dataonLineListSelections.length;
        this.checkAll = checkedCount === this.cartList.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cartList.length;
        // console.log('cartList.length=',this.cartList.length);
        // console.log('dataonLineListSelections.length=',this.dataonLineListSelections.length);
        // console.log('checkAll=', this.checkAll);
        
      },
      checkChange(val) {
        console.log(val);
        this.dataonLineListSelections = val ? this.cartList : [];
        if(val) {
          this.$refs.multipleTable.toggleAllSelection(); 
        }else {
          this.$refs.multipleTable.clearSelection();
        }
        this.isIndeterminate = false;
      },
      handleChange( row) {
        // console.log(row);
        changeQuanity(row.bid, this.user.uid, row.num).then(data => {
          console.log('改变商品数量：', data);
        })
      },
      toggleAllSelection() {
        if(!this.checkAll){
          
        }else {
          
        }
        
      },
      clearSelection(){
         this.$refs.multipleTable.clearSelection();
      },
      
      pay() {
        // console.log(this.dataonLineListSelections);
        if(this.dataonLineListSelections.length === 0) {
          this.$message({
            message: '您还没有选择任何商品噢~',
            type: 'warning'
          });

        }else {
          this.$router.push({
            name: 'Settlement',
            params: {
              goodList: this.dataonLineListSelections,
              money: this.sum
            }
          })
        }
        
      }
    }    
  }
</script>

<style  scoped>
  #shopcart {
    margin-left: 5px;
    width: 900px;
  }
  .my-label {
    background: #E1F3D8;
  }
  .my-content {
    color: red;
    background-color: pink;
  }

  .el-button:hover {
    color: red;
    text-decoration: underline;
  }

  .empty {
    padding-top: 120px;
    text-align: center;
    
    font-size: 16px;
  }

  .empty .cart{
    margin-bottom: 10px;
    font-size: 80px;
    color: #ccc;
  }

  .shopping:hover {
    text-decoration: none;
  }

</style>
