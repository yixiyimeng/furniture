<template>
	<view class="view-page">
		<view v-show="isShowVideo" style="position:absolute; z-index: 999; background: #000000; top:0;left:0;right:0;bottom:0">
			<video id="prew_video" autoplay="true" direction="0" :src="videoSrc" @fullscreenchange="bindVideoScreenChange"
			 @pause="pause" :poster="poster" custom-cache="false" style="position: absolute; top: 50%; width: 100%; transform: translateY(-50%);"></video>
		</view>
		<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @init="mescrollInit" :fixed="false">
			<div class="videolist">
				<ul>
					<li class="tui-flex" v-for="(item, itemIndex) in list" :key="itemIndex">
						<div class="photo">
							<!-- <image src="userInfo.logo" mode="aspectFill" /> -->
						</div>
						<div class="tui-flex-1 ml10">
							<p class="name">小蜗牛家具</p>
							<div class="decript">{{ item.title }}</div>
							<div class="imgbox clearfix ">
								<span v-for="(image, subitemIndex) in item.img_url" :key="subitemIndex">
									<span class="previewimg">
										<image :src="image" @click="previewImage(item.img_url, image)" mode="aspectFill" :lazy-load="true" />
									</span>

								</span>
								<span v-if="item.video_url" class="video" @click="playvideo(item.video_url)">
									<!-- <image src="/static/images/webwxgetmsgimg.jpg" mode="aspectFill" /> -->
									<div style="position: absolute;top: 0;left: 0; bottom: 0; right: 0; background: rgba(0,0,0,.3);">
									</div>
									<image src="/static/images/play.png" class="icon" mode="aspectFill"></image>
								</span>
							</div>
							<div class="tip flex flex-pack-justify">
								<span class="time">{{ item.add_time }}</span>
								<span @click="likeVideo(item.id, item.is_like, itemIndex)">
									<image src="/static/images/page/2.png" mode="widthFix" v-if="item.is_like == 1" />
									<image src="/static/images/page/3.png" mode="widthFix" v-if="item.is_like == 0" />
									<span class="ml10">{{ item.likes }}</span>
								</span>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</mescroll-uni>

	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js"
	import api from '@/api/index.js';
	import {
		basePath
	} from '@/utils/index'
	export default {
		data() {
			return {
				list: [],
				userInfo: {},
				isShow: false,
				videoSrc: '',
				poster: '',
				videoContext: '',
				isShowVideo: false
			};
		},
		mixins: [MescrollMixin],
		mounted() {
			this.videoContext = uni.createVideoContext('prew_video');
		},
		methods: {
			/*上拉加载的回调*/
			upCallback(mescroll) {
				this.getlist();
			},
			getlist() {
				const $me = this;
				let pageNum = this.mescroll.num; // 页码, 默认从1开始
				let pageSize = this.mescroll.size;
				console.log(api)
				this.$postajax(api.videolist, {
					page: pageNum,
					limit: pageSize
				}).then(da => {
					if (da.code == 0) {
						if (da.data && da.data.length > 0) {
							let curPageData = da.data.map(item => {
								if (item.img_url && item.img_url.length > 0) {
									let img_url = item.img_url.map(subitem => {
										return subitem
									})
									item.img_url = img_url;
								}
								return item
							});
							console.log(curPageData)
							$me.mescroll.endBySize(curPageData.length, parseInt(da.count));
							if ($me.mescroll.num == 1) $me.list = []; //如果是第一页需手动制空列表
							$me.list = $me.list.concat(curPageData); //追加新数据
						} else {
							$me.list = [];
							$me.mescroll.endSuccess(0, false);
						}
					}
				});
			},

			previewImage: function(imgalist, current) {
				//var current = e.target.dataset.src;
				wx.previewImage({
					current: current, // 当前显示图片的http链接
					urls: imgalist // 需要预览的图片http链接列表
				})
			},
			playvideo: function(path, poster) {
				this.poster = poster;
				var videoContext = this.videoContext;
				this.videoSrc =path;
				setTimeout(() => {
					videoContext.seek(0);
					videoContext.play();
					this.isShowVideo = true;
				}, 150);
				// setTimeout(()=>{
				// 	videoContext.requestFullScreen();
				// },150)

			},
			pause(e) {
				console.log('结束')
				var videoContext = this.videoContext;
				// videoContext.exitFullScreen();
				this.videoSrc = '';
				this.isShowVideo = false;
			},
			/**
			 * 全屏改变
			 */
			bindVideoScreenChange: function(e) {
				var status = e.mp.detail.fullScreen;
				console.log(status);
				if (!status) {
					var videoContext = this.videoContext;
					videoContext.seek(0);
					videoContext.pause();
					this.videoSrc = '';
					this.isShowVideo = false;
				} else {
					this.isShowVideo = true;
				}
				//this.setData(play);
			}

		}
	}
