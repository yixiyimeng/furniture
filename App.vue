<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
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
