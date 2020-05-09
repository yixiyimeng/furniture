<template>
	<view class="tui-set-box">
		<view class="tui-mybg-box" v-show='hasLogin'>
			<image :src="`/static/images/mall/my/img_bg_3x.png`" class="tui-my-bg" mode="widthFix"></image>
			<!-- <div class="tui-my-bg"></div> -->
			<view class="tui-header-center" @tap="href(1)">
				<open-data type="userAvatarUrl" class="tui-avatar"></open-data>
				<!-- <image :src="avatarUrl" class="tui-avatar"></image> -->
				<view class="tui-info">
					<view class="tui-nickname">{{userName}}
					</view>
					<view class="tui-explain">{{mobile}}</view>
				</view>
			</view>
		</view>
		<view class="tui-mybg-box" v-show='!hasLogin'>
			<image :src="`/static/images/mall/my/img_bg_3x.png`" class="tui-my-bg" mode="widthFix"></image>
			<!-- <image :src="tui.webURL()+'/static/images/mall/my/img_bg_3x.png'" class="tui-my-bg" mode="widthFix"></image> -->
			<!-- <div class="tui-my-bg"></div> -->
			<view class="tui-header-center" @tap="href(1)">
				<!-- <image src="/static/images/my/mine_def_touxiang_3x.png" class="tui-avatar" @tap="href(1)"></image> -->
				<open-data type="userAvatarUrl" class="tui-avatar"></open-data>
				<view class="tui-info">
					<view class="tui-nickname">
						<open-data type="userNickName"></open-data>
					</view>

				</view>
			</view>
		</view>
		<view class="tui-mtop">
			<tui-list-cell padding="0" :lineLeft="false" :arrow="true" @click="href(2)">
				<view class="tui-list-cell">
					<image :src="`/static/images/my/payment.png`" class="tui-list-icon" mode="widthFix"></image>我的订单
				</view>
			</tui-list-cell>
		</view>
		<view class="tui-mtop">
			<tui-list-cell padding="0" :lineLeft="false" :arrow="true" @click="href(3)">
				<view class="tui-list-cell">
					<image :src="`/static/images/my/cart.png`" class="tui-list-icon" mode="widthFix"></image>购物车
				</view>
			</tui-list-cell>
		</view>
		<view class="tui-mtop">
			<tui-list-cell padding="0" :lineLeft="false" :arrow="true" @click="href(4)">
				<view class="tui-list-cell">
					<image :src="`/static/images/my/like.png`" class="tui-list-icon" mode="widthFix"></image>
					收藏夹
				</view>
			</tui-list-cell>
		</view>
		<view class="tui-mtop">
			<tui-list-cell padding="0" :lineLeft="false" :arrow="true" @click="href(5)">
				<view class="tui-list-cell">
					<image :src="`/static/images/my/message.png`" class="tui-list-icon" mode="widthFix"></image>
					消息中心
				</view>
			</tui-list-cell>
		</view>
		<view class="tui-mtop">
			<tui-list-cell padding="0" :lineLeft="false" :arrow="true" @click="href(6)">
				<view class="tui-list-cell">
					<image :src="`/static/images/my/address.png`" class="tui-list-icon" mode="widthFix"></image>
					地址管理
				</view>
			</tui-list-cell>
		</view>
		<!-- cropRight -->
		<div class="cropRight">
			<image src="/static/images/cropright.png" mode="widthFix"></image>
			<div>
				<p class="name">小程序制作请联系微信：xhh527317</p>
				<p>©2013-{{today}}核桃妹的妈妈</p>
			</div>
		</div>
	</view>
</template>

<script>
	import api from '@/api/member';
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'
	import tuiListCell from "@/components/list-cell/list-cell"
	import tuiButton from "@/components/extend/button/button"
	import tuiFooter from "@/components/footer/footer"
	export default {
		components: {
			tuiListCell,
			tuiButton,
			tuiFooter
		},

		data() {
			return {
				SessionKey: '',
				OpenId: '',
				/* nickName: "哈尼",
				phoneNumber: null, */
				avatarUrl: null,
				mobile: "",
				isCanUse: uni.getStorageSync('isCanUse') || true, //默认为true
				today: null
			}
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'userName', 'session_key']),
		onLoad() {
			this.mobile = uni.getStorageSync('mobile');
			this.avatarUrl = uni.getStorageSync('avatarUrl');
			console.log(JSON.stringify(this.mobile))
			this.today = new Date().getFullYear()
		},
		onShow() {
			this.mobile = uni.getStorageSync('mobile');
			this.avatarUrl = uni.getStorageSync('avatarUrl');
			if (!this.hasLogin) {
				/**
				 * 如果需要强制登录，使用reLaunch方式
				 */
				if (this.forcedLogin) {
					setTimeout(() => {
						uni.reLaunch({
							url: '../login/login'
						});
					}, 200);
				} else {
					setTimeout(() => {
						uni.navigateTo({
							url: '../login/login'
						});
					}, 200);
				}
			} else {

			}

		},
		methods: {
			href(page) {
				let url = "";
				switch (page) {
					case 1:
						url = "../extend-view/userInfo/userInfo"
						break;
					case 2:
						url = "../extend-view/myOrder/myOrder"

						break;
					case 3:
						url = '../extend-view/shopcart/shopcart'
						break;
					case 4:
						url = "../extend-view/facorites/facorites"
						break;
					case 5:
						//url = '../extend-view/news/news'
						uni.requestSubscribeMessage({
							tmplIds: [''],
							success(res) {}
						})
						break;
					case 6:
						url = '../extend-view/address/address'
						break;
					default:
						break;
				}
				console.log(url)
				if (url) {
					uni.navigateTo({
						url: url
					})
				} else {
					this.tui.toast("功能尚未完善~")
				}
			},
		}
	}
</script>

<style>
	.tui-set-box {
		padding-bottom: 20rpx;
		color: #333;
	}

	.tui-mybg-box {
		width: 100%;
		height: 324rpx;
		position: relative;
		overflow: hidden;
	}

	.tui-my-bg {
		width: 100%;
		height: 324rpx;
		display: block;
		/* background: #E41F19; */
	}

	.tui-header-center {
		position: absolute;
		width: 100%;
		height: 128rpx;
		left: 0;
		top: 150rpx;
		padding: 0 40rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}

	.tui-avatar {
		flex-shrink: 0;
		width: 128rpx;
		height: 128rpx;
		display: block;
	}

	.tui-info {
		/* width: 60%;
		padding-left: 30rpx; */

	}

	.tui-nickname {
		font-size: 30rpx;
		font-weight: 500;
		color: #fff;
		display: flex;
		align-items: center;
	}



	.tui-explain {
		width: 100%;
		font-size: 24rpx;
		font-weight: 400;
		color: #fff;
		opacity: 0.75;
		padding-top: 8rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.tui-list-cell {
		display: flex;
		align-items: center;
		padding: 24rpx 30rpx;
		font-size: 30rpx;

	}

	.tui-list-icon {
		width: 58rpx;
		height: 58rpx;
		margin-right: 10rpx;
	}

	.tui-mtop {
		margin-top: 20rpx;
	}

	.tui-info-box {
		font-size: 34rpx;
	}

	.tui-avatar {
		width: 140rpx;
		height: 140rpx;
		margin-right: 20rpx;
	}

	.tui-exit {
		padding: 100rpx 24rpx;
	}
</style>
