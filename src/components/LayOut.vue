<template>
	<div class="layout">
		
		<div v-if="showSticky">
			<div class="space-btn" @click="spaceChange">显示间隔</div>
		    <div class="space" v-if="showSpace">间隔</div>
		    <div style="height:44px;">
		      <sticky scroll-box="vux_view_box_body" ref="sticky" :offset="46" :check-sticky-support="false">
		        <tab :line-width="1">
		          <tab-item selected>正在正映</tab-item>
		          <tab-item>即将上映</tab-item>
		        </tab>
		      </sticky>
		    </div>
		    <p v-for="i in 100">{{i}}<br></p>
		</div>
		<div v-if="showBadge">
			<group :title="'Used in a Cell'">
		      <cell :title="'red dot'" is-link>
		        <div class="badge-value" slot="value">
		          <span class="vertical-middle">{{'New Message' }} &nbsp;</span>
		          <badge></badge>
		        </div>
		      </cell>
		      </cell>
		      <cell :title="'Big Number'" is-link>
		        <div class="badge-value" slot="value">
		          <span class="vertical-middle">{{ 'New Message' }} &nbsp;</span>
		          <badge text="888"></badge>
		        </div>
		      </cell>
		    </group>
		</div>
		<div v-if="showBlur">
			<div style="">
			    <blur :blur-amount=40 :url="url">
			      <p class="center"><img :src="url"></p>
			    </blur>
			    <flexbox :gutter="0">
			      	<flexbox-item v-for="(img, index) in images" :key="index"><img :src="img" style="width:100%" @click="url = img"/></flexbox-item>
			    </flexbox>
			</div>
		</div>
		<div v-if="showCard">
			<card :header="{title:'我的钱包'}">
		      <div slot="content" class="card-demo-flex card-demo-content01">
		        <div class="vux-1px-l vux-1px-r">
		          <span>1130</span>
		          <br/>
		          京豆
		        </div>
		        <div class="vux-1px-r">
		          <span>15</span>
		          <br/>
		          京东券
		        </div>
		        <div class="vux-1px-r">
		          <span>0</span>
		          <br/>
		          京东卡/E卡
		        </div>
		        <div>
		          <span>88</span>
		          <br/>
		          七天待还
		        </div>
		      </div>
		    </card>
		</div>
		<group>
		    <x-switch title="showSticky" v-model="showSticky"></x-switch>
		</group>
		<group>
		    <x-switch title="showBadge" v-model="showBadge"></x-switch>
		</group>
		<group>
		    <x-switch title="showGrid" v-model="showGrid"></x-switch>
		    <x-switch title="showXHeader" v-model="showXHeader"></x-switch>
		    <x-switch title="showViewBox" v-model="showViewBox"></x-switch>
		</group>
		<group>
		    <x-switch title="showBlur" v-model="showBlur"></x-switch>
		</group>
		<group>
		    <x-switch title="showCard" v-model="showCard"></x-switch>
		</group>
		<div v-if="showGrid">
			<grid :rows="5">
		      	<grid-item v-for="i in 5" :key="i" link="/Form">
			        <span class="grid-center vux-close vux-1px">{{i}}</span>
			    </grid-item>
		    </grid>
		</div>
		<div v-if="showXHeader">		
			<x-header :title="'xheader'" 
				:left-options="{showBack: true,backText: '返回',preventGoBack: false}"
				:right-options="{showMore: true}" 
				@on-click-more="showMenus = true"
				@on-click-back="showMenus = true"
				@on-click-title="showMenus = true">
			</x-header>
			<x-header title="slot:overwrite-title">
		      <div class="overwrite-title-demo" slot="overwrite-title">
		        <button-tab>
		          <button-tab-item selected>A</button-tab-item>
		          <button-tab-item>B</button-tab-item>
		        </button-tab>
		      </div>
		    </x-header>
			<div v-transfer-dom>
		      	<actionsheet :menus="menus" v-model="showMenus" show-cancel></actionsheet>
		    </div>

		</div>
		<div v-if="showViewBox" style="height:100%;" ref="showViewBox">
			<view-box ref="viewBox" body-padding-top="60px" body-padding-bottom="60px" >
			     <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;"></x-header>
			     <div>
			     	<div style="height:60px;" >中间部分</div>
			     	<div style="height:60px;">中间部分</div>
			     	<div style="height:60px;">中间部分</div>
			     	<div style="height:60px;">中间部分</div>
			     	<div style="height:60px;" @click="clickHandler">click中间部分</div>
			     	<div style="height:60px;">中间部分</div>
			     	<div style="height:60px;">中间部分</div>
			     	<div style="height:60px;">中间部分</div>
			     	<div style="height:60px;">中间部分</div>
			     	<div style="height:60px;">中间部分</div>
			     </div>
			     <tabbar slot="bottom"></tabbar>
		   </view-box>
		</div>
	</div>		
</template>

<script>
import {  Tab, TabItem,Sticky ,Badge,Flexbox, FlexboxItem, Blur,Card,
 Cell,Group,XSwitch ,Grid,GridItem} from 'vux'

export default {
	name: 'LatOut',
	data () {
		return {
			showSticky: false,
			showSpace:false,
			showBadge: false,
			showBlur: false,
			images: [
		        'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg',
		        'https://o3e85j0cv.qnssl.com/waterway-107810__340.jpg',
		        'https://o3e85j0cv.qnssl.com/hot-chocolate-1068703__340.jpg'
		      ],
		    url: 'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg',
		    showCard: false,
			showGrid:false,
			showXHeader: false,
			showMenus: false,
			menus:  {
		        menu1: 'Take Photo',
		        menu2: 'Choose from photos'
		      },
		    showViewBox: false,
			
	},
	methods:{
		clickHandler () {
			// this.$refs.viewBox.scrollTo()
			console.log(this.$refs.viewBox.getScrollBody())
		}
	},
	directives:{
		TransferDom
	},
	mounted () {
	},
	watch:{
	},
	components: {
		 Tab, TabItem,Sticky ,
		 Badge, Cell, 
		 Flexbox, FlexboxItem, Blur,Card,
		Group,XSwitch ,Grid,GridItem
	}
}
</script>
<style scoped lang="less">
	@import '~vux/src/styles/1px.less';
	@import '~vux/src/styles/close.less';
	.badge-value {
	  display: inline-block!important;
	}
	.vertical-middle {
	  vertical-align: middle;
	}
	.center {
	  text-align: center;
	  padding-top: 20px;
	  color: #fff;
	  font-size: 18px;
	}
	.center img {
	  width: 100px;
	  height: 100px;
	  border-radius: 50%;
	  border: 4px solid #ececec;
	}
	.card-demo-flex {
	  display: flex;
	}
	.card-demo-content01 {
	  padding: 10px 0;
	}
	.card-padding {
	  padding: 15px;
	}
	.card-demo-flex > div {
	  flex: 1;
	  text-align: center;
	  font-size: 12px;
	}
	.card-demo-flex span {
	  color: #f74c31;
	}
</style>

