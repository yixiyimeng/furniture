import {
  basePath} from '@/utils/index'
export const api = {
	/* 会员登录 */
	login:basePath+'/api/member/login',//登录
	updateMember:basePath+'/api/member/update',//基本信息修改
	decrypt:basePath+"/api/member/decrypt",//手机号解密
	getAddress:basePath+'/api/member/address',//获取收货地址	
	addAddress:basePath+'/api/member/address/add',//新增收货地址
	editAddress:basePath+'/api/member/address/edit',//修改收货地址
	deleteAddress:basePath+'/api/member/address/delete',//删除收货地址
	getAddressShow:basePath+'/api/member/address/show', //地址详细信息	
	getFollow:basePath+'/api/member/follow/index',//查询关注
	addFollow:basePath+'/api/member/follow/add',//添加关注
	closeFollow:basePath+'/api/member/follow/close',//删除关注
	
}
export default api