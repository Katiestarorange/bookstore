<template>
  <div id="home">
    
    <home-nav></home-nav>
    
  </div>
</template>

<script>
  import HomeNav from '@/views/home/childComps/navComps/HomeNav';

  export default {
    name: 'Home',
    components: 
    { 
      HomeNav
    },
    data () {
      return {

      }
    },
    
    methods: {
      
    }
  }
</script>

<style  scoped>

</style>
