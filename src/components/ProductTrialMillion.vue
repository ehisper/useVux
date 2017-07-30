<template>
	<div class="footerBox-ease">
		<g-hq-mask v-if="showTrialCon" @onClick="handleMaskClick"></g-hq-mask>
		<div class="footer">
			<div v-show="showTrialCon" class="trialCon">	
			    <datetime v-if="trialElementArr.includes(0)"  ref="birthday"  class="self-datetime" v-model="birthday" :placeholder="'请选择被保人出生日期'" 
			      value-text-align="left" confirm-text="完成" cancel-text="取消"
			      :min-year=1880 :start-date="setDateStart" :end-date="setDateEnd" format="YYYY-MM-DD" :title="'出生日期'">
			    </datetime>
				<!-- <g-hq-birthday ref="birthday" :birthday="birthday"  maxAge="startDate" minAge="endDate"></g-hq-birthday> -->
				<!-- v-if="productId == 优爱宝定期" -->
				<!-- <g-hq-gender ref="sex" :value="valueSex" :titleWidth="8.25" @onChange="valueSex = arguments[0]"></g-hq-gender> -->
				<!-- v-if="productId == 优爱宝定期 || productId == 优爱宝定期" -->
				<!-- <group class="address-group">
					<x-address   title="地址" v-model="valueAddress" :list="listAddress" hide-district placeholder="请选择投保地区" value-text-align="left"></x-address>
				</group> -->
				<popup-picker v-if="trialElementArr.includes(9)" ref="PayPeriod" class="tri-vux-select" 
					:title="'交费期间'" 
					:data="listPayPeriod" 
					v-model="valuePayPeriod" 
					:placeholder="'请选择交费期间'" 
					value-text-align="left" 
					:show-name="false"
					>
				</popup-picker>
				<popup-picker v-if="trialElementArr.includes(12)" ref="InsurePeriod" class="tri-vux-select" 
					:title="'保险期间'" 
					:data="listInsurePeriod" 
					v-model="valueInsurePeriod" 
					:placeholder="'请选择保险期间'" 
					value-text-align="left" 
					:show-name="false">
				</popup-picker>
				<!-- <popup-picker class="tri-vux-select" 
					:title="'保额'" 
					:data="listInsurePeriod" 
					v-model="valueInsurePeriod" 
					value-text-align="left" 
					>
				</popup-picker> -->
				<g-hq-input v-if="trialElementArr.includes(6)" ref="Coverage"  class="pl" title="保额"  :titleWidth="8.25" disabled="true"  :value="valueCoverage[0]"></g-hq-input>
			</div>
			<bottom :minPrice="premuim" :unit="unit" @onClick="clickHandler"></bottom>
		</div>
	</div>
</template>

