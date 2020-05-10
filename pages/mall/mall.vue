<template>
	<view class="container">
		<!--tabbar-->
		<!-- <view class="tui-tabbar">
			<block v-for="(item,index) in tabbar" :key="index">
				<view class="tui-tabbar-item" :class="[current==index?'tui-item-active':'']" :data-index="index" @tap="tabbarSwitch">
					<view :class="[index==0?'tui-ptop-4':'']">
						<tui-icon :name="current==index?item.icon+'-fill':item.icon" :color="current==index?'#E41F19':'#666'" :size="item.size"></tui-icon>
					</view>
					<view class="tui-scale">{{item.text}}</view>
				</view>
			</block>
		</view> -->
		<!--tabbar-->
		<!--header-->
		<view class="tui-header">
			<!-- <view class="tui-category" hover-class="opcity" :hover-stay-time="150" @tap="classify">
				<tui-icon name="manage-fill" color="#fff" :size="22"></tui-icon>
				<view class="tui-category-scale">分类</view>
			</view> -->
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
		</view>
		<!--header-->
		<view class="tui-header-banner">
			<view class="tui-banner-bg">
				<view class="tui-primary-bg tui-route-left"></view>
				<view class="tui-primary-bg tui-route-right"></view>
				<!--banner-->
				<view class="tui-banner-box">
					<swiper :indicator-dots="true" :autoplay="true" :interval="5000" :duration="150" class="tui-banner-swiper"
					 :circular="true" indicator-color="rgba(255, 255, 255, 0.8)" indicator-active-color="#fff">
						<swiper-item v-for="(item,index) in banner" :key="index" @tap.stop="bannerSkip(item.jump)">
							<image :src="basePath+item.img_url" class="tui-slide-image" mode="scaleToFill" />
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>

		<view class="tui-product-category">
			<view class="tui-category-item" v-for="(item,index) in category" :key="index" :data-key="item.name" @tap="classify(item.id)">
				<image :src="basePath+item.img_url" class="tui-category-img" mode="scaleToFill"></image>
				<view class="tui-category-name">{{item.name}}</view>
			</view>
		</view>
		<view class="tui-product-box">
			<view class="tui-group-name">
				<text>热门推荐</text>
			</view>
			<view class="tui-product-list">
				<!-- <view class="tui-product-container">
					<block  > -->
				<!--商品列表-->
				<view class="tui-pro-item" v-for="(item,index) in productList" :key="index" hover-class="hover" :hover-start-time="150"
				 @tap="detail(item)">
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
				<!-- <template is="productItem" data="{{item,index:index}}" /> -->
				<!-- </block>
				</view> -->
			</view>
		</view>


		<!--加载loadding-->
		<tui-loadmore :visible="loadding" :index="3" type="red"></tui-loadmore>
		<tui-nomore :visible="!pullUpOn" bgcolor="#fafafa"></tui-nomore>
		<!--加载loadding-->
		<view class="tui-safearea-bottom"></view>
	</view>
