<template>
	<view class="container">
		<!--header-->
		<view class="tui-header-box" :style="{height:height+'px',background:'rgba(255,255,255,'+opcity+')'}">
			<view class="tui-header" :style="{paddingTop:top+'px', opacity:opcity}">
				商品详情
			</view>
			<view class="tui-header-icon" :style="{marginTop:top+'px'}">
				<view class="tui-icon tui-icon-arrowleft tui-icon-back" :style="{color:opcity>=1?'#000':'#fff',background:'rgba(0, 0, 0,'+iconOpcity+')'}"
				 @tap="back"></view>
				<!-- <view class="tui-icon tui-icon-more-fill  tui-icon-ml" :style="{color:opcity>=1?'#000':'#fff',background:'rgba(0, 0, 0,'+iconOpcity+')',fontSize:'20px'}"
				 @tap.stop="openMenu"></view> -->
				<!-- <tui-badge type="red" size="small">5</tui-badge> -->
			</view>
		</view>
		<!--header-->

		<!--banner-->
		<view class="tui-banner-swiper">
			<swiper :autoplay="true" :interval="5000" :duration="150" :circular="true" :style="{height:scrollH + 'px'}" @change="bannerChange">
				<block v-for="(item,index) in productInfo.img_url" :key="index">
					<swiper-item :data-index="index" @tap.stop="previewImage">
						<image :src="item" class="tui-slide-image" :style="{height:scrollH+'px'}" />
					</swiper-item>
				</block>
			</swiper>
			<tui-tag type="translucent" shape="circleLeft" size="small">{{bannerIndex+1}}/{{productInfo.img_url.length}}</tui-tag>
		</view>

		<!--banner-->

		<view class="tui-pro-detail">
			<view class="tui-product-title tui-border-radius">
				<view class="tui-pro-pricebox tui-padding">
					<view class="tui-pro-price">
						<view>￥<text class="tui-price">{{productInfo.price}}</text></view>
						<!-- <tui-tag size="small" :plain="true" type="high-green" shape="circle">新品</tui-tag> -->
					</view>
					<view class="tui-collection tui-size" @tap="collecting">
						<view class="tui-icon tui-icon-collection" :class="['tui-icon-'+(collected?'like-fill':'like')]" :style="{color:collected?'#ff201f':'#333',fontSize:'20px'}"></view>
						<view class="tui-scale" :class="[collected?'tui-icon-red':'']">收藏</view>
					</view>
				</view>
				<!-- <view class="tui-original-price tui-gray">
					价格
					<text class="tui-line-through">￥199.00</text>
				</view> -->
				<view class="tui-pro-titbox">
					<view class="tui-pro-title">{{productInfo.name}}</view>
					<!-- <button open-type="share" class="tui-share-btn tui-share-position">
						<tui-tag type="gray" tui-tag-class="tui-tag-share tui-size" shape="circleLeft" size="small">
							<view class="tui-icon tui-icon-partake" style="color:#999;font-size:15px"></view>
							<!-- <tui-icon name="partake" color="#999" size="15"></tui-icon> -->
					<!--<text class="tui-share-text tui-gray">分享</text>
						</tui-tag>
					</button> -->
					<button @click="openActionSheet" class="tui-share-btn tui-share-position">
						<tui-tag type="gray" tui-tag-class="tui-tag-share tui-size" shape="circleLeft" size="small">
							<view class="tui-icon tui-icon-partake" style="color:#999;font-size:15px"></view>
							<text class="tui-share-text tui-gray">分享</text>
						</tui-tag>
					</button>
				</view>
				<!-- <view class="tui-padding">
					<view class="tui-sub-title tui-size tui-gray">此商品将于2019-06-28,10点结束闪购特卖，时尚美饰联合专场</view>
					<view class="tui-sale-info tui-size tui-gray">
						<view>快递：0.00</view>
						<view>月销2000</view>
						<view>浙江杭州</view>
					</view>
				</view> -->
			</view>
			<view class="tui-nomore-box">
				<tui-nomore text="宝贝详情" :visible="true" bgcolor="#f7f7f7"></tui-nomore>
			</view>
			<view class="tui-product-img tui-radius-all">
				<view v-html="productInfo.info"></view>
				<!-- <image :src="'https://www.thorui.cn/img/detail/'+(index+1)+'.jpg'" v-for="(img,index) in 20" :key="index" mode="widthFix"></image> -->
			</view>
			<tui-nomore text="已经到最底了" :visible="true" bgcolor="#f7f7f7"></tui-nomore>
			<view class="tui-safearea-bottom"></view>
		</view>
		<!--底部操作栏-->
		<view class="tui-operation">
			<view class="tui-operation-left tui-col-5">
				<view class="tui-operation-item" hover-class="opcity" :hover-stay-time="150" style="margin-top: 10rpx;">
					<button open-type="contact" :show-message-card="true" class="tui-operation-text tui-scale-small" style="background: #fff;">
						<tui-icon name="kefu" :size="22" color='#333'></tui-icon>
						<view>客服</view>
					</button>
				</view>
				<view class="tui-operation-item" hover-class="tui-opcity" :hover-stay-time="150" @tap="shopCart">
					<tui-icon name="cart" :size="22" color='#333'></tui-icon>
					<view class="tui-operation-text tui-scale-small">购物车</view>
					<!-- <tui-badge type="danger" size="small">{{shopCartNum}}</tui-badge> -->
				</view>
			</view>
			<view class="tui-operation-right tui-right-flex tui-col-7 tui-btnbox-4">
				<view class="tui-flex-1">
					<tui-button type="danger" shape="circle" size="mini" @click="showPopup">加入购物车</tui-button>
				</view>
				<view class="tui-flex-1">
					<tui-button type="warning" shape="circle" size="mini" @click="submit">立即购买</tui-button>
				</view>
			</view>
		</view>


		<!--底部操作栏--->

		<!--顶部下拉菜单-->
		<tui-top-dropdown tui-top-dropdown="tui-top-dropdown" bgcolor="rgba(76, 76, 76, 0.95)" :show="menuShow" :height="0"
		 @close="closeMenu">
			<view class="tui-menu-box tui-padding tui-ptop">
				<view class="tui-menu-header" :style="{paddingTop:top+'px'}">
					功能直达
				</view>
				<view class="tui-menu-itembox">
					<block v-for="(item,index) in topMenu" :key="index">
						<view class="tui-menu-item" hover-class="tui-opcity" :hover-stay-time="150" @tap="common">
							<view class="tui-badge-box">
								<tui-icon :name="item.icon" color="#fff" :size="item.size"></tui-icon>
								<tui-badge type="red" tui-badge-class="tui-menu-badge" size="small" v-if="item.badge">{{item.badge}}</tui-badge>
							</view>
							<view class="tui-menu-text">{{item.text}}</view>
						</view>
					</block>
				</view>
				<view class="tui-icon tui-icon-up" style="color: #fff; font-size: 26px;" @tap.stop="closeMenu"></view>
				<!-- <tui-icon name="up" color="#fff" size="26" class="tui-icon-up" @tap.stop="closeMenu"></tui-icon> -->
			</view>

		</tui-top-dropdown>
		<!---顶部下拉菜单-->

		<!--底部选择层-->
		<tui-bottom-popup :show="popupShow" @close="hidePopup">
			<view class="tui-popup-box">
				<view class="tui-product-box tui-padding">
					<image :src="productInfo.img_url[0]" class="tui-popup-img"></image>
					<view class="tui-popup-price">
						<view class="tui-amount tui-bold">￥{{productInfo.price}}</view>
						<view class="tui-number">{{productInfo.name}}</view>
					</view>
				</view>
				<view class="tui-scrollview-box">
					<view class="tui-bold tui-attr-title">规格参数</view>
					<view class="tui-attr-box">
						<view class="tui-attr-item" :class="{'tui-attr-active':specInfo.id==item.id}" v-for="(item,index) in productInfo.spec" :key="index"  @click="changeSpec(item)">{{item.name}} <text class="pl20">¥{{item.price}}</text></view>
					</view>
					<view class="tui-number-box tui-bold tui-attr-title">
						<view class="tui-attr-title">数量</view>
						<tui-numberbox :max="99" :min="1" :value="value" @change="change"></tui-numberbox>
					</view>

					<view class="tui-operation tui-operation-right tui-right-flex tui-popup-btn">
						<view class="tui-flex-1">
							<tui-button type="red" shape="circle" size="mini" @click="surePopup">加入购物车</tui-button>
						</view>
						<view class="tui-flex-1">
							<tui-button type="warning" shape="circle" size="mini" @click="submit">立即购买</tui-button>
						</view>
					</view>
					<view class="tui-icon tui-icon-close-fill tui-icon-close" style="color: #999;font-size:20px" @tap="hidePopup"></view>
					<!-- <tui-icon name="close-fill" color="#999" class="tui-icon-close" size="20" @tap="hidePopup"></tui-icon> -->
				</view>
			</view>
		</tui-bottom-popup>
		<!--底部选择层-->
		<tui-actionsheet :show="showActionSheet" :tips="tips" :item-list="itemList" :mask-closable="maskClosable" :color="color"
		 :size="size" :is-cancel="isCancel" @click="itemClick" @cancel="closeActionSheet">
		</tui-actionsheet>
		<div class="poster" :class="{ active: showPoster&&hasFile }" v-show="showPoster">
			<div class="close" @click="closeposter"></div>
			<wm-poster-index ref="wmposter" :imgSrc="imgSrc" :QrSrc="QrSrc" Referrer="小蜗牛家具" @success="tempFilePath" @close="closeposter"></wm-poster-index>
		</div>
	</view>
</template>

<script>
	import {
		basePath
	} from '@/utils/index'
	import api from "@/api/category"
	import memberapi from "@/api/member"
	import {
		mapState
	} from 'vuex'
	import tuiIcon from "@/components/icon/icon"
	import tuiTag from "@/components/tag/tag"
	import tuiBadge from "@/components/badge/badge"
	import tuiNomore from "@/components/nomore/nomore"
	import tuiButton from "@/components/button/button"
	import tuiTopDropdown from "@/components/top-dropdown/top-dropdown"
	import tuiBottomPopup from "@/components/bottom-popup/bottom-popup"
	import tuiNumberbox from "@/components/numberbox/numberbox"
	import tuiActionsheet from "@/components/actionsheet/actionsheet"
	import wmPosterIndex from '@/components/wm-poster/wm-poster-index.vue';
	export default {
		components: {
			tuiIcon,
			tuiTag,
			tuiBadge,
			tuiNomore,
			tuiButton,
			tuiTopDropdown,
			tuiBottomPopup,
			tuiNumberbox,
			tuiActionsheet,
			wmPosterIndex
		},
		data() {
			return {
				basePath,
				height: 64, //header高度
				top: 0, //标题图标距离顶部距离
				scrollH: 0, //滚动总高度
				opcity: 0,
				iconOpcity: 0.5,
				productInfo: {
					img_url: []
				}, //产品详情
				/* banner: [
					"https://www.thorui.cn/img/product/11.jpg",
					"https://www.thorui.cn/img/product/2.png",
					"https://www.thorui.cn/img/product/33.jpg",
					"https://www.thorui.cn/img/product/4.png",
					"https://www.thorui.cn/img/product/55.jpg",
					"https://www.thorui.cn/img/product/6.png",
					"https://www.thorui.cn/img/product/7.jpg",
					"https://www.thorui.cn/img/product/8.jpg"
				], */
				showActionSheet: false,
				maskClosable: true,
				tips: "确认清空搜索历史吗？",
				itemList: [],
				color: "#9a9a9a",
				size: 26,
				isCancel: true,

				bannerIndex: 0,
				topMenu: [{
					icon: "message",
					text: "消息",
					size: 26,
					badge: 3
				}, {
					icon: "home",
					text: "首页",
					size: 23,
					badge: 0
				}, {
					icon: "people",
					text: "我的",
					size: 26,
					badge: 0
				}, {
					icon: "cart",
					text: "购物车",
					size: 23,
					badge: 2
				}, {
					icon: "kefu",
					text: "客服小蜜",
					size: 26,
					badge: 0
				}, {
					icon: "feedback",
					text: "我要反馈",
					size: 23,
					badge: 0
				}, {
					icon: "share",
					text: "分享",
					size: 26,
					badge: 0
				}],
				menuShow: false,
				popupShow: false,
				value: 1,
				collected: false,
				shopCartNum: 0,
				showPoster: false, //是否显示海报
				hasFile: false, //是否有生产了图片
				imgSrc: '',
				QrSrc: '',
				id: '',
				//规格
				specInfo:{
					id:null,
					name:'',
					price:0,
				}
				
			}
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'member_id']),
		onLoad: function(options) {
			let obj = {};
			// #ifdef MP-WEIXIN
			obj = wx.getMenuButtonBoundingClientRect();
			// #endif
			// #ifdef MP-BAIDU
			obj = swan.getMenuButtonBoundingClientRect();
			// #endif
			// #ifdef MP-ALIPAY
			my.hideAddToDesktopMenu();
			// #endif
			console.log(JSON.stringify(options.id))
			this.id = options.id;
			this.getProductShow(options.id)
			/* let shopCartList = uni.getStorageSync('shopCartList');
			if (shopCartList) {
				console.log("购物车哦"+JSON.stringify(shopCartList));
				this.shopCartNum=JSON.parse(shopCartList).length;
			} */
			setTimeout(() => {
				uni.getSystemInfo({
					success: (res) => {
						this.width = obj.left || res.windowWidth;
						this.height = obj.top ? (obj.top + obj.height + 8) : (res.statusBarHeight + 44);
						this.top = obj.top ? (obj.top + (obj.height - 32) / 2) : (res.statusBarHeight + 6);
						this.scrollH = res.windowWidth;

					}
				})

			}, 50);
			this.getIndexQrcode('/pages/productDetail/productDetail', this.id);
		},
		methods: {
			//获取产品详情
			getProductShow(id) {
				var param = {
					member_id: this.member_id,
				}
				var url = api.getProductShow + '/' + id
				this.$postajax(url, param)
					.then(res => {
						console.log(JSON.stringify(res))
						if (res.code == 0) {
							this.productInfo = res.data;
							this.productInfo.img_url = JSON.parse(res.data.img_url);
							this.imgSrc=this.productInfo.img_url[0];
							this.collected = this.productInfo.follow == 0 ? false : true;
							this.specInfo=this.productInfo.spec[0];
							console.log("图片数组" + JSON.stringify(res.data))
						}


					})
					.catch(err => {

					});
			},
			bannerChange: function(e) {
				this.bannerIndex = e.detail.current
			},
			previewImage: function(e) {
				console.log(JSON.stringify(e.currentTarget.dataset))
				let index = e.currentTarget.dataset.index;
				var imgurl = this.productInfo.img_url
				uni.previewImage({
					current: index,
					urls: imgurl
				})
			},
			back: function() {
				uni.navigateBack()
			},
			openMenu: function() {
				this.menuShow = true
			},
			closeMenu: function() {
				this.menuShow = false
			},
			//跳转购物车
			shopCart() {
				uni.navigateTo({
					url: '../shopcart/shopcart'
				})
			},
			//打开添加购物车弹框
			showPopup: function() {
				this.popupShow = true
			},
			//确定加入购物车
			surePopup() {
				let shopCartArr = uni.getStorageSync('shopCartList');
				let shopCartList = [];
				this.productInfo.qyt = this.value;
				var flag=false;
				if (shopCartArr) {
					shopCartList = JSON.parse(shopCartArr);
				}
				if (shopCartArr && shopCartList.length > 0) {
					flag=shopCartList.some(item => {
						if (this.specInfo.id === item.id) {
							return true							
						}

					})
					if(flag){
						shopCartList.forEach(item=>{
							if (this.specInfo.id === item.id) {
								item.qyt = item.qyt + this.productInfo.qyt;
								item.follow = this.productInfo.follow;
								item.follow_ = this.productInfo.follow_;
							}
						})
					}else{
						let productInfo=Object.assign({},this.productInfo,{});
						productInfo.id=this.specInfo.id;
						productInfo.specName=this.specInfo.name;
						productInfo.price=this.specInfo.price;
						shopCartList.push(productInfo)
					}
				} else {
					let productInfo=Object.assign({},this.productInfo);
					productInfo.id=this.specInfo.id;
					productInfo.specName=this.specInfo.name;
					productInfo.price=this.specInfo.price;
					shopCartList.push(productInfo)
				}


				//console.log("产品数据"+JSON.stringify(this.productInfo))
				console.log("产品数量" + JSON.stringify(shopCartList))
				var $me = this;
				uni.setStorage({
					key: 'shopCartList',
					data: JSON.stringify(shopCartList),
					success: function(res) {
						$me.tui.toast("加入购物车成功", 2000, true);
						$me.shopCartNum = shopCartList.length;
					}
				});
				this.popupShow = false
			},
			//关闭弹框
			hidePopup: function() {
				this.popupShow = false
			},
			change: function(e) {
				this.value = e.value
			},
			collecting: function() {
				this.collected = !this.collected;
				var param = {
					member_id: this.member_id,
					pid: this.productInfo.id
				}
				if (this.collected) {
					this.$postajax(memberapi.addFollow, param)
						.then(res => {
							console.log(JSON.stringify(res))
							if (res.code == 0) {
								this.tui.toast("收藏成功", 2000, true);
							}
						})
						.catch(err => {

						});
				} else {
					this.$postajax(memberapi.cancelFollow, param)
						.then(res => {
							console.log(JSON.stringify(res))
							if (res.code == 0) {
								this.tui.toast("取消收藏成功", 2000, true);
							}

						})
						.catch(err => {

						});
				}


			},
			common: function() {
				this.tui.toast("功能开发中~")
			},
			chat() {
				uni.navigateTo({
					url: '../chat/chat'
				})
			},
			submit() {
				this.popupShow = false
				console.log(JSON.stringify(this.specInfo.id))
				uni.navigateTo({
					url: '../submitOrder/submitOrder?id=' + this.specInfo.id + '&qyt=' + this.value
				})
			},
			coupon() {
				uni.navigateTo({
					url: '../extend-view/coupon/coupon'
				})
			},
			closeActionSheet: function() {
				this.showActionSheet = false
			},
			openActionSheet: function(type) {
				let itemList = [{
					text: "生成海报",
				}];
				let maskClosable = true;
				let tips = "";
				let color = "#9a9a9a";
				let size = 26;
				let isCancel = true;
				
				setTimeout(() => {
					this.showActionSheet = true;
					this.itemList = itemList;
					this.maskClosable = maskClosable;
					this.tips = tips;
					this.color = color;
					this.size = size;
					this.isCancel = isCancel
				}, 0)
			},
			itemClick: function(e) {
				let index = e.index;
				this.closeActionSheet();
				console.log(this.QrSrc);
				if (index == 0) {
					this.saveImg();
				}
				// this.tui.toast(`您点击的按钮索引为：${index}`)
			},
			tempFilePath() {
				uni.hideLoading();
				this.hasFile = true;
			},
			saveImg() {
				if (!this.QrSrc) {
					uni.showToast({
						title: '小程序二维码生成失败',
						icon: 'none'
					});
					return false
				}
				uni.showLoading({
					title: '正在生成海报...'
				});
				this.showPoster = true;
				this.hasFile = false;
				this.$refs.wmposter.OnCanvas();
			},
			getIndexQrcode(path, scene) {
				const $me = this;
				console.log(path);
				this.$postajax(api.getCodeing, {
					path,
					scene
				}).then(da => {
					if (da.code == 0) {
						$me.QrSrc = da.data.img_url;
						// $me.bg_url = da.data.bg_url
					} else {
						$me.QrSrc = ''
					}
				});

			},

			cancelShare() {
				const $me = this;
				this.$refs.sharepopup.close();
				uni.hideLoading();
			},
			closeposter() {
				const $me = this;
				$me.showPoster = false;
				uni.hideLoading();
			},
			//选择规格
			changeSpec(item){
				this.specInfo=item;
			}
		},
		onPageScroll(e) {
			let scroll = e.scrollTop <= 0 ? 0 : e.scrollTop;
			let opcity = scroll / this.scrollH;
			if (this.opcity >= 1 && opcity >= 1) {
				return;
			}
			this.opcity = opcity;
			this.iconOpcity = 0.5 * (1 - opcity < 0 ? 0 : 1 - opcity)
		}
	}
