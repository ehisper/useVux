<template>
	<div class="layout">
		<group>
		    <x-switch title="showClocker" v-model="showClocker"></x-switch>
		</group>
		<group>
		    <x-switch title="showFlow" v-model="showFlow"></x-switch>
		</group>
		<div v-if="showFlow">	
			<flow>
			      <flow-state state="1" title="已付款" is-done></flow-state>
			      <flow-line is-done></flow-line>

			      <flow-state state="2" title="已发货" is-done></flow-state>
			      <flow-line tip="进行中" tip-direction="bottom"></flow-line>

			      <flow-state state="3" title="待收货"></flow-state>
			      <flow-line></flow-line>

			      <flow-state state="4" title="完成"></flow-state>
			</flow>
			<flow orientation="vertical" style="height:250px;">
			      <flow-state state="1" title="已付款" is-done></flow-state>
			      <flow-line is-done></flow-line>

			      <flow-state state="2" title="已发货" is-done></flow-state>
			      <flow-line tip="进行中"></flow-line>

			      <flow-state state="3" title="待收货"></flow-state>
			      <flow-line></flow-line>

			      <flow-state state="4" title="完成"></flow-state>
		    </flow>
		    <div>
				    <step v-model="step" background-color='#fbf9fe' gutter="20px">
				        <step-item :title="'done'" description="step 1"></step-item>
				        <step-item :title="'processing'" description="step 2"></step-item>
				        <step-item :title="'end'" description="step 3"></step-item>
				    </step>
				    <div class="btn_wrap">
				        <x-button type="primary" @click.native="nextStep">{{ 'next step' }}</x-button>
				    </div>
		    </div>
		    <timeline>
	            <timeline-item>
	                <h4 class="recent">【广东】 广州市 已发出</h4>
	                <p class="recent">2016-04-17 12:00:00</p>
	            </timeline-item>
	            <timeline-item>
	                <h4> 申通快递员 广东广州 收件员 xxx 已揽件</h4>
	                <p>2016-04-16 10:23:00</p>
	            </timeline-item>
	            <timeline-item>
	                <h4> 商家正在通知快递公司揽件</h4>
	                <p>2016-04-15 9:00:00</p>
	            </timeline-item>
	        </timeline>
		</div>
		<div v-if="showClocker">
			<group title="custom template">
		      <cell title="Date:0815">
		        <clocker time="2017-08-15" slot="value" @on-tick="tickClocker" @on-finish="finishClocker">
		          <span style="color:red">%D 天</span>
		          <span style="color:green">%H 小时</span>
		          <span style="color:blue">%M 分 %S 秒</span>
		        </clocker>
		      </cell>
		      <cell title="20170811">
		        <clocker time="2017-08-11" slot="value">
		          <span class="day">%_D1</span>
		          <span class="day">%_D2</span>天
		          <span class="day">%_H1</span>
		          <span class="day">%_H2</span>时
		          <span class="day">%_M1</span>
		          <span class="day">%_M2</span>分
		          <span class="day">%_S1</span>
		          <span class="day">%_S2</span>秒
		        </clocker>
		      </cell>
		    </group>
		</div>
		<group>
		    <x-switch title="showColorPicker" v-model="showColorPicker"></x-switch>
		</group>
		<div v-if="showColorPicker">
			<group title="as a cell's content">
		      <cell :title="'Color:' + color1">
		        <color-picker slot="value" :colors="colors1" v-model="color1" size="small"></color-picker>
		      </cell>
		    </group>
		</div>
		<group>
		    <x-switch title="showCountdown" v-model="showCountdown"></x-switch>
		</group>
		<div v-if="showCountdown">
			<group title="manually">
		      <x-switch title="start" v-model="startCountDown"></x-switch>
		      <cell title="15s">
		        <countdown slot="value" v-model="timeCountDown" :start="startCountDown" @on-finish="finishCountDown"></countdown>
		      </cell>
		    </group>
		</div>
		<group>
		    <x-switch title="showCountup" v-model="showCountup"></x-switch>
		</group>
		<div v-if="showCountup">
			 <countup :end-val="88.88" :start-val="66.66"  :duration="10" :decimals="2" class="demo1" :start="true" :tag="'span'"></countup>
		</div>
		<group>
		    <x-switch title="showIcon" v-model="showIcon"></x-switch>
		</group>
		<div v-if="showIcon">	
			<icon type="success"></icon>
			<icon type="info"></icon>
			<icon type="info-circle"></icon>
			<icon type="warn"></icon>
			<icon type="waiting"></icon>
			<icon type="waiting-circle"></icon>
			<icon type="safe-success"></icon>
			<icon type="safe-warn"></icon>
			<icon type="success-circle"></icon>
			<icon type="success-no-circle"></icon>
			<icon type="circle"></icon>
			<icon type="download"></icon>
			<icon type="cancel"></icon>
			<icon type="search"></icon>
			<icon type="clear" is-msg></icon>
			 <x-icon type="ios-ionic-outline" size="30"></x-icon>
		      <x-icon type="ios-arrow-back" size="30"></x-icon>
		      <x-icon type="ios-arrow-forward" size="30"></x-icon>
		      <x-icon type="ios-arrow-up" size="30"></x-icon>
		      <x-icon type="ios-arrow-right" size="30"></x-icon>
		      <x-icon type="ios-arrow-down" size="30"></x-icon>
		      <x-icon type="ios-arrow-left" size="30"></x-icon>
		      <x-icon type="ios-arrow-thin-up" size="30"></x-icon>
		      <x-icon type="ios-arrow-thin-right" size="30"></x-icon>
		      <x-icon type="ios-arrow-thin-down" size="30"></x-icon>
		      <x-icon type="ios-arrow-thin-left" size="30"></x-icon>
		      <x-icon type="ios-circle-filled" size="30"></x-icon>
		      <x-icon type="ios-circle-outline" size="30"></x-icon>
		      <x-icon type="ios-checkmark-empty" size="30"></x-icon>
		      <x-icon type="ios-checkmark-outline" size="30"></x-icon>
		      <x-icon type="ios-checkmark" size="30"></x-icon>
		      <x-icon type="ios-plus-empty" size="30"></x-icon>
		      <x-icon type="ios-plus-outline" size="30"></x-icon>
		      <x-icon type="ios-plus" size="30"></x-icon>
		      <x-icon type="ios-close-empty" size="30"></x-icon>
		      <x-icon type="ios-close-outline" size="30"></x-icon>
		      <x-icon type="ios-close" size="30"></x-icon>
		      <x-icon type="ios-minus-empty" size="30"></x-icon>
		      <x-icon type="ios-minus-outline" size="30"></x-icon>
		      <x-icon type="ios-minus" size="30"></x-icon>
		      <x-icon type="ios-information-empty" size="30"></x-icon>
		      <x-icon type="ios-information-outline" size="30"></x-icon>
		      <x-icon type="ios-information" size="30"></x-icon>
		      <x-icon type="ios-help-empty" size="30"></x-icon>
		      <x-icon type="ios-help-outline" size="30"></x-icon>
		      <x-icon type="ios-help" size="30"></x-icon>
		      <x-icon type="ios-search" size="30"></x-icon>
		      <x-icon type="ios-search-strong" size="30"></x-icon>
		      <x-icon type="ios-star" size="30"></x-icon>
		      <x-icon type="ios-star-half" size="30"></x-icon>
		      <x-icon type="ios-star-outline" size="30"></x-icon>
		      <x-icon type="ios-heart" size="30"></x-icon>
		      <x-icon type="ios-heart-outline" size="30"></x-icon>
			<inline-loading></inline-loading>
			<button @click="clickData">请求数据</button>
			<load-more :show-loading="showData" :tip="dataDes" background-color="#fbf9fe"></load-more>
			<group>
		      <cell v-for="(type, index) in typesSpinner" :title="type" :key="type" :inline-desc="index === 3 ? 'size=40px' : ''">
		        <spinner :type="type" slot="value" :size="index === 3 ? '40px' : ''"></spinner>
		      </cell>
		    </group>
		    <div>
		   	 <x-circle :percent="percent1" :stroke-width="10" stroke-color="#04BE02">
		        <span>{{percent1}}</span>
		      </x-circle>
	   		</div>
		</div>
		<group>
		    <x-switch title="showMarquee" v-model="showMarquee"></x-switch>
		</group>
		<div v-if="showMarquee">
			<group>
		      <cell :title="'News'">
		        <marquee :interval="2000" :duration="300" :direction="'up'">
		          <marquee-item v-for="i in 5" :key="i" @click.native="onClick(i)">{{ 'JavaScript is the best'}} {{i}}</marquee-item>
		        </marquee>
		      </cell>
		    </group>
		</div>
		<group>
		    <x-switch title="showMasker" v-model="showMasker"></x-switch>
		</group>
		<div v-if="showMasker">
		    <div style="margin: 10px;overflow: hidden;">
		      <masker style="border-radius: 2px;" color="F9C90C" :opacity="0.8" :fullscreen="false">
		      	<div><img src="../assets/logo.png" height="200" width="200" alt=""></div>
		        <div slot="content" class="m-title">
		          VUX
		          <br/>
		          <span class="m-time">2016-03-18</span>
		        </div>
		      </masker>
		    </div>
		</div>
		<group>
		    <x-switch title="showMsg" v-model="showMsg"></x-switch>
		</group>
		<div v-if="showMsg">
			 <msg :title="'Yeah! You make it'" :description="'msg description'" :buttons="buttons" :icon="icon"></msg>
		</div>
		<group>
		    <x-switch title="showPanel" v-model="showPanel"></x-switch>
		</group>
		<div v-if="showPanel">
			<group title="switch the type">
		     	 <radio title="type" v-model="type" :options="['1', '2']"></radio>
		    </group>
		    <panel header="图文组合列表" :footer="footer" :list="list" :type="type"></panel>
		</div>
		<group>
		    <x-switch title="showPopover" v-model="showPopover"></x-switch>
		</group>
		<div v-if="showPopover">
			<popover placement="top" style="margin: 20px;" @on-show="onShow" @on-hide="onHide">
		      <div slot="content" class="popover-demo-content">
		        hello world
		      </div>
		      <button class="btn btn-default">{{ 'Popover on top' }}</button>
		    </popover>
		</div>
		<group>
		    <x-switch title="showPreviewer" v-model="showPreviewer"></x-switch>
		</group>
		<!-- 图片预览 -->
		<div v-if="showPreviewer">
			<div>
			    <img class="previewer-demo-img" v-for="(item, index) in listPreviewer" :src="item.src" width="100" @click="show(index)">
			    <div v-transfer-dom>
			      <previewer :list="listPreviewer" ref="previewer" :options="options" @on-close="onClose"></previewer>
			    </div>
			</div>
		</div>
		<group>
		    <x-switch title="showQrcode" v-model="showQrcode"></x-switch>
		</group>
		<!-- 生成二维码 -->
		<div v-if="showQrcode">
			<qrcode value="https://vux.li?x-page=demo_qrcode" type="img"></qrcode>
			<!-- img可在微信长按识别 -->
			<qrcode :value="valueQrcode" :fg-color="fgColorQrcode" type="canvas"></qrcode>
		</div>
		<group>
		    <x-switch title="showSwiper" v-model="showSwiper"></x-switch>
		</group>
		<div v-if="showSwiper">	
			<tabbar>
			      <tabbar-item @on-item-click="onItemClick(0)">
			        <img slot="icon" src="../assets/imgs/icon_all.png">
			        <img slot="icon-active" src="../assets/imgs/icon_all_active.png">
			        <span slot="label">Wechat</span>
			      </tabbar-item @on-item-click="onItemClick(1)">
			      <tabbar-item show-dot>
			        <img slot="icon" src="../assets/imgs/icon_annuity.png">
			        <img slot="icon-active" src="../assets/imgs/icon_annuity_active.png">
			        <span slot="label">Message</span>
			      </tabbar-item>
			      <tabbar-item selected @on-item-click="onItemClick(2)">
			        <img slot="icon" src="../assets/imgs/icon_kid.png">
			        <img slot="icon-active" src="../assets/imgs/icon_kid_active.png">
			        <span slot="label">Explore</span>
			      </tabbar-item>
			      <tabbar-item badge="2" @on-item-click="onItemClick(3)">
			        <img slot="icon" src="../assets/imgs/icon_life.png">
			        <img slot="icon-active" src="../assets/imgs/icon_life_active.png">
			        <span slot="label">News</span>
			      </tabbar-item>
			</tabbar>
			<swiper :list="demo01_list" v-model="demo01_index" @on-index-change="demo01_onIndexChange"></swiper>
			<swiper auto :aspect-ratio="300/800" @on-index-change="onSwiperItemIndexChange" v-model="swiperItemIndex">
			      <swiper-item class="swiper-demo-img" v-for="(item, index) in demo04_list" :key="index">
			        <img :src="item">
			      </swiper-item>
		    </swiper>
		</div>
		<group>
		    <x-switch title="showEmotion" v-model="showEmotion"></x-switch>
		</group>
		<div v-if="showEmotion">
		 	<div v-for="item in listEmotion" class="vux-center-h">
		      <emotion>{{item}}</emotion><emotion is-gif>{{item}}</emotion>
		    </div>
		</div>
	   	<div>
	   		<div v-for="src in listXImg" style="background-color:yellow;text-align:center;">
		      <span style="font-size:20px;">Loading</span>
		      <x-img :src="src" :webp-src="`${src}?type=webp`" @on-success="success" @on-error="error" class="ximg-demo" error-class="ximg-error" :offset="-100" container="#vux_view_box_body"></x-img>
		    </div>
	   	</div>
	</div>		
