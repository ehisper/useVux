<template>
	<div class="dialog">
		<button @click="alertHandler">alert</button>
		<button @click="confirmHandler">confirm</button>
		<button @click="loadingHandler">loading</button>
		<button @click="actionsheetHandler">actionsheet</button>
		<button @click="popupHandler">popup</button>
		<button @click="toastHandler">toast</button>
		<button @click="dialogHandler">dialog</button>
		<actionsheet v-model="show1" 
			:menus="menus1"   
			theme="android"
			show-cancel
			:close-on-clicking-mask="true" 
			@on-click-mask="clickMask"
			@on-click-menu="clickMenu"
			@on-click-menu-delete="clickMenuDelete"
			>
	    </actionsheet>
	    <div >
		    <popup v-model="show" 
		    	is-transparent
		    	position="left" 
		    	width="100%"
		    	>
		        <div class="popup0">
		          <group>
		            <x-switch title="Another XSwitcher" v-model="show"></x-switch>
		            <x-switch title="Show Toast" v-model="show"></x-switch>
		          </group>
		        </div>
		    </popup>
		    <!-- <popup
		    	height="50%"
		    	@on-hide="log('hide')" 
		    	@on-show="log('show')"
		    	@on-first-show="resetScroller
		    	:hide-on-blur=true">
		    	<scroller height="100px" lock-x style="border:1px solid red;" ref="scroller">
		          <div>
		            <p v-for="i of 10">{{i}}</p>
		          </div>
		        </scroller>
		    </popup> -->
		</div>
		<div v-transfer-dom>
		    <x-dialog v-model="show2" class="dialog-demo">
		        <div class="img-box">
		          <img src="../assets/logo.png" style="max-width:100%">
		        </div>
		        <div @click="show2=false">
		          <span class="vux-close">×</span>
		        </div>
		    </x-dialog>
	    </div>
	</div>
</template>

<script>
import { XDialog,Group,XSwitch,Actionsheet,Popup,Scroller,debounce,dateFormat,numberComma, numberPad, numberRandom,querystring,TransferDomDirective as TransferDom } from 'vux'
export default {
	name: 'Dialog',
	data () {
		return {
			msg: 'Welcome to Your Vue.js App',
			show: false,
			show1: false,
			show2: false,
			menus1: {
		        menu1: 'Share to friends',
		        menu2: 'Share to timeline'
		      },

		}
	},
	directives: {
		TransferDom
	},
	methods:{

		alertHandler(){
			this.alertFn();
			// let _this = this;
			// debounce(_this.alertFn, 100,{leading:false,maxWait:200,trailing:false})//没测出来
		},
		confirmHandler () {
			// this.$vux.confirm.show({
			// 	title: 'Vux is Cool',
			// 	content: 'Do you agree?',
			// 	buttonText: 'ok',
			// 	// maskTransition: 'vux-fade',
			// 	// dialogTransition:'vux-dialog',
			// 	onShow () {
			// 	},
			// 	onHide () {
			// 	},
			// 	onCancel () {
			// 	  },
			// 	onConfirm () {}

			// })

			// this.$vux.confirm.hide()
			this.$vux.confirm.prompt('placeholder', {
				theme: 'android',
				title: '请输入密码',
				// confirmText: '',
				// cancelText: '',
			  	onCancel () {},
			  	onConfirm (value) { alert(value)},
			  	closeOnConfirm: true//是否在点击确认按钮时自动关闭

			})
		},
		loadingHandler () {
			this.$vux.loading.show({
		        text: 'Loading'
		    })
		    setTimeout(() => {
		        this.$vux.loading.hide()
		    }, 2000)
		},
		popupHandler () {
			this.show = !this.show;
		},
		dialogHandler () {
			this.show2 = !this.show2;
		},
		toastHandler () {
			this.$vux.toast.show({
			 	text: 'Loading',
			 	time: 2000,
			 	type: 'success',
			 	// warn, cancel, text
			 	width: '50px',
			 	text:'',
			 	position: 'middle',
			 	isShowMask: true
			})
		},
		actionsheetHandler () {
			this.show1 = !this.show6;
		},
		clickMenu (key) {
			console.log(key)
		},
		clickMask () {
			console.log('on click mask')
		},
		clickMenuDelete () {
			console.log('clickMenuDelete')
		},
		alertFn () {
			// 在 ViewBox 或者 overflow-scrolling:touch 的容器中使用时，请使用 prop:transfer-dom 来解决其引起的 z-index 失效问题。详细参考 demo。外加div v-transfer-dom
			this.$vux.alert.show({
				title: 'Vux is Cool',
				content: 'Do you agree?',
				buttonText: 'ok',
				// maskTransition: 'vux-fade',
				// dialogTransition:'vux-dialog',
				onShow () {
					console.log('Plugin: I\'m showing')
				},
				onHide () {
					console.log('Plugin: I\'m hiding')
				}
			})
			// this.$vux.alert.hide()
		},
		resetScroller () {
	      this.$nextTick(() => {
	        this.$refs.scroller.reset()
	      })
	    },
		log (str) {
	      console.log(str)
	    }
	},

	mounted () {
		//日期格式化插件
		console.log(dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss'))
		//数字格式化插件
		console.log(numberComma(21342132, 4)) // 2134,2132
		// numberPad(234, 4) // 0234
		// numberRandom(1, 7) // 2
		// url参数解析
		console.log(querystring.parse('a=b&c=d'))// {a:'b',c:'d'}, 默认参数为 location.search
		console.log(querystring.stringify({a:'b',c:'d'})) // 'a=b&c=d'，注意不支持复杂嵌套的结构
	},
	components: {
		debounce,
		dateFormat,
		Actionsheet,//需在当面页面来引入
		Popup,//遮罩层
		XSwitch,
		Group,
		Scroller,
		XDialog
	}
}
</script>
<style scoped>
	@import '~vux/src/styles/close.less';
</style>
