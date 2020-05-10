<template>
	<div class="authButh">
		<view class="tip">请点击下方按钮使用微信登录</view>
		<button class="btn-primary tui-btn-submit" hover-class="btn-hover" open-type="getPhoneNumber" withCredentials="true"
		 lang="zh_CN" @getphonenumber="wxGetUserInfo">微信登录</button>
		<view class="cancel" @click="cancel">取消</view>
		<!-- <button open-type="getPhoneNumber" @getphonenumber="decryptPhoneNumber">获取电话号码</button> -->
	</div>
</template>

<script>
	import api from '@/api/member';
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'
	import tuiIcon from "@/components/icon/icon"
	import tuiButton from "@/components/button/button"
	const util = require('../../utils/util.js')
	export default {
		components: {
			tuiIcon,
			tuiButton
		},
		data() {
			return {
				infoRes: {},
				phone: '',
				isCanUse: uni.getStorageSync('isCanUse') || true //默认为true
			}
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'session_key', 'member_id']),

		methods: {
			...mapMutations(['login']),
			//手机号解密
			decrypt() {
				var param = {
					session_key: this.session_key,
					iv: this.infoRes.iv,
					encryptedData: this.infoRes.encryptedData
				}
				console.log("参数" + JSON.stringify(param))
				this.$postajax(api.decrypt, param)
					.then(res => {
						console.log("解密" + JSON.stringify(res))
						if (res.code == 0) {
							this.phone = res.data.phoneNumber;
							/* 更新用户信息 */
							this.updateMember({
								phone: this.phone
							});
						} else {

						}


					})
					.catch(err => {

					});
			},
			wxGetUserInfo(e) {
				var $me = this;
				$me.infoRes = {
					encryptedData: e.detail.encryptedData,
					iv: e.detail.iv
				};
				this.decrypt()
			},

			toMy() {
				console.log('页面跳转12');
				let userinfo=uni.getStorageSync('userInfo');
				 userinfo.phone=this.phone;
				this.login(userinfo);
				console.log('页面跳转')
				uni.switchTab({
					url: '/pages/my/my'
				})
			},


			cancel() {
				uni.navigateBack();
			},
			updateMember(param) {
				this.$postajax(api.updateMember + '/' + this.member_id, param)
					.then(res => {
						if (res.code == 0) {
							console.log('更新成功')
							this.toMy();
						}
					})
					.catch(err => {

					});
			}

		}
	}
</script>

<style>
	.authButh {
		text-align: center;
		margin: 0 80rpx 0;
		padding-top: 100rpx;
	}

	.tip {
		margin-bottom: 10rpx;
	}

	.btn-primary {
		background: #E41F19;
	}

	.cancel {
		margin-top: 10rpx;
	}
</style>
