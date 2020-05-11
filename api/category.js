import {
  basePath} from '@/utils/index'
export const api = {
	/* 家具产品接口文档 */
	getCategory:basePath+'/api/category',//获取一级分类
	getClass:basePath+'/api/class',//获取一级分类
	getProduct:basePath+'/api/product',//获取产品
	getProductShow:basePath+"/api/product/show",//获取产品详情
	getHostProduct:basePath+"/api/product/host",//获取热门产品
	getCodeing:'/api/create/code/img'
}
export default api