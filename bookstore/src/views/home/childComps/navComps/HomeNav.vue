<template>
  <div>
    <nav-top></nav-top>
    <nav-main></nav-main>
    <nav-ad></nav-ad>
  </div>
</template>

<script>
  import NavTop from '@/views/home/childComps/navComps/NavTop';
  import NavMain from '@/views/home/childComps/navComps/NavMain';
  import NavAd from '@/views/home/childComps/navComps/NavAd';

  export default {
    name: 'HomeNav',
    components: {
      NavTop,
      NavMain,
      NavAd
    },
    data () {
      return {

      }
    }
  }
</script>

<style  scoped>

</style>
