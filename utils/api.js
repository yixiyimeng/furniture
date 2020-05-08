import $http from './request'

function JsontoForm(params) {
	let str = [];
	for (let key in params) {
		str.push(key + "=" + params[key])
	}
	return str.join('&');

}
export const api = {
	/* 登录 */
	login: '/member/login',
	getuserinfo:'/foun/student/list_by_curr_login_parents_role',
	gettopiclist:'/inte/homeSchool/courseDetail',//主题列表
	advanceProgress:'/inte/homeSchool/advanceProgress',//进步趋势
	studentAnalyseDetail:'/inte/homeSchool/studentAnalyseDetail'
}
export function getajax(url) {
	return $http.get(url)
}
export function postajax(url, params) {
	// let myparams = JsontoForm(params);
	return $http.post(url, params)
}
export default {
	api,
	getajax,
	postajax
}
