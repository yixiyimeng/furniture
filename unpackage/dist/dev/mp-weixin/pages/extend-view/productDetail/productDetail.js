(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/extend-view/productDetail/productDetail"],{

/***/ 61:
/*!*********************************************************************************************************************!*\
  !*** I:/ThorUI组件库（微信小程序原生版）示例/ThorUI-uniapp/main.js?{"page":"pages%2Fextend-view%2FproductDetail%2FproductDetail"} ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);__webpack_require__(/*! @dcloudio/uni-stat */ 5);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _productDetail = _interopRequireDefault(__webpack_require__(/*! ./pages/extend-view/productDetail/productDetail.vue */ 62));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_productDetail.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 62:
/*!************************************************************************************************!*\
  !*** I:/ThorUI组件库（微信小程序原生版）示例/ThorUI-uniapp/pages/extend-view/productDetail/productDetail.vue ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _productDetail_vue_vue_type_template_id_ec8f6f98___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./productDetail.vue?vue&type=template&id=ec8f6f98& */ 63);
/* harmony import */ var _productDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./productDetail.vue?vue&type=script&lang=js& */ 65);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _productDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _productDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _productDetail_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./productDetail.vue?vue&type=style&index=0&lang=css& */ 67);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 14);

var renderjs





/* normalize component */

var component = Object(_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _productDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _productDetail_vue_vue_type_template_id_ec8f6f98___WEBPACK_IMPORTED_MODULE_0__["render"],
  _productDetail_vue_vue_type_template_id_ec8f6f98___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _productDetail_vue_vue_type_template_id_ec8f6f98___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "I:/ThorUI组件库（微信小程序原生版）示例/ThorUI-uniapp/pages/extend-view/productDetail/productDetail.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 63:
/*!*******************************************************************************************************************************!*\
  !*** I:/ThorUI组件库（微信小程序原生版）示例/ThorUI-uniapp/pages/extend-view/productDetail/productDetail.vue?vue&type=template&id=ec8f6f98& ***!
  \*******************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_productDetail_vue_vue_type_template_id_ec8f6f98___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./productDetail.vue?vue&type=template&id=ec8f6f98& */ 64);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_productDetail_vue_vue_type_template_id_ec8f6f98___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_productDetail_vue_vue_type_template_id_ec8f6f98___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_productDetail_vue_vue_type_template_id_ec8f6f98___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_productDetail_vue_vue_type_template_id_ec8f6f98___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 64:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!I:/ThorUI组件库（微信小程序原生版）示例/ThorUI-uniapp/pages/extend-view/productDetail/productDetail.vue?vue&type=template&id=ec8f6f98& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 65:
/*!*************************************************************************************************************************!*\
  !*** I:/ThorUI组件库（微信小程序原生版）示例/ThorUI-uniapp/pages/extend-view/productDetail/productDetail.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_productDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./productDetail.vue?vue&type=script&lang=js& */ 66);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_productDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_productDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_productDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_productDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_productDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 66:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!I:/ThorUI组件库（微信小程序原生版）示例/ThorUI-uniapp/pages/extend-view/productDetail/productDetail.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;



































































































































































var _index = __webpack_require__(/*! @/utils/index */ 18);


