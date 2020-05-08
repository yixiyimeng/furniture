<template>
	<view class="container">
		<view class="tui-cmt-title">最新消息</view>
		<view class="tui-cmtbox">
			<view class="tui-cmt-cell" v-for="(item,index) in cmtList" :key="index">
				<view class="tui-cmt-detail">
					<view class="tui-cmt-content">
						{{item.content}}
					</view>
					<view class="tui-footer">
						{{item.time}}
					</view>
				</view>
			</view>

		</view>

		<!--加载loadding-->
		<tui-loadmore :visible="loadding" :index="3" type="primary"></tui-loadmore>
		<tui-nomore :visible="!pullUpOn" bgcolor="#fff" text="没有更多消息"></tui-nomore>
		<!--加载loadding-->
		<view class="tui-safearea-bottom"></view>
	</view>
</template>

<script>
	import tuiIcon from "@/components/icon/icon"
	import tuiListCell from "@/components/list-cell/list-cell"
	import tuiLoadmore from "@/components/loadmore/loadmore"
	import tuiNomore from "@/components/nomore/nomore"
	export default {
		components: {
			tuiIcon,
			tuiListCell,
			tuiLoadmore,
			tuiNomore
		},
		data() {
			return {
				cmtList: [{
					content: "我一直没懂赛前问一个主教练如何评价对手的主教练， 记者究竟是想得到什么答案？",
					time: "昨天 22:12"
				}, {
					content: "力帆有杨帅，迪力木来提，尹聪耀，完全可以应付。尤其是杨帅坐稳主力后卫。",					
					time: "昨天 21:09"
				}, {			
					content: "小克鲁伊夫带的球队征服了中超球迷，李铁也带队冲超成功，现在风头正劲，究竟鹿死谁手，谁更胜一筹，期待精彩的比赛☻ ☻",
					time: "昨天 17:30"
				}],
				pageIndex: 1,
				loadding: false,
				pullUpOn: true
			}
		},
		methods: {
			cmtFabulous: function(e) {
				let index = e.currentTarget.id;
				let fabulousObj = this.cmtList[index];
				let isFabulous = this.cmtList[index].isFabulous;
				let fabulous = this.cmtList[index].fabulous;
				let fabulousNum = isFabulous ? fabulous - 1 : fabulous + 1;
				this.$set(fabulousObj, "fabulous", fabulousNum);
				this.$set(fabulousObj, "isFabulous", !isFabulous);
			},
		},
		//页面相关事件处理函数--监听用户下拉动作
		onPullDownRefresh: function() {
			this.pageIndex = 1;
			this.pullUpOn = true;
			this.loadding = false
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 200);
		},
		// 页面上拉触底事件的处理函数
		onReachBottom: function() {
			if (!this.pullUpOn) return;
			this.loadding = true
			if (this.pageIndex == 3) {
				this.loadding = false;
				this.pullUpOn = false
			} else {
				let arr = JSON.parse(JSON.stringify(this.cmtList));
				this.cmtList = this.cmtList.concat(arr);
				this.pageIndex = this.pageIndex + 1;
				this.loadding = false
			}
		}
	}
</script>

<style>
	page {
		background: #fff;
		color: #333;
	}

	.container {
		padding: 8rpx 30rpx 110rpx 30rpx;
		box-sizing: border-box;
	}

	.tui-cmt-title {
		font-size: 30rpx;
		font-weight: bold;
		position: relative;
		padding: 20rpx 0;
		margin-bottom: 20rpx;
	}

	.tui-cmt-title::after {
		content: '';
		position: absolute;
		left: -18rpx;
		top: 32%;
		width: 6rpx;
		height: 36%;
		background: #E41F19;
	}

	.tui-cmt-cell {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		padding-bottom: 44rpx;
	}

	.tui-avatar {
		width: 64rpx;
		height: 64rpx;
		border-radius: 32rpx;
		display: block;
		flex-shrink: 0;
	}

	.tui-cmt-detail {
		width: 100%;
		padding-left: 16rpx;
		box-sizing: border-box;
	}

	.tui-header-box {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		font-size: 30rpx;
	}

	.tui-cmt-nickname {
		color: #5677fc;
	}

	.tui-fabulous {
		color: #9a9a9a;
	}

	.tui-fabulous text {
		padding-right: 4rpx;
		font-size: 24rpx;
	}

	.tui-cmt-content {
		font-size: 32rpx;
		color: #333;
		text-align: justify;
		padding-top: 8rpx;
		word-break: break-all;
		word-wrap: break-word;
	}

	.tui-reply-box {
		border-radius: 8rpx;
		overflow: hidden;
		margin-top: 16rpx;
	}

	.tui-cell-class {
		flex-direction: column;
		justify-content: flex-start !important;
		padding: 20rpx !important;
		text-align: justify;
		word-break: break-all;
		word-wrap: break-word;
	}

	.tui-cell-last {
		color: #5677fc;
	}

	.tui-flex-1 {
		flex: 1;
		width: 100%;
	}

	.tui-reply-nickname {
		font-size: 24rpx;
		color: #7a7a7a;
		padding-bottom: 8rpx;
	}

	.tui-footer {
		display: flex;
		align-items: center;
		font-size: 24rpx;
		margin-top: 16rpx;
		color: #9a9a9a;
	}

	.tui-primary {
		color: #5677fc !important;
	}

	.tui-ml {
		margin-left: 16rpx;
	}

	.tui-cell-last .tui-icon-class {
		width: 40rpx !important;
		margin-left: -10rpx;
	}

	.tui-operation {
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
		overflow: hidden;
		background: rgba(255, 255, 255, 0.95);
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 99999;
	}

	.tui-operation-inner {
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
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

	.tui-btn-comment {
		height: 64rpx;
		width: 100%;
		background: #ededed;
		color: #999;
		border-radius: 8rpx;
		font-size: 28rpx;
		display: flex;
		align-items: center;
		padding-left: 20rpx;
		box-sizing: border-box;
		padding-top: 0;
	}
</style>
