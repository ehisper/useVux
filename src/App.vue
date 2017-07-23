<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <loading v-model="isLoading"></loading> -->
    <router-view></router-view>
  </div>
</template>

<script>
import { Loading } from 'vux'
import { mapState } from 'vuex'
export default {
  name: 'app',
  //store处理loading
  // components: {
  //   Loading
  // },
  // computed: {
  //   ...mapState({
  //     isLoading: state => state.vux.isLoading
      
  //   })
  // }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
