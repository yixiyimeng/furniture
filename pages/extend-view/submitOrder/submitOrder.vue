<template>
	<view class="container">
		<view class="tui-box">
			<tui-list-cell :arrow="true" :last="true" :radius="true" @click="chooseAddr">
				<view class="tui-address">
					<view v-if="hasAddress">
						<view class="tui-userinfo">
							<text class="tui-name">{{userInfo.contact_name}}</text> {{userInfo.contact_phone}}
						</view>
						<view class="tui-addr">
							<view class="tui-addr-tag" v-if="userInfo.is_default==1">默认</view>
							<text>{{userInfo.province}}{{userInfo.city}}{{userInfo.district}}<text v-if="userInfo.address">({{userInfo.address}})</text></text>
						</view>
					</view>
					<view class="tui-none-addr" v-else>
						<image src="/static/images/mall/order/map.png" class="tui-addr-img" mode="widthFix"></image>
						<text>选择收货地址</text>
					</view>
				</view>
				<view class="tui-bg-img"></view>
			</tui-list-cell>
			<view class="tui-top tui-goods-info">
				<tui-list-cell :hover="false" :lineLeft="false">
					<view class="tui-goods-title">
						商品信息
					</view>
				</tui-list-cell>
				<block v-for="(item,index) in orderList">
					<tui-list-cell :hover="false" padding="0">
						<view class="tui-goods-item">
							<image :src="item.img_url[0]" class="tui-goods-img"></image>
							<view class="tui-goods-center">
								<view class="tui-goods-name">{{item.name}}</view>
								<!-- <view class="tui-goods-attr">黑色，50ml</view> -->
							</view>
							<view class="tui-price-right">
								<view>￥{{$returnFloat(item.price)}}</view>
								<view>x{{item.qyt}}</view>
							</view>
						</view>
					</tui-list-cell>
					<tui-list-cell :hover="false">
						<view class="tui-padding tui-flex">
							<view>数量</view>
							<tui-numberbox :max="99" :min="1" :value="item.qyt" @change="change"></tui-numberbox>
						</view>
					</tui-list-cell>
					<tui-list-cell :hover="false">
						<view class="tui-padding tui-flex">
							<view>商品总额</view>
							<view>￥{{$returnFloat(item.price*item.qyt)}}</view>
						</view>
					</tui-list-cell>
				</block>
				<!-- <view class="tui-number-box tui-bold tui-attr-title">
					<view class="tui-attr-title">数量</view>
					<tui-numberbox :max="99" :min="1" :value="value" @change="change"></tui-numberbox>
				</view> -->

				<!-- <tui-list-cell :arrow="hasCoupon" :hover="hasCoupon" >
					<view class="tui-padding tui-flex">
						<view>优惠券</view>
						<view :class="{'tui-color-red':hasCoupon}">{{hasCoupon?"满5减1":'没有可用优惠券'}}</view>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="true" :arrow="true">
					<view class="tui-padding tui-flex">
						<view>发票</view>
						<view class="tui-invoice-text">不开发票</view>
					</view>
				</tui-list-cell> -->
				<tui-list-cell :hover="false">
					<view class="tui-padding tui-flex">
						<view>配送费</view>
						<view>￥{{$returnFloat(postage)}}</view>
					</view>
				</tui-list-cell>
				<!-- <tui-list-cell :hover="false" :lineLeft="false" padding="0">
					<view class="tui-remark-box tui-padding tui-flex">
						<view>订单备注</view>
						<input type="text" class="tui-remark" placeholder="选填: 请先和商家协商一致" placeholder-class="tui-phcolor"></input>
					</view>
				</tui-list-cell> -->
				<tui-list-cell :hover="false" :last="true">
					<view class="tui-padding tui-flex tui-total-flex">
						<view class="tui-flex-end tui-color-red">
							<view class="tui-black">合计： </view>
							<view class="tui-size-26">￥</view>
							<view class="tui-price-large">{{$returnFloat(amount)}}</view>
							<!-- <view class="tui-size-26">.00</view> -->
						</view>
					</view>
				</tui-list-cell>
			</view>

			<!-- <view class="tui-top">
				<tui-list-cell :last="true" :hover="insufficient" :radius="true" :arrow="insufficient">
					<view class="tui-flex">
						<view class="tui-balance">余额支付<text class="tui-gray">(￥2019.00)</text></view>
						<switch color="#30CC67" class="tui-scale-small" v-show="!insufficient" />
						<view class="tui-pr-30 tui-light-dark" v-show="insufficient">余额不足, 去充值</view>
					</view>
				</tui-list-cell>
			</view> -->
		</view>
		<view class="tui-safe-area"></view>
		<view class="tui-tabbar">
			<view class="tui-flex-end tui-color-red tui-pr-20">
				<view class="tui-black">实付金额: </view>
				<view class="tui-size-26">￥</view>
				<view class="tui-price-large">{{$returnFloat(amount)}}</view>
				<!-- <view class="tui-size-26">.00</view> -->
			</view>
			<view class="tui-pr25">
				<tui-button width="200rpx" height="70rpx" type="danger" :disabled="!hasLogin" shape="circle" @click="submitOrder">确认支付</tui-button>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		basePath
	} from '@/utils/index'
	import api from '@/api/order';
	import memberapi from '@/api/member';
	import categoryapi from '@/api/category';
	import {
		mapState
	} from 'vuex'
	import tuiButton from "@/components/extend/button/button"
	import tuiListCell from "@/components/list-cell/list-cell"
	import tuiBottomPopup from "@/components/bottom-popup/bottom-popup"
	import tuiNumberbox from "@/components/numberbox/numberbox"
	export default {
		components: {
			tuiButton,
			tuiListCell,
			tuiBottomPopup,
			tuiNumberbox
		},
		data() {
			return {
				basePath,
				hasCoupon: true,
				insufficient: false,
				orderList: [],
				orderInfo: {
					name: "",
					price: null,
					img_url: []
				}, //订单信息
				value: 1, //订单数量
				productAmount: 0.00, //商品总金额
				amount: 0.00, //支付金额
				postage: 0.00, //邮费
				userInfo: {
					province: "", //省
					city: "", //市
					district: "", //区
					address: "", //详细地址
					contact_name: "", //收货人姓名
					contact_phone: "", //收货人手机号
				},
				hasAddress: false,
				seladdressId: null, //选择的地址id
				productId: null, //商品id


			}
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'member_id', 'openid']),
		onLoad: function(options) {

			this.seladdressId = options.addressId ? options.addressId : null;
			this.value = options.qyt ? options.qyt : 1;
			this.productId = options.id;
			if (options.ids) {
				let arr = JSON.parse(options.ids)
				console.log(JSON.stringify(arr))
				let shopCartArr = uni.getStorageSync('shopCartList');
				if (shopCartArr) {
					let orderList = JSON.parse(shopCartArr);
					orderList.forEach(item => {
						arr.forEach(items => {							
							if (items.id == item.id) {
								item.qyt = items.qyt;
								this.orderList.push(item)
							}
						})
					})

					console.log("购物车数组" + JSON.stringify(this.orderList))
				}

			} else {
				this.getProductShow();
			}
			setTimeout(() => {
				this.getAddress();
				//this.calcOrder();
			}, 50)


		},

		onShow: function(e) {


			let pages = getCurrentPages();


			let currPage = pages[pages.length - 1];


			if (currPage.data.isDoRefresh == true) {
				this.seladdressId = currPage.data.addressId ? currPage.data.addressId : null;

				currPage.data.isDoRefresh = false;


				this.getAddress();


			} else {


				//不用刷新


			}


		},
		methods: {
			//获取全部收货地址
			getAddress() {
				var param = {
					page: this.$pagination.page,
					limit: this.$pagination.limit
				}
				var url = memberapi.getAddress + '/' + this.member_id;
				this.$postajax(url, param)
					.then(res => {
						//console.log(JSON.stringify(res))
						if (res.code == 0) {
							let addressList = [];
							if (res.data && res.data.length > 0) {
								if (this.seladdressId) {
									addressList = res.data.filter(item => {
										if (item.id == this.seladdressId) {
											return item
										}
									});
								} else {
									addressList = res.data.filter(item => {
										if (item.is_default == 1) {
											return item
										}
									});

								}
								console.log("是神惡魔" + JSON.stringify(addressList))
								this.userInfo = addressList[0];
								this.hasAddress = addressList[0] ? true : false;
							}
							this.calcOrder();
						}
					})
					.catch(err => {

					});
			},
			//获取产品详情
			getProductShow() {
				var param = {
					member_id: this.member_id,
				}
				var url = categoryapi.getProductShow + '/' + this.productId
				this.$postajax(url, param)
					.then(res => {
						//console.log(JSON.stringify(res))
						if (res.code == 0) {
							this.orderInfo = res.data;
							this.orderInfo.img_url = JSON.parse(res.data.img_url);
							this.orderInfo.qyt = this.value;
							this.orderList.push(this.orderInfo)
							//console.log("图片数组"+JSON.stringify(this.orderInfo.img_url))
							//this.productAmount=parseFloat(this.orderInfo.price)*this.value;
							/* this.calcOrder(); */
						}


					})
					.catch(err => {

					});
			},
			//计算订单
			calcOrder() {
				let productAmount = 0;
				var goodsList = this.orderList.map(item => {
					var items = {
						"id": item.id,
						"qty": item.qyt,
					}
					productAmount += item.price * item.qyt;
					return items
				})
				//var goodsList=[{"id":this.orderInfo.id,"qty":this.value}];
				var param = {
					member_id: this.member_id,
					goodsList: JSON.stringify(goodsList),
					province: this.userInfo.province,
					city: this.userInfo.city,
					district: this.userInfo.district,
					city: this.userInfo.city,
					address: this.userInfo.address,
					contact_name: this.userInfo.contact_name,
					contact_phone: this.userInfo.contact_phone
				}
				this.$postajax(api.calcOrder, param)
					.then(res => {
						console.log("计算商品" + JSON.stringify(res))
						if (res.code == 0) {
							this.amount = res.data.amount; //支付金额
							this.postage = this.amount - productAmount;
						}


					})
					.catch(err => {

					});
			}, //
			/* chooseAddr(){
				uni.chooseAddress({
				  success(res) {
					  this.userInfo=res;
				    console.log(res.userName)
				    console.log(res.postalCode)
				    console.log(res.provinceName) 
				    console.log(res.cityName)
				    console.log(res.countyName)
				    console.log(res.detailInfo)
				    console.log(res.nationalCode)
				    console.log(res.telNumber)
				  }
				})
			}, */
			//计算商品金额
			change: function(e) {
				console.log(JSON.stringify(e.index))
				//this.value = e.value;	
				this.orderList[e.index].qyt = e.value;
				//this.productAmount=parseFloat(this.orderInfo.price)*this.value;
				this.calcOrder();
			},
			//打开选择收货地址
			chooseAddr() {
				let ischooseAddr = true
				uni.navigateTo({
					url: "../address/address?ischooseAddr=" + ischooseAddr
				})
			},
			//提交订单
			submitOrder() {

				// uni.getProvider({

				//     service: 'payment',

				//     success: function (res) {

				//     //在这里进行业务逻辑处理

				//     }

				// });
				let productAmount = 0;
				var goodsList = this.orderList.map(item => {
					var items = {
						"id": item.id,
						"qty": item.qyt,
					}
					productAmount += item.price * item.qyt;
					return items
				})
				//var goodsList=[{"id":this.orderInfo.id,"qty":this.value}];
				var param = {
					member_id: this.member_id,
					goodsList: JSON.stringify(goodsList),
					province: this.userInfo.province,
					city: this.userInfo.city,
					district: this.userInfo.district,
					city: this.userInfo.city,
					address: this.userInfo.address,
					contact_name: this.userInfo.contact_name,
					contact_phone: this.userInfo.contact_phone
				}
				if (!this.userInfo.contact_phone) {
					this.tui.toast("请选择收货地址", 2000, true);
					return
				}
				this.$postajax(api.submitOrder, param)
					.then(res => {
						console.log("计算商品" + JSON.stringify(res))
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
									setTimeout(() => {
										uni.navigateTo({
											url: "../myOrder/myOrder"
										})
									}, 200)
								}

							});
						}
					})
					.catch(err => {

					});
			},
		}
	}
</script>

<style>
	.container {
		padding-bottom: 98rpx;
	}

	.tui-box {
		padding: 20rpx 0 118rpx;
		box-sizing: border-box;
	}

	.tui-address {
		min-height: 80rpx;
		padding: 10rpx 0;
		box-sizing: border-box;
		position: relative;
	}

	.tui-userinfo {
		font-size: 30rpx;
		font-weight: 500;
		line-height: 30rpx;
		padding-bottom: 12rpx;
	}

	.tui-name {
		padding-right: 40rpx;
	}

	.tui-addr {
		font-size: 24rpx;
		word-break: break-all;
		padding-right: 25rpx;
	}

	.tui-addr-tag {
		padding: 5rpx 8rpx;
		flex-shrink: 0;
		background: #EB0909;
		color: #fff;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-size: 25rpx;
		line-height: 25rpx;
		transform: scale(0.8);
		transform-origin: 0 center;
		border-radius: 6rpx;
	}

	.tui-bg-img {
		position: absolute;
		width: 100%;
		height: 8rpx;
		left: 0;
		bottom: 0;
		background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAL0AAAAECAMAAADszM6/AAAAOVBMVEUAAAAVqfH/fp//vWH/vWEVqfH/fp8VqfH/fp//vWEVqfH/fp8VqfH/fp//vWH/vWEVqfH/fp//vWHpE7b6AAAAEHRSTlMA6urqqlVVFRUVq6upqVZUDT4vVAAAAEZJREFUKM/t0CcOACAQRFF6r3v/w6IQJGwyDsPT882IQzQE0E3chToByjG5LwMgLZN3TQATmdypCciBya0cgOT3/h//9PgF49kd+6lTSIIAAAAASUVORK5CYII=") repeat;
	}

	.tui-top {
		margin-top: 20rpx;
		overflow: hidden;
	}

	.tui-goods-title {
		font-size: 28rpx;
		display: flex;
		align-items: center;
	}

	.tui-padding {
		box-sizing: border-box;
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

	.tui-flex {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 26rpx;
	}

	.tui-total-flex {
		justify-content: flex-end;
	}

	.tui-color-red,
	.tui-invoice-text {
		color: #E41F19;
		padding-right: 30rpx;
	}

	.tui-balance {
		font-size: 28rpx;
		font-weight: 500;
	}

	.tui-black {
		color: #222;
		line-height: 30rpx;
	}

	.tui-gray {
		color: #888888;
		font-weight: 400;
	}

	.tui-light-dark {
		color: #666;
	}

	.tui-goods-price {
		display: flex;
		align-items: center;
		padding-top: 20rpx;
	}

	.tui-size-26 {
		font-size: 26rpx;
		line-height: 26rpx;
	}

	.tui-price-large {
		font-size: 34rpx;
		line-height: 32rpx;
		font-weight: 600;
	}

	.tui-flex-end {
		display: flex;
		align-items: flex-end;
		padding-right: 0;
	}

	.tui-phcolor {
		color: #B3B3B3;
		font-size: 26rpx;
	}

	/* #ifndef H5 */
	.tui-remark-box {
		padding: 22rpx 30rpx;
	}

	/* #endif */
	/* #ifdef H5 */
	.tui-remark-box {
		padding: 26rpx 30rpx;
	}

	/* #endif */

	.tui-remark {
		flex: 1;
		font-size: 26rpx;
		padding-left: 64rpx;
	}

	.tui-scale-small {
		transform: scale(0.8);
		transform-origin: 100% center;
	}

	.tui-scale-small .wx-switch-input {
		margin: 0 !important;
	}

	/* #ifdef H5 */
	>>>uni-switch .uni-switch-input {
		margin-right: 0 !important;
	}

	/* #endif */
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

	.tui-pr-30 {
		padding-right: 30rpx;
	}

	.tui-pr-20 {
		padding-right: 20rpx;
	}

	.tui-none-addr {
		height: 80rpx;
		padding-left: 5rpx;
		display: flex;
		align-items: center;
	}

	.tui-addr-img {
		width: 36rpx;
		height: 46rpx;
		display: block;
		margin-right: 15rpx;
	}


	.tui-pr25 {
		padding-right: 25rpx;
	}

	.tui-safe-area {
		height: 1rpx;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-number-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx 0 30rpx 0;
		box-sizing: border-box;
	}

	.tui-attr-title {
		padding: 10rpx 0;
		color: #333;
	}

	.tui-bold {
		font-weight: bold;
	}
</style>
