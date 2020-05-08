<template>
	<view class="tui-container">
		<!--新闻列表-->
		<view class="tui-news-view mt20"  v-for="(item,index) in newsList" :key="index" style="margin-bottom: 10rpx;">
			<block>
					<tui-list-cell :index="index" @click="detail(item.pid)" :last="count==index">
						<view class="tui-news-flex tui-flex-start">
							<view class="tui-news-picbox tui-w220 tui-h165 tui-flex-between">
							<!-- <block v-for="(items,index2) in item.img" :key="index2">
								<image :src="'../../../static/images/news/'+items" mode="widthFix" class="tui-block"></image>
							</block> -->
							<block>
								<image :src="basePath+item.product_img" mode="widthFix" class="tui-block"></image>
							</block>
						</view>
						<view class="tui-news-tbox tui-flex-column tui-flex-between tui-h165 tui-pl-20">
							<view class="tui-news-title">{{item.product_name}}</view>
							<view class="tui-sub-box">
								<view class="tui-sub-source">¥{{item.product_price}}</view>
								<view class="tui-sub-cmt">
									<view class="tui-scale">
										<tui-button type="danger" shape="circle" size="mini" @tap.stop="deleteFacorite(item.id)">删除</tui-button>
									</view>
								</view>
							</view>
						</view>
					</view>
				</tui-list-cell>
			</block>

		</view>
		<tui-tips ref="toast"></tui-tips>
		<!--加载loadding-->
		<tui-loadmore :visible="loadding" :index="3" type="red"></tui-loadmore>
		<tui-nomore :visible="!pullUpOn" bgcolor="#fafafa"></tui-nomore>
		<!--加载loadding-->
	</view>
</template>

<script>
	import {
		basePath
	} from '@/utils/index'
	import api from "@/api/member"
	import {
		mapState
	} from 'vuex'
	import tuiIcon from "@/components/icon/icon"
	import tuiTag from "@/components/tag/tag"
	import tuiListCell from "@/components/list-cell/list-cell"
	import tuiLoadmore from "@/components/loadmore/loadmore"
	import tuiNomore from "@/components/nomore/nomore"
	import tuiTips from "@/components/tips/tips"
	import tuiButton from "@/components/button/button"
	export default {
		components: {
			tuiIcon,
			tuiTag,
			tuiListCell,
			tuiLoadmore,
			tuiNomore,
			tuiTips,
			tuiButton
		},
		computed: {
// 			count() {
// 				return this.newsList.length - 1
// 			}
		},
		data() {
			return {
				basePath,
				newsList: [],
				pageIndex: 1,
				lastPage:1,
				limit:1,
				loadding: false,
				pullUpOn: true
			}
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'member_id']),
		onLoad: function(options) {
			//this.newsList = this.dataSources
			this.getFollow();
		},
		watch: {
			pageIndex(newValue, oldValue) {
				if(this.pageIndex==this.lastPage){
					console.log(22222)
					this.pullUpOn = false;
					
				}
			}
		},
		methods: {
			//查询关注
			getFollow(){
				var param = {
					page: this.$pagination.page,
					limit: this.$pagination.limit
				}
				var url=api.getFollow+'/'+this.member_id
				this.$postajax(url,param)
					.then(res => {
						if (res.code == 0) {
							this.newsList=res.data;
							this.lastPage =res.data&&res.data.length>0?(Math.ceil(res.count/this.$pagination.limit)):1;
							console.log("最后一页"+JSON.stringify(this.lastPage))
							if(this.pageIndex==this.lastPage){
								this.pullUpOn = false;
							}
							this.count=res.count;
						}
				
				
					})
					.catch(err => {
				
					});
			},
			detail(id) {
				uni.navigateTo({
					url: "../productDetail/productDetail?id="+id
				})
			},
			deleteFacorite(id,e) {
				/* e.stopPropagation();  */
				var url=api.closeFollow+'/'+id;
				this.$postajax(url)
				.then(res => {
					console.log(JSON.stringify(res))
					if (res.code == 0) {
						this.tui.toast("删除收藏成功", 2000, true);
						this.getFollow();
					}
			
			
				})
				.catch(err => {
			
				});
			}
		},
		//页面相关事件处理函数--监听用户下拉动作
		onPullDownRefresh: function() {
			//this.getFollow();
			//this.pageIndex = 1;
			this.pullUpOn = true;
			//this.loadding = false;
			this.loadding = true;
			console.log('上拉加载事件');
			// 每次拉到页面底部,请求页数自加
			this.pageIndex++;
			// 第二次之后请求数据
			if(this.pageIndex>this.lastPage){
				setTimeout(() => {
					this.loadding = false
					this.pullUpOn = false
				}, 1000)
				return false;
			}else{
				var param = {
					page: this.pageIndex,
					limit: this.$pagination.limit
				}
				var url=api.getFollow+'/'+this.member_id
				this.$postajax(url,param)
					.then(res => {
						console.log(JSON.stringify(res))
						if (res.code == 0) {
							this.newsList = this.newsList.concat(res.data)
							this.loadding = false;
						}
				
				
					})
					.catch(err => {
				
					});
							 
				 }
			
			uni.stopPullDownRefresh();
			let options = {
				msg: "刷新成功",
				duration: 2000,
				type: "translucent"
			};
			setTimeout(() => {
				this.$refs.toast.showTips(options);
			}, 300);
		},

		// 页面上拉触底事件的处理函数
		onReachBottom: function() {
			this.pullUpOn = true;
			//this.loadding = false;
			this.loadding = true;
			console.log('上拉加载事件');
			// 每次拉到页面底部,请求页数自加
			this.pageIndex++;
			// 第二次之后请求数据
			if(this.pageIndex>this.lastPage){
				setTimeout(() => {
					this.loadding = false
					this.pullUpOn = false
				}, 1000)
				return false;
			}else{
				var param = {
					page: this.pageIndex,
					limit: this.$pagination.limit
				}
				var url=api.getFollow+'/'+this.member_id
				this.$postajax(url,param)
					.then(res => {
						console.log(JSON.stringify(res))
						if (res.code == 0) {
							this.newsList = this.newsList.concat(res.data)
							this.loadding = false;
						}
				
				
					})
					.catch(err => {
				
					});
							 
				 }
			
			uni.stopPullDownRefresh();
			let options = {
				msg: "刷新成功",
				duration: 2000,
				type: "translucent"
			};
			setTimeout(() => {
				this.$refs.toast.showTips(options);
			}, 300);
		}
	}
</script>

<style>
	page {
		background: #f2f2f2;
	}

	.tui-container {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		padding-bottom: env(safe-area-inset-bottom);
	}
	.tui-news-flex {
		width: 100%;
		display: flex;
	}

	.tui-flex-start {
		align-items: flex-start !important;
	}

	.tui-flex-center {
		align-items: center !important;
	}

	.tui-flex-column {
		flex-direction: column !important;
	}

	.tui-flex-between {
		justify-content: space-between !important;
	}

	.tui-news-cell {
		display: flex;
		padding: 20rpx 30rpx;
	}

	.tui-news-tbox {
		flex: 1;
		width: 100%;
		box-sizing: border-box;
		display: flex;
	}

	.tui-news-picbox {
		display: flex;
		position: relative;
	}

	.tui-w220 {
		width: 220rpx;
	}

	.tui-h165 {
		height: 165rpx;
	}

	.tui-block {
		display: block;
	}
	.tui-news-title {
		width: 100%;
		font-size: 34rpx;
		word-break: break-all;
		word-wrap: break-word;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		box-sizing: border-box;
	}

	.tui-pl-20 {
		padding-left: 20rpx;
	}

	.tui-pt20 {
		padding-top: 20rpx;
	}

	.tui-sub-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #999;
		box-sizing: border-box;
		line-height: 24rpx;
	}

	.tui-sub-source {
		font-size: 26rpx;
	}

	.tui-sub-cmt {
		font-size: 24rpx;
		line-height: 24rpx;
		display: flex;
		align-items: center;
	}
	.tui-scale {
		transform: scale(0.6);
		transform-origin: center center;
	}
	
</style>
