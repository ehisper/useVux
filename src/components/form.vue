<template>
	<div class="form">
		  	<group :title="'use cell-form-preview'">
		    	<cell title="Total" value="￥1024"></cell>
		    	<cell-form-preview :list="list" :border-intent="false"></cell-form-preview>
		  	</group>
		  	<group :title="'use is-link to show arrow'">
			      	<cell is-link>
			        	<span slot="title" style="color:green;"><span style="vertical-align:middle;">{{ 'Important News' }}</span> <badge text="1"></badge></span>
			      	</cell>
			      	<cell :title="'General'" 
			      		is-link
				      :border-intent="false"
				      :arrow-direction="showContent001 ? 'up' : 'down'"
				      @click.native="showContent001 = !showContent001">
			        	<img slot="icon" width="20" style="display:block;margin-right:5px;" src="data:image/  png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/  t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/  OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/  iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/  pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=">
			        </cell>
				    <template v-if="showContent001">
				        <cell-box :border-intent="false" class="sub-item" is-link>content 001</cell-box>
					    <cell :title="'Go to Radio Demo'" link="/Dialog" inline-desc='link="/Dialog"'></cell>
				    </template>
		    </group>
			
			
			<div class="box">
			    <divider>{{ 'radio:no default value' }} {{demo5}}</divider>
    			<checker
					    v-model="demo5"
					    default-item-class="demo5-item"
					    selected-item-class="demo5-item-selected"
					    disabled-item-class="demo4-item-disabled"
					    >
			      <checker-item v-for="i in [1, 2, 3]" :key="i" :value="i">￥{{i*300}}</checker-item>
			    </checker>
			    <br/>
				<checker v-model="demo22" type="checkbox" default-item-class="demo1-item" selected-item-class="demo1-item-selected"
				:max="2">
			        <checker-item :value="item" v-for="(item, index) in items1" :key="index"
			        @on-item-click="onItemClick">{{item.value}}</checker-item>
			      </checker>
			      <br>
			      <span>{{ 'current value is' }}: {{demo22}}</span>
			</div>
	</div>		
</template>

<script>
import { CellFormPreview, Group, Cell , Badge ,CellBox,Checker, CheckerItem, Divider,Popup} from 'vux'
export default {
	name: 'Dialog',
	data () {
		return {
			list: [{
		        label: 'Apple',
		        value: '3.29'
		      }, {
		        label: 'Banana',
		        value: '1.04'
		      }, {
		        label: 'Fish',
		        value: '8.00'
		      }],
		    showContent001: false,
		    demo1: 0,
		    demo5: 1,
		    demo22: [{key: '2', value: 'B'}],
		    items1: [{
		        key: '1',
		        value: 'A'
		      }, {
		        key: '2',
		        value: 'B'
		      }, {
		        key: '3',
		        value: 'C'
		      }]
		}
	},
	// directives: {
	// 	TransferDom
	// },
	methods:{
		onItemClick(itemValue, itemDisabled) {
			
		}
	},

	mounted () {
	},
	components: {
		CellFormPreview,
	    Group,
	    Cell,
	    Badge,
	    CellBox,
	    Checker, CheckerItem, Divider,Popup
	}
}
</script>
<style scoped>
	/* @import '~vux/src/styles/reset.less'; */
	.sub-item {
  color: #888;
}
.slide {
  padding: 0 20px;
  overflow: hidden;
  max-height: 0;
  transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
}
.animate {
  max-height: 9999px;
  transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
  transition-delay: 0s;
}
.box {
  padding: 0 15px;
}
.demo1-item {
  border: 1px solid #ececec;
  padding: 5px 15px;
}
.demo1-item-selected {
  border: 1px solid green;
}
.demo5-item {
  width: 100px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  border-radius: 3px;
  border: 1px solid #ccc;
  background-color: #fff;
  margin-right: 6px;
}
.demo5-item-selected {
  /* background: #ffffff url(../assets/demo/checker/active.png) no-repeat right bottom; */
  border-color: #ff4a00;
}
</style>