var _category = _interopRequireDefault(__webpack_require__(/*! @/api/category */ 27));
var _member = _interopRequireDefault(__webpack_require__(/*! @/api/member */ 44));
var _vuex = __webpack_require__(/*! vuex */ 16);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var tuiIcon = function tuiIcon() {__webpack_require__.e(/*! require.ensure | components/icon/icon */ "components/icon/icon").then((function () {return resolve(__webpack_require__(/*! @/components/icon/icon */ 159));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var tuiTag = function tuiTag() {__webpack_require__.e(/*! require.ensure | components/tag/tag */ "components/tag/tag").then((function () {return resolve(__webpack_require__(/*! @/components/tag/tag */ 166));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var tuiBadge = function tuiBadge() {__webpack_require__.e(/*! require.ensure | components/badge/badge */ "components/badge/badge").then((function () {return resolve(__webpack_require__(/*! @/components/badge/badge */ 215));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var tuiNomore = function tuiNomore() {__webpack_require__.e(/*! require.ensure | components/nomore/nomore */ "components/nomore/nomore").then((function () {return resolve(__webpack_require__(/*! @/components/nomore/nomore */ 180));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var tuiButton = function tuiButton() {__webpack_require__.e(/*! require.ensure | components/button/button */ "components/button/button").then((function () {return resolve(__webpack_require__(/*! @/components/button/button */ 208));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var tuiTopDropdown = function tuiTopDropdown() {__webpack_require__.e(/*! require.ensure | components/top-dropdown/top-dropdown */ "components/top-dropdown/top-dropdown").then((function () {return resolve(__webpack_require__(/*! @/components/top-dropdown/top-dropdown */ 222));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var tuiBottomPopup = function tuiBottomPopup() {__webpack_require__.e(/*! require.ensure | components/bottom-popup/bottom-popup */ "components/bottom-popup/bottom-popup").then((function () {return resolve(__webpack_require__(/*! @/components/bottom-popup/bottom-popup */ 229));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var tuiNumberbox = function tuiNumberbox() {__webpack_require__.e(/*! require.ensure | components/numberbox/numberbox */ "components/numberbox/numberbox").then((function () {return resolve(__webpack_require__(/*! @/components/numberbox/numberbox */ 236));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var _default = { components: { tuiIcon: tuiIcon, tuiTag: tuiTag, tuiBadge: tuiBadge, tuiNomore: tuiNomore, tuiButton: tuiButton, tuiTopDropdown: tuiTopDropdown, tuiBottomPopup: tuiBottomPopup, tuiNumberbox: tuiNumberbox }, data: function data() {return { basePath: _index.basePath, height: 64, //header高度
      top: 0, //标题图标距离顶部距离
      scrollH: 0, //滚动总高度
      opcity: 0, iconOpcity: 0.5, productInfo: { img_url: [] }, //产品详情
      /* banner: [
      	"https://www.thorui.cn/img/product/11.jpg",
      	"https://www.thorui.cn/img/product/2.png",
      	"https://www.thorui.cn/img/product/33.jpg",
      	"https://www.thorui.cn/img/product/4.png",
      	"https://www.thorui.cn/img/product/55.jpg",
      	"https://www.thorui.cn/img/product/6.png",
      	"https://www.thorui.cn/img/product/7.jpg",
      	"https://www.thorui.cn/img/product/8.jpg"
      ], */bannerIndex: 0, topMenu: [{ icon: "message", text: "消息", size: 26, badge: 3 }, { icon: "home", text: "首页", size: 23, badge: 0 }, { icon: "people", text: "我的", size: 26, badge: 0 }, { icon: "cart", text: "购物车", size: 23, badge: 2 }, { icon: "kefu", text: "客服小蜜", size: 26, badge: 0 }, { icon: "feedback", text: "我要反馈", size: 23, badge: 0 }, { icon: "share", text: "分享", size: 26, badge: 0 }], menuShow: false, popupShow: false, value: 1, collected: false, shopCartNum: 0 };}, computed: (0, _vuex.mapState)(['forcedLogin', 'hasLogin', 'member_id']), onLoad: function onLoad(options) {var _this = this;var obj = {};obj = wx.getMenuButtonBoundingClientRect();console.log(JSON.stringify(options.id));this.getProductShow(options.id); /* let shopCartList = uni.getStorageSync('shopCartList');
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   if (shopCartList) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   	console.log("购物车哦"+JSON.stringify(shopCartList));
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   	this.shopCartNum=JSON.parse(shopCartList).length;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   } */setTimeout(function () {uni.getSystemInfo({ success: function success(res) {_this.width = obj.left || res.windowWidth;_this.height = obj.top ? obj.top + obj.height + 8 : res.statusBarHeight + 44;_this.top = obj.top ? obj.top + (obj.height - 32) / 2 : res.statusBarHeight + 6;_this.scrollH = res.windowWidth;} });}, 50);}, methods: { //获取产品详情
    getProductShow: function getProductShow(id) {var _this2 = this;var param = { member_id: this.member_id };var url = _category.default.getProductShow + '/' + id;this.$postajax(url, param).then(function (res) {console.log(JSON.stringify(res));if (res.code == 0) {_this2.productInfo = res.data;_this2.productInfo.img_url = JSON.parse(res.data.img_url);_this2.collected = _this2.productInfo.follow == 0 ? false : true;console.log("图片数组" + JSON.stringify(res.data));}}).catch(function (err) {});}, bannerChange: function bannerChange(e) {this.bannerIndex = e.detail.current;}, previewImage: function previewImage(e) {console.log(JSON.stringify(e.currentTarget.dataset));var index = e.currentTarget.dataset.index;var imgurl = this.productInfo.img_url.map(function (item) {return _index.basePath + item;});uni.previewImage({ current: index, urls: imgurl });}, back: function back() {uni.navigateBack();}, openMenu: function openMenu() {this.menuShow = true;}, closeMenu: function closeMenu() {this.menuShow = false;}, //跳转购物车
    shopCart: function shopCart() {uni.navigateTo({ url: '../shopcart/shopcart' });}, //打开添加购物车弹框
    showPopup: function showPopup() {this.popupShow = true;}, //确定加入购物车
    surePopup: function surePopup() {var _this3 = this;var shopCartArr = uni.getStorageSync('shopCartList');var shopCartList = [];this.productInfo.qyt = this.value;if (shopCartArr) {shopCartList = JSON.parse(shopCartArr);}if (shopCartArr && shopCartList.length > 0) {shopCartList.forEach(function (item) {if (_this3.productInfo.id == item.id) {item.qyt = item.qyt + _this3.productInfo.qyt;
            item.follow = _this3.productInfo.follow;
            item.follow_ = _this3.productInfo.follow_;
          } else {
            shopCartList.push(_this3.productInfo);
          }

        });
      } else {
        shopCartList.push(this.productInfo);
      }


      //console.log("产品数据"+JSON.stringify(this.productInfo))
      console.log("产品数量" + JSON.stringify(shopCartList));
      var $me = this;
      uni.setStorage({
        key: 'shopCartList',
        data: JSON.stringify(shopCartList),
        success: function success(res) {
          $me.tui.toast("加入购物车成功", 2000, true);
          $me.shopCartNum = shopCartList.length;
        } });

      this.popupShow = false;
    },
    //关闭弹框
    hidePopup: function hidePopup() {
      this.popupShow = false;
    },
    change: function change(e) {
      this.value = e.value;
    },
    collecting: function collecting() {var _this4 = this;
      this.collected = !this.collected;
      if (this.collected) {
        var param = {
          member_id: this.member_id,
          pid: this.productInfo.id };

        this.$postajax(_member.default.addFollow, param).
        then(function (res) {
          console.log(JSON.stringify(res));
          if (res.code == 0) {
            _this4.tui.toast("收藏成功", 2000, true);
          }
        }).
        catch(function (err) {

        });
      } else {
        var url = _member.default.closeFollow + '/' + this.productInfo.id;
        this.$postajax(url).
        then(function (res) {
          console.log(JSON.stringify(res));
          if (res.code == 0) {
            _this4.tui.toast("取消收藏成功", 2000, true);
          }


        }).
        catch(function (err) {

        });
      }


    },
    common: function common() {
      this.tui.toast("功能开发中~");
    },
    chat: function chat() {
      uni.navigateTo({
        url: '../chat/chat' });

    },
    submit: function submit() {
      this.popupShow = false;
      console.log(JSON.stringify(this.productInfo.id));
      uni.navigateTo({
        url: '../submitOrder/submitOrder?id=' + this.productInfo.id + '&qyt=' + this.value });

    },
    coupon: function coupon() {
      uni.navigateTo({
        url: '../extend-view/coupon/coupon' });

    } },

  onPageScroll: function onPageScroll(e) {
    var scroll = e.scrollTop <= 0 ? 0 : e.scrollTop;
    var opcity = scroll / this.scrollH;
    if (this.opcity >= 1 && opcity >= 1) {
      return;
    }
    this.opcity = opcity;
    this.iconOpcity = 0.5 * (1 - opcity < 0 ? 0 : 1 - opcity);
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 67:
/*!*********************************************************************************************************************************!*\
  !*** I:/ThorUI组件库（微信小程序原生版）示例/ThorUI-uniapp/pages/extend-view/productDetail/productDetail.vue?vue&type=style&index=0&lang=css& ***!
  \*********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_productDetail_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./productDetail.vue?vue&type=style&index=0&lang=css& */ 68);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_productDetail_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_productDetail_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_productDetail_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_productDetail_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_productDetail_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 68:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!I:/ThorUI组件库（微信小程序原生版）示例/ThorUI-uniapp/pages/extend-view/productDetail/productDetail.vue?vue&type=style&index=0&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[61,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/extend-view/productDetail/productDetail.js.map