<template>
	<view class="container">
		<!-- #ifdef MP || H5-->
		<view class="tui-edit-goods">
			<view>购物车共<text class="tui-goods-num">{{productList.length}}</text>件商品</view>
			<view>
				<tui-button type="gray" :plain="true" shape="circle" width="160rpx" height="60rpx" :size="24" @click="editGoods">{{isEdit?"完成":"编辑商品"}}</tui-button>
			</view>
		</view>
		<!-- #endif -->
		<checkbox-group>
			<view class="tui-cart-cell  tui-mtop" v-for="(item,index) in productList" :key="index">
				<tui-swipe-action :actions="actions" @click="handlerButton" :params="item">
					<template v-slot:content >
						<view class="tui-goods-item">
							<checkbox-group @change="selected(item)">
								<label class="tui-checkbox">
									<checkbox color="#fff"  :checked="item.checked"></checkbox>
								</label>
							</checkbox-group>
							
							<image :src="basePath+item.img_url[0]" class="tui-goods-img" />
							<view class="tui-goods-info">
								<view class="tui-goods-title">
									{{item.name}}
								</view>
								<view class="tui-price-box">
									<view class="tui-goods-price">￥{{item.price}}</view>
									<view class="tui-scale">
										<tui-numberbox :value="item.qyt" :height="40" :width="74" :min="1" :index="index" @change="changeNum"></tui-numberbox>
									</view>
								</view>
							</view>
						</view>
					</template>
				</tui-swipe-action>
			</view>
		</checkbox-group>

		<!--tabbar-->
		<view class="tui-tabbar">
			<view class="tui-checkAll">
				<checkbox-group @change="selectedAll">
					<label class="tui-checkbox">
						<checkbox color="#fff"  :checked="allchecked"></checkbox>
						<text class="tui-checkbox-pl">全选</text>
					</label>
				</checkbox-group>
				<view class="tui-total-price" v-if="!isEdit">合计:<text class="tui-bold">￥{{$returnFloat(totalPrice)}}</text> </view>
			</view>
			<view>
				<tui-button width="200rpx" height="70rpx" :size="30" type="danger" shape="circle" :disabled="!hasLogin||totalPrice>0" v-if="!isEdit" @click="btnPay">去结算({{$returnFloat(totalPrice)}})</tui-button>
				<tui-button width="200rpx" height="70rpx" :size="30" type="danger" shape="circle" :plain="true" v-else @click="deleteGoods">删除</tui-button>
			</view>
		</view>
		<!--加载loadding-->
		<tui-loadmore :visible="loadding" :index="3" type="red"></tui-loadmore>
	</view>
</template>

