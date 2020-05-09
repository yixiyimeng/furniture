<template>
	<div class="authButh">
		<view class="tip">请点击下方按钮使用微信登录</view>
		<button class="btn-primary tui-btn-submit" hover-class="btn-hover" open-type="getUserInfo" withCredentials="true"
		 lang="zh_CN" @getuserinfo="wxGetUserInfo">微信登录</button>
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
				isCanUse: uni.getStorageSync('isCanUse') || true //默认为true
			}
		},
		computed: mapState(['forcedLogin', 'hasLogin']),
		methods: {
			...mapMutations(['login']),
			//第一授权获取用户信息===》按钮触发
			/* decryptPhoneNumber(e) {
				console.log("手机号" + JSON.stringify(e));
				this.decrypt(e.target)
			}, */
			//手机号解密
			decrypt(item) {
				var param = {
					session_key: item.session_key,
					iv: this.infoRes.iv,
					encryptedData: this.infoRes.encryptedData
				}
				console.log("参数" + JSON.stringify(param))
				this.$postajax(api.decrypt, param)
					.then(res => {
						console.log("解密" + JSON.stringify(res))
						if (res.code == 0) {
								this.mobile=res.data.watermark.timestamp;
								uni.setStorageSync('mobile', this.mobile);
							} else {
								
							}


					})
					.catch(err => {

					});
			},
			wxGetUserInfo() {
				var $me = this;
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						let code = loginRes.code;
						uni.getUserInfo({
							provider: 'weixin',
							success: function(infoRes) {
								$me.infoRes = infoRes;
								$me.islogin(code)
							},
							fail(res) {}
						});


					},
				})


			},
			islogin(code) {
				//2.将用户登录code传递到后台置换用户SessionKey、OpenId等信息
				var param = {
					code: code
				}
				var $me = this;
				$me.$postajax(api.login, param)
					.then(res => {
						console.log("登录返回" + JSON.stringify(res))
						if (res.code == 0) {

							uni.setStorageSync("member_id", res.data.member_id);
							uni.setStorageSync("openid", res.data.openid);
							uni.setStorageSync('session_key', res.data.session_key);
							uni.setStorageSync('hasLogin', true);
							
							uni.setStorageSync('userName', this.infoRes.userInfo.nickName);
							uni.setStorageSync('avatarUrl', this.infoRes.userInfo.avatarUrl);
							$me.decrypt(res.data)
							let payload = {
								/* mobile: util.formatNum(mobile), */
								mobile:this.mobile,
								hasLogin: true,
								member_id: res.data.member_id,
								openid: res.data.openid,
								session_key: res.data.session_key,
								userName:this.infoRes.userInfo.nickName,
								avatarUrl:this.infoRes.userInfo.avatarUrl,
							};
							$me.tui.toast("登录成功", 2000, true);
							$me.toMy(payload);

						} else {
						}


					})
					.catch(err => {

					});
			},

			toMy(userName) {

				this.login(userName);
				/**
				 * 强制登录时使用reLaunch方式跳转过来
				 * 返回首页也使用reLaunch方式
				 */
				if (this.forcedLogin) {
					/* uni.reLaunch({
						url: '../my/my',
					}); */
					uni.navigateBack()
				} else {
					uni.navigateBack();
				}

			},
			

			cancel() {
				uni.reLaunch({
					url: '../mall/mall',
				});
			}

		}
	}
</script>

<style>
	.authButh {
		text-align: center;
		margin: 100rpx 80rpx 0;
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