</template>

<script>
import {  Tab, TabItem,Sticky ,Badge,Flexbox, FlexboxItem, Blur,Card,
	 Cell,Group,XSwitch ,Grid,GridItem,
 	XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem,
	ViewBox,Tabbar,
	Clocker,ColorPicker,Countdown,Countup,Drawer,
	Flow,FlowState,FlowLine,Icon,Spinner,InlineLoading,LoadMore,
	Marquee, MarqueeItem,Masker,Msg,
	Divider, XButton,Radio,Panel,Popover,Previewer ,Qrcode,
	Step, StepItem,  Swiper,SwiperItem , TabbarItem,Timeline, TimelineItem,
	WechatEmotion as Emotion,XCircle,XImg 
	  } from 'vux'


const baseList = [{
  url: 'javascript:',
  img: 'https://static.vux.li/demo/1.jpg',
  title: '送你一朵fua'
}, {
  url: 'javascript:',
  img: 'https://static.vux.li/demo/2.jpg',
  title: '送你一辆车'
}, {
  url: 'javascript:',
  img: 'https://static.vux.li/demo/3.jpg',
  title: '送你一次旅行'
}]

const imgList = [
  'http://placeholder.qiniudn.com/800x300/FF3B3B/ffffff',
  'http://placeholder.qiniudn.com/800x300/FFEF7D/ffffff',
  'http://placeholder.qiniudn.com/800x300/8AEEB1/ffffff'
]

