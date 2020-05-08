<template>
	<view class="tui-addr-box">
		<tui-list-cell :hover="false" padding="0" v-if="mark==3">
			<view class="tui-line-cell">
				<!-- <view class="tui-title">手机号码</view> -->
				<input placeholder-class="tui-phcolor" class="tui-input" name="mobile" placeholder="请输入手机号码" maxlength="11"
				 v-model="editInfo" type="text" />
			</view>
		</tui-list-cell>
		<tui-list-cell :hover="false" padding="0" v-if="mark==2">
			<view class="tui-line-cell">
				<!-- <view class="tui-title">昵称</view> -->
				<input placeholder-class="tui-phcolor" class="tui-input" name="name" placeholder="请输入昵称" maxlength="15" type="text"
				 v-model="editInfo" />
			</view>
		</tui-list-cell>
		<!-- 确认保存 -->
		<view class="tui-addr-save">
			<tui-button type="danger" height="88rpx" @click="formSubmit">确认修改</tui-button>
		</view>
	</view>
</template>

<script>
	const util = require('@/utils/util.js')
	import api from '@/api/member';
	import {
		mapState
	} from 'vuex'
	import tuiButton from "@/components/extend/button/button"
	import tuiListView from "@/components/list-view/list-view"
	import tuiListCell from "@/components/list-cell/list-cell"
	export default {
		components: {
			tuiButton,
			tuiListView,
			tuiListCell
		},
		data() {
			return {
				editInfo:"",
				placeholder:"",
				mark:null,
			}
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'member_id']),
		onLoad: function(options) {
			let mobile=uni.getStorageSync('mobile');
			let avatarUrl=uni.getStorageSync('avatarUrl');
			if (options.info) {
				this.mark=options.info;
				this.editInfo = options.info==2?mobile:avatarUrl;
				uni.setNavigationBarTitle({
					title:options.info==2?"修改昵称":'修改手机号'
				});
				this.placeholder=options.info==2?"请输入昵称":"请输入手机号码"
			}
		},
		methods: {
			formSubmit: function(e) {
				var param={}
				if (util.isNullOrEmpty(this.editInfo)) {
					this.tui.toast(this.placeholder);
					return
				}
				if(this.mark==3){
					param={
						phone:this.editInfo
					}
					if (!util.isMobile(this.editInfo)) {
						this.tui.toast('请输入正确的手机号码');
						return
					}
				}else{
					param={
						name:this.editInfo
					}
				}
				var url = api.updateMember + '/' + this.member_id
				var $me = this;
				$me.$postajax(url, param)
					.then(res => {
						console.log("更新信息" + JSON.stringify(res))
						if (res.code == 0) {
							this.tui.toast("修改成功", 2000, true);
							if(this.mark==3){
								uni.setStorageSync('mobile', $me.editInfo);
							}else if(this.mark==2){
								uni.setStorageSync('userName', $me.editInfo);
							}
							var pages = getCurrentPages();		
							var currPage = pages[pages.length - 1]; //当前页面
							var prevPage = pages[pages.length - 2]; //上一个页面
							//直接调用上一个页面的setData()方法，把数据存到上一个页面中去
							prevPage.setData({
								isDoRefresh: true
							})
							
							uni.navigateBack();
							
						}
					})
			},
		},
		onNavigationBarButtonTap(e){
			
		}
	}
</script>

<style>
	.tui-addr-box {
		padding: 20rpx 0;
	}

	.tui-line-cell {
		width: 100%;
		padding: 24rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}

	.tui-title {
		width: 180rpx;
		font-size: 28rpx;
	}

	.tui-title-city-text {
		width: 180rpx;
		height: 40rpx;
		display: block;
		line-height: 46rpx;
	}

	.tui-input {
		width: 500rpx;
	}

	.tui-input-city {
		flex: 1;
		height: 40rpx;
		font-size: 28rpx;
		padding-right: 30rpx;
	}

	.tui-phcolor {
		color: #ccc;
		font-size: 28rpx;
	}

	.tui-cell-title {
		font-size: 28rpx;
	}

	.tui-addr-label {
		margin-left: 70rpx;
	}

	.tui-label-item {
		width: 76rpx;
		height: 40rpx;
		border: 1rpx solid rgb(136, 136, 136);
		border-radius: 6rpx;
		font-size: 26rpx;
		text-align: center;
		line-height: 40rpx;
		margin-right: 20rpx;
		display: inline-block;
		transform: scale(0.9);
	}

	.tui-label-active {
		background: #E41F19;
		border-color: #E41F19;
		color: #fff;
	}

	.tui-swipe-cell {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #fff;
		padding: 10rpx 24rpx;
		border-radius: 6rpx;
		overflow: hidden;
		font-size: 28rpx;
	}

	.tui-switch-small {
		transform: scale(0.8);
		transform-origin: 100% center;
	}

	/* #ifndef H5 */
	.tui-switch-small .wx-switch-input {
		margin: 0 !important;
	}

	/* #endif */

	/* #ifdef H5 */
	>>>uni-switch .uni-switch-input {
		margin-right: 0 !important;
	}

	/* #endif */

	.tui-addr-save {
		padding: 24rpx;
		margin-top: 100rpx;
	}

	.tui-del {
		padding: 24rpx;
	}

	/* picker start*/

	.tui-mask-screen {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
		z-index: 99996;
		transition: all 0.3s ease-in-out;
		opacity: 0;
		visibility: hidden;
	}

	.tui-mask-show {
		opacity: 1;
		visibility: visible;
	}

	.tui-picker-box {
		width: 100%;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 99999;
		visibility: hidden;
		transform: translate3d(0, 100%, 0);
		transform-origin: center;
		transition: all 0.3s ease-in-out;
		min-height: 20rpx;
		background: #fff;
	}

	.tui-pickerbox-show {
		transform: translate3d(0, 0, 0);
		visibility: visible;
	}

	.picker-header {
		width: 100%;
		height: 90upx;
		padding: 0 46upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		font-size: 32upx;
		background: #fff;
	}

	.list-item::after {
		left: 0;
	}

	.btn-cancle {
		padding: 20upx;
		color: #888;
	}

	.btn-sure {
		padding: 20upx;
		color: #5677fc;
	}

	.picker-view {
		width: 100%;
		height: 260px;
	}

	.item {
		line-height: 50px;
		text-align: center;
	}

	/* picker end*/
</style>
