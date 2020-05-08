import {
	basePath
} from '@/utils/index.js'
var Fly = require("./wx")
const request = new Fly()

request.config.timeout = 60 * 1000
request.config.withCredentials=true
request.config.baseURL = basePath
request.interceptors.request.use((request) => {
	if (uni.getStorageSync('cookiekey')) {
		request.headers["Cookie"] = uni.getStorageSync('cookiekey')
	}
	uni.showLoading({
		title: '拼命加载中...'
	})
	return request
})

request.interceptors.response.use(
	(response, promise) => {
		/* console.log("响应"+JSON.stringify(response)) */
		if (response && response.headers && response.headers['set-cookie']) {
			uni.setStorage({
				key: 'cookiekey',
				data: response.headers['set-cookie'][0]
			});
		}
		wx.hideLoading();
		if (response.data.code == 0) {
			return promise.resolve(response.data)
		} else {
			console.log("哈哈哈哈"+response.data.msg)
			uni.showToast({
				title: response.data.msg,
				icon: 'none'
			})
			if (response.data.code == 1000) {
				setTimeout(() => {
					uni.redirectTo({
						url: '/pages/login/login'
					})
				}, 500)
			}
			return promise.reject(err)
		}
	},
	(err, promise) => {
		uni.hideLoading();
		console.log(err)
		uni.showToast({
			title: err.response&&err.response.data.msg,
			icon: 'none'
		})
		return promise.reject(err)
	}
)
function JsontoForm(params) {
	let str = [];
	for (let key in params) {
		str.push(key + "=" + params[key])
	}
	return str.join('&');

}

export function getajax(url) {
	return request.get(url)
}
export function postajax(url, params) {
	console.log(url)
	/* let myparams = JsontoForm(params); */
	return request.post(url, params)
}
export default request