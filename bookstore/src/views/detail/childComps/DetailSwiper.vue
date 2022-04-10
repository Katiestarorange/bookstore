<template>
  <div id="detial-swiper">
    <div class="bookPic">
      <!-- 展示图片 -->
      <div class="smallDiv" @click="click" ref="smallDiv" @mouseover="toggle" @mouseout="toggle" @mousemove="move">
        <!-- 图书照片 -->
        <img class="smallImg" :src="selectedImg.src ? selectedImg.src : bookImgs[0].src" :alt="selectedImg.name">
        <!-- 阴影盒子 -->
        <div class="mask" ref="mask" :style="maskStyle" v-show="isShade"></div>  
      </div>

      <!-- 右边放大区域 -->
      <div class="bigDiv" ref="bigDiv" v-show="isBig" >
        <img class="bigImg" ref="bigImg" :style="bigStyle" :src="selectedImg.src ? selectedImg.src : bookImgs[0].src" :alt="selectedImg.name">
      </div>
    </div>

    <!-- 指示器 -->
    <div class="indicator">
      <el-button class="left" type="primary" @click="arrowClick('left')"><i class="el-icon-arrow-left"></i></el-button>
      <el-carousel ref="cardShow" style="width: 300px" class="indicator-list" height="200px" indicator-position="none"  :autoplay="false" arrow="never">
        <el-carousel-item v-for="(listItem , lindex) in imgList.slice(1, imgList.length)" :key="lindex">
           <el-row>
            <el-col :span="4" v-for="(item, index) in listItem " :key="index" style="margin-right: 10px;">
              <img :src="item.src" @click="selected(lindex+1, index)" style="width: 70px; height: 80px; border-left:5px solid #fff"/>{{index}}
              <!-- <div> {{ item.carName +  itemPage }} </div>  -->
            </el-col>
          </el-row>
        </el-carousel-item>
      </el-carousel>
      <el-button class="right" type="primary" @click="arrowClick('right')"><i class="el-icon-arrow-right"></i></el-button>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'DetailSwiper',
  props: {
    bookCover: {
      type: String,
      default(){
        return ''
      }
    }
  },
  data () {
    return {
      count: 5,
      bookImgs: [],
      // bookImgs: [
      //   // {
      //   //   name: 'cover',
      //   //   url: this.bookCover
      //   // },
      //   {
      //     name: 'first',
      //     url: require('@/assets/img/temp.jpg')
      //   },
      //   {
      //     name: 'second',
      //     url: require('@/assets/img/miao.webp')
      //   },
      //   {
      //     name: 'third',
      //     url: require('@/assets/img/santuan.webp')
      //   },
      //   {
      //     name: 'fourth',
      //     url: require('@/assets/img/karry.jpg')
      //   },
      //   {
      //     name: 'fifth',
      //     url: require('@/assets/img/wjk.jpg')
      //   },
      //   {
      //     name: 'sixth',
      //     url: require('@/assets/img/f.jpg')
      //   }
      // ],
      imgList: [],
      selectedImg: '',
      isShade: false, // 控制阴影显示与否
      isBig: false, // 控制放大图显示与否
      maskStyle: {
        left: 0,
        top: 0
      },
      bigStyle: {
        left: 0,
        top: 0
      }        
    }
  },
  computed: {
    
    carouselItemLength() {
      return Number.parseInt(this.bookImgs.length / this.count);
    }
  },
  created() {
    this.$bus.$on('getImgs',(data) => {
      // console.log(data);
      this.bookImgs = data;
      console.log(this.bookImgs[0].src);
      let arr = [];
      let i = 0;
      for(; i < this.bookImgs.length; i++) {
        arr.push(this.bookImgs[i]);
        if((i+1) % this.count === 0) {
          this.imgList.push(arr);
          arr = [];
        }
      }
      this.imgList.push(arr);
      let firstItem = this.imgList[0];
      let lastItem = this.imgList[this.imgList.length-1];
      this.imgList.unshift(lastItem);
      this.imgList.push(firstItem);
      this.imgList.push(lastItem);
      console.log(this.imgList);
    });
    
  },
  methods: {
    click() {
      // console.log(this.bookCover);
    },
    arrowClick(val) {
      if(val === 'right') {
        this.$refs.cardShow.next()
      } else {
        this.$refs.cardShow.prev()
      }
    },
    selected(i, j) {
      // console.log(i, j);
      this.selectedImg = this.imgList[i][j];
      // console.log(this.selectedImg);
    },



    toggle() {
      this.isShade = !this.isShade;
      this.isBig = !this.isBig;
    },

    move(e) {
      // left: e.clientX - smallDiv.offsetLeft - mask.offsetWidth/2;
      this.smallDiv = this.$refs.smallDiv;
      this.mask = this.$refs.mask;
      this.bigDiv = this.$refs.bigDiv;
      this.bigImg = this.$refs.bigImg;
      // console.log(this.smallDiv, this.mask);
      
      // 获取 left 和 top
      let left = e.clientX - this.offset(this.smallDiv).left - this.mask.offsetWidth/2;
      let top = e.clientY - this.offset(this.smallDiv).top - this.mask.offsetHeight/2;

      // 限制边界值 left最大 = smallDiv.width - mask.width
      let maxLeft = this.smallDiv.offsetWidth - this.mask.offsetWidth;
      left = left < 0 ? 0 : left > maxLeft ? maxLeft : left;
      let maxTop = this.smallDiv.offsetHeight - this.mask.offsetHeight;
      top = top < 0 ? 0 : top > maxTop ? maxTop : top;
      
      // 设置 mask 的 Top 和 top
      this.maskStyle = {
        left: left + 'px',
        top: top + 'px'
      }

      // 取到右边元素能走的最大宽、高
      // this.bigImg.offsetWidth - this.bigDiv.offsetWidth
      // 求出左边走的比例
      let precentX = left / maxLeft;
      let precentY = top / maxTop;

      this.bigStyle = {
        left: - precentX * (this.bigImg.offsetWidth - this.bigDiv.offsetWidth) + 'px',
        top:  - precentY * (this.bigImg.offsetHeight - this.bigDiv.offsetHeight) + 'px'
      }

    },
    // offsetLeft 取到的是 相对于已定位的最近的祖先元素的 left
    offset(el) {
      let left = el.offsetLeft;
      let top = el.offsetTop;

      // 判断是否还有祖先元素
      // 把所有祖先元素的 offsetLeft、offsetTop 加起来
      while(el.offsetParent) {
        el = el.offsetParent;
        left += el.offsetLeft;
        top += el.offsetTop;
      }
      return {
        left,
        top
      }
    },


    drag(e) {
      var left = e.offsetX - 90;
      var top = e.offsetY - 90;
      
      if(left <= 0) {
        left = 0;
      }else if (left >= 180) {
        left = 180;
      }
      if(top <= 0) {
        top = 0;
      }else if (top >= 180) {
        top = 180;
      }
      left = left + 'px';
      top = top + 'px';

      this.maskStyle = { left, top};
    }

  }
}
</script>

