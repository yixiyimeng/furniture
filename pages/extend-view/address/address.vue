<template>
	<view class="tui-safe-area">
		<view class="tui-address">
			<block v-for="(item,index) in addressList" :key="index">
				<tui-list-cell padding="0">
					<view class="tui-address-flex" @tap="checkboxChange(item)">
						<!-- <view class="tui-checkbox-left" v-if="ischooseAddr">
							<label class="tui-checkbox">
								<checkbox color="#fff" :checked="item.checked"></checkbox>
							</label>
						</view> -->
						<view class="tui-address-left">
							<view class="tui-address-main">
								<view class="tui-address-name tui-ellipsis">{{item.contact_name}}</view>
								<view class="tui-address-tel">{{item.contact_phone}}</view>
							</view>
							<view class="tui-address-detail">
								<view class="tui-address-label" v-if="item.is_default===1">默认</view>
								<!-- <view class="tui-address-label" v-if="index!=2">{{["公司","住宅","其它"][index]}}</view> -->
								<text>{{item.province}}{{item.city}}{{item.district}}{{item.address}}</text>
							</view>
						</view>
						<view class="tui-address-imgbox" v-if="!ischooseAddr">

							<image class="tui-address-img " style="margin-right: 40rpx;" src="/static/images/mall/my/icon_addr_edit.png" @tap.stop="editAddr(item.id)" />
							<image class="tui-address-img" src="/static/images/mall/my/icon_addr_delete.png" @tap.stop="deleteAddress(item.id)" />

						</view>
					</view>
				</tui-list-cell>

			</block>
		</view>
		<!-- 新增地址 -->
		<view class="tui-address-new">
			<tui-button type="danger" height="88rpx" @click="editAddr('')">+ 新增收货地址</tui-button>
		</view>
	</view>
</template>

<script>
	import api from '@/api/member';
	import {
		mapState
	} from 'vuex'
	import tuiButton from "@/components/extend/button/button"
	import tuiListCell from "@/components/list-cell/list-cell"
	export default {
		components: {
			tuiButton,
			tuiListCell
		},
		data() {
			return {
				ischooseAddr: false,
				addressList: []
			}
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'member_id']),
		onLoad: function(options) {
			if (options.ischooseAddr) {
				this.ischooseAddr = options.ischooseAddr;
			}
			this.getAddress();
		},
		created() {

		},
		onShow: function(e) {


			let pages = getCurrentPages();


			let currPage = pages[pages.length - 1];


			if (currPage.data.isDoRefresh == true) {


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
				var url = api.getAddress + '/' + this.member_id;
				this.$postajax(url, param)
					.then(res => {
						console.log(JSON.stringify(res))
						if (res.code == 0) {
							if (res.data && res.data.length > 0) {
								this.addressList = res.data;
								this.addressList.forEach(item => {
									item.checked = false;
								});
							}


						}


					})
					.catch(err => {

					});
			},
			//删除地址
			deleteAddress(id) {
				uni.showModal({
					title: '删除',
					content: '您确定要删除收货地址吗?',
					showCancel: true,
					success: (res) => {
						if (res.confirm) {
							var url = api.deleteAddress + '/' + id;
							this.$postajax(url)
								.then(res => {
									if (res.code == 0) {
										this.tui.toast("删除成功", 2000, true);
										this.getAddress();
									}
								})
								.catch(err => {});
						}
					}
				});
			},
			//新增或地址
			editAddr(id) {
				uni.navigateTo({
					url: "../editAddress/editAddress?id=" + id
				})
			},
			//选择地址
			checkboxChange: function(item) {
				
				if(this.ischooseAddr){
					this.chooseAddr(item);
					/* console.log(JSON.stringify(item))
					var checked = item.id
					for (var i = 0; i < this.addressList.length; i++) {
						if (checked === this.addressList[i].id) {
							
							this.addressList[i].checked = true;
							this.$set(this.addressList, i, this.addressList[i])
						} else {
							
							this.addressList[i].checked = false;
							this.$set(this.addressList, i, this.addressList[i])
						}
					}
					 */
					
				}else{
					this.editAddr(item.id)
				}
				
			},
			//确认选择地址
			chooseAddr(item) {
				console.log(JSON.stringify(item))
				var pages = getCurrentPages();
				
				
				var currPage = pages[pages.length - 1]; //当前页面
				
				
				var prevPage = pages[pages.length - 2]; //上一个页面
				
				
				//直接调用上一个页面的setData()方法，把数据存到上一个页面中去
				
				
				prevPage.setData({
					isDoRefresh: true,
					addressId:item.id
				})
				
				
				uni.navigateBack();
				
				/* uni.navigateTo({
					url: "../submitOrder/submitOrder?addressId=" + item.id
				}) */
			}

			/* checkboxChange: function (e) {
			var items = this.addressList,
				values = e.detail.value;
			for (var i = 0, lenI = items.length; i < lenI; ++i) {
				const item = items[i]
				if(values.includes(item.value)){
					this.$set(item,'checked',true)
				}else{
					this.$set(item,'checked',false)
				}
			}
		} */
		}
	}
</script>

<style>
	.tui-address {
		width: 100%;
		padding-top: 20rpx;
		padding-bottom: 160rpx;
	}

	.tui-address-flex {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.tui-checkbox-left {
		padding-left: 20rpx;
	}

	.tui-checkbox {
		/* width: 40rpx; */
		padding-right: 30rpx;
		display: flex;
		align-items: center;
	}

	/* #ifdef APP-PLUS || MP */
	.tui-checkbox .wx-checkbox-input {
		width: 36rpx;
		height: 36rpx;
		border-radius: 50%;
		margin: 0;
	}

	.tui-checkbox .wx-checkbox-input.wx-checkbox-input-checked {
		background: #F82400;
		width: 40rpx;
		height: 40rpx;
		border: none;
	}

	/* #endif */
	/* #ifdef H5 */
	>>>.tui-checkbox .uni-checkbox-input {
		width: 36rpx;
		height: 36rpx;
		border-radius: 50% !important;
		margin: 0;
	}

	>>>.tui-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
		background: #F82400;
		width: 40rpx;
		height: 40rpx;
		border: none;
	}

	/* #endif */
	.tui-address-main {
		width: 576rpx;
		height: 70rpx;
		display: flex;
		font-size: 30rpx;
		line-height: 86rpx;
		padding-left: 30rpx;
	}

	.tui-address-name {
		width: 120rpx;
		height: 60rpx;
	}

	.tui-address-tel {
		margin-left: 10rpx;
	}

	.tui-address-detail {
		font-size: 24rpx;
		word-break: break-all;
		padding-bottom: 25rpx;
		padding-left: 25rpx;
		padding-right: 120rpx;
	}

	.tui-address-label {
		padding: 5rpx 8rpx;
		flex-shrink: 0;
		background: #e41f19;
		border-radius: 6rpx;
		color: #fff;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-size: 25rpx;
		line-height: 25rpx;
		transform: scale(0.8);
		transform-origin: center center;
		margin-right: 6rpx;
	}

	.tui-address-imgbox {
		width: 120rpx;
		height: 100rpx;
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		right: 20rpx;
	}
	.tui-address-img {
		width: 36rpx;
		height: 36rpx;
		margin-right: 20rpx;
	}
	.tui-address-new {
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 999;
		padding: 20rpx 25rpx 30rpx;
		box-sizing: border-box;
		background: #fafafa;
	}

	.tui-safe-area {
		padding-bottom: env(safe-area-inset-bottom);
	}
</style>
