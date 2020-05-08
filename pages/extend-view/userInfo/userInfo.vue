<template>
	<view class="tui-userinfo-box">
		<tui-list-cell padding="0" :arrow="true" @click="changeAvatar">
			<view class="tui-list-cell">
				<view>头像</view>
				<!-- <image src="/static/images/my/mine_def_touxiang_3x.png" class="tui-avatar"></image> -->
				<image :src="avatarUrl" class="tui-avatar"></image>
			</view>
		</tui-list-cell>
		<tui-list-cell padding="0" :arrow="true" @tap="updateInfo(2)">
			<view class="tui-list-cell">
				<view>昵称</view>
				<view class="tui-content">{{userName}}</view>
			</view>
		</tui-list-cell>
		<tui-list-cell padding="0" :arrow="true" @tap="updateInfo(3)">
			<view class="tui-list-cell">
				<view>手机号</view>
				<view class="tui-content">{{mobile}}</view>
			</view>
		</tui-list-cell>
	</view>
</template>

<script>
	import api from '@/api/member';
	import {
		mapState
	} from 'vuex'
	import tuiListCell from "@/components/list-cell/list-cell"
	export default {
		components: {
			tuiListCell
		},
		data() {
			return {
				avatarUrl: '',
				userName:'',
				mobile:'',
			}
		},
		onLoad() {
			this.avatarUrl = uni.getStorageSync('avatarUrl');
			this.userName = uni.getStorageSync('userName');
			this.mobile = uni.getStorageSync('mobile');		
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'session_key', 'member_id']),
		onShow: function(e) {
			let pages = getCurrentPages();				
			let currPage = pages[pages.length - 1];				
			if (currPage.data.isDoRefresh == true) {				
				currPage.data.isDoRefresh = false;				
				this.avatarUrl = uni.getStorageSync('avatarUrl');
				this.userName = uni.getStorageSync('userName');
				this.mobile = uni.getStorageSync('mobile');		
		
			} else {				
				//不用刷新				
			}				
		},
		methods: {
			//更换头像
			changeAvatar() {
				var $me=this;
				uni.showActionSheet({
					// itemList按钮的文字接受的是数组
					itemList: ["查看头像", "从相册选择图片"],
					success(e) {
						var index = e.tapIndex
						if (index === 0) {
							// 用户点击了预览当前图片
							// 可以自己实现当前头像链接的读取
							//let url = "../../static/1.png"
							let arr = []
							arr.push($me.avatarUrl)
							uni.previewImage({
								// 预览功能图片也必须是数组的
								urls: arr
							})
						} else if (index === 1) {
							// 用户点击了从图库上传
							uni.chooseImage({
								count: 1,
								sizeType: ["compressed"],
								success(response) {
									// 选择图片后, 返回的数据
									var fileUrl = response.tempFilePaths[0];
									console.log("选择头像测试数据"+JSON.stringify(response))
									$me.updateMember(fileUrl)
								}
							})
						}
					}
				})
			},
			updateInfo(value){
				uni.navigateTo({
					url: "../editUserInfo/editUserInfo?info=" + value
				})
			},
			//更新会员信息
			updateMember(img_url) {
				var param={
					img_url:img_url
				}
				var url = api.updateMember + '/' + this.member_id
				var $me = this;
				$me.$postajax(url, param)
					.then(res => {
						console.log("更新信息" + JSON.stringify(res))
						if (res.code == 0) {
							$me.avatarUrl=img_url;
							uni.setStorageSync('avatarUrl', $me.avatarUrl);
							this.tui.toast("修改头像成功", 2000, true);
						}
					})
			},

		}
	}
</script>

<style>
	.tui-userinfo-box {
		padding-bottom: 20rpx;
		color: #333;
	}

	.tui-list-cell {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 24rpx 60rpx 24rpx 30rpx;
		font-size: 30rpx;
	}

	.tui-pr30 {
		padding-right: 30rpx;
	}

	.tui-avatar {
		width: 100rpx;
		height: 100rpx;
		display: block;
	}

	.tui-content {
		font-size: 26rpx;
		color: #666;
	}
</style>
