<template>
    <div class="more">
      <!-- {{ length }} -->
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane class="detail-content" label="商品详情" name="first">
          <div ref="floors" class="detail-floors">
            <div ref="firstTab" class="floor">
              <h3 style="color:#666">{{ tabs[0] }}</h3>
              <el-divider></el-divider>
              <div class="floor-content">
                <p>{{book.summary}}</p>
              </div>
            </div>
            <div ref="secondTab" class="floor">
              <h3 style="color:#666">{{ tabs[1] }}</h3>
              <el-divider></el-divider>
              <div class="floor-content">{{ tabs[1] }}</div>
            </div>
            <div ref="thirdTab" class="floor">
              <h3 style="color:#666">{{ tabs[2] }}</h3>
              <el-divider></el-divider>
              <div class="floor-content">{{ tabs[2] }}</div>
            </div>
            <div ref="fourthTab" class="floor">
              <h3 style="color:#666">{{ tabs[3] }}</h3>
              <el-divider></el-divider>
              <div class="floor-content">{{ tabs[3] }}</div>
            </div>
            <div ref="fifthTab" class="floor">
              <h3 style="color:#666">{{ tabs[4] }}</h3>
              <el-divider></el-divider>
              <div class="floor-content">{{ tabs[4] }}</div>
            </div>
          </div>
          <div ref="elevators" :style="tabStyle" class="detail-elevators">
            <a href=" javascript:void(0); ">
              <div @click="tabClick(index)" :class="{active: currentIndex === index}" class="elevator" v-for="(item, index) in tabs" :key="index">
                <span v-show="currentIndex === index" class="arrow"></span>
                {{ item }}
              </div>
            </a>
          </div>
        </el-tab-pane>
        <!-- <el-tab-pane label="规格属性" name="second">规格属性</el-tab-pane> -->
        <el-tab-pane label="售后政策" name="third">
          <dl class="policy">
            <dt>正品行货</dt>
            <dd>贴贴书店网上商城向您保证所售商品均为正品行货，所有商品开具电子发票。</dd>
            <dt>售后服务承诺</dt>
            <dd>1) 贴贴书店网上商城支持商品7天内无理由退换货（不影响二次销售），15天内可以换货，以客户收到商品第二日起计算。</dd>
            <dd>2) 平台售后审核人员在客户提交申请后72小时之内完成审核。</dd>
            <dd>3) 退换货业务均会在自接收到问题商品之日起7日之内处理完成，国家法定节假日不计算在内。</dd>
          </dl>
        </el-tab-pane>
        <el-tab-pane label="累计评价" name="fourth">
          <div v-if="length === 0">
            <el-empty description="该商品还没有评价~">
              <el-button @click="dialogFormVisible = true" type="primary" icon="el-icon-edit">评价一下</el-button>
            </el-empty>
          </div>
         
          <div class="comment-area" v-else>
            <el-button @click="dialogFormVisible = true" type="primary" icon="el-icon-edit">评价一下</el-button>
            <div class="review" v-for="(item, index) in book.reviews" :key="index">
              <span class="reviewer">{{ item.user_name }}</span>
              <ul>
                <li class="review-detail">
                  <el-rate
                    v-model="item.score"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}分">
                  </el-rate>
                </li>
                <li class="review-detail">{{ item.content }}</li>
                <li class="review-detail" style="font-size: 12px">{{ dayjs(item.date).format('YYYY-MM-DD HH:mm:ss') }}</li>
              </ul>
            </div>
          </div>
          <el-dialog center width="40%" title="评价" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="我对本书的评分是：" :label-width="formLabelWidth">
                  <br>
                  <el-rate
                    v-model="form.score"
                    show-text
                    text-color="#ff2832"
                    :texts="star_msg">
                  </el-rate>
                </el-form-item>
                <el-input type="textarea" resize="none"  :rows="5" v-model="form.content"  placeholder="这本书的内容、作者、文笔...给你留下了怎样的印象?是否值得推荐给其他书友?写下你的书评吧～"></el-input>
                
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="comment">发表</el-button>
              </div>
            </el-dialog>
        </el-tab-pane>
    </el-tabs>
    </div>
</template>

<script>

  export default {
    name: 'DetailMore',
    props:{
      book: {
        type: Object,
        default(){
          return {}
        }
      },
      length: {
        type: Number,
        default(){
          return 0
        }
      }
    },
    data () {
      return {
        reviews: [],
        star_msg: ['超烂啊', '水准之下', '聊胜于无', '值得一看', '极力推荐'],
        // score: null,
        dialogFormVisible: false,
        form: {
          score: null,
          content: ''
        },
        formLabelWidth: '140px',
        currentIndex: 0,
        activeName: 'first',
        tabs: [
          '内容简要',
          '目录',
          '序言',
          '导语',
          '精彩页'
        ],
        tabStyle: {},
        tabTops: [],
        user: JSON.parse(window.localStorage.getItem('user'))
      }
    },
    computed: {
      // length() {
      //   return typeof(this.book.reviews);
      // }
    },
    created() {
      
      
    },
    mounted(){    
      // console.log(this.book);
      window.addEventListener('scroll', this.handleScroll, true);  
      // var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      this.tabTops.push(this.$refs.firstTab.offsetTop + 680);
      this.tabTops.push(this.$refs.secondTab.offsetTop + 680);
      this.tabTops.push(this.$refs.thirdTab.offsetTop + 680);
      this.tabTops.push(this.$refs.fourthTab.offsetTop + 680);
      this.tabTops.push(this.$refs.fifthTab.offsetTop + 680);
      // console.log(this.tabTops);
    },
    methods: {
      comment() {
        this.$emit('recommend', this.form.score, this.form.content);
        
      },
      handleScroll() {
        // console.log('scroll');
        // console.log(this.$refs.elevators.scrollHeight);
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        var floorHeight = this.$refs.floors.offsetHeight;
        // console.log(floorHeight);
        // console.log(scrollTop);
        if(scrollTop >= this.tabTops[0] && scrollTop < this.tabTops[1]){
          this.currentIndex = 0;
        }else if (scrollTop >= this.tabTops[1] && scrollTop < this.tabTops[2]){
          this.currentIndex = 1;
        }else if (scrollTop >= this.tabTops[2] && scrollTop < this.tabTops[3]){
          this.currentIndex = 2;
        }else if (scrollTop >= this.tabTops[3] && scrollTop < this.tabTops[4]){
          this.currentIndex = 3;
        }else if (scrollTop >= this.tabTops[4] && scrollTop <floorHeight + 500){
          this.currentIndex = 4;
        }else {
          this.currentIndex = 0;
        }

        if(scrollTop < 700 ) {
          this.tabStyle = {};
        }else if(scrollTop >= 700 && scrollTop < floorHeight + 500) {
          
          this.tabStyle = {
            position: 'fixed',
            top: '100px',
            left: '235px',
            paddingLeft: '34px'
          };
        }else {
          // console.log('daoda');
          this.tabStyle = {};
        }
      },
      tabClick(index) {
        this.currentIndex = index;
        document.documentElement.scrollTop = this.tabTops[index];
      },
      handleClick(tab, event) {
        //  console.log(tab, event);
      }
    }
  }
</script>

<style  scoped>
  .more {
    position:absolute;
    top: 600px;
    left: 120px;
    width: 89%;
    
  }

  .el-tabs {
    box-shadow: 0 0 0 #ccc;
    
  }
  
  ::v-deep .el-tabs--border-card>.el-tabs__content {
    padding: 0px;
  }

  .detail-content {
    /* height: 1200px; */
    padding-top: 0;
    background-color: #F7F7F7;
  }

  .detail-floors {
    position: relative;

    width: 80%;
    background-color: #fff;
    padding: 20px;
  }

  .floor-content {
    margin-bottom: 40px;
  }

  .el-divider {
    width: 50px;
    height: 3px;
    background-color: #C62E2D;
    margin: 12px 0;
  }

  .detail-elevators {
    position: relative;
    /* right: -32px; */
    top: -630px;
    left: 32px;
    z-index: 9;
    margin-left: 785px;
    padding-top: 10px;
    padding-left: 37px;
    background-color: #F7F7F7;
    width: 100px;
    /* height: 1000px; */
    /* float: right; */
  }

  a {
    color: #999;
  }

  .elevator {
    /* padding: 6px; */
    height: 18px;
    margin: 12px 0px;
    font-size: 14px;
  }

  .elevator.active {
    color: #1E1E1E;
  }

  .elevator span {
    border: 0;
    border-right: 20px solid #F7F7F7;
    border-top: 17px solid transparent;
    width: 0;
    height: 0;
    border-bottom: 17px solid transparent;
    left: -19px;
    position: absolute;
  }

  .policy {
    padding-left: 20px;
    font-size: 14px;
  }

  .policy dt {
    margin-top: 20px;
    font-weight: 700;
    padding-bottom: 10px;
  }

  .policy dd {
    padding-bottom: 10px;
  }

  ::v-deep .el-rate__icon{
    font-size: 30px;
  }

  .comment-area .el-button {
    margin: 20px 0 20px 400px;
  }

  .review {
    padding-left: 50px;
    font-size: 14px;
    color: #666;
    margin-bottom: 20px;
  }

  .review-detail {
    margin-top: 10px;
    margin-left: 30px;
  }
  
  .review-detail ::v-deep .el-rate__icon {
    font-size: 20px;
  }
</style>
