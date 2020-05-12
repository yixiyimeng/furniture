import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: false,
		hasLogin: uni.getStorageSync("hasLogin") || false,
		userName: uni.getStorageSync("userName") || "",
		member_id: uni.getStorageSync("member_id") || '',
		openid: uni.getStorageSync("openid") || "",
		phone: uni.getStorageSync("phone") || "",
		session_key: uni.getStorageSync("session_key") || "",
		avatarUrl: ""
	},
	mutations: {
		login(state, payload) {
			console.log('123345')
			state.openid = payload.openid;
			state.member_id = payload.member_id;
			state.userName = payload.userName || '新用户';
			state.session_key = payload.session_key;
			state.hasLogin = payload.phone ? true : false;
			if (payload.phone) {
				state.phone = payload.phone;
			}
			state.avatarUrl = payload.avatarUrl;
			uni.setStorageSync('userInfo', payload);
			uni.setStorageSync('hasLogin', state.hasLogin);
			console.log("是否到登陆这里了" + JSON.stringify(payload))
		},
		logout(state) {
			state.userName = "";
			state.hasLogin = false;
		}
	}
})

export default store