<script>
	//优爱宝
	//出生日期 性别 地址 交费期间 保险期间  保额 
	//
	////优护宝
	//出生日期 地址 交费期间 保险期间  保额 
	//
	// 百万乐途
	// 出生日期 交费期间 保险期间 交费方式 保额 
	// 
	import bottom from './bottom.vue'
	import { PopupPicker, Group , Datetime ,XNumber, XAddress,TransferDomDirective as TransferDom,Cell} from 'vux'
	let ChinaAddressV3Data = require("../../assets/js/ChinaCity.json")
	export default {
		name: "ProductTrialMillion",
		props: {
  			trialRule:{
  				required:false
  			},
  			productInfo:{
  				required:false
  			},

        },
        components:{
        	bottom,
        	PopupPicker,
        	Group,
        	Datetime,
        	XNumber,
        	XAddress,
        	Cell
        },
		data () {
            return {
            	initrialCon:false,
            	nextStep:false,
            	showTrialCon:false,

            	unit:"元起",
            	premuim:"",
            	productId:"",

            	birthday:'',
            	age: null,
            	startDate:this.setDate(this.maxAge),
				endDate:this.setDate(this.minAge),
				maxAge: '55Y',
				minAge: '18Y',

            	valueSex:'',

            	listAddress:ChinaAddressV3Data,
            	valueAddress:[],

            	listPayPeriod:[],
            	// listPayPeriod:[{name:'10年',value:1},{name:'20年',value:2}],
            	valuePayPeriod:[],

            	listInsurePeriod: [],
            	valueInsurePeriod:  [],

            	valueCoverage: [],
            	ListCoverage:[],

            	trialElementArr:[],
            }
        },
        mounted:function(){
 			this.productId = this.$route.query.productId
 			// 百万18-55 优爱宝18-60 优护宝18-65 
 			// switch(this.productId){
 			// 	case: 百万
 			// 		this.maxAge = '55Y';
 			// 	break;
 			// 	case: 优爱宝
 			// 		this.maxAge = '60Y';
 			// 	break;
 			// 	case: 优爱宝
 			// 		this.maxAge = '65Y';
 			// 	break;
 			// }
 			this.isLogin();
        },
        methods:{
        	onChange(){
        	},
        	isLogin:function(){
	    		this.hqLoginCookieKey = window.localStorage.getItem("hqLoginCookieKey"); //判断是否登录凭证
				this.axios({
					url: requestLink("/user/isLogin"),
					headers: {'X-Requested-With': this.hqLoginCookieKey}
				})
				.then( ({data} ) => {
					if(data.code == 200 && data.success){
						this.birthday = data.data.birthday
						this.age =  data.data.age
						this.valueSex= this.$refs.sex && data.data.sex;
						// this.initTrilItem(this.trialRule);
						this.chooseRule(this.trialRule);
					}
				}).catch((error)=>{
					this.showToast({text: error})
				});
        	},
        	//点击立即投保
        	clickHandler(){
        		this.showTrialCon = true
        		// ???待确定三款产品
        		// if( this.nextStep){
        			// if( this.productId == 10004){
        			// 	this.$router.push("/HealthInformed?productId=" + this.productId)
        			// }else{
        			// 	this.$router.push( {path:"/shortInsure",query:{} } );
        			// }
        		//}
        		this.$emit("onClick",this)
        	},
        	//获取试算参数
        	//百万：出生日期、交费期间、保险期间
        	//优护宝加地址
        	//优爱宝加地址、性别
        	getTrialParams:function(){
        		//保险期限、缴费期限传id这里差一个转换的fn???
        		//Object.keys(this.$refs).forEach(item => console.log(this.getRefMap(item)))
        		let obj = {
        			birthDate:this.birthday,
        			// 交费期间:this.valuePayPeriod[0],
        			// 交费期间是传id么???
        			// policyPeriodNumber:this.valueInsurePeriod[0],
        			// 地址:this.valueAddress ? this.valueAddress : '',
        			// gender: gender ? gender.getValue() : '',
        			saleItemId:this.productId
        		}
        		return obj
        	},
        	//试算
        	ajaxTrial:function(){

        		if(!this.showTrialCon) return ;
        		// console.log('CheckAll',this.checkAllTrialItem())
        		if(!this.checkAllTrialItem()) return;
        		this.nextStep = false;
        		var timer = null ;
        		var req = this.getTrialParams();
        		clearTimeout(timer)
        		timer = setTimeout(()=>{
        			console.log("执行试算")
        			this.trialHandler(req);
        		},300)

        	},
        	trialHandler(req){
	    		this.axios({
					method: "POST",
					url: requestLink("/enumeratePremuim"),
					data: req
				})
				.then(({data}) => {
					if(data.code == 200 && data.success && data.data.totalAmount != 0){
						data = data.data;

						this.premuim  = data.totalAmount
						this.unit = "元"
						this.nextStep = true;
						//保费字段改了???
						//设置投保信息录入页面的参数
						// let productList = data.coverageDTOList || [];
						// let params = {
						// 		//商品信息
						// 		premuim: data.totalAmount,
						// 		packageProductId: this.productInfo.productID,
						// 		packageProductName: this.productInfo.productName,
						// 		payType: this.productInfo.payType,
						// 		// count : this.numberValue,
						// 		premType:this.productInfo.premType, //组合产品缴费类型 (1:趸缴，2:期缴)
						// 		coverage :JSON.stringify(this.coverage),
						// 		//投保人信息
						// 		proposer:{},
						// 		//被保险人信息
						// 		insuredList:[{
						// 			policyProductList:[],
						// 			relationToProposer:'00', //被人保人与投保人关系 00 本人
						// 		}]

						// }

						// let dataStr = this.currentPlan.split(":")[0].split("_"),
						// 	dataUnit = dataStr[0],
						// 	dataNum = dataStr[1],

						// 	policyPeriodNumber = dataNum;

						// if( dataUnit=="month"){
						// var policyPeriod = "M"


						// }else if( dataUnit=="term" ){
						// var	policyPeriod = "Y"

						// }

						// productList.forEach((item,index)=>{
						// 	params.insuredList[0].policyProductList.push({
						// 		productId: item.productId,
						// 		premuim: item.premium,//当前商品保费
						// 		// assuredAmount: item.sumAssured,//试算保额
						// 		payMethod: 0,//缴费方式
						// 		premPeriod: 'Y',//缴费类型
						// 		premPeriodNumber: 1000 ,//缴费期限
						// 		policyPeriod: policyPeriod ,//保障期限类型(终身code)或者其它（y||岁）
						// 		policyPeriodNumber: policyPeriodNumber ,//终身保障期限为1000，其余为具体数字
						// 		currentPremuim : item.premium
						// 	})
						// })


						//ysm不同产品的数据？
						sessionStorage.setItem('trialInfo', JSON.stringify(params))
						this.nextStep = true ;

					}else{
						this.showToast({"text":data.message});
						this.nextStep = false;
					}
				})
				.catch()
	    	},
        	initTrialData(valueText){
        		// //productId = 10008
        		let trialElement = this.trialRule.trialElement;
        		trialElement.forEach(item => this.trialElementArr.push(item.vtype))
        		// console.log('试算项',this.trialElementArr)
        		//出生日期不用 最小年龄最大年龄???
        		//this.maxAge = trialElement.find(item => (item.vtype == 0) && (item.itemType == ?)).dtos.maxValue
        		//this.minAge = trialElement.find(item => (item.vtype == 0) && (item.itemType == ?)).dtos.minValue
        		this.maxAge = '55Y'
        		this.minAge = '18Y'
        		//初始地址
        		//初始保额
        		// let initCoverage = trialElement.find(item => (item.vtype == 6) && (item.itemType == 1)).dtos.defaultValue//dtos.mapValue[0].value/10000 +'万'???待确定取谁？
        		let initCoverage = trialElement.find(item => (item.vtype == 6) && (item.itemType == 1)).dtos.mapValue[0].value/10000 +'万'        		
        		console.log('初始保额为',initCoverage)
        		this.valueCoverage =  [initCoverage];
        		//初始交费期间
        		let listPayPeriodMap = trialElement.find(item => (item.vtype == 9) && (item.itemType == 4)).dtos.mapValue
        		// listPayPeriodMap =  listPayPeriodMap.map(item => ({name:item.itemName,value:item.id}))
        		listPayPeriodMap =  listPayPeriodMap.map(item => item.itemName)
        		console.log('初始交费期间为',listPayPeriodMap)
        		this.listPayPeriod = [listPayPeriodMap]
        		//初始保险期间
        		let listInsurePeriod = trialElement.find(item=> (item.vtype == 12) && (item.itemType == 4)).dtos.mapValue
        		// listInsurePeriod = listInsurePeriod.map(item => ({name:item.itemName,value:item.id})) 
        		listInsurePeriod = listInsurePeriod.map(item => item.itemName)
        		console.log('初始保险期间为',listInsurePeriod)
        		this.listInsurePeriod  = [listInsurePeriod]
		    },
        	//点击遮罩隐藏试算条件
        	handleMaskClick(){
               this.showTrialCon = false
               this.nextStep = false
            },
            getRefMap(ref){
            	if(ref === 'birthday'){
            		return this.birthday
            	}else{
            		return (this['value'+ref])[0]
            	}
            },
            checkAllTrialItem(){
            	//检测是否所有试算项都已有选定值
            	let allFinished = Object.keys(this.$refs).every(ref => this.getRefMap(ref))
            	return allFinished;
            },
            // 影响联动因子
			chooseRule(){
				let linkageElement = this.trialRule.linkageElement;
				let _this = this;
				linkageElement.forEach(function(item,index){
					let ruleList = item.ruleList;
					let ruleResult = item.ruleResult;

					if(ruleList[0].ruleFiled == 0){
						let check = 0;
						ruleList.forEach(function(rule,k){
							if(check == 0){
								check = _this.linkageCondition(_this.age,rule.operator,rule.compareValue)
							} else {
								check = _this.linkageCondition(check,rule.compare,_this.linkageCondition(_this.age,rule.operator,rule.compareValue));
							}
						})
						if(check){
							_this.linkageDataBind(ruleResult);
						}
					}
				})
			},
			linkageDataBind(result){
					let _this = this;
			    	switch (result.affectFiledId) {
						case '0':
							break;
						case '1':
							break;
						case '2':
							break;
						case '3':
							break;
						case '4':
							break;
						case '5':
							break;
						case '6':	// 保额
							//先判断type是input还是select,再赋值？？？
							//联动项
							let valueCoverageArr = result.affectValueString.split(',');
							//???与trialEkement中结构不同
							affectValueArr = 	valueCoverageArr.map(function(item,index){
								return  item && item/10000 + '万'
							})	
							this.valueCoverage = [affectValueArr[0]];	
							console.log('联动了保额',this.valueCoverage)	
							break;
						case '7':
							break;
						case '8':
							break;
						case '9':	// 交费期间
							var affectValueArr = result.affectValueString.split(',');
							affectValueArr = affectValueArr.map(item => _this.getIdToPeriodMap(item)
							)
							this.listPayPeriod = this.listPayPeriod && [affectValueArr]
							console.log('联动了交费期间',this.listPayPeriod)	
							break;
						case '12':	// 保险期间
							var affectValueArr = result.affectValueString.split(',');
							
							affectValueArr = affectValueArr.map(item => _this.getIdToPeriodMap(item)
							)
							this.listInsurePeriod = [affectValueArr]
							console.log('联动了保险期间',this.listInsurePeriod)	

							break;
						}
			},
			linkageCondition(val,operator,condition){
				if("and" === operator){
					return val && condition;
				} else if("or" === operator){
					return val || condition;
				} else if(">=" === operator){
					return val >= condition;
				} else if("<=" === operator){
					return val <= condition;
				} else if("==" === operator){
					return val == condition;
				} else if(">" === operator){
					return val > condition;
				} else if("<" === operator){
					return val < condition;
				}
			},
        	setDate(age){
				let today = new Date(),
					date ,
					num,
					lastStr;
				if(typeof age !="string") {
					// console.log(age)
					num = 0
					lastStr = "" 
				}else{
					lastStr = age.substr(age.length-1,1).toUpperCase()
					num = age.substr(0 , age.length-1) - 0 
				}
				
	 			switch( lastStr ){
					case "D" :
						if( num-1<=0 ){
							num = 0;
						}else{
							num = num -1 ;
						}
						date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - num );
						break;
					case "M" :
						date = new Date(today.getFullYear(), today.getMonth()-num, today.getDate() );
						break;
					case "Y":
						
						num = num + 1 ;
						
						date = new Date(today.getFullYear()-num , today.getMonth(), today.getDate() + 1 );
						break ;
					default:
						date = new Date();
						break;
				}
				let month = date.getMonth() + 1,
					day = date.getDate() ;

				return date.getFullYear() + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day)
			},
			getIdToPeriodMap(id){
				let idArr = id.split('_')
            	switch (idArr[0]) {
            		case '0':
            			return '趸交'
            			break;
            		case 'term':
            			return idArr[1]+'年'
            			break;
            	}
            },
            getPeriodToIdMap(period){
            	switch (period) {
            		case '趸交':
            			return '0'
            			break;
            		default:
            			return 'term_'+parseInt(period)
            			break;
            	}
            },
        },
        computed:{
        	setDateStart(){
        		return this.setDate(this.maxAge)
        	},
        	setDateEnd(){
        		return this.setDate(this.minAge)
        	}
        },
        watch:{

        	birthday:function(){
        		this.chooseRule(this.trialRule);
        		this.ajaxTrial()
        	},
        	valuePayPeriod:function(){
        		this.ajaxTrial()
        	},
        	valueInsurePeriod:function(){
        		this.ajaxTrial()
        	},
        	// valueAddress:function(){
        	// 	this.ajaxTrial()
        	// },
        	// valueSex:function(){
        	// 	this.ajaxTrial()
        	// },
        	//弹出试算条件时执行试算
        	showTrialCon:function(newValue,oldValue){
				// if(!oldValue&&newValue){
				// 	this.ajaxTrial()
				// }//del
			},
			trialRule:function( newValue ){
				console.log('拿到试算结果',this.trialRule)
				this.initTrialData(newValue)
			},
			productInfo:function(product){
				this.premuim = product.minPrice ;
			}
        }
	}
