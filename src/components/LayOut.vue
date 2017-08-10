<template>
	<div class="layout">
		<group>
		    <x-switch title="showGrid" v-model="showGrid"></x-switch>
		    <x-switch title="showXHeader" v-model="showXHeader"></x-switch>
		    <x-switch title="showViewBox" v-model="showViewBox"></x-switch>
		</group>
		<div v-if="showGrid">
			<grid :rows="5">
		      	<grid-item v-for="i in 5" :key="i" link="/Form">
			        <span class="grid-center">{{i}}</span>
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
import { Group,XSwitch ,Grid,GridItem,
		XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem,
		ViewBox,Tabbar } from 'vux'

export default {
	name: 'LatOut',
	data () {
		return {
			showGrid:false,
			showXHeader: false,
			showMenus: false,
			menus:  {
		        menu1: 'Take Photo',
		        menu2: 'Choose from photos'
		      },
		    showViewBox: false,
		}
			
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
		Group,XSwitch ,Grid,GridItem,
		XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem,
		ViewBox ,Tabbar

	}
}
</script>
<style scoped>
	html, body {
	    height: 100%;
	    width: 100%;
	    overflow-x: hidden;
	  }
</style>

