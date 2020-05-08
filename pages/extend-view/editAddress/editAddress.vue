<template>
	<view class="tui-addr-box">
		<!-- <form @submit="formSubmit" @reset="formReset"> -->
		<tui-list-cell :hover="false" padding="0">
			<view class="tui-line-cell">
				<view class="tui-title">收货人</view>
				<input placeholder-class="tui-phcolor" class="tui-input" name="name" placeholder="请输入收货人姓名" maxlength="15" type="text"
				 v-model="userInfo.contact_name" />
			</view>
		</tui-list-cell>
		<tui-list-cell :hover="false" padding="0">
			<view class="tui-line-cell">
				<view class="tui-title">手机号码</view>
				<input placeholder-class="tui-phcolor" class="tui-input" name="mobile" placeholder="请输入收货人手机号码" maxlength="11"
				 v-model="userInfo.contact_phone" type="text" />
			</view>
		</tui-list-cell>
		<tui-list-cell :arrow="true" padding="0">
			<view class="tui-line-cell">
				<view class="tui-title"><text class="tui-title-city-text">所在城市</text></view>
				<input placeholder-class="tui-phcolor" class="tui-input" disabled name="city" placeholder="请选择城市" maxlength="50"
				 type="text" v-model="sxaddress" @tap="showPicker" />
			</view>
		</tui-list-cell>
		<tui-list-cell :hover="false" padding="0">
			<view class="tui-line-cell">
				<view class="tui-title">收货地址</view>
				<input placeholder-class="tui-phcolor" class="tui-input" name="address" placeholder="请输入详细的收货地址" maxlength="50"
				 type="text" v-model="userInfo.address" />
			</view>
		</tui-list-cell>
		<!-- <tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-cell-title">地址类型</view>
					<view class="tui-addr-label">
						<text v-for="(item,index) in lists" :key="index" class="tui-label-item" :class="{'tui-label-active':index==1}">{{item}}</text>
					</view>
				</view>
			</tui-list-cell> -->

		<!-- 默认地址 -->
		<tui-list-cell :hover="false" padding="0">
			<view class="tui-swipe-cell">
				<view>设为默认地址</view>
				<switch :checked="userInfo.is_default" color="#30CC67" class="tui-switch-small" @change="switchDefault" />
			</view>
		</tui-list-cell>
		<!-- 保存地址 -->
		<view class="tui-addr-save">
			<tui-button type="danger" height="88rpx" @click="formSubmit">保存收货地址</tui-button>
		</view>
		<view class="tui-del" v-if="false">
			<tui-button type="gray" height="88rpx">删除收货地址</tui-button>
		</view>
		<!-- </form> -->

		<!--picker-view start-->
		<view class="tui-mask-screen" :class="[showPickerStatus?'tui-mask-show':'']" @tap="hidePicker"></view>
		<view class="tui-picker-box" :class="[showPickerStatus?'tui-pickerbox-show':'']">
			<view class="picker-header list-item">
				<view class="btn-cancle" hover-class="opcity" :hover-stay-time="150" @tap.stop="hidePicker">取消</view>
				<view class="btn-sure" hover-class="opcity" :hover-stay-time="150" @tap.stop="picker">确定</view>
			</view>
			<picker-view indicator-style="height: 50px;" class="picker-view" :value="value" @change="columnPicker">
				<picker-view-column>
					<view v-for="(item,index) in proviceArr" :key="index" class="item">{{item}}</view>
				</picker-view-column>
				<picker-view-column>
					<view v-for="(item,index) in cityArr" :key="index" class="item">{{item}}</view>
				</picker-view-column>
				<picker-view-column>
					<view v-for="(item,index) in districtArr" :key="index" class="item">{{item}}</view>
				</picker-view-column>
			</picker-view>
		</view>
		<!--picker-view end-->
	</view>
</template>

