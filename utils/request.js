const baseUrl = 'http://119.188.247.32:55588/quanta/recruitment_reception/' //api的固定前部地址
export const request = options => {
	return new Promise((resolve, reject) => {
		// 设置请求头
		const header = {
			'Content-Type': 'application/json',
			Authorization: uni.getStorageSync('token') != null ? uni.getStorageSync('token') : null
		}
		// ⭐在发送请求之前执行拦截操作
		uni.request({
			url: baseUrl + options.url, //接收请求的API
			method: options.method || 'GET', //接收请求的方式,如果不传默认为GET
			data: JSON.stringify(options.data) || {}, //接收请求的data,不传默认为空
			header: header, //接收请求的header
			success(res) {
				// ⭐在这里处理接收到响应后处理响应数据
				// 如果code为401即token错误 就提示重新登录
				if (res.data.code == 401) {
					// 提示重新登录
					uni.showToast({
						title: '请重新登录！',
						duration: 1500,
						icon: 'none'
					})
					setTimeout(() => {
						uni.navigateTo({ url: '/pages/login/login' })
					}, 1000)
				}
				resolve(res.data) // 使用resolve将数据传递出去
			},
			fail: err => {
				reject(err)
			}
		})
	})
}