<style  scoped>
  #detial-swiper {
    width: 400px;

  }

  .bookPic {
    position: relative;
    left: 20px;
  }

  .smallDiv {
    width: 360px;
    height: 360px;
    position: relative;
  }

  .smallImg {
    width: 100%;
    height: 100%;
    /* object-fit: cover; */
  }

  .mask {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 180px;
    height: 180px;
    cursor: move;
    opacity: .6;
    background-color: #F7F7F7;
    border: 1px solid #ddd;
  }

  .bigDiv {
    position: absolute;
    left: 365px;
    top: 0px;
    width: 360px;
    height: 360px;
    background-color: #fff;
    z-index: 10;
    overflow: hidden;
    border: 1px solid #ddd;
  }

  .bigImg {
    position: absolute;
    width: 720px;
    height: 720px;
  }

  .indicator {
    position: relative;
    top: 10px;
    /* background-color: rgb(233, 109, 109); */
    display: flex;
  }

  .indicator-list {
    /* position: absolute;
    left: 30px; */
    flex: 1;
    height: 80px;
    overflow: hidden;
    background-color: #fff;
  }

  .el-button {
    /* position: absolute; */
    width: 30px;
    background: #fff;
    border:0px;
    text-align: center;
    padding-left: 1px;
  }

  /* .left {
    left: 0;
  }

  .right {
    left: 330px;
  } */

  .el-icon-arrow-left, .el-icon-arrow-right {
    font-size: 25px;
    font-weight: 700;
    color: rgb(110, 106, 106);
  }

</style>