<script>
	const cityData = require('@/utils/picker.city.js')
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
				/* lists: ["公司", "家", "学校", "其他"] */
				userInfo: {
					is_default: true,
					contact_phone: null,
					contact_name: "",
					address: "",
				},
				sxaddress: "",
				text: [],
				proviceArr: [],
				cityArr: [],
				districtArr: [],
				value: [0, 0, 0],
				iconHidden: true,
				showPickerStatus: false,
				id: null,
			}
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'member_id']),
		onLoad: function(options) {
			//初始化数据
			this.proviceArr = this.toArr(cityData);
			this.cityArr = this.toArr(cityData[0].children);
			this.districtArr = this.toArr(cityData[0].children[0].children);
			console.log("有值吗" + JSON.stringify(options))
			uni.setNavigationBarTitle({
				title:options.id?"修改地址":'新增地址'
			});
			if (options.id) {
				this.id = options.id;
				this.getAddressShow()
			}
			
		},
		methods: {
			//获取地址详细信息
			getAddressShow() {
				var url = api.getAddressShow + '/' + this.id;
				this.$postajax(url)
					.then(res => {
						if (res.code == 0) {
							this.userInfo = res.data;
							this.userInfo.is_default = res.data.is_default == '1' ? true : false;
							this.sxaddress = res.data.province + res.data.city + res.data.district;
							this.text = [res.data.province, res.data.city, res.data.district];
							console.log("地址详情" + JSON.stringify(this.userInfo.is_default))
							//this.$set(this.userInfo, "is_default", is_default)
						}
					})
					.catch(err => {});
			},
			toArr(object) {
				let arr = [];
				for (let i in object) {
					arr.push(object[i].name);
				}
				return arr;
			},

			//picker change切换事件
			columnPicker: function(e) {
				let value = e.detail.value;
				//如果两者下标不一致，表示滚动过
				if (this.value[0] !== value[0]) {
					this.proviceArr = this.proviceArr;
					this.cityArr = this.toArr(cityData[value[0]].children);
					this.districtArr = this.toArr(cityData[value[0]].children[0].children);
					this.value = [value[0], 0, 0]
				} else if (this.value[1] !== value[1]) {
					this.proviceArr = this.proviceArr;
					this.cityArr = this.cityArr;
					this.districtArr = this.toArr(cityData[value[0]].children[value[1]].children);
					this.value = [value[0], value[1], 0]
				} else {
					this.value = value
				}
			},
			//确定按钮
			picker: function(e) {
				let value = this.value;
				if (cityData.length > 0) {
					let provice = cityData[value[0]].name;
					let city = cityData[value[0]].children[value[1]].name;
					let district = cityData[value[0]].children[value[1]].children[value[2]].name;
					this.text = [provice, city, district];
					this.sxaddress = provice + city + district;
					this.showPickerStatus = false
				}
			},
			// 显示picker-view
			showPicker: function() {
				this.showPickerStatus = true
			},
			// 隐藏picker-view
			hidePicker: function() {
				this.showPickerStatus = false
			},
			//切花是否默认
			switchDefault(e) {
				// TODO H5端内置组件实现的有问题，使用v-model无效，先这样解决
				this.userInfo.is_default = !this.userInfo.is_default;
				// var self = this;
				// setTimeout(function() {
				// 	self.userInfo.is_default = !self.userInfo.is_default;
				// }, 3000)
			},

			formSubmit: function(e) {
				console.log(JSON.stringify(e))
				/* let loginCode = e.detail.value.smsCode;
				let mobile = e.detail.value.mobile; */
				if (util.isNullOrEmpty(this.userInfo.contact_name)) {
					this.tui.toast('请输入收货人');
					return
				} else if (util.isNullOrEmpty(this.userInfo.contact_phone)) {
					this.tui.toast('请输入手机号码');
					return
				} else if (!util.isMobile(this.userInfo.contact_phone)) {
					this.tui.toast('请输入正确的手机号码');
					return
				} else if (util.isNullOrEmpty(this.sxaddress)) {
					this.tui.toast('请选择所在城市');
					return
				} else if (util.isNullOrEmpty(this.userInfo.address)) {
					this.tui.toast('请输入收货地址');
					return
				}
				for (var key in this.userInfo) {
					if (key == 'id') {
						delete this.userInfo[key];
					}

				}
				var param = Object.assign({}, this.userInfo, {
					province: this.text[0],
					city: this.text[1],
					district: this.text[2] ? this.text[2] : '',
					is_default: this.userInfo.is_default ? '1' : '0'

				})
				if (this.id) {
					var url = api.editAddress + '/' + this.id
				} else {
					var url = api.addAddress + '/' + this.member_id
				}
				this.$postajax(url, param)
					.then(res => {
						if (res.code == 0) {
							var title = this.id ? "修改" : "新增";
							this.tui.toast(title + "成功", 2000, true);
							/* uni.redirectTo({
								url: "../address/address"
							}) */
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
					.catch(err => {

					});
			},
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
