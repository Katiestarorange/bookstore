<template>
  <grid-view class="goods" :cols="cols" :hMargin="hMargin" :vMargin="vMargin" :lineSpace="lineSpace" :itemSpace="itemSpace">
    <goods-list-item v-for="(item, index) in goods" :goods-item="item" :key="index"></goods-list-item>
  </grid-view>
</template>

<script>
import GoodsListItem from "./GoodsListItem";
// import GridView from "@/components/common/gridView/GridView";
import GridView from '@/components/common/gridView/GridView';
export default {
  name: "GoodsList",
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      cols: 4,
      hMargin: 4,
      vMargin: 2,
      lineSpace: 32,
      itemSpace: 10
    }
  },
  components: {
    GoodsListItem,
    GridView
  }
}
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
    margin-left: 3px;
  }

</style>
