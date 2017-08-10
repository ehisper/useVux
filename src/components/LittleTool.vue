<template>
	<div class="layout">
		<group>
		    <x-switch title="showClocker" v-model="showClocker"></x-switch>
		</group>
		<group>
		    <x-switch title="showColorPicker" v-model="showColorPicker"></x-switch>
		</group>
		<group>
		    <x-switch title="showCountdown" v-model="showCountdown"></x-switch>
		</group>
		<group>
		    <x-switch title="showCountup" v-model="showCountup"></x-switch>
		</group>
		<group>
		    <x-switch title="showFlow" v-model="showFlow"></x-switch>
		</group>
		<group>
		    <x-switch title="showIcon" v-model="showIcon"></x-switch>
		</group>
		<group>
		    <x-switch title="showMarquee" v-model="showMarquee"></x-switch>
		</group>
		<group>
		    <x-switch title="showMasker" v-model="showMasker"></x-switch>
		</group>
		<group>
		    <x-switch title="showMsg" v-model="showMsg"></x-switch>
		</group>
		<group>
		    <x-switch title="showPanel" v-model="showPanel"></x-switch>
		</group>
		<group>
		    <x-switch title="showPopover" v-model="showPopover"></x-switch>
		</group>
		<group>
		    <x-switch title="showPreviewer" v-model="showPreviewer"></x-switch>
		</group>
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
		<div v-if="showColorPicker">
			<group title="as a cell's content">
		      <cell :title="'Color:' + color1">
		        <color-picker slot="value" :colors="colors1" v-model="color1" size="small"></color-picker>
		      </cell>
		    </group>
		</div>
		<div v-if="showCountdown">
			<group title="manually">
		      <x-switch title="start" v-model="startCountDown"></x-switch>
		      <cell title="15s">
		        <countdown slot="value" v-model="timeCountDown" :start="startCountDown" @on-finish="finishCountDown"></countdown>
		      </cell>
		    </group>
		</div>
		<div v-if="showCountup">
			 <countup :end-val="88.88" :start-val="66.66"  :duration="10" :decimals="2" class="demo1" :start="true" :tag="'span'"></countup>
		</div>
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
		</div>
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
			<inline-loading></inline-loading>
			<button @click="clickData">请求数据</button>
			<load-more :show-loading="showData" :tip="dataDes" background-color="#fbf9fe"></load-more>
		</div>
		<div v-if="showMarquee">
			<group>
		      <cell :title="'News'">
		        <marquee :interval="2000" :duration="300" :direction="'up'">
		          <marquee-item v-for="i in 5" :key="i" @click.native="onClick(i)">{{ 'JavaScript is the best'}} {{i}}</marquee-item>
		        </marquee>
		      </cell>
		    </group>
		</div>
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
		<div v-if="showMsg">
			 <msg :title="'Yeah! You make it'" :description="'msg description'" :buttons="buttons" :icon="icon"></msg>
		</div>
		<div v-if="showPanel">
			<group title="switch the type">
		     	 <radio title="type" v-model="type" :options="['1', '2']"></radio>
		    </group>
		    <panel header="图文组合列表" :footer="footer" :list="list" :type="type"></panel>
		</div>
		<div v-if="showPopover">
			<popover placement="top" style="margin: 20px;" @on-show="onShow" @on-hide="onHide">
		      <div slot="content" class="popover-demo-content">
		        hello world
		      </div>
		      <button class="btn btn-default">{{ 'Popover on top' }}</button>
		    </popover>
		</div>
		<div v-if="showPreviewer">
			<div>
			    <img class="previewer-demo-img" v-for="(item, index) in listPreviewer" :src="item.src" width="100" @click="show(index)">
			    <div v-transfer-dom>
			      <previewer :list="listPreviewer" ref="previewer" :options="options"></previewer>
			    </div>
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
	Flow,FlowState,FlowLine,Icon,InlineLoading,LoadMore,
	Marquee, MarqueeItem,Masker,Msg,
	Divider, XButton,Radio,Panel,Popover,Previewer     } from 'vux'
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
		Flow,FlowState,FlowLine,Icon,InlineLoading,LoadMore,
		Marquee, MarqueeItem ,Masker ,Msg ,Divider, XButton,Radio ,Panel,Popover 

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
</style>

