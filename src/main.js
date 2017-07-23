// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


Vue.config.productionTip = false

//store处理loading
	// import Vuex from 'vuex'
	// Vue.use(Vuex)
	// const store = new Vuex.Store({}) // 这里你可能已经有其他 module
	// console.log(store)store.registerModule('vuxStore', { // 名字自己定义
	//   state: {
	//     isLoading: false
	//   },
	//   mutations: {
	//     updateLoadingStatus (state, payload) {
	//       state.isLoading = payload.isLoading
	//     }
	//   }
	// })
	// router.beforeEach(function (to, from, next) {
	//   store.commit('updateLoadingStatus', {isLoading: true})
	//   next()
	// })

	// router.afterEach(function (to) {
	//   store.commit('updateLoadingStatus', {isLoading: false})
	// })
	// Cannot read property 'state' of undefined"
	// 
	// 
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