</script>

<style lang="scss">

.footerBox-ease{
	.pl{
		padding-left: 1.5rem;
	}
	.footer{
		width: 100%;
		// height: 5rem;
		position: fixed;
		bottom:0;
		z-index: 100;
		background-color:#fff;
		// border-top: .1rem solid #e8e8e8;
		// z-index: 1000;
		//试算条件
		.trialCon{
			background-color: #fff;
			.vux-cell-box{
				margin-left: -1.5rem;
			    padding:0.5rem 0 0.5rem 1.5rem;
			    font-size:1.5rem;
				.weui-cell{
					.vux-cell-primary{
						margin-left: 2rem;
					}
				}
				
			}
			.vux-datetime{
				margin-left: -1.5rem;
				font-size: 1.5rem;
				&.self-datetime{
					padding-top:1.5rem;
					padding-bottom: 1.5rem;
					.weui-cell__ft.vux-cell-primary.vux-datetime-value{
					    margin-left: 2rem;
					    color: #333;
					}
				}
				
				>div{
					>p{
						padding-left: 1.5rem;
					}
				}
				&:before{
					// display:none;
				}
			}
			.hq-input-box{
				.split-line{
					bottom:auto;
					top:0;
				}
				
			}
			.number-group{
				.weui-cells{
					margin-top: 0;
					&:before{
						border-top: 2px solid #D9D9D9;
					} 
				}
			}
			.address-group{
				.weui-cells{
					margin-top: 0;
					&:before{
						border-top: 1px solid #D9D9D9;
					}
					&:after{
						display:none;
					}
					.vux-cell-primary{
						margin-left: 5rem;
					}
				}
			}
			.c-gender-selector{
				position:relative;
				padding-left: 1.5rem;
				font-size:1.5rem;
				.split-line{
					bottom:auto;
					top:0;
				}
			}
		}
	}

}
.vux-popup-picker-header{
	 color:#159dff !important;
}
</style>
