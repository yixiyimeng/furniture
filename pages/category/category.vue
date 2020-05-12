<template>
	<view class="container">
		<view class="tui-searchbox">
			<view class="tui-search-input">
				<!-- #ifdef APP-PLUS || MP -->
				<icon type="search" :size='13' color='#999'></icon>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<view>
					<tui-icon name="search" :size='16' color='#999'></tui-icon>
				</view>
				<!-- #endif -->
				<input confirm-type="search" placeholder="搜索商品" :focus="false" placeholder-class="tui-input-plholder" class="tui-input"
				 v-model.trim="searchKey" @confirm="search" />
				<!-- #ifdef APP-PLUS || MP -->
				<icon type="clear" :size='13' color='#bcbcbc' @tap="cleanKey" v-show="searchKey"></icon>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<view @tap="cleanKey" v-show="searchKey">
					<tui-icon name="close-fill" :size='16' color='#bcbcbc'></tui-icon>
				</view>
				<!-- #endif -->

			</view>
		</view>

		<scroll-view scroll-y scroll-with-animation :scroll-top="scrollTop" class="tab-view" :style="{height:height+'px',top:top+'px'}">
			<view style="position: relative;height: 100%;position: absolute;background: #f6f6f6;top:0;bottom:0">
				<view v-for="(item,index) in tabbar" :key="index" class="tab-bar-item" :class="[currentTab==item.id ? 'active' : '']"
				 :data-current="index" @tap.stop="swichNav(item.id)">
					<text>{{item.name}}</text>

				</view>
				
			</view>
		</scroll-view>
		<view v-if="isSHowSub" >
			<view class="sub-tab-view" @click="handleClose" :style="{height:height+'px',top:top+'px',background:'rgba(0, 0, 0, 0.5)'}">
				<view v-for="(item,index) in subtabbar" :key="index" class="sub-tab-bar-item" :class="[currentsubTab==item.id ? 'active' : '']"
				 :data-current="index" @tap.stop="swichsubNav(item.id)">
					<text>{{item.name}}</text>
		
				</view>
			</view>
		</view>
		<block>
			<scroll-view scroll-y class="right-box" :style="{height:height+'px',top:top+'px'}">

				<!--内容部分 start 自定义可删除-->

				<view class="page-view">
					<view class="class-box">
						<view class="tui-product-box">
							<view class="tui-product-list">
								<view class="tui-pro-item" v-for="(item,index) in productList" :key="index" hover-class="hover"
								 :hover-start-time="150" @tap.stop="detail(item)">
									<view class="tui-pro-img-container">
										<image :src="item.img_url[0]" class="tui-pro-img" mode="aspectFill" />
									</view>
									<view class="tui-pro-content">
										<view class="tui-pro-tit">{{item.name}}</view>
										<view>
											<view class="tui-pro-price">
												<text class="tui-sale-price">￥{{item.price}}</text>
												<!-- <text class="tui-factory-price">￥{{item.factory}}</text> -->
											</view>
											<!-- <view class="tui-pro-pay">{{item.payNum}}人付款</view> -->
										</view>
									</view>
								</view>
								<!--商品列表-->
							</view>
						</view>
					</view>
					<!--加载loadding-->
					<tui-loadmore :visible="loadding" :index="3" type="red"></tui-loadmore>
					<tui-nomore :visible="!pullUpOn" bgcolor="#fafafa"></tui-nomore>
					<!--加载loadding-->
				</view>
				<!--内容部分 end 自定义可删除-->
			</scroll-view>
		</block>
	</view>
</template>

