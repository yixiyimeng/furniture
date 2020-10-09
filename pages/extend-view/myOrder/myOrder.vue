<template>
	<view class="container">
		<tui-tabs :tabs="tabs" :isFixed="scrollTop>=0" :currentTab="currentTab" selectedColor="#E41F19" sliderBgColor="#E41F19"
		 @change="change"></tui-tabs>
		<!--选项卡逻辑自己实现即可，此处未做处理-->
		<view :class="{'tui-order-list':scrollTop>=0}">
			<view class="tui-order-item" v-for="(orderitem,orderIndex) in orderList" :key="orderIndex">
				<tui-list-cell :hover="false" :lineLeft="false">
					<view class="tui-goods-title">
						<view>订单号：{{orderitem.order_no}}</view>
						<view class="tui-order-status">{{orderitem.status_}}</view>
					</view>
				</tui-list-cell>
				<block v-for="(item,index) in orderitem.data" :key="index">
					<tui-list-cell padding="0" @click="detail(orderitem.id)">
						<view class="tui-goods-item" v-if="item.img_url&&item.img_url.length>0">
							<image :src="item.img_url[0]" class="tui-goods-img"></image>
							<view class="tui-goods-center">
								<view class="tui-goods-name">{{item.product_name}}</view>
								<view class="tui-goods-attr">{{item.name}}</view>
								<!-- <view class="tui-goods-attr">黑色，50ml</view> -->
							</view>
							<view class="tui-price-right">
								<view>￥{{item.price}}</view>
								<view>x{{item.qty}}</view>
							</view>
						</view>
					</tui-list-cell>					
				</block>
				<tui-list-cell :hover="false" :last="true" >
					<view class="tui-goods-price">
						<view>共{{getGoodsNum(orderitem.data)}}件商品 合计：</view>
						<view class="tui-size-24">￥</view>
						<view class="tui-price-large">{{getGoodsTotal(orderitem.data)}}</view>
						<!-- <view class="tui-size-24">.00</view> -->
					</view>
				</tui-list-cell>
				<view class="tui-order-btn">
					<view class="tui-btn-ml" v-if="orderitem.status==1">
						<tui-button type="black" :plain="true" width="148rpx" height="56rpx" :size="26" shape="circle" @click="cancelOrder(orderitem.id)">取消订单</tui-button>
					</view>
					<view class="tui-btn-ml" v-if="orderitem.status==1">
						<tui-button type="danger" :plain="true" width="148rpx" height="56rpx" :size="26" shape="circle" @click="payOrder(orderitem.id)">立即支付</tui-button>
					</view>
					<view class="tui-btn-ml" v-if="orderitem.status==2||orderitem.status==3">
						<tui-button type="black" :plain="true" width="148rpx" height="56rpx" :size="26" shape="circle" @click="detail(orderitem.id)">查看详情</tui-button>
					</view>
					<view class="tui-btn-ml" v-if="orderitem.status==3">
						<tui-button type="danger" :plain="true" width="148rpx" height="56rpx" :size="26" shape="circle" @click="confirmOrder(orderitem.id)">确认收货</tui-button>
					</view>
					<view class="tui-btn-ml" v-if="orderitem.status==4">
						<tui-button type="danger" :plain="true" width="148rpx" height="56rpx" :size="26" shape="circle" @click="repurchase(orderitem.id)">再次购买</tui-button>
					</view>
				</view>
			</view>
		</view>
		<!--加载loadding-->
		<tui-loadmore :visible="loadding" :index="3" type="red"></tui-loadmore>
		<tui-nomore :visible="!pullUpOn" bgcolor="#fafafa"></tui-nomore>
		<!--加载loadding-->

	</view>
</template>

<script>
	import {
		basePath
	} from '@/utils/index'
	import api from '@/api/order';
	import {
		mapState
	} from 'vuex'

	import tuiTabs from "@/components/tui-tabs/tui-tabs"
	import tuiButton from "@/components/extend/button/button"
	import tuiLoadmore from "@/components/loadmore/loadmore"
	import tuiNomore from "@/components/nomore/nomore"
	import tuiListCell from "@/components/list-cell/list-cell"
	export default {
		components: {
			tuiTabs,
			tuiButton,
			tuiLoadmore,
			tuiNomore,
			tuiListCell
		},
		data() {
			return {
				basePath,
				tabs: [{
					name: "全部"
				}, {
					name: "待付款"
				}, {
					name: "待发货"
				}, {
					name: "已发货"
				}, {
					name: "已完成"
				}],
				orderList: [],
				currentTab: 0,
				pageIndex: 1,
				lastPage:1,
				loadding: false,
				pullUpOn: true,
				scrollTop: 0
			}
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'member_id', 'openid']),
		onLoad() {
			this.getOrder()
		},
		methods: {
			getGoodsNum(list){
				console.log(JSON.stringify(list))
				if(list&&list.length>0){
					let goodsNum = 0;
					list.map(item => {
						goodsNum += item.qty;
					})
					console.log("数量"+goodsNum)
					return goodsNum
				}
			},
			getGoodsTotal(list){
				var amount=0;
				list.map(item => {
					amount += item.qty*item.price;
				})
				console.log("金额"+amount)
				return this.$returnFloat(amount)
			},
			//获取全部收货地址
			getOrder() {
				var param = {
					page: this.$pagination.page,
					limit: this.$pagination.limit,
					status: this.currentTab == 0 ? '' : this.currentTab
				}
				var url = api.getOrder + '/' + this.member_id;
				//var $me=this;
				this.$postajax(url, param)
					.then(res => {
						
						if (res.code == 0) {
							console.log("数据1"+JSON.stringify(res.data.length))
							if (res.data && res.data.length > 0) {
								res.data.forEach(item => {
									item.data.forEach(items=>{
										items.img_url=items.img_url?JSON.parse(items.img_url):[]
									})
									console.log("数据"+JSON.stringify(item))
									//item.data = JSON.parse(item.data)
									this.orderList.push(item)
								})
								this.lastPage =res.data&&res.data.length>0?(Math.ceil(res.count/this.$pagination.limit)):1;
								console.log("最后一页"+JSON.stringify(this.orderList))
								if(this.pageIndex==this.lastPage){
									this.pullUpOn = false;
								}
								/* this.count=res.count; */
							}
						}
					})
					.catch(err => {

					});
			},
			//切换订单状态
			change(e) {
				this.currentTab = e.index;
				this.orderList = [];
				this.getOrder();
			},
			//查看订单详情
			detail(id) {
				uni.navigateTo({
					url: '../orderDetail/orderDetail?id=' + id
				})
			},
			//取消订单
			cancelOrder(id) {
				var url = api.closeOrder + '/' + id;
				this.$postajax(url)
					.then(res => {
						if (res.code == 0) {
							this.tui.toast("订单取消成功", 2000, true);
							uni.navigateTo({
								url: "../success/success?orderStatus=2"
							})
						}
					})
			},
			//再次购买
			repurchase(id) {
				uni.switchTab({
					url: '/pages/category/category'
				})
			},
			//立即支付
			payOrder(id) {
				console.log("支付信息" + JSON.stringify(id))
				var url = api.payOrder + '/' + id;
				this.$postajax(url)
					.then(res => {
						console.log("支付" + JSON.stringify(res))
						if (res.code == 0) {
							let orderInfo = res.data;
							//微信支付

							uni.requestPayment({

								provider: 'wxpay',

								orderInfo: orderInfo, //订单数据
								timeStamp: orderInfo.timeStamp,
								nonceStr: orderInfo.nonceStr,
								package: orderInfo.package,
								signType: orderInfo.signType,
								paySign: orderInfo.paySign,
								service: 3,

								success: function(res) {

									//处理业务逻辑
									this.tui.toast("提交订单成功", 2000, true);
									uni.navigateTo({
										url: "../success/success?orderStatus=2"
									})

								},

								fail: function(err) {

									console.log('fail:' + JSON.stringify(err));
									uni.showToast({

										icon: 'none',

										title: '支付失败'

									});

								}

							});
						}
					})
					.catch(err => {

					});
			},
			//确认收货
			confirmOrder(id) {
				var url = api.confirmOrder + '/' + id;
				this.$postajax(url)
					.then(res => {
						if (res.code == 0) {
							this.tui.toast("已确认收货", 2000, true);
							uni.navigateTo({
								url: "../success/success?orderStatus=3"
							})
						}
					})
			
			}
		},
		onPullDownRefresh() {
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 200);
		},
		onReachBottom: function() {
			console.log(3333)
			/* if (!this.pullUpOn) return; */
			this.pullUpOn = true
			this.loadding = true;
			console.log('页面上拉触底事件');
			// 每次拉到页面底部,请求页数自加
			this.pageIndex++;
			// 第二次之后请求数据
			if(this.pageIndex>this.lastPage){
				setTimeout(() => {
					this.loadding = false
					this.pullUpOn = false
				}, 1000)
				return false;
			}else{
			var param = {
				page: this.pageIndex,
				limit: this.$pagination.limit,
				member_id:this.member_id,
				name: this.searchKey,
			}
			this.$postajax(api.getProduct,param)
				.then(res => {
					console.log(JSON.stringify(res))
					if (res.code == 0) {
						console.log(JSON.stringify(res))
						if (res.code == 0) {
							res.data=res.data.map(item => {
								item.data = JSON.parse(item.data)
								return item
							})
							this.orderList = this.orderList.concat(res.data)
							this.loadding = false;
						}
					}
			
			
				})
				.catch(err => {
			
				});
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		}
	}
</script>

<style>
	.container {
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-order-list {
		margin-top: 80rpx;
	}

	.tui-order-item {
		margin-top: 20rpx;
		border-radius: 10rpx;
		overflow: hidden;
	}

	.tui-goods-title {
		width: 100%;
		font-size: 28rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tui-order-status {
		color: #888;
		font-size: 26rpx;
	}

	.tui-goods-item {
		width: 100%;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	}

	.tui-goods-img {
		width: 180rpx;
		height: 180rpx;
		display: block;
		flex-shrink: 0;
	}

	.tui-goods-center {
		flex: 1;
		padding: 20rpx 8rpx;
		box-sizing: border-box;
	}

	.tui-goods-name {
		max-width: 310rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		font-size: 26rpx;
		line-height: 48rpx;
	}

	.tui-goods-attr {
		font-size: 22rpx;
		color: #888888;
		line-height: 32rpx;
		padding-top: 20rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.tui-price-right {
		text-align: right;
		font-size: 24rpx;
		color: #888888;
		line-height: 30rpx;
		padding-top: 20rpx;
	}

	.tui-color-red {
		color: #E41F19;
		padding-right: 30rpx;
	}

	.tui-goods-price {
		width: 100%;
		display: flex;
		align-items: flex-end;
		justify-content: flex-end;
		font-size: 24rpx;
	}

	.tui-size-24 {
		font-size: 24rpx;
		line-height: 24rpx;
	}

	.tui-price-large {
		font-size: 32rpx;
		line-height: 30rpx;
		font-weight: 500;
	}

	.tui-order-btn {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		background: #fff;
		padding: 10rpx 30rpx 20rpx;
		box-sizing: border-box;
	}

	.tui-btn-ml {
		margin-left: 20rpx;
	}
</style>
