<template>
	<div class="form">
			<button @click="showCell = !showCell">cell</button>
			<button @click="showCheck = !showCheck">Check</button>
			<button @click="showDateTime = !showDateTime">DateTime</button>
			<button @click="showFormPreview = !showFormPreview">FormPreview</button>
			<button @click="showPicker = !showPicker">Picker</button>
		  	<div v-if="showCell">
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
		  	</div>
			<div v-if="showCheck">	
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

				<checklist :title="'handle errors'" required :options="commonList"  v-model="checklist0011" @on-change="change" show-error @on-error="onError" @on-clear-error="onNoError" name="demo1" :max="2">
			      	<p slot="footer" v-show="error" class="error">{{error}}</p>
			    </checklist>
				<cell title="checklist值" :value="checklist0011"></cell>

				 <checklist :title="'preselect China and Japan(disabled)'"  random-order disabled label-position="left" :options="commonList" v-model="checklist002" @on-change="change"></checklist>
				 <checklist :title="'Option is Object with InlineDesc'" :options="inlineDescList" v-model="inlineDescListValue" @on-change="change"></checklist>
			</div>
			<div v-if="showDateTime">
				<div>
				    <group :title="value + ''">
				      	<datetime-range :title="'Choose'" start-date="2017-01-01" end-date="2017-02-02" format="YYYY-MM-DD" v-model="value" @on-change="change"></datetime-range>
				    </group>
				</div>
				<x-button type="primary" plain @click.native="showDateTimePlugin">{{ 'Used as a plugin(Hide in 2s)'}}</x-button>
				<group :title="'custom minute list: every 15 minutes.hour list'">
			      <datetime :title="'Birthday'" v-model="minuteListValue" format="YYYY-MM-DD HH:mm" :readonly="false"
			      	:placeholder="'Please select'"
			      	:minute-list="['00', '15', '30', '45']" :hour-list="['09', '10', '11', '12', '13', '14', '15', '16']"
			      	:min-hour=9 :max-hour=15
			      	:start-date="startDate" :end-date="endDate"
					:min-year=2016
					confirm-text = 'ok'
					clear-text="clear"
					@on-clear="clearValue"
			      	@on-change="change" ></datetime>
			    </group>
			</div>
			<div v-if="showFormPreview">
					<form-preview :header-label="'付款金额'" header-value="¥2400.00" :body-items="list" :footer-buttons="buttons1" name="FormPreview"></form-preview>
			</div>
			<div v-if="showPicker">
				
			</div>

	</div>		
</template>

<script>
import { CellFormPreview, Group, Cell , Badge ,CellBox,Checker, CheckerItem,Checklist,DatetimeRange ,Datetime,XButton ,FormPreview, InlineCalendar ,Divider,Popup} from 'vux'
export default {
	name: 'Dialog',
	data () {
		return {
			showCell:false,
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
		    showCheck:false,
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
		      }],
		    labelPosition:'',//left
			checklist0011:[],
			checklist002:['China'],
			commonList:[ 'China', 'Japan', 'America' ],
			error: '',
			inlineDescList: [
		        {key: '1', value: 'tiger is good', inlineDesc: 'Tiger is the king of mountain'},
		        {key: '2', value: 'lion is better', inlineDesc: 'Lion is the king of woods'},
		        {key: '3', value: 'camel is best, no inline-desc'}
		    ],
		    inlineDescListValue: [1],
		    showDateTime:false,
		    value: ['2017-01-15', '03', '05'],
		    startDate: '2015-11-11',
      		endDate: '2017-10-11',
      		minuteListValue: '2017-06-12 09:00',
      		showFormPreview:false,
      		list: [{
		        label: '商品',
		        value: '电动打蛋机'
		      }, {
		        label: '标题标题',
		        value: '名字名字名字'
		      }, {
		        label: '标题标题',
		        value: '很长很长的名字很长很长的名字很长很长的名字很长很长的名字很长很长的名字'
		      }],
		    buttons1: [{
		        style: 'default',
		        text: '辅助操作'
		      }, {
		        style: 'primary',
		        text: '跳转到首页',
		        link: '/'
		      },
		      {
		        style: 'primary',
		        text: '点击事件',
		        onButtonClick: (name) => {
		          alert(`clicking ${name}`)
		        }
		    }],
		    showPicker: false,

		}
			
	},
	// directives: {
	// 	TransferDom
	// },
	methods:{
		onItemClick(itemValue, itemDisabled) {
			
		},
		change(){

		},
		clearValue (value) {
	      this.$data.minuteListValue = ''
	    },
		onError (errors) {
	      console.log(errors)
	      this.error = errors
	    },
	    onNoError () {
	      this.error = null
	    },
	    showDateTimePlugin () {
	    	//this.$vux.datetime  undefined
		      this.$vux.datetime.show({
		        cancelText: '取消',
		        confirmText: '确定',
		        format: 'YYYY-MM-DD HH',
		        value: '2017-05-20 18',
		        onConfirm (val) {
		          console.log('plugin confirm', val)
		        },
		        onShow () {
		          console.log('plugin show')
		        },
		        onHide () {
		          console.log('plugin hide')
		        }
		      })
		    },
	},

	mounted () {
	},
	components: {
		CellFormPreview,
	    Group,
	    Cell,
	    Badge,
	    CellBox,
	    Checker, CheckerItem, Checklist,DatetimeRange,Datetime,XButton,FormPreview,InlineCalendar ,Divider,Popup
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
