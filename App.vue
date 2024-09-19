<script>
	export default {
		onLaunch: function() {
			/**
			 * 检测当前的小程序
			 * 是否是最新版本，是否需要下载、更新
			 */
			//判断微信版本是否 兼容小程序更新机制API的使用
			const updateManager = uni.getUpdateManager()
			//检测版本更新
			updateManager.onCheckForUpdate(function(res) {
				if (res.hasUpdate) {
					updateManager.onUpdateReady(function() {
						uni.showModal({
							title: '温馨提示',
							content: '检测到新版本，是否重启小程序？',
							showCancel: false,
							success: function(res) {
								if (res.confirm) {
									// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
									updateManager.applyUpdate()
								}
							}
						})
					})
					updateManager.onUpdateFailed(function() {
						// 新版本下载失败
						uni.showModal({
							title: '已有新版本',
							content: '请您删除小程序，重新搜索进入',
						})
					})
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}

	}
</script>
<style>
	/*每个页面公共css */
	.myButton {
		background-color: #ffa265;
		color: #fff;
		font-size: 13px;
		font-weight: bold;
		border-radius: 10px;
		padding: 3px 35px;
	}

	.container {
		box-sizing: border-box;
		color: #707070;
		height: 100vh;
		background-color: #f9f8f8;
	}
</style>