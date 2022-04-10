<template>
  <div class="hyswiper">
    <div class="swiper">
      <slot>
      </slot>
    </div>
    <div class="banner-slider">
      <!-- 按钮 -->
      <!-- 图文轮播 -->
      <!-- 文字按钮 textButton -->
      <div class="banner-slider-left"><slot name="banner-slider-left"></slot></div>
      <div class="banner-slider-center"><slot name="banner-slider-center"></slot></div>
      <div class="banner-slider-right"><slot name="banner-slider-right"></slot></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Swiper',
    props: {
      interval: {//定时器延时时间,每张轮播图的轮流展示时间
        type: Number,
        default: 3000
      },
      animDuration: {
        type: Number,
        default: 200
      }
    },
    data () {
      return {
        slideCount: 0, // 元素个数
        totalWidth: 0, // swiper的宽度
        swiperStyle: {}, // swiper样式
        currentIndex: 1, // 当前的index
        // scrolling: false, // 是否正在滚动
      }
    },
    mounted() {
      // 1. 操作 DOM，在前后添加 Slide
      setTimeout(() => {
        this.handleDom();

        // 2. 开启定时器
        this.startTimer();
      }, 3000);
    },
    methods: {
      /** 
       * 定时器操作
      */
      startTimer() {
        this.playTimer = window.setInterval(() => {
          this.currentIndex++;
          this.scrollContent(-this.currentIndex * this.totalWidth);
        }, this.interval);
      },
      stopTimer() {
        window.clearInterval(this.playTimer);
      },

      /**
       * 滚动到正确的位置
       */
      scrollContent(currentPosition) {
        // 0. 设置正在滚动
        // this.scrolling = true;

        // 1. 开始滚动动画
        this.swiperStyle.transition = 'transform' + this.animDuration + 'ms';
        this.setTransform(currentPosition);

        // 2. 判断滚动到的位置
        this.checkPosition();

        // 3. 滚动完成
        // this.scrolling = false;
      },
      /**
       * 校验正确的位置
       */
      checkPosition() {
        window.setTimeout(() => {
          // 1. 校验正确的位置
          this.swiperStyle.transition = '0ms';
          if(this.currentIndex >= this.slideCount+1) {
            this.currentIndex = 1;
            this.setTransform(-this.currentIndex * this.totalWidth);
          }else if(this.currentIndex <= 0) {
            this.currentIndex = this.slideCount;
            this.setTransform(-this.currentIndex * this.totalWidth);
          }

          // 2. 结束移动后的回调
          this.$emit('transitionEnd', this.currentIndex-1 );
        }, this.animDuration)
      },
      /**
       * 设置滚动的位置
       */
      setTransform(position) {
        this.swiperStyle.transform = `translate3d(${position}px, 0, 0)`;

        // WebkitTransform 适用于 Webkit 浏览器 WebkitTransform 在 css 对应于 -webkit-transform 属性
        this.swiperStyle['-webkit-transform'] = `translate3d(${position}px), 0, 0`;
        //IE
        this.swiperStyle['-ms-transform'] = `translate3d(${position}px), 0, 0`;
      },

      /**
       * 操作DOM, 在DOM前后添加Slide
       */
      handleDom() {
        // 1.获取要操作的元素
        let swiperEl = document.querySelector('.swiper');
        let slidesEls = swiperEl.getElementsByClassName('slide');

        // 2.保存个数
        this.slideCount = slidesEls.length;

        // 3.如果大于1个, 那么在前后分别添加一个slide
        if (this.slideCount > 1) {
          let cloneFirst = slidesEls[0].cloneNode(true);
          let cloneLast = slidesEls[this.slideCount - 1].cloneNode(true);
          //在DOM前后添加Slide
          swiperEl.insertBefore(cloneLast, slidesEls[0]);//在第一张前面加上最后一张
          swiperEl.appendChild(cloneFirst);//在最后一张的后面加上第一张
          this.totalWidth = swiperEl.offsetWidth; //总宽度
          this.swiperStyle = swiperEl.style; //样式
        }

        // 4.让swiper元素, 显示第一个(目前是显示前面添加的最后一个元素)
        this.setTransform(-this.totalWidth);
      },
      /**
       * 控制上一个, 下一个
       */
      previous: function () {
        this.changeItem(-1);
      },

      next: function () {
        this.changeItem(1);
      },

      changeItem: function (num) {
        // 1.移除定时器
        this.stopTimer();

        // 2.修改index和位置
        this.currentIndex += num;
        this.scrollContent(-this.currentIndex * this.totalWidth);

        // 3.添加定时器
        this.startTimer();
      }
    }
  }
</script>

<style  scoped>

  #hy-swiper {
  overflow: hidden;
  position: relative;
}

.swiper {
  display: flex;
}


</style>
