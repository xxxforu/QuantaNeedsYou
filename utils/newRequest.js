const baseUrl = 'https://zx.quantacenter.com/recruitment_reception/'

function service(options = {}) {
	options.url = `${baseUrl}${options.url}`
	// 判断本地是否存在token，如果存在则带上请求头
	let token = uni.getStorageSync('token')
	options.header = {
		'content-type': 'application/json',
		'Authorization': `${token || false}` // 这里是token(可自行修改)
	}
	// 显示加载框
	uni.showLoading({ title: '加载中' })


	// resolved是返回成功数据，rejected返回错误数据
	return new Promise((resolved, rejected) => {
		options.success = res => {
			uni.hideLoading()
			// 如果请求回来的状态码不是200则执行以下操作
			if (res.data.code !== 200) {
				// 非成功状态码弹窗
				uni.showToast({
					icon: 'none',
					duration: 3000,
					title: `${res.data.msg}`
				})
				// 这里可以做一些状态码判断以及操作
				if (res.data.code == 401) {
					uni.showToast({
						icon: 'none',
						duration: 3000,
						title: `${res.data.msg}` + '即将跳转登录页'
					})
					setTimeout(() => {
						uni.navigateTo({ url: '/pages/login/login' })
					}, 3000) // 延迟时间要与 showToast 的 duration 保持一致，确保在提示框显示完毕后执行跳转
				}
				// 返回错误信息
				rejected(res)
			} else {
				// 请求回来的状态码为200则返回内容
				resolved(res.data.data)
			}
		}
		options.fail = err => {
			uni.hideLoading()
			// 请求失败弹窗
			uni.showToast({
				icon: 'none',
				duration: 3000,
				title: '服务器错误,请稍后再试'
			})
			rejected(err)
		}
		uni.request(options)
	})
}

export default service