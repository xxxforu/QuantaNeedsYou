// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import './uni.promisify.adaptor'
import { request } from './utils/request.js'

Vue.prototype.staticDir = 'https://typora-1321658731.cos.ap-guangzhou.myqcloud.com/images/'

Vue.config.productionTip = false
Vue.prototype.$request = request

// 封装的消息提示的方法
Vue.prototype.$showMsg = function(title = '数据加载失败！', duration = 1500) {
	uni.showToast({
		title,
		duration,
		icon: 'none'
	})
}

// 全局方法 $getStaticFilePath
Vue.prototype.$getStaticFilePath = function(url) {
	return this.staticDir + url
}

App.mpType = 'app'
const app = new Vue({
	render: h => h(App)
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App'

export function createApp() {
	const app = createSSRApp(App)
	app.config.globalProperties.$getStaticFilePath = function(url) {
		return 'https://typora-1321658731.cos.ap-guangzhou.myqcloud.com/images/' + url
	}
	// 可以在这里添加其他需要的配置或依赖
	return { app }
}
// #endif