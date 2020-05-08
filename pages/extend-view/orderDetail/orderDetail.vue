<template>
	<view class="container">
		<view class="tui-order-header">
			<image :src="`/static/images/mall/order/img_detail_bg.png`" mode="widthFix" class="tui-img-bg"></image>
			<view class="tui-header-content">
				<view>
					<view class="tui-status-text">{{getStatusText(orderInfo.status)}}</view>
					<view class="tui-reason"><text class="tui-reason-text">{{getReason(orderInfo.status)}}</text>
						<tui-countdown :time="1800" color="rgba(254,254,254,0.75)" colonColor="rgba(254,254,254,0.75)" bcolor="transparent"
						 bgcolor="transparent" v-if="orderInfo.status===1"></tui-countdown>
					</view>
				</view>
				<image :src="`/static/images/mall/order/`+getImg(orderInfo.status)" class="tui-status-img" mode="widthFix"></image>
			</view>
		</view>
		<!-- <tui-list-cell :arrow="true" bgcolor="#fefefe">
			<view class="tui-flex-box">
				<image :src="`/static/images/mall/order/img_order_logistics3x.png`" class="tui-icon-img"></image>
				<view class="tui-logistics">
					<view class="tui-logistics-text">快递已到收货点，请注意查收哦! 投递员: XXX 联系电话: 17788849992</view>
					<view class="tui-logistics-time">2019-06-03 12:02</view>
				</view>
			</view>
		</tui-list-cell> -->
		<tui-list-cell :last="true" :hover="false">
			<view class="tui-flex-box">
				<image :src="`/static/images/mall/order/img_order_address3x.png`" class="tui-icon-img"></image>
				<view class="tui-addr">
					<view class="tui-addr-userinfo">{{orderInfo.name}}<text class="tui-addr-tel">{{orderInfo.phone}}</text></view>
					<view class="tui-addr-text">{{orderInfo.address}}</view>
				</view>
			</view>
		</tui-list-cell>

		<view class="tui-order-item">
			<tui-list-cell :hover="false" :lineLeft="false">
				<view class="tui-goods-title">
					商品信息
				</view>
			</tui-list-cell>
			<block v-for="(item,index) in orderInfo.data" :key="index">
				<tui-list-cell padding="0">
					<view class="tui-goods-item">
						<image :src="basePath+JSON.parse(item.img_url)[0]" class="tui-goods-img"></image>
						<view class="tui-goods-center">
							<view class="tui-goods-name">{{item.name}}</view>
							<!-- <view class="tui-goods-attr">黑色，50ml</view> -->
						</view>
						<view class="tui-price-right">
							<view>￥{{item.price}}</view>
							<view>x{{item.qty}}</view>
						</view>
					</view>
				</tui-list-cell>
			</block>
			<view class="tui-goods-info">
				<view class="tui-price-flex tui-size24">
					<view>商品总额</view>
					<view>￥{{orderInfo.amount}}</view>
				</view>
				<!-- <view class="tui-price-flex  tui-size24">
					<view>优惠券</view>
					<view>￥0.00</view>
				</view>
				<view class="tui-price-flex  tui-size24">
					<view>配送费</view>
					<view>￥0.00</view>
				</view> -->
				<view class="tui-price-flex tui-size32 tui-pbtm20">
					<view class="tui-flex-shrink">合计</view>
					<view class="tui-goods-price">
						<view class="tui-size-24">￥</view>
						<view class="tui-price-large">{{orderInfo.amount}}</view>
						<!-- <view class="tui-size-24">.00</view> -->
					</view>
				</view>
				<view class="tui-price-flex tui-size32">
					<view class="tui-flex-shrink">实付款</view>
					<view class="tui-goods-price tui-primary-color">
						<view class="tui-size-24">￥</view>
						<view class="tui-price-large">{{orderInfo.amount}}</view>
						<!-- <view class="tui-size-24">.00</view> -->
					</view>
				</view>
			</view>
		</view>

		<view class="tui-order-info">
			<tui-list-cell :hover="false">
				<view class="tui-order-title">
					订单信息
				</view>
			</tui-list-cell>
			<view class="tui-order-content">
				<view class="tui-order-flex">
					<view class="tui-item-title">订单号:</view>
					<view class="tui-item-content">{{orderInfo.order_no}}</view>
				</view>
				<!-- <view class="tui-order-flex">
					<view class="tui-item-title">物流单号:</view>
					<view class="tui-item-content">{{orderInfo.kd_number}}</view>
				</view> -->
				<view class="tui-order-flex">
					<view class="tui-item-title">创建时间:</view>
					<view class="tui-item-content">{{orderInfo.created_at}}</view>
				</view>
				<view class="tui-order-flex">
					<view class="tui-item-title">付款时间:</view>
					<view class="tui-item-content">2019-05-26 10:44</view>
				</view>
				<!-- <view class="tui-order-flex">
					<view class="tui-item-title">发货时间:</view>
					<view class="tui-item-content">2019-05-27 10:20</view>
				</view>
				<view class="tui-order-flex">
					<view class="tui-item-title">配送方式:</view>
					<view class="tui-item-content">包邮</view>
				</view>
				<view class="tui-order-flex">
					<view class="tui-item-title">订单备注:</view>
					<view class="tui-item-content">麻烦尽快发货，打包包裹时请多拿几个泡沫放在纸箱盒内，防止摔碎</view>
				</view> -->
			</view>
		</view>
		<view class="tui-safe-area"></view>
		<view class="tui-tabbar tui-order-btn">
			<view class="tui-btn-mr">
				<tui-button type="black" :plain="true" width="148rpx" height="56rpx" :size="26" shape="circle" @click="cancelOrder(orderInfo.id)">删除订单</tui-button>
			</view>
			<view class="tui-btn-mr">
				<tui-button type="danger" :plain="true" width="148rpx" height="56rpx" :size="26" shape="circle" @click="payOrder">立即支付</tui-button>
			</view>
		</view>
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
	import tuiIcon from '@/components/icon/icon'
	import tuiButton from "@/components/extend/button/button"
	import tuiCountdown from "@/components/countdown/countdown"
	import tuiListCell from "@/components/list-cell/list-cell"
	export default {
		components: {
			tuiIcon,
			tuiButton,
			tuiCountdown,
			tuiListCell
		},
		data() {
			return {
				basePath,
				orderInfo:{},
				//1-待付款 2-付款成功 3-待收货 4-订单已完成 5-交易关闭
			}
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'member_id', 'openid']),
		onLoad(options) {
			this.getOrderShow(options.id)
		},
		methods: {
			//查看订单详情
			getOrderShow(id){
				var url=api.getOrderShow+'/'+id
				this.$postajax(url)
					.then(res => {
						console.log(JSON.stringify(res))
						if (res.code == 0) {
							this.orderInfo=res.data;
							this.orderInfo.data=JSON.parse(res.data.data);
							/* this.orderInfo.img_url=JSON.parse(res.data.img_url) */
							console.log("图片数组"+JSON.stringify(res.data))
						}
				
				
					})
					.catch(err => {
				
					});
			},
			
			getImg: function(status) {
				return ["img_order_payment3x.png", "img_order_send3x.png", "img_order_received3x.png",
					"img_order_signed3x.png", "img_order_closed3x.png"
				][status - 1]
			},
			getStatusText: function(status) {
				return ["等待您付款", "付款成功", "待收货", "订单已完成", "交易关闭"][status - 1]
			},
			getReason: function(status) {
				return ["剩余时间", "等待卖家发货", "还剩X天XX小时自动确认", "", "超时未付款，订单自动取消"][status - 1]
			},
			//立即支付
			payOrder() {
				var url = api.payOrder + '/' + this.orderInfo.id;
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
			//取消订单
			cancelOrder(id) {
				var url = api.closeOrder + '/' + id;
				this.$postajax(url)
					.then(res => {
						if (res.code == 0) {
							this.tui.toast("订单删除成功", 2000, true);
							uni.navigateTo({
								url: "../success/success?orderStatus=2"
							})
						}
					})
			},
		}
	}
</script>

<style>
	.container {
		padding-bottom: 118rpx;
	}

	.tui-order-header {
		width: 100%;
		height: 160rpx;
		position: relative;
	}

	.tui-img-bg {
		width: 100%;
		height: 160rpx;
	}

	.tui-header-content {
		width: 100%;
		height: 160rpx;
		position: absolute;
		z-index: 10;
		left: 0;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 70rpx;
		box-sizing: border-box;
	}

	.tui-status-text {
		font-size: 36rpx;
		line-height: 36rpx;
		color: #FEFEFE;
	}

	.tui-reason {
		font-size: 24rpx;
		line-height: 24rpx;
		color: rgba(254, 254, 254, 0.75);
		padding-top: 15rpx;
		display: flex;
		align-items: center;
	}

	.tui-reason-text {
		padding-right: 12rpx;
	}

	.tui-status-img {
		width: 80rpx;
		height: 80rpx;
		display: block;
	}

	.tui-flex-box {
		width: 100%;
		display: flex;
		align-items: center;
	}

	.tui-icon-img {
		width: 44rpx;
		height: 44rpx;
		flex-shrink: 0;
	}

	.tui-logistics {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 24rpx 0 20rpx;
		box-sizing: border-box;
	}

	.tui-logistics-text {
		font-size: 28rpx;
		line-height: 32rpx;
	}

	.tui-logistics-time {
		font-size: 24rpx;
		line-height: 24rpx;
		padding-top: 16rpx;
		color: #666;
	}

	.tui-addr {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-left: 20rpx;
		box-sizing: border-box;
	}

	.tui-addr-userinfo {
		font-size: 30rpx;
		line-height: 30rpx;
		font-weight: bold;
	}

	.tui-addr-text {
		font-size: 24rpx;
		line-height: 30rpx;
		padding-top: 16rpx;
	}

	.tui-addr-tel {
		padding-left: 40rpx;
	}

	.tui-order-item {
		margin-top: 20rpx;
		border-radius: 10rpx;
		overflow: hidden;
	}

	.tui-goods-title {
		width: 100%;
		font-size: 28rpx;
		line-height: 28rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
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
		-webkit-line-clamp: 2;
		font-size: 26rpx;
		line-height: 32rpx;
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
	}

	.tui-goods-info {
		width: 100%;
		padding: 30rpx;
		box-sizing: border-box;
		background: #fff;
	}

	.tui-price-flex {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tui-size24 {
		padding-bottom: 20rpx;
		font-size: 24rpx;
		line-height: 24rpx;
		color: #888;
	}

	.tui-size32 {
		font-size: 32rpx;
		line-height: 32rpx;
		font-weight: 500;
	}

	.tui-pbtm20 {
		padding-bottom: 20rpx;
	}

	.tui-flex-shrink {
		flex-shrink: 0;
	}

	.tui-primary-color {
		color: #EB0909;
	}

	.tui-order-info {
		margin-top: 20rpx;
	}

	.tui-order-title {
		position: relative;
		font-size: 28rpx;
		line-height: 28rpx;
		padding-left: 12rpx;
		box-sizing: border-box;
	}

	.tui-order-title::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		border-left: 4rpx solid #EB0909;
		height: 100%;
	}

	.tui-order-content {
		width: 100%;
		padding: 24rpx 30rpx;
		box-sizing: border-box;
		background: #fff;
		font-size: 24rpx;
		line-height: 30rpx;
	}

	.tui-order-flex {
		display: flex;
		padding-top: 18rpx;
	}

	.tui-order-flex:first-child {
		padding-top: 0
	}

	.tui-item-title {
		width: 132rpx;
		flex-shrink: 0;
	}

	.tui-item-content {
		color: #666;
	}

	.tui-safe-area {
		height: 1rpx;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-tabbar {
		width: 100%;
		height: 98rpx;
		background: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		font-size: 26rpx;
		box-shadow: 0 0 1px rgba(0, 0, 0, .3);
		padding-bottom: env(safe-area-inset-bottom);
		z-index: 999;
	}

	.tui-btn-mr {
		margin-right: 30rpx;
	}
</style>