<script>
	import {
		basePath
	} from '@/utils/index'
	import {
		mapState
	} from 'vuex'
	import tuiSwipeAction from "@/components/swipe-action/swipe-action"
	import tuiButton from "@/components/extend/button/button"
	import tuiNumberbox from "@/components/numberbox/numberbox"
	import tuiIcon from "@/components/icon/icon"
	import tuiDivider from "@/components/divider/divider"
	import tuiLoadmore from "@/components/loadmore/loadmore"
	export default {
		components: {
			tuiSwipeAction,
			tuiButton,
			tuiNumberbox,
			tuiIcon,
			tuiDivider,
			tuiLoadmore
		},
		data() {
			return {
				basePath,
				dataList: [{
					id: 1,
					buyNum:2
				}, {
					id: 2,
					buyNum:1
				}],
				actions: [{
						name: '收藏',
						width: 64,
						color: '#fff',
						fontsize: 28,
						background: '#FFC600'
					},
					{
						name: '看相似',
						color: '#fff',
						fontsize: 28,
						width: 64,
						background: '#FF7035'
					},
					{
						name: '删除',
						color: '#fff',
						fontsize: 28,
						width: 64,
						background: '#F82400'
					}
				],
				isEdit: false,
				productList: [],
				pageIndex: 1,
				loadding: false,
				pullUpOn: true,
				allchecked:false,//全选默认false
				/* totalNum:0,//选中商品总数量*/
				totalPrice:0,//选中商品总金额 
			}
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'member_id']),
		onLoad() {
			let shopCartArr = uni.getStorageSync('shopCartList');
			if(shopCartArr){
				this.productList=JSON.parse(shopCartArr);
				this.productList.forEach(item=>{
					item.checked=false;
				})
				console.log(JSON.stringify(this.productList))
			}
		},
		computed: {
			// 计算选中商品数量
			totalNum() {
				let totalNum = 0;
				this.productList.map(item => {
					item.checked ? totalNum += item.qty : totalNum += 0
				})
				return totalNum
			},
			//计算选中商品的总价
			/* totalPrice() {				
				let totalPrice = 0;
				this.productList.map(item => {
					console.log(111)
					item.checked ? totalPrice += item.qty * item.price : totalPrice += 0
				})
				return totalPrice
			}, */
			
		},
		methods: {
			
			countTotal(){
				let totalPrice = 0;
				this.productList.map(item => {
					console.log(111)
					item.checked ? totalPrice += item.qyt * item.price : totalPrice += 0
				})
				this.totalPrice=totalPrice
				//return totalPrice
				
			},
			// 单个商品前的勾选
			selected(item) {
				
				item.checked = !item.checked
				console.log("单选"+JSON.stringify(item.checked))
				if (!item.checked) {
					this.allchecked = false
				} else {
					const test = this.productList.every(item => {
						return item.checked === true
					})
					if (test) {
						this.allchecked = true
					} else {
						this.allchecked = false
					}
				}
				this.countTotal()
				
			},
			//全选
			selectedAll(){
				this.allchecked=!this.allchecked;
				if (this.allchecked) {
					this.productList.map(item => {
						item.checked = true
					})
				} else {
					this.productList.map(item => {
						item.checked = false
					})
				}
				this.countTotal()
			},
			// 删除挑选的购物车商品
			deleteGoods(item, index) {
				this.productList=this.productList.filter(item=>!item.checked);
				var $me=this;
				uni.setStorage({
					key: 'shopCartList',
					data: this.productList.length>0?JSON.stringify(this.productList):'',
					success: function (res) {
						$me.tui.toast("删除成功", 2000, true);
						
					}
				});
				this.allchecked = false
				this.countTotal()
			},
			changeNum: function(e) {
				this.productList[e.index].qyt=e.value;
				this.countTotal()
				
			},
			handlerButton: function(e) {
				console.log("单选"+JSON.stringify(e))
				let index = e.index;
				let item = e.item;
				this.tui.toast(`商品id：${item.id}，按钮index：${index}`);
			},
			editGoods: function() {
				// #ifdef H5 || MP
				this.isEdit = !this.isEdit;
				// #endif
			},
			detail: function() {
				uni.navigateTo({
					url: '../../productDetail/productDetail'
				})
			},
			btnPay(){
				var ids=this.productList.map(item=>{
					var items={
						id:item.id,
						qyt:item.qyt
					}
				})
				uni.navigateTo({
					url: '../submitOrder/submitOrder?ids=' + ids
				})
			}
		},
		onPullDownRefresh: function() {
			let loadData = JSON.parse(JSON.stringify(this.productList));
			loadData = loadData.splice(0, 10)
			this.productList = loadData;
			this.pageIndex = 1;
			this.pullUpOn = true;
			this.loadding = false
			uni.stopPullDownRefresh()
		},
		onReachBottom: function() {
			if (!this.pullUpOn) return;
			this.loadding = true;
			if (this.pageIndex == 4) {
				this.loadding = false;
				this.pullUpOn = false
			} else {
				let loadData = JSON.parse(JSON.stringify(this.productList));
				loadData = loadData.splice(0, 10)
				if (this.pageIndex == 1) {
					loadData = loadData.reverse();
				}
				this.productList = this.productList.concat(loadData);
				this.pageIndex = this.pageIndex + 1;
				this.loadding = false
			}
		},
		onNavigationBarButtonTap(e) {
			this.isEdit = !this.isEdit;
			let text = this.isEdit ? "完成" : "编辑";
			// #ifdef APP-PLUS
			let webView = this.$mp.page.$getAppWebview();
			webView.setTitleNViewButtonStyle(0, {
				text: text
			});
			// #endif
		}
	}
</script>

