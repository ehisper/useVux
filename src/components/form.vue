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

				<group title="fill mode with custom placeholder and label">
			      <radio fill-mode fill-label="Other" fill-placeholder="填写其他的哦" :options="radio001" v-model="radio001Value" @on-change="changeRadio" disabled></radio>
			    </group>
			    <group title="object options">
			      <radio  :options="radio003" @on-change="changeRadio" v-model="radio002Value"></radio>
			    </group>

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

			    <inline-calendar
					  class="inline-calendar-demo"
					  :show.sync="showCalendar"
					  v-model="valueCalendar"
					  start-date="2016-04-01"
					  end-date="2018-05-30"
					  :range="rangeCalendar"
					  :show-last-month="showLastMonth"
					  :show-next-month="showNextMonth"
					  :highlight-weekend="highlightWeekend"
					  :return-six-rows="return6Rows"
					  :hide-header="hideHeader"
					  :hide-week-list="hideWeekList"
					  :replace-text-list="replaceTextList"
					  :weeks-list="weeksList"
					  :render-function="buildSlotFn"
					  :disable-past="disablePast"
					  :disable-future="disableFuture"
					  @on-change="changCalendar">
				</inline-calendar>
				<cell title="current valueCalendar" :value="valueCalendar"></cell>
				<group title="control days" style="margin-top: 30px;">
				    <x-switch v-model="disablePast" title="Disable Past"></x-switch>
				    <x-switch v-model="disableFuture" title="Disable Future"></x-switch>
				    <x-switch v-model="showLastMonth" title="Show Last Month"></x-switch>
				    <x-switch v-model="showNextMonth" title="Show Next Month"></x-switch>
				    <x-switch v-model="return6Rows" inline-desc="if not, the calendar's height would change" title="Always show 6 rows"></x-switch>
				    <x-switch v-model="highlightWeekend" title="highlight weekend"></x-switch>
				    <x-switch v-model="hideHeader" title="Hide header"></x-switch>
				    <x-switch v-model="hideWeekList" title="Hide week list"></x-switch>
				    <x-switch v-model="changeWeeksList" title="Change weeks list"></x-switch>
				    <x-switch v-model="replace" title="Replace date text"></x-switch>
				    <x-button type="primary" @click.native="valueCalendar='TODAY'">Set time to today</x-button>
				    <x-switch v-model="useCustomFn" inline-desc="Add red dot for dates with 8" title="add custom contents in day cell"></x-switch>
				</group>
			</div>
			<div v-if="showFormPreview">
				<form-preview :header-label="'付款金额'" header-value="¥2400.00" :body-items="list" :footer-buttons="buttons1" name="FormPreview"></form-preview>
			</div>
			<div v-if="showPicker">
				<group>
			      <popup-radio readonly title="options" :options="options1" v-model="option1"></popup-radio>
			    </group>
			     <group>
			    <popup-radio title="slot:each-item" :options="options3" v-model="option5">
			    	<p slot="popup-header" class="vux-1px-b demo3-slot">Please select</p>
			        <template scope="props" slot="each-item">
			          <p>
			            custom item <img src="http://dn-placeholder.qbox.me/110x110/FF2D55/000" class="vux-radio-icon"> {{ props.label }}
			            <br>
			            <span style="color:#666;">{{ props.index + 1 }} another line</span>
			          </p>
			        </template>
			      </popup-radio>
			    </group>

				<group-title>双向绑定</group-title>
			    <picker :data='years' v-model='year3' @on-change='change3'></picker>
			    <select v-model='year5'>
			        <option v-for='one in years[0]' :value='one.value'>{{one.name}}</option>
			    </select>

				<group title="one columns">
			       <popup-picker :title="'手机'" :data="list1" v-model="value1" :placeholder="'请选择手机'"></popup-picker>
			    </group>
				<group title="double columns">
			       <popup-picker :title="'详细机型'" :data="list2" v-model="value2"></popup-picker>
			    </group>
			    <group title="double columns-obj">
			       <popup-picker :title="'对象显示文字值为code'" :data="list5" :columns="1" v-model="value5" show-name></popup-picker>
			    </group>
			    <group title="chained three columns">
			       <popup-picker :title="'联动显示值'" :data="list3" :columns="3" v-model="value3" ref="picker3"></popup-picker>
			       <cell title="获取值对应的文字" :value="$refs.picker3&&$refs.picker3.getNameValues()"></cell>
			       <popup-picker :title="'联动显示文字值为code'" :data="list3" :columns="3"  v-model="value4" show-name></popup-picker>
			    </group>

			</div>

	</div>		
</template>

