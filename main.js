import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
import { request } from './utils/request.js'
Vue.config.productionTip = false
Vue.prototype.$request = request
App.mpType = 'app'
const app = new Vue({ ...App })
// 封装的消息提示的方法
uni.$showMsg = function(title = '数据加载失败！', duration = 1500) {
	uni.showToast({
		title,
		duration,
		icon: 'none'
	})
}
// 如果不传参，title和duration就显示为默认值 

app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return { app }
}
// #endif