</script>

<style lang="less">
	.tui-flex {
		display: -webkit-flex;
		display: flex;
	}

	.tui-flex-1 {
		flex: 1;
	}

	.view-page {
		background: #fff;
		height: 100%;
	}

	.videolist ul li {
		padding: 30px 12px 15px;
		border-bottom: 1px dashed #e8e8e8;
	}

	.videolist ul li .photo {
		width: 100rpx;
		height: 100rpx;
		overflow: hidden;
	}

	.videolist ul li .photo image {
		display: block;
		height: 100%;
		width: 100%;
	}

	.videolist ul li .name {
		font-size: 34rpx;
		color: #576a94;
		margin-bottom: 30rpx;
		font-weight: bold;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.videolist ul li .decript {
		font-size: 30rpx;
	}

	.videolist ul li .imgbox {
		margin-top: 20rpx;
	}

	.videolist ul li .imgbox .previewimg {
		display: block;
		width: 28%;
		height: 0;
		padding-bottom: 28%;
		/* padding: 0 4rpx; */
		margin-bottom: 10rpx;
		float: left;
		box-sizing: border-box;
		position: relative;
		overflow: hidden;
	}

	.videolist ul li .imgbox .previewimg {
		margin: 1%;
	}

	.videolist ul li .imgbox .previewimg image {
		height: 100%;
		width: 100%;
		position: absolute;
		left: 0;
		top: 0;
	}

	.videolist ul li .tip {
		color: #434343;
		font-size: 24rpx;
		margin-top: 20rpx;
	}

	.videolist ul li image {
		width: 32rpx;
		vertical-align: middle;
	}

	.videolist ul li span {
		vertical-align: middle;
	}

	.userInfo {
		background: rgba(0, 0, 0, 0.4);
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		font-size: 28rpx;
		line-height: 60rpx;
	}

	.userInfo>div {
		position: absolute;
		top: 50%;
		left: 10%;
		width: 80%;
		transform: translateY(-50%);
		background: #fff;
		padding: 60rpx;
		box-sizing: border-box;
		color: #989898;
	}

	.userInfo .name {
		font-size: 32rpx;
		color: #131510;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		padding-right: 35rpx;
	}

	.userInfo>div>div {
		border-bottom: 1px solid #f6f6f6;
	}

	.userInfo .btn {
		background: #ff5355;
		color: #fff;
		border-radius: 5px;
		font-size: 28rpx;
		text-align: center;
		margin-top: 40rpx;
	}

	.userInfo label {
		color: #131510;
	}

	.userInfo .icon {
		width: 32rpx;
		height: 32rpx;
	}

	.userInfo .photo {
		width: 100rpx;
		height: 100rpx;
		border-radius: 5px;
		overflow: hidden;
		display: block;
		margin-left: 10rpx;
	}

	.userInfo .pb20 {
		padding-bottom: 20px;
	}

	.video {
		width: 300rpx;
		height: 400rpx;
		overflow: hidden;
		display: block;
		background: #000;
		position: relative;
	}

	.videolist ul li .video image {
		width: 100%;
		height: 100%;
	}

	.videolist ul li .video image.icon {
		width: 128rpx;
		height: 128rpx;
		position: absolute;
		left: 86rpx;
		top: 136rpx;
	}
</style>