<script>
import { CellFormPreview, Group,GroupTitle, Cell , Badge ,CellBox,Checker,Radio, CheckerItem,Checklist,DatetimeRange ,Datetime,InlineCalendar,XSwitch,XButton ,FormPreview ,Divider,Picker,Popup,PopupPicker,PopupRadio} from 'vux'
	let years = []
	for (var i = 2000; i <= 2030; i++) {
	  years.push({
	    name: i + '年',
	    value: i + ''
	  })
	}
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
		    radio001Value: 'China',
		    radio001: [ 'China', 'Japan' ],
		    radio002Value: '',
		    radio003: [{
		        icon: 'http://dn-placeholder.qbox.me/110x110/FF2D55/000',
		        key: '001',
		        value: 'radio001'
		      }, {
		        icon: 'http://dn-placeholder.qbox.me/110x110/FF2D55/000',
		        key: '002',
		        value: 'radio002'
		      }],
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

		    showCalendar:true,
		    valueCalendar: '',
		    // listValue: '',
		    rangeCalendar: false,
		    showLastMonth: true,
		    showNextMonth: true,
		    highlightWeekend: false,
		    return6Rows: true,
		    hideHeader: false,
		    hideWeekList: false,
		    replaceTextList: {},
		    replace: false,
		    changeWeeksList: false,
		    weeksList: [],
		    useCustomFn: false,
		    // buildSlotFn: () =>  '',
		    buildSlotFn:function(h,l,d){
		    	if(h==3 && l==3){
		    		console.log(d)
		    		return 'good'
		    	}
		    },
		    disablePast: false,
		    disableFuture: false,


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
		    years: [years],
		    year3: ['2005'],
		    year5: '2005',
		    list1: [['小米', 'iPhone', '华为', '情怀', '三星', '其他', '不告诉你']],
		    value1: [],
		    list2: [['小米', 'iPhone', '华为', '情怀', '三星', '其他', '不告诉你'], ['小米1', 'iPhone2', '华为3', '情怀4', '三星5', '其他6', '不告诉你7']],
		    value2: ['iPhone', '华为3'],
		    list3: [{
				        name: '中国',
				        value: 'china',
				        parent: 0
				      }, {
				        name: '美国',
				        value: 'USA',
				        parent: 0
				      }, {
				        name: '广东',
				        value: 'china001',
				        parent: 'china'
				      }, {
				        name: '广西',
				        value: 'china002',
				        parent: 'china'
				      }, {
				        name: '美国001',
				        value: 'usa001',
				        parent: 'USA'
				      }, {
				        name: '美国002',
				        value: 'usa002',
				        parent: 'USA'
				      }, {
				        name: '广州',
				        value: 'gz',
				        parent: 'china001'
				      }, {
				        name: '深圳',
				        value: 'sz',
				        parent: 'china001'
				      }, {
				        name: '广西001',
				        value: 'gx001',
				        parent: 'china002'
				      }, {
				        name: '广西002',
				        value: 'gx002',
				        parent: 'china002'
				      }, {
				        name: '美国001_001',
				        value: '0003',
				        parent: 'usa001'
				      }, {
				        name: '美国001_002',
				        value: '0004',
				        parent: 'usa001'
				      }, {
				        name: '美国002_001',
				        value: '0005',
				        parent: 'usa002'
				      }, {
				        name: '美国002_002',
				        value: '0006',
				        parent: 'usa002'
				      }],
			value3: [],
			value4: [],
			list5:[
					{name: '中国',value: 'china',},
					{name: '美国', value: 'USA',}
			],
			value5: [],
			option1: 'A',
      		options1: ['A', 'B', 'C'],
      		 options3: ['A', 'B', 'C'],
      		option5: 'B'
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
		changCalendar(v){
			console.log('changCalendar:', v)
		},
		changeRadio (value, label) {
	      console.log('change:', value, label)
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
		change3 (value) {
			console.log('new years is',value)
	      this.year5 = value[0]
	    },

	},

	mounted () {
	},
	watch:{
		replace (val) {
	      this.replaceTextList = val ? {
	        // 'TODAY': '今'
	        'TOMORROW': '今'
	      } : {}
	    },
		useCustomFn (val) {
	      this.buildSlotFn = val ? (line, index, data) => {
	        return /8/.test(data.date) ? '<div style="font-size:12px;text-align:center;"><span style="display:inline-block;width:5px;height:5px;background-color:red;border-radius:50%;"></span></div>' : '<div style="height:19px;"></div>'
	      } : () => ''
	    },
	},
	components: {
		CellFormPreview,
	    Group,GroupTitle,
	    Cell,
	    Badge,
	    CellBox,
	    Checker,Radio, CheckerItem, Checklist,DatetimeRange,Datetime,InlineCalendar,XSwitch,
	    XButton,FormPreview,InlineCalendar ,Divider,
	    Popup,Picker,PopupPicker,PopupRadio
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