export default {
	name: 'LittleTool',
	data () {
		return {
			showClocker: false,
			showColorPicker: false,
			color1:'#FFEF7D',
			colors1: ['#FF3B3B', '#FFEF7D', '#8AEEB1', '#8B8AEE', '#CC68F8', '#fff'],
			showCountdown: false,
			startCountDown: false,
			timeCountDown: 15,
			showCountup: false,
			showFlow: false,
			showIcon: false,
			showData: false,
			dataDes: '暂无数据',
			showMarquee: false,
			showMasker: false,
			showMsg: false,
			buttons: [{
		        type: 'primary',
		        text: 'primary button',
		        onClick: this.changeIcon.bind(this)
		      }, {
		        type: 'default',
		        text: 'secondary button',
		        link: '/'
		      }],
		    icon: '',
		    showPanel: false,
		    type: '1',
		    list: [{
		        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
		        title: '标题一',
		        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
		        url: '/component/cell'
		      }, {
		        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
		        title: '标题二',
		        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
		        url: {
		          path: '/component/radio',
		          replace: false
		        },
		        meta: {
		          source: '来源信息',
		          date: '时间',
		          other: '其他信息'
		        }
		      }],
		    footer: {
		        title: '查看更多',
		        url: 'http://vux.li'
		      },
		    showPopover: false,
		    showPreviewer: false,
		    listPreviewer: [{
		        src: 'https://ooo.0o0.ooo/2017/05/17/591c271ab71b1.jpg',
		        w: 800,
		        h: 400
		      },
		      {
		        src: 'https://ooo.0o0.ooo/2017/05/17/591c271acea7c.jpg'
		      }, {
		        src: 'https://ooo.0o0.ooo/2017/06/15/59425a592b949.jpeg'
		      }],
		    options: {
		        getThumbBoundsFn (index) {
		          // find thumbnail element
		          let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
		          // get window scroll Y
		          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
		          // optionally get horizontal scroll
		          // get position of element relative to viewport
		          let rect = thumbnail.getBoundingClientRect()
		          // w = width
		          return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
		          // Good guide on how to get element coordinates:
		          // http://javascript.info/tutorial/coordinates
		        }
		    },
		    valueQrcode: 'https://vux.li',
		    fgColorQrcode: '#66ff00',
		    showQrcode: false,
		    typesSpinner: ['android', 'ios', 'ios-small', 'bubbles', 'circles', 'crescent', 'dots', 'lines', 'ripple', 'spiral'],
		    step: 1,
		    demo01_list: baseList,
		    demo01_index: 0,
		     demo04_list: imgList,
		     swiperItemIndex: 1,
		     showSwiper: false,
		     showEmotion: false,
		     listEmotion:['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '可爱', '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂', '疑问', '嘘', '晕', '折磨', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电', '炸弹', '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引', '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '挥手', '激动', '街舞', '献吻', '左太极', '右太极'],
		    percent1: 10,
		    listXImg: [
		        'https://o5omsejde.qnssl.com/demo/test1.jpg',
		        'https://o5omsejde.qnssl.com/demo/test2.jpg',
		        'https://o5omsejde.qnssl.com/demo/test0.jpg',
		        'https://o5omsejde.qnssl.com/demo/test4.jpg',
		      ]
		}
	},
	methods:{
		finishClocker () {

		},
		tickClocker () {
			// 时间计算时触发，但非精确每1s触发
		},
		finishCountDown　(){
			this.startCountDown = false
      		this.timeCountDown = 20
		},
		clickData () {
			this.showData = true
			this.dataDes= '请求数据'
		},
		onClick (i) {
	      console.log(i)
	    },
	    changeIcon () {
		      if (!this.icon || this.icon === 'success') {
		        this.icon = 'warn'
		        return
		      }
		      if (this.icon === 'warn') {
		        this.icon = 'info'
		        return
		      }
		      if (this.icon === 'info') {
		        this.icon = 'waiting'
		        return
		      }
		      if (this.icon === 'waiting') {
		        this.icon = 'success'
		      }
	    },
	    onShow () {},onHide() {},
	    show (index) {
		      this.$refs.previewer.show(index)
		      // 
		      console.log(this.$refs.previewer)
		},
		onClose(){},
		nextStep () {
	      this.step++
	    },
	    demo01_onIndexChange (index) {
	      this.demo01_index = index
	    },
	    onSwiperItemIndexChange (index) {
	      console.log('demo item change', index)
	    },
	    onItemClick (index) {
	    	 this.demo01_index = index
	    },
	    success (src, ele) {
	      console.log('success load', src)
	      const span = ele.parentNode.querySelector('span')
	      ele.parentNode.removeChild(span)
	    },
	    error (src, ele, msg) {
	      console.log('error load', msg, src)
	      const span = ele.parentNode.querySelector('span')
	      span.innerText = 'load error'
	    }
	},
	directives:{
		TransferDom
	},
	ready () {
	},
	mounted () {
	},
	watch:{
	},
	components: {
		Tab, TabItem,Sticky ,Badge,Flexbox, FlexboxItem, Blur,Card,
 		Cell,Group,XSwitch ,Grid,GridItem,
 		XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem,
		ViewBox,Tabbar,
		Clocker ,ColorPicker,Countdown,Countup,Drawer,
		Flow,FlowState,FlowLine,Icon,Spinner,InlineLoading,LoadMore,
		Marquee, MarqueeItem ,Masker ,Msg ,Divider, XButton,Radio ,Panel,Popover ,Previewer,Qrcode,
		Step, StepItem, Swiper, SwiperItem, TabbarItem, Timeline, TimelineItem,
		Emotion,XCircle,XImg 
		

	}
}
</script>
<style scoped lang="less">
	@import '~vux/src/styles/1px.less';
	@import '~vux/src/styles/close.less';
	.day {
	  background-color:#000;
	  color:#fff;
	  text-align:center;
	  display:inline-block;
	  padding:0 3px;
	  border-radius:3px;
	}
	.demo1 {
	  font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
	  font-size: 6em;
	  color: #04BE02;
	}
	.btn_wrap {
	  padding: 0 1rem;
	  margin-top: 2rem;
	}
	.ximg-demo {
	  width: 100%;
	  height: auto;
	}
	.ximg-error {
	  background-color: yellow;
	}
	.ximg-error:after {
	  content: '加载失败';
	  color: red;
	}
</style>

