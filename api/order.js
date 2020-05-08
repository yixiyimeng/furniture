import {
  basePath} from '@/utils/index'
export const api = {
	/* 家具订单接口文档 */	
	calcOrder:basePath+'/api/order/calc',//订单计算
	submitOrder:basePath+'/api/order/submit',//订单提交
	getOrder:basePath+'/api/order/index',//订单查询
	getOrderShow:basePath+'/api/order/show',//订单详情
	payOrder:basePath+'/api/order/pay',//订单支付 
	closeOrder:basePath+'/api/order/close',//订单取消
}
export default api