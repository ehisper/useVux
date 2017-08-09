import Vue from 'vue'
import Router from 'vue-router'

import Hello from '@/components/Hello'
import Dialog from '@/components/Dialog'
import Form from '@/components/Form'
import LayOut from '@/components/LayOut'

// import { WechatPlugin } from 'vux'
// Vue.use(WechatPlugin)
// console.log(Vue.wechat) // 可以直接访问 wx 对象。

import { AlertPlugin,ConfirmPlugin, LoadingPlugin,Actionsheet,ToastPlugin,debounce } from 'vux'
// import Vuex from 'vuex'
// Vue.use(Vuex)

Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(Actionsheet)
Vue.use(ToastPlugin)

Vue.use(Router)





export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/Dialog',
      name: 'Dialog',
      component: Dialog
    },
    {
      path: '/Form',
      name: 'Form',
      component: Form
    },
    {
      path: '/LayOut',
      name: 'LayOut',
      component: LayOut
    }
    //code splitting按需加载代码写法
 	// {
	//   path: '/somepath',
	//   component: function (resolve) {
	//     require(['./demos/somepath.vue'], resolve)
	//   }
	// }
  ]
})