<script>
	import {
		basePath
	} from '@/utils/index'
	import api from "@/api/category"
	const util = require('@/utils/util.js')
	import tuiLoadmore from "@/components/loadmore/loadmore"
	import tuiNomore from "@/components/nomore/nomore"
	import {
		mapState
		} from 'vuex'
	export default {
		components: {
			tuiLoadmore,
			tuiNomore
		},
		data() {
			return {
				basePath,
				tabbar: [],
				subtabbar: [],
				productList: [],
				height: 0, //scroll-view高度
				top: 0,
				currentTab: null, //预设当前项的值
				currentsubTab: null, //预设当前二級分类项的值
				isSHowSub: false, //默认不显示二级分类
				scrollTop: 0, //tab标题的滚动条位置
				searchKey: "", //关键字
				pageIndex: 1,
				lastPage: 1,
				loadding: false,
				pullUpOn: true,
			}
		},
		computed: mapState(['member_id']),
		onLoad: function(options) {
			setTimeout(() => {
				uni.getSystemInfo({
					success: (res) => {
						let header = 92;
						let top = 10;
						//#ifdef H5
						top = 44;
						//#endif
						this.height = res.windowHeight - uni.upx2px(header)
						this.top = top + uni.upx2px(header)

						//this.getProduct();
						//this.swichNav(this.currentTab)
					}
				});
			}, 50)
			console.log("跳轉參數" + options.searchKey)
			this.currentTab = options.searchKey;
		},
		onShow() {
			this.getCategory();
			this.getProduct();
		},
		watch: {
			pageIndex(newValue, oldValue) {
				if (this.pageIndex == this.lastPage) {
					console.log(22222)
					this.pullUpOn = false;

				}
			}
		},
		methods: {
			//获取分类
			getCategory() {
				var param = {
					page: this.$pagination.page,
					limit: this.$pagination.limit,
					name: "",
				}
				this.$postajax(api.getCategory, param)
					.then(res => {
						console.log(JSON.stringify(res))
						if (res.code == 0) {
							this.tabbar = res.data;
							this.tabbar.unshift({
								id: null,
								name: "全部"
							})
						}


					})
					.catch(err => {

					});
			},
			//获取二级分类
			getClass() {
				if (this.currentTab) {
					var param = {
						page: this.$pagination.page,
						limit: this.$pagination.limit,
						/* name: item.name, */
						cid: this.currentTab,
					}
					this.$postajax(api.getClass, param)
						.then(res => {
							//console.log(JSON.stringify(res))
							if (res.code == 0) {
								this.subtabbar = res.data;
								if (res.data && res.data.length > 0) {
									this.isSHowSub = true;
									this.subtabbar.unshift({
										id: null,
										name: "全部"
									})
								} else {
									this.subtabbar = [];
									this.isSHowSub = false;
								}



							}


						})
						.catch(err => {

						});
				} else {
					this.subtabbar = [];
					this.isSHowSub = false;
				}
			},

			//获取产品
			getProduct() {
				var param = {
					page: this.$pagination.page,
					limit: this.$pagination.limit,
					member_id: this.member_id,
					name: this.searchKey,
					class_id: this.currentsubTab,
					category_id: this.currentTab,
				}
				this.$postajax(api.getProduct, param)
					.then(res => {
						if (res.code == 0) {
							this.productList = res.data;
							this.lastPage = res.data && res.data.length > 0 ? (Math.ceil(res.count / this.$pagination.limit)) : 1;
							console.log("最后一页" + JSON.stringify(this.lastPage))
							if (this.pageIndex == this.lastPage) {
								this.pullUpOn = false;
							}
						}


					})
					.catch(err => {

					});

			},
			// 点击标题切换当前页时改变样式
			swichNav: function(id) {
				//let cur = e.currentTarget.dataset.current;
				/* let cur = index; */
				this.currentTab = id;
				console.log("左侧分类选中数据" + JSON.stringify(id))
				this.currentsubTab = null;
				this.getClass();
				this.getProduct();
				if (!this.currentTab) {
					this.currentsubTab = null;
					this.isSHowSub = false;
				}
				if (this.currentTab == id) {
					return false;
				} else {
					this.currentTab = id;
					this.checkCor();
				}


			},
			swichsubNav(id) {
				this.isSHowSub = false;
				this.currentsubTab = id;
				this.getProduct();
			},
			handleClose(e) {
				console.log(3333333)
				this.isSHowSub = false;
			},
			//判断当前滚动超过一屏时，设置tab标题滚动条。
			checkCor: function() {
				let that = this;
				//这里计算按照实际情况进行修改，动态数据要进行动态分析
				//思路：窗体高度/单个分类高度 200rpx 转px计算 =>得到一屏幕所显示的个数，结合后台传回分类总数进行计算
				//数据很多可以多次if判断然后进行滚动距离计算即可
				if (that.currentTab > 7) {
					that.scrollTop = 500
				} else {
					that.scrollTop = 0
				}
			},
			detail(item) {
				this.isSHowSub = false;
				console.log(JSON.stringify(item))
				uni.navigateTo({
					url: '../extend-view/productDetail/productDetail?id=' + item.id
				})
			},
			//模糊搜索
			search: function() {
				this.getProduct();
			},
			//清空搜索关键字
			cleanKey: function() {
				this.searchKey = '';
				this.getProduct();
			},
			onReachBottom: function() {
				console.log(3333)
				//if (!this.pullUpOn) return;
				this.pullUpOn = true
				this.loadding = true;
				console.log('页面上拉触底事件');
				// 每次拉到页面底部,请求页数自加
				this.pageIndex++;
				// 第二次之后请求数据
				if (this.pageIndex > this.lastPage) {
					setTimeout(() => {
						this.loadding = false
						this.pullUpOn = false
					}, 1000)
					return false;
				} else {
					var param = {
						page: this.pageIndex,
						limit: this.$pagination.limit,
						member_id: this.member_id,
						name: this.searchKey,
					}
					this.$postajax(api.getProduct, param)
						.then(res => {
							console.log(JSON.stringify(res))
							if (res.code == 0) {
								console.log(JSON.stringify(res))
								if (res.code == 0) {
									this.productList = this.productList.concat(res.data)
									this.loadding = false;
								}
							}


						})
						.catch(err => {

						});
				}
			}
		}
	}
</script>

<style>
	page {
		background: #fcfcfc;
	}

	/* 左侧导航布局 start*/

	/* 隐藏scroll-view滚动条*/

	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}

	.tui-searchbox {
		padding: 30upx 20upx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}

	.tui-search-input {
		width: 100%;
		height: 66upx;
		border-radius: 35upx;
		padding: 0 30upx;
		box-sizing: border-box;
		background: #f2f2f2;
		display: flex;
		align-items: center;
		flex-wrap: nowrap;
	}

	.tui-input {
		flex: 1;
		color: #333;
		padding: 0 16upx;
		font-size: 28upx;
	}

	.tui-input-plholder {
		font-size: 28upx;
		color: #b2b2b2;
	}

	.tui-cancle {
		color: #888;
		font-size: 28upx;
		padding-left: 30upx;
		flex-shrink: 0;
	}

	.tab-view {
		width: 200upx;
		position: absolute;
		left: 0;
		z-index: 10;
		/* top: 0; */
		bottom: 0;
		overflow: auto;
	}

	.tab-bar-item {
		width: 200upx;
		height: 110upx;
		background: #f6f6f6;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26upx;
		color: #444;
		font-weight: 400;
	}

	.sub-tab-view {
		width: 100%;
		position: absolute;
		left: 220rpx;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		top: 0;
		bottom: 0;
		z-index:999
	}

	.sub-tab-bar-item {
		width: 200upx;
		height: 80upx;
		background: #fcfcfc;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26upx;
		color: #444;
		font-weight: 400;
	}

	.active {
		position: relative;
		color: #000;
		font-size: 30upx;
		font-weight: 600;
		background: #fcfcfc;
	}

	.active::before {
		content: "";
		position: absolute;
		border-left: 8upx solid #E41F19;
		height: 30upx;
		left: 0;
	}

	/* 左侧导航布局 end*/

	.right-box {
		width: 100%;
		position: fixed;
		padding-left: 220upx;
		box-sizing: border-box;
		left: 0;
	}

	.page-view {
		width: 100%;
		overflow: hidden;
		padding-top: 20upx;
		padding-right: 20upx;
		box-sizing: border-box;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.swiper {
		width: 100%;
		height: 220upx;
		border-radius: 12upx;
		overflow: hidden;
		transform: translateZ(0);
	}

	/* #ifdef APP-PLUS || MP */
	.swiper .wx-swiper-dot {
		width: 8upx;
		height: 8upx;
		display: inline-flex;
		background: none;
		justify-content: space-between;
	}

	.swiper .wx-swiper-dot::before {
		content: '';
		flex-grow: 1;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 16upx;
		overflow: hidden;
	}

	.swiper .wx-swiper-dot-active::before {
		background: #fff;
	}

	.swiper .wx-swiper-dot.wx-swiper-dot-active {
		width: 16upx;
	}

	/* #endif */

	/* #ifdef H5 */
	>>>.swiper .uni-swiper-dot {
		width: 8rpx;
		height: 8rpx;
		display: inline-flex;
		background: none;
		justify-content: space-between;
	}

	>>>.swiper .uni-swiper-dot::before {
		content: '';
		flex-grow: 1;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 16rpx;
		overflow: hidden;
	}

	>>>.swiper .uni-swiper-dot-active::before {
		background: #fff;
	}

	>>>.swiper .uni-swiper-dot.uni-swiper-dot-active {
		width: 16rpx;
	}

	/* #endif */

	.slide-image {
		width: 100%;
		height: 220upx;
	}

	.class-box {
		padding-top: 30upx;
	}

	.class-item {
		background: #fff;
		width: 100%;
		box-sizing: border-box;
		padding: 20upx;
		margin-bottom: 20upx;
		border-radius: 12upx;
	}

	.class-name {
		font-size: 22upx;
	}

	.g-container {
		/* padding-top: 20upx; */
		display: flex;
		display: -webkit-flex;
		justify-content: flex-start;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.g-box {
		width: 33.3333%;
		text-align: center;
		padding-top: 40upx;
	}

	.g-image {
		width: 120upx;
		height: 120upx;
	}

	.g-title {
		font-size: 22upx;
	}

	.tui-product-box {
		padding: 20upx;
	}

	.tui-product-list {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-flex-wrap: wrap;
		flex-wrap: wrap;
		padding: 0;
	}

	.tui-product-container {
		flex: 1;
		margin-right: 10rpx;
	}

	.tui-product-list .tui-pro-item:nth-child(2n+1) {
		margin-right: 4%;
	}

	.tui-pro-item {
		box-shadow: 2px 2px 10px rgba(66, 135, 193, .1);
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column;
		width: 48%;
		margin-bottom: 16px;
	}

	.tui-pro-img-container {
		width: 100%;
		height: 120px;
		border-radius: 3px;
		overflow: hidden;
		position: relative;
	}

	.tui-pro-img {

		width: 100%;
		height: 100%;
		opacity: 1;
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