<style>
	.container {
		padding-bottom: 120rpx;
	}

	.tui-mtop {
		margin-top: 24rpx;
	}

	.tui-edit-goods {
		width: 100%;
		border-radius: 12rpx;
		overflow: hidden;
		padding: 24rpx 30rpx 0 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #333;
		font-size: 24rpx;
	}

	.tui-goods-num {
		font-weight: bold;
		color: #e41f19;
	}

	.tui-cart-cell {
		width: 100%;
		border-radius: 12rpx;
		background: #FFFFFF;
		padding: 40rpx 0;
		overflow: hidden;
	}

	.tui-goods-item {
		display: flex;
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	.tui-checkbox {
		/* width: 40rpx; */
		padding-right: 30rpx;
		display: flex;
		align-items: center;
	}

	/* #ifdef APP-PLUS || MP */
	.tui-checkbox .wx-checkbox-input {
		width: 36rpx;
		height: 36rpx;
		border-radius: 50%;
		margin: 0;
	}

	.tui-checkbox .wx-checkbox-input.wx-checkbox-input-checked {
		background: #F82400;
		width: 40rpx;
		height: 40rpx;
		border: none;
	}

	/* #endif */
	/* #ifdef H5 */
	>>>.tui-checkbox .uni-checkbox-input {
		width: 36rpx;
		height: 36rpx;
		border-radius: 50% !important;
		margin: 0;
	}

	>>>.tui-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
		background: #F82400;
		width: 40rpx;
		height: 40rpx;
		border: none;
	}

	/* #endif */
	.tui-goods-img {
		width: 220rpx;
		height: 220rpx !important;
		border-radius: 12rpx;
		flex-shrink: 0;
		display: block;
	}

	.tui-goods-info {
		width: 100%;
		padding-left: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;
		box-sizing: border-box;
		overflow: hidden;
	}

	.tui-goods-title {
		white-space: normal;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		font-size: 24rpx;
		color: #333;
	}

	.tui-goods-model {
		max-width: 100%;
		color: #333;
		background: #F5F5F5;
		border-radius: 40rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 16rpx;
		box-sizing: border-box;
	}

	.tui-model-text {
		max-width: 100%;
		transform: scale(0.9);
		transform-origin: 0 center;
		font-size: 24rpx;
		line-height: 32rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.tui-price-box {
		width: 100%;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
	}

	.tui-goods-price {
		font-size: 34rpx;
		font-weight: 500;
		color: #e41f19;
	}

	.tui-scale {
		transform: scale(0.8);
		transform-origin: 100% 100%;
	}

	.tui-activity {
		font-size: 24rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx 20rpx 100rpx;
		box-sizing: border-box;
	}

	.tui-buy {
		display: flex;
		align-items: center
	}

	.tui-bold {
		font-weight: bold;
	}

	.tui-sub-info {
		max-width: 532rpx;
		font-size: 24rpx;
		line-height: 24rpx;
		padding: 20rpx 30rpx 10rpx 30rpx;
		box-sizing: border-box;
		color: #333;
		transform: scale(0.8);
		transform-origin: 100% center;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-left: auto
	}

	.tui-invalid-text {
		width: 66rpx;
		margin-right: 4rpx;
		text-align: center;
		font-size: 24rpx;
		color: #fff;
		background: rgba(0, 0, 0, .3);
		transform: scale(0.8);
		transform-origin: center center;
		border-radius: 4rpx;
		flex-shrink: 0;
	}

	.tui-invalid-pr {
		padding-right: 0 !important;
	}

	.tui-gray {
		color: #B2B2B2 !important;
	}

	.tui-goods-invalid {
		color: #555;
		font-size: 24rpx;
	}

	.tui-flex-center {
		align-items: center !important;
	}

	.tui-invalid-ptop {
		padding-top: 40rpx;
	}

	.tui-tabbar {
		width: 100%;
		height: 100rpx;
		background: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx;
		box-sizing: border-box;
		font-size: 24rpx;
		z-index: 99999;
	}

	.tui-tabbar::before {
		content: '';
		width: 100%;
		border-top: 1rpx solid #d9d9d9;
		position: absolute;
		top: 0;
		left: 0;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
	}

	.tui-checkAll {
		display: flex;
		align-items: center;
	}

	.tui-checkbox-pl {
		padding-left: 12rpx;
	}

	.tui-total-price {
		font-size: 30rpx !important;
	}

	/*猜你喜欢*/
	.tui-youlike {
		padding-left: 12rpx
	}

	.tui-product-list {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: wrap;
		box-sizing: border-box;
	}

	.tui-product-container {
		flex: 1;
		margin-right: 2%;
	}

	.tui-product-container:last-child {
		margin-right: 0;
	}

	.tui-pro-item {
		width: 100%;
		margin-bottom: 4%;
		background: #fff;
		box-sizing: border-box;
		border-radius: 12rpx;
		overflow: hidden;
	}

	.tui-pro-img {
		width: 100%;
		display: block;
	}

	.tui-pro-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 20rpx;
	}

	.tui-pro-tit {
		color: #2e2e2e;
		font-size: 26rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.tui-pro-price {
		padding-top: 18rpx;
	}

	.tui-sale-price {
		font-size: 34rpx;
		font-weight: 500;
		color: #e41f19;
	}

	.tui-factory-price {
		font-size: 24rpx;
		color: #a0a0a0;
		text-decoration: line-through;
		padding-left: 12rpx;
	}

	.tui-pro-pay {
		padding-top: 10rpx;
		font-size: 24rpx;
		color: #656565;
	}
</style>