</script>

<style>
	/* icon 也可以使用组件*/
	@import "../../../static/style/icon.css";

	page {
		background: #f7f7f7;
	}
	.pl20{
		padding-left: 20rpx;
	}
	.container {
		padding-bottom: 110rpx;
	}

	.tui-header-box {
		width: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 9998;
	}

	.tui-header {
		width: 100%;
		font-size: 18px;
		line-height: 18px;
		font-weight: 500;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-header-icon {
		position: fixed;
		top: 0;
		left: 10px;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		height: 32px;
		transform: translateZ(0);
		z-index: 99999;
	}



	.tui-header-icon .tui-badge {
		background: #e41f19 !important;
		position: absolute;
		right: -4px;
	}

	.tui-icon-ml {
		margin-left: 20rpx;
	}

	.tui-icon {
		border-radius: 16px;
	}


	.tui-icon-back {
		height: 32px !important;
		width: 32px !important;
		display: block !important;
	}

	.tui-header-icon .tui-icon-more-fill {
		height: 20px !important;
		width: 20px !important;
		padding: 6px !important;
		display: block !important;
	}

	.tui-banner-swiper {
		position: relative;
	}

	.tui-banner-swiper .tui-tag-class {
		position: absolute;
		color: #fff;
		bottom: 30rpx;
		right: 0;
	}

	.tui-slide-image {
		width: 100%;
		display: block;
	}

	/*顶部菜单*/

	.tui-menu-box {
		box-sizing: border-box;
	}

	.tui-menu-header {
		font-size: 34rpx;
		color: #fff;
		height: 32px;
		display: flex;
		align-items: center;
	}

	.tui-top-dropdown {
		z-index: 9999 !important;
	}

	.tui-menu-itembox {
		color: #fff;
		padding: 40rpx 10rpx 0 10rpx;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		font-size: 26rpx;
	}

	.tui-menu-item {
		width: 22%;
		height: 160rpx;
		border-radius: 24rpx;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		background: rgba(0, 0, 0, 0.4);
		margin-right: 4%;
		margin-bottom: 4%;
	}

	.tui-menu-item:nth-of-type(4n) {
		margin-right: 0;
	}

	.tui-badge-box {
		position: relative;
	}

	.tui-badge-box .tui-badge-class {
		position: absolute;
		top: -8px;
		right: -8px;
	}

	.tui-msg-badge {
		top: -10px;
	}

	.tui-icon-up {
		position: relative;
		display: inline-block;
		left: 50%;
		transform: translateX(-50%);
	}

	.tui-menu-text {
		padding-top: 12rpx;
	}

	.tui-opcity .tui-menu-text,
	.tui-opcity .tui-badge-box {
		opacity: 0.5;
		transition: opacity 0.2s ease-in-out;
	}

	/*顶部菜单*/

	/*内容 部分*/

	.tui-padding {
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	/* #ifdef H5 */
	.tui-ptop {
		padding-top: 44px;
	}

	/* #endif */

	.tui-size {
		font-size: 24rpx;
		line-height: 24rpx;
	}

	.tui-gray {
		color: #999;
	}

	.tui-icon-red {
		color: #ff201f;
	}

	.tui-border-radius {
		border-bottom-left-radius: 24rpx;
		border-bottom-right-radius: 24rpx;
		overflow: hidden;
	}

	.tui-radius-all {
		border-radius: 24rpx;
		overflow: hidden;
	}

	.tui-mtop {
		margin-top: 26rpx;
	}

	.tui-pro-detail {
		box-sizing: border-box;
		color: #333;
	}

	.tui-product-title {
		background: #fff;
		padding: 30rpx 0;
	}

	.tui-pro-pricebox {
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #ff201f;
		font-size: 36rpx;
		font-weight: bold;
		line-height: 44rpx;
	}

	.tui-pro-price {
		display: flex;
		align-items: center;
	}

	.tui-pro-price .tui-tag-class {
		transform: scale(0.7);
		transform-origin: center center;
		line-height: 24rpx;
		font-weight: normal;
	}

	.tui-price {
		font-size: 58rpx;
	}

	.tui-original-price {
		font-size: 26rpx;
		line-height: 26rpx;
		padding: 10rpx 30rpx;
		box-sizing: border-box;
	}

	.tui-line-through {
		text-decoration: line-through;
	}

	.tui-collection {
		color: #333;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		height: 44rpx;
	}

	.tui-scale {
		transform: scale(0.7);
		transform-origin: center center;
		line-height: 24rpx;
		font-weight: normal;
	}

	.tui-icon-collection {
		line-height: 20px !important;
		margin-bottom: 0 !important;

	}

	.tui-pro-titbox {
		font-size: 32rpx;
		font-weight: 500;
		position: relative;
		padding: 0 150rpx 0 30rpx;
		box-sizing: border-box;
	}

	.tui-pro-title {
		padding-top: 20rpx;
	}

	.tui-share-btn {
		display: block;
		background: none;
		margin: 0;
		padding: 0;
		border-radius: 0;
	}

	.tui-tag-share {
		display: flex;
		align-items: center;
	}

	.tui-share-position {
		position: absolute;
		right: 0;
		top: 30rpx;
	}

	.tui-share-text {
		padding-left: 8rpx;
	}

	.tui-sub-title {
		padding: 20rpx 0;
	}

	.tui-sale-info {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 30rpx;
	}

	.tui-discount-box {
		background: #fff;
	}

	.tui-list-cell {
		position: relative;
		display: flex;
		align-items: center;
		font-size: 26rpx;
		line-height: 26rpx;
		padding: 36rpx 30rpx;
		box-sizing: border-box;
	}

	.tui-right {
		position: absolute;
		right: 30rpx;
		top: 30rpx;
	}

	.tui-top40 {
		top: 40rpx !important;
	}

	.tui-bold {
		font-weight: bold;
	}

	.tui-list-cell::after {
		content: '';
		position: absolute;
		border-bottom: 1rpx solid #eaeef1;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		bottom: 0;
		right: 0;
		left: 126rpx;
	}

	.tui-last::after {
		border-bottom: 0 !important;
	}

	.tui-tag-coupon-box {
		display: flex;
		align-items: center;
	}

	.tui-tag-coupon-box .tui-tag-class {
		margin-right: 20rpx;
	}


	.tui-cell-title {
		width: 66rpx;
		padding-right: 30rpx;
		flex-shrink: 0;
	}

	.tui-promotion-box {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		padding: 10rpx 0;
		width: 74%;
	}

	.tui-promotion-box .tui-tag-class {
		display: inline-block !important;
		transform: scale(0.8);
		transform-origin: 0 center;
	}

	/* .tui-inline-block {
		display: inline-block !important;
		transform: scale(0.8);
		transform-origin: 0 center;
	} */

	.tui-basic-info {
		background: #fff;
	}

	.tui-addr-box {
		width: 76%;
	}

	.tui-addr-item {
		padding: 10rpx;
		line-height: 34rpx;
	}

	.tui-guarantee {
		background: #fdfdfd;
		display: flex;
		flex-wrap: wrap;
		padding: 20rpx 30rpx 30rpx 30rpx;
		font-size: 24rpx;
	}

	.tui-guarantee-item {
		color: #999;
		padding-right: 30rpx;
		padding-top: 10rpx;
	}

	.tui-pl {
		padding-left: 4rpx;
	}

	.tui-cmt-box {
		background: #fff;
	}

	.tui-between {
		justify-content: space-between !important;
	}

	.tui-cmt-all {
		color: #ff201f;
		padding-right: 8rpx;
	}

	.tui-cmt-content {
		font-size: 26rpx;
	}

	.tui-cmt-user {
		display: flex;
		align-items: center;
	}

	.tui-acatar {
		width: 60rpx;
		height: 60rpx;
		border-radius: 30rpx;
		display: block;
		margin-right: 16rpx;
	}

	.tui-cmt {
		padding: 14rpx 0;
	}

	.tui-attr {
		font-size: 24rpx;
		color: #999;
		padding: 6rpx 0;
	}

	.tui-cmt-btn {
		padding: 50rpx 0 30rpx 0;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-tag-cmt {
		min-width: 130rpx;
		padding: 20rpx 52rpx !important;
		font-size: 26rpx !important;
		display: inline-block;
	}

	.tui-nomore-box {
		padding-top: 10rpx;
	}

	.tui-product-img {
		padding: 10rpx 40rpx;
		transform: translateZ(0);
	}

	.tui-product-img image {
		width: 100%;
		display: block;
	}

	/*底部操作栏*/

	.tui-col-7 {
		width: 58.33333333%;
	}

	.tui-col-5 {
		width: 41.66666667%;
	}

	.tui-operation {
		width: 100%;
		height: 100rpx;
		/* box-sizing: border-box; */
		background: rgba(255, 255, 255, 0.98);
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: space-between;
		z-index: 10;
		bottom: 0;
		left: 0;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-safearea-bottom {
		width: 100%;
		height: env(safe-area-inset-bottom);
	}

	.tui-operation::before {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		border-top: 1rpx solid #eaeef1;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
	}

	.tui-operation-left {
		display: flex;
		align-items: center;
	}

	.tui-operation-item {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		position: relative;
	}

	.tui-operation-text {
		font-size: 22rpx;
		color: #333;
	}

	.tui-opacity {
		opacity: 0.5;
	}

	.tui-scale-small {
		transform: scale(0.9);
		transform-origin: center center;
	}

	.tui-operation-right {
		height: 100rpx;
		/* box-sizing: border-box; */
		padding-top: 0;
	}

	.tui-right-flex {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-btnbox-4 .tui-btn-class {
		width: 90% !important;
		display: block !important;
		font-size: 28rpx !important;
	}

	.tui-operation .tui-badge-class {
		position: absolute;
		top: -6rpx;
		/* #ifdef H5 */
		transform: translateX(50%)
			/* #endif  */
	}

	.tui-flex-1 {
		flex: 1;
	}

	/*底部操作栏*/

	/*底部选择弹层*/

	.tui-popup-class {
		border-top-left-radius: 24rpx;
		border-top-right-radius: 24rpx;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-popup-box {
		position: relative;
		padding: 30rpx 0 100rpx 0;
	}

	.tui-popup-btn {
		width: 100%;
		position: absolute;
		left: 0;
		bottom: 0;
	}

	.tui-popup-btn .tui-btn-class {
		width: 90% !important;
		display: block !important;
		font-size: 28rpx !important;
	}

	.tui-icon-close {
		position: absolute;
		top: 30rpx;
		right: 30rpx;
	}

	.tui-product-box {
		display: flex;
		align-items: flex-end;
		font-size: 24rpx;
		padding-bottom: 30rpx;
	}

	.tui-popup-img {
		height: 200rpx;
		width: 200rpx;
		border-radius: 24rpx;
		display: block;
	}

	.tui-popup-price {
		padding-left: 20rpx;
		padding-bottom: 8rpx;
	}

	.tui-amount {
		color: #ff201f;
		font-size: 36rpx;
	}

	.tui-number {
		font-size: 24rpx;
		line-height: 24rpx;
		padding-top: 12rpx;
		color: #999;
	}

	.tui-popup-scroll {
		height: 600rpx;
		font-size: 26rpx;
	}

	.tui-scrollview-box {
		padding: 0 30rpx 60rpx 30rpx;
		box-sizing: border-box;
	}

	.tui-attr-title {
		padding: 10rpx 0;
		color: #333;
	}

	.tui-attr-box {
		font-size: 0;
		padding: 20rpx 0;
	}

	.tui-attr-item {
		max-width: 100%;
		min-width: 200rpx;
		height: 64rpx;
		display: -webkit-inline-flex;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: #f7f7f7;
		padding: 0 26rpx;
		box-sizing: border-box;
		border-radius: 32rpx;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
		font-size: 26rpx;
		border: 1rpx solid #EDEDED;
	}

	.tui-attr-active {
		background: #fcedea !important;
		color: #e41f19;
		border: 1rpx solid #e41f19;
		/* font-weight: bold;
		position: relative; */
	}

	/* .tui-attr-active::after {
		content: "";
		position: absolute;
		border: 1rpx solid #e41f19;
		width: 100%;
		height: 100%;
		border-radius: 40rpx;
		left: 0;
		top: 0;
	} */

	.tui-number-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx 0 30rpx 0;
		box-sizing: border-box;
	}

	.poster {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: none;
		z-index: -1;
		opacity: 0;
	}

	.poster.active {
		z-index: 9999;
		background: rgba(0, 0, 0, .2);
		opacity: 1;
	}

	.poster .close {
		position: absolute;
		right: 10%;
		top: 160upx;
		z-index: -1;
		height: 40upx;
		width: 40upx;
		line-height: 30upx;
		/* background: url(./static/img/clear.png) no-repeat center center; */
		background-size: contain;
		display: none;

	}

	.poster.active .close {
		z-index: 999;
		display: block;
	}

	/*底部选择弹层*/
</style>
