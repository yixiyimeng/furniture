<template>
	<view class="container">
		<view class="tui-bg-box">
			<image src="../../static/images/login/bg_login.png" class="tui-bg-img"></image>
			<image src="../../static/images/my/mine_def_touxiang_3x.png" class="tui-photo"></image>
			<view class="tui-login-name">家具商城</view>
		</view>
		<!-- <form :report-submit="true" @submit="formLogin">
			<view class="tui-login-from">
				<view class="tui-line-cell">
					<tui-icon name="mobile" :size="20" color='#5677fc'></tui-icon>
					<input placeholder-class="phcolor" class="tui-input" name="mobile" placeholder="请输入手机号码" maxlength="11" v-model="mobile"
					 type="number" />
				</view>
				<view class="tui-line-cell tui-top28">
					<tui-icon name="pwd" :size="20" color='#5677fc'></tui-icon>
					<input placeholder-class="phcolor" class="tui-input" name="smsCode" placeholder="请输入验证码" maxlength="6" />
					<tui-button size="mini" :type="type" shape="circle" :plain="true" :disabled="disabled" @click="btnSend">{{btnText}}</tui-button>
				</view>
				<button class="btn-primary tui-btn-submit" hover-class="btn-hover" form-type="submit">登录</button>
				<view class="tui-protocol" hover-class="opcity" :hover-stay-time="150">点击"登录"即表示已同意
					<text class="tui-protocol-red" @tap="protocol">《用户协议》</text>
				</view>
			</view>
		</form> -->
		<button class="btn-primary tui-btn-submit" hover-class="btn-hover" open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo">登录</button>
	</view>
</template>

<script>
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
				disabled: false,
				btnText: "获取验证码",
				mobile: "",
				type: "primary",
				code: "",
				
				SessionKey: '',
                OpenId: '',
                nickName: null,
                avatarUrl: null,
                isCanUse: uni.getStorageSync('isCanUse')||true//默认为true
			}
		},
		methods: {
			...mapMutations(['login']),
			
			//第一授权获取用户信息===》按钮触发
            wxGetUserInfo() {
                let _this = this;
                uni.getUserInfo({
                    provider: 'weixin',
                    success: function(infoRes) {
                        let nickName = infoRes.userInfo.nickName; //昵称
                        let avatarUrl = infoRes.userInfo.avatarUrl; //头像
                        try {
                            uni.setStorageSync('isCanUse', false);//记录是否第一次授权  false:表示不是第一次授权
                            //_this.updateUserInfo();
                        } catch (e) {}
                    },
                    fail(res) {}
                });
            },

　　　　　　//登录
                login() {
                let _this = this;
                uni.showLoading({
                    title: '登录中...'
                });
             
               // 1.wx获取登录用户code
                uni.login({
                    provider: 'weixin',
                    success: function(loginRes) {
                        let code = loginRes.code;
                        if (!_this.isCanUse) {
                            //非第一次授权获取用户信息
                            uni.getUserInfo({
                                provider: 'weixin',
                                success: function(infoRes) {
 　　　　　　　　　　　　　　　　　　　　　　//获取用户信息后向调用信息更新方法
                                    let nickName = infoRes.userInfo.nickName; //昵称
                                    let avatarUrl = infoRes.userInfo.avatarUrl; //头像
									//_this.updateUserInfo();//调用更新信息方法
									this.login(state);
									this.tui.toast("登录成功", 2000, true);
									setTimeout(() => {
										uni.reLaunch({
											url: '../my/my'
										})
									}, 200);
                                        
                                }
                            });
                        }
            
                        //2.将用户登录code传递到后台置换用户SessionKey、OpenId等信息
                       /* uni.request({
                            url: '服务器地址',
                            data: {
                                code: code,
                            },
                            method: 'GET',
                            header: {
                                'content-type': 'application/json'
                            },
                            success: (res) => {
                                //openId、或SessionKdy存储//隐藏loading
                                uni.hideLoading();
                            }
                        }); */
                    },
                });
            },
         //向后台更新信息
            /* updateUserInfo() {
                let _this = this;
                uni.request({
                    url:'url' ,//服务器端地址
                    data: {
                        appKey: this.$store.state.appKey,
                        customerId: _this.customerId,
                        nickName: _this.nickName,
                        headUrl: _this.avatarUrl
                    },
                    method: 'POST',
                    header: {
                        'content-type': 'application/json'
                    },
                    success: (res) => {
                        if (res.data.state == "success") {
                            uni.reLaunch({//信息更新成功后跳转到小程序首页
                                url: '/pages/index/index'
                            });
                        }
                    }
                   
                });
            } */
        },
        onLoad() {//默认加载
            this.login();
        },
			
			/* formLogin: function(e) {
				let loginCode = e.detail.value.smsCode;
				let mobile = e.detail.value.mobile;
				if (util.isNullOrEmpty(mobile)) {
					this.tui.toast('请输入手机号码');
					return
				} else if (!util.isMobile(mobile)) {
					util.toast('请输入正确的手机号码');
					return
				} else if (util.isNullOrEmpty(loginCode)) {
					this.tui.toast('请输入验证码');
					return
				} else if (loginCode != this.code) {
					this.tui.toast('验证码不正确');
					return
				}
				uni.setStorageSync("thorui_mobile", util.formatNum(mobile));
				let state = {
					mobile: util.formatNum(mobile),
					isLogin: true,
					memberId: 0
				};
				this.login(state);
				this.tui.toast("登录成功", 2000, true);
				setTimeout(() => {
					uni.reLaunch({
						url: '../my/my'
					})
				}, 200);
			}, */
			protocol: function() {
				/* uni.navigateTo({
					url: '../about/about'
				}) */
			}
		}
	}
</script>

<style>
	page {
		background: #fff;
	}

	.tui-bg-box {
		width: 100%;
		box-sizing: border-box;
		position: relative;
		padding-top: 44rpx;
	}

	.tui-photo {
		height: 138rpx;
		width: 138rpx;
		display: block;
		margin: 10rpx auto 0 auto;
		border-radius: 50%;
		position: relative;
		z-index: 2;
	}

	.tui-login-name {
		width: 128rpx;
		height: 40rpx;
		font-size: 30rpx;
		color: #fff;
		margin: 36rpx auto 0 auto;
		text-align: center;
		position: relative;
		z-index: 2;
	}

	.tui-bg-img {
		width: 100%;
		height: 346rpx;
		display: block;
		position: absolute;
		top: 0;
	}

	.tui-login-from {
		width: 100%;
		padding: 128rpx 104rpx 0 104rpx;
		box-sizing: border-box;
	}

	.tui-input {
		font-size: 32rpx;
		flex: 1;
		display: inline-block;
		padding-left: 32rpx;
		box-sizing: border-box;
		overflow: hidden;
	}

	.tui-line-cell {
		padding: 27rpx 0;
		display: -webkit-flex;
		display: flex;
		-webkiit-align-items: center;
		align-items: center;
		position: relative;
		box-sizing: border-box;
		overflow: hidden;
	}

	.tui-line-cell::after {
		content: '';
		position: absolute;
		border-bottom: 1rpx solid #e0e0e0;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		bottom: 0;
		right: 0;
		left: 0;
	}

	.tui-top28 {
		margin-top: 28rpx;
	}

	.tui-btn-class {
		width: 196rpx !important;
		height: 54rpx !important;
		border-radius: 27rpx !important;
		font-size: 28rpx !important;
		padding: 0 !important;
		line-height: 54rpx !important;
	}

	.tui-btn-submit {
		margin-top: 100rpx;
	}

	.tui-protocol {
		color: #333;
		font-size: 24rpx;
		text-align: center;
		width: 100%;
		margin-top: 29rpx;
	}

	.tui-protocol-red {
		color: #f54f46;
	}
</style>
