import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        /**
         * 是否需要强制登录
         */
        forcedLogin: false,
        hasLogin:uni.getStorageSync("hasLogin")||false,
        userName: uni.getStorageSync("userName")||"",
		member_id:uni.getStorageSync("member_id")|| 0,
		openid:uni.getStorageSync("openid")||"",
		mobile:uni.getStorageSync("mobile")||"",
		session_key:uni.getStorageSync("session_key")||"",
		avatarUrl:""
    },
    mutations: {
        login(state,payload) {
			
			state.openid = payload.openid;
			state.member_id = payload.member_id;
            state.userName =payload.userName || '新用户';
			state.session_key = payload.session_key;
            state.hasLogin = payload.hasLogin;
			state.mobile=payload.mobile;
			state.avatarUrl=payload.avatarUrl;
			console.log("是否到登陆这里了"+JSON.stringify(payload))
        },
        logout(state) {
            state.userName = "";
            state.hasLogin = false;
        }
    }
})

export default store