</template>
<script>
	import {
		basePath
	} from '@/utils/index'
	import {
		mapState
	} from 'vuex'
	import api from "@/api/category"
	import memberApi from "@/api/member"
	import tuiIcon from "@/components/icon/icon"
	import tuiTag from "@/components/tag/tag"
	import tuiLoadmore from "@/components/loadmore/loadmore"
	import tuiNomore from "@/components/nomore/nomore"
	export default {
		components: {
			tuiIcon,
			tuiTag,
			tuiLoadmore,
			tuiNomore
		},
		data() {
			return {
				basePath,
				current: 0,
				tabbar: [{
					icon: "home",
					text: "首页",
					size: 21
				}, {
					icon: "category",
					text: "分类",
					size: 24
				}, {
					icon: "cart",
					text: "购物车",
					size: 22
				}, {
					icon: "people",
					text: "我的",
					size: 24
				}],
				banner: [
					"1.jpg",
					"2.jpg",
					"3.jpg",
					"4.jpg",
					"5.jpg"
				],
				category: [],
				productList: [],
				pageIndex: this.$pagination.page,
				lastPage: this.$pagination.page,
				searchKey: '', //关键字
				loadding: false,
				pullUpOn: true
			}
		},
		onLoad() {
			this.getBannerImg();
			this.getCategory();
			this.getHostProduct();
		},
		watch: {
			pageIndex(newValue, oldValue) {
				if (this.pageIndex == this.lastPage) {
					console.log(22222)
					this.pullUpOn = false;

				}
			}
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'member_id', 'openid']),
		methods: {
			//获取轮播图
			getBannerImg() {
				this.$postajax(memberApi.getBannerImg)
					.then(res => {
						if (res.code == 0) {
							this.banner = res.data;
						}
					})
					.catch(err => {
			
					});
			},
			//获取分类
			getCategory() {
				var param = {
					page: this.pageIndex,
					limit: this.$pagination.limit,
					name: "",
				}
				this.$postajax(api.getCategory, param)
					.then(res => {
						if (res.code == 0) {
							this.category = res.data;
						}
					})
					.catch(err => {

					});
			},
			//获取产品
			getHostProduct() {
				var param = {
					page: this.$pagination.page,
					limit: this.$pagination.limit,
					member_id: this.member_id,
					name: this.searchKey,
				}
				this.$postajax(api.getHostProduct, param)
					.then(res => {
						if (res.code == 0) {
							this.productList = res.data;
							this.lastPage = res.data && res.data.length > 0 ? (Math.ceil(res.count / this.$pagination.limit)) : 1;
							console.log("最后一页" + JSON.stringify(this.lastPage))
							if (this.pageIndex == this.lastPage) {
								this.pullUpOn = false;
							}
							//this.count=res.count;
						}


					})
					.catch(err => {

					});

			},
			tabbarSwitch: function(e) {
				let index = e.currentTarget.dataset.index;
				this.current = index;
				if (index != 0) {
					if (index == 1) {
						this.classify();
					} else if (index == 2) {
						uni.navigateTo({
							url: '../mall-extend/shopcart/shopcart'
						})
					} else {
						uni.navigateTo({
							url: '../mall-extend/my/my'
						})
					}
				}
			},
			detail: function(item) {
				console.log(JSON.stringify(item))
				/* ar productBaseInfo={
						"name":item.name,
					    "price":item.price,
					    "id":item.id,
					    "img_url":item.img_url
				} */
				uni.navigateTo({
					url: '../extend-view/productDetail/productDetail?id=' + item.id
				})
			},
			//banner跳转页面，
			bannerSkip(url){
				console.log(url)
				uni.navigateTo({
					url: url
				})
			},
			classify: function(id) {
				uni.reLaunch({
					url: '../category/category?searchKey=' + id
				});

			},
			more: function(e) {
				let key = e.currentTarget.dataset.key || "";
				uni.navigateTo({
					url: '../extend-view/productList/productList?searchKey=' + key
				})

			},
			//模糊搜索
			search: function() {
				this.getHostProduct();
			},
			//清空搜索关键字
			cleanKey: function() {
				this.searchKey = '';
				this.getHostProduct();
			},
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
				this.$postajax(api.getHostProduct, param)
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
</script>

<style>
	page {
		background: #f7f7f7;
	}

	.container {
		padding-bottom: 100rpx;
		color: #333;
	}

	/*tabbar*/

	.tui-tabbar {
		width: 100%;
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: space-between;
		z-index: 99999;
		background: #fff;
		height: 100rpx;
		left: 0;
		bottom: 0;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-safearea-bottom {
		width: 100%;
		height: env(safe-area-inset-bottom);
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

	.tui-tabbar-item {
		flex: 1;
		width: 25%;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: space-between;
		font-size: 24rpx;
		color: #666;
		height: 80rpx;
	}

	.tui-ptop-4 {
		padding-top: 4rpx;
	}

	.tui-scale {
		font-weight: bold;
		transform: scale(0.8);
		transform-origin: center 100%;
		line-height: 30rpx;
	}

	.tui-item-active {
		color: #e41f19 !important;
	}

	/*tabbar*/

	.tui-header {
		width: 100%;
		height: 100rpx;
		padding: 0 30rpx 0 20rpx;
		box-sizing: border-box;
		background: #e41f19;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		left: 0;
		top: 0;
		/* #ifdef H5 */
		top: 44px;
		/* #endif */
		z-index: 999;
	}

	.tui-searchbox {
		padding: 30upx 20upx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		width: 100%;
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

	.tui-rolling-search {
		width: 100%;
		height: 60rpx;
		border-radius: 35rpx;
		padding: 0 40rpx 0 30rpx;
		box-sizing: border-box;
		background: #fff;
		display: flex;
		align-items: center;
		flex-wrap: nowrap;
		color: #999;
	}

	.tui-category {
		font-size: 24rpx;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin: 0;
		margin-right: 22rpx;
		flex-shrink: 0;
	}

	.tui-category-scale {
		transform: scale(0.7);
		line-height: 24rpx;
	}

	.tui-icon-category {
		line-height: 20px !important;
		margin-bottom: 0 !important;
	}

	.tui-swiper {
		font-size: 26rpx;
		height: 60rpx;
		flex: 1;
		padding-left: 12rpx;
	}

	.tui-swiper-item {
		display: flex;
		align-items: center;
	}

	.tui-hot-item {
		line-height: 26rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.tui-header-banner {
		padding-top: 100rpx;
		box-sizing: border-box;
		background: #e41f19;
	}

	.tui-hot-search {
		color: #fff;
		font-size: 24rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20rpx;
		box-sizing: border-box;
		position: relative;
		z-index: 2;
	}

	.tui-hot-tag {
		background: rgba(255, 255, 255, 0.15);
		padding: 10rpx 24rpx;
		border-radius: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		line-height: 24rpx;
		/* margin-left: 20rpx; */
	}

	.tui-banner-bg {
		display: flex;
		height: 180rpx;
		background: #e41f19;
		position: relative;
	}

	.tui-primary-bg {
		width: 50%;
		display: inline-block;
		height: 224rpx;
		border: 1px solid transparent;
		position: relative;
		z-index: 1;
		background: #e41f19;
	}

	.tui-route-left {
		transform: skewY(8deg);
	}

	.tui-route-right {
		transform: skewY(-8deg);
	}

	.tui-banner-box {
		width: 100%;
		padding: 0 20rpx;
		box-sizing: border-box;
		position: absolute;
		/* overflow: hidden; */
		z-index: 99;
		bottom: -80rpx;
		left: 0;
	}

	.tui-banner-swiper {
		width: 100%;
		height: 240rpx;
		border-radius: 12rpx;
		overflow: hidden;
		transform: translateY(0);
	}

	.tui-slide-image {
		width: 100%;
		height: 240rpx;
		display: block;
	}

	/* #ifdef APP-PLUS || MP */
	.tui-banner-swiper .wx-swiper-dot {
		width: 8rpx;
		height: 8rpx;
		display: inline-flex;
		background: none;
		justify-content: space-between;
	}

	.tui-banner-swiper .wx-swiper-dot::before {
		content: '';
		flex-grow: 1;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 16rpx;
		overflow: hidden;
	}

	.tui-banner-swiper .wx-swiper-dot-active::before {
		background: #fff;
	}

	.tui-banner-swiper .wx-swiper-dot.wx-swiper-dot-active {
		width: 16rpx;
	}

	/* #endif */

	/* #ifdef H5 */
	>>>.tui-banner-swiper .uni-swiper-dot {
		width: 8rpx;
		height: 8rpx;
		display: inline-flex;
		background: none;
		justify-content: space-between;
	}

	>>>.tui-banner-swiper .uni-swiper-dot::before {
		content: '';
		flex-grow: 1;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 16rpx;
		overflow: hidden;
	}

	>>>.tui-banner-swiper .uni-swiper-dot-active::before {
		background: #fff;
	}

	>>>.tui-banner-swiper .uni-swiper-dot.uni-swiper-dot-active {
		width: 16rpx;
	}

	/* #endif */

	.tui-product-category {
		background: #fff;
		padding: 80rpx 20rpx 30rpx 20rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		font-size: 24rpx;
		color: #555;
		margin-bottom: 20rpx;
	}

	.tui-category-item {
		width: 20%;
		height: 118rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-direction: column;
		padding-top: 30rpx;
	}

	.tui-category-img {
		height: 80rpx;
		width: 80rpx;
		display: block;
	}

	.tui-category-name {
		line-height: 24rpx;
	}

	.tui-product-box {
		margin-top: 20rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
	}

	.tui-pb-20 {
		padding-bottom: 20rpx;
	}

	.tui-bg-white {
		background: #fff;
	}

	.tui-group-name {
		font-size: 32rpx;
		font-weight: bold;
		text-align: center;
		padding: 24rpx 0;
	}

	.tui-activity-box {
		display: flex;
		border-radius: 12rpx;
		overflow: hidden;
	}

	.tui-activity-img {
		width: 50%;
		display: block;
	}

	.tui-new-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.tui-new-item {
		width: 49%;
		height: 200rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		background: #f5f2f9;
		position: relative;
		border-radius: 12rpx;
	}

	.tui-new-mtop {
		margin-top: 2%;
	}

	.tui-title-box {
		font-size: 24rpx;
	}

	.tui-new-title {
		line-height: 32rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.tui-new-price {
		padding-top: 18rpx;
	}

	.tui-new-present {
		color: #ff201f;
		font-weight: bold;
	}

	.tui-new-original {
		display: inline-block;
		color: #a0a0a0;
		text-decoration: line-through;
		padding-left: 12rpx;
		transform: scale(0.8);
		transform-origin: center center;
	}

	.tui-new-img {
		width: 160rpx;
		height: 160rpx;
		display: block;
		flex-shrink: 0;
	}

	.tui-new-label {
		width: 56rpx;
		height: 56rpx;
		border-top-left-radius: 12rpx;
		position: absolute;
		left: 0;
		top: 0;
	}

	/* 商品列表*/

	.tui-product-list {
		/* display: flex;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: wrap;
		box-sizing: border-box; */

		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-flex-wrap: wrap;
		flex-wrap: wrap;
		padding: 0;
	}

	/* .tui-product-container {
		flex: 1;
		margin-right: 2%;
	} */
	.tui-product-container {
		flex: 1;
		margin-right: 10rpx;
	}

	.tui-product-container:last-child {
		/* margin-right: 0; */
	}

	.tui-product-list .tui-pro-item:nth-child(2n+1) {
		margin-right: 4%;
	}

	.tui-pro-item {
		/* width: 100%;
		margin-bottom: 4%;
		background: #fff;
		box-sizing: border-box;
		border-radius: 12rpx;
		overflow: hidden; */
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
		height: 170px;
		border-radius: 3px;
		overflow: hidden;
		position: relative;
	}

	.tui-pro-img {

		width: 100%;
		height: 100%;
		opacity: 1;
	}

	/* .tui-flex-list {
		display: flex;
		margin-bottom: 1rpx !important;
	} */
	/* .tui-pro-img {
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
	} */
	/* .tui-product-container {
		flex: 1;
		margin-right: 10rpx;
	}
	
	.tui-product-container:last-child {
		margin-right: 0;
	}
	
	.tui-pro-item {
		width: 100%;
		margin-bottom: 10rpx;
		background: #fff;
		box-sizing: border-box;
		border-radius: 12rpx;
		overflow: hidden;
		transition: all 0.15s ease-in-out;
	}
	
	.tui-flex-list {
		display: flex;
		margin-bottom: 1rpx !important;
	} */

	/* .tui-pro-img {
		width: 100%;
		display: block;
	} */

	.tui-proimg-list {
		width: 260rpx;
		height: 260rpx !important;
		flex-shrink: 0;
		border-radius: 12rpx;
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

	/* 商品列表*/
</style>
