<template>
  <div class="goods-item" @click="itemClick">
    <img class="pic" :src="goodsItem.cover" :alt="goodsItem.cover">
    <div class="goods-info">
      <p class="title" @click="itemClick">{{goodsItem.title}}</p>
      <p class="author">{{goodsItem.author}}</p>
      <p class="price">￥{{goodsItem.price}}</p>     
    </div>
  </div>
</template>

<script>
import { getBookCover } from '@/network/public.js';

export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  data() {
    return {
      // tempImage: require('@/assets/img/temp.jpg')
      imgUrl: ''
    }
  },
  computed: {
    showImage() {
      return this.tempImage;
    }
  },
  created() {

  },
  methods: {
    imageLoad() {
      this.$bus.$emit('itemImageLoad')
    },
    itemClick() {
      this.$router.push('/detail/' + this.goodsItem.bid)
    }
  }
}
</script>

<style scoped>
  .goods-item {
    padding-top: 20px;
    padding-bottom: 40px;
    position: relative;
    margin-right: 8px;
    margin-bottom: 10px;
    /*width: 48%;*/
  }

  .goods-item img {
    width: 160px;
    height: 160px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;

    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-top: 5px;
  }

  .goods-info .title {
    cursor: pointer;
  }

  .goods-info .price {
    color: red;
    margin-right: 20px;
    font-size: 14px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    /* background: url("~assets/img/common/collect.svg") 0 0/14px 14px; */
  }
</style>
