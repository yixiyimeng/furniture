 <script>
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'
	import api from '@/api/member';
	export default {
		onLaunch: function() {
			let $me = this;
			uni.login({
				provider: 'weixin',
				success: function(loginRes) {
					let code = loginRes.code;
					$me.islogin(code)
				},
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			...mapMutations(['login']),
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
							$me.login(res.data);
						} else {}
					})
					.catch(err => {

					});
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "./common/app.css";

	.cropRight {
		position: relative;
		background: #fff;
		padding: 0 20upx;
		color: #fff;
		text-align: left;
		font-size: 26rpx;
		line-height: 1.8;
	}

	.cropRight image {
		width: 100%;
	}

	.cropRight .name {
		font-size: 34upx;
	}

	.cropRight>div {
		position: absolute;
		left: 20px;
		top: 15px;
	}
</style>
