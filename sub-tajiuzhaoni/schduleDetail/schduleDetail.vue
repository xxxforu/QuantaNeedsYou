<script setup>
	import { getNotice } from '../api/api.js'
	import { getCurrentInstance } from 'vue'
	const instance = getCurrentInstance()
	if (!instance) {
		throw new Error('getCurrentInstance must be called within setup or lifecycle hook.')
	}
	const getStaticFilePath = instance.appContext.config.globalProperties.$getStaticFilePath
	var data = ref({})
	onLoad(option => {
		console.log(option.id)
		getNotice(option.id).then(res => {
			console.log(res)
			data.value = res
		})
	})



	function downLoad() {
		console.log(data.value.annex)
		uni.showLoading({ title: '正在下载' })
		// uni.downloadFile在安卓上有下载后后缀名为unknown的问题，所以要处理
		// 先通过处理拿到文件后缀名fileExtension
		var fileExtension = data.value.annex.substring(data.value.annex.lastIndexOf('.') + 1)
		uni.downloadFile({
			url: data.value.annex, //文件的下载路径
			// filePath: wx.env.USER_DATA_PATH + '/file.' + fileExtension, // 指定文件的下载路径和名字、后缀名，防止unknown
			success(res) {
				//保存到本地
				uni.saveFile({
					tempFilePath: res.tempFilePath, //文件的保存路径
					success: function(res) {
						const savedFilePath = res.savedFilePath
						// 打开文件
						uni.openDocument({
							showMenu: true,
							filePath: savedFilePath,
							success: function(res) {
								uni.hideLoading()
							},
							fail: function(err) {
								console.log(err)
							},
							complete: function(res) {
								uni.hideLoading()
							},
						})
					},
					fail: function(err) {
						console.log(err)
						uni.showToast({
							icon: 'none',
							duration: 3000,
							title: `${err.errMsg}`
						})
					}
				})
			},
			fail(err) {
				uni.showToast({
					icon: 'none',
					duration: 3000,
					title: `${err.errMsg}`
				})
			}
		})



	}
</script>

<template>
	<view class="container">
		<view class="banner">
			<image v-if="data.result == 2" :src="getStaticFilePath('scheduleDetailBanner.png')" mode="widthFix"
				style="width: 90vw;margin: 5vw;" />
			<image v-else :src="getStaticFilePath('miss.png')" mode="widthFix" style="width: 90vw;margin: 5vw;" />
		</view>
		<view class="content">
			{{data.content}}
		</view>
		<view class="link" v-if="data.annex">
			<image :src="getStaticFilePath('link.png')" mode="widthFix"></image>
			<text @tap="downLoad">{{data.title}}</text>
		</view>

	</view>

</template>

<style lang="scss" scoped>
	.content {
		margin: auto;
		background-color: #fff;
		border-radius: 15px;
		box-sizing: border-box;
		width: 90vw;
		padding: 20px 20px 50px;
		box-shadow: 0 3px 8px 0 rgba(50, 49, 49, 0.06);
	}

	.link image {
		width: 16px;
		vertical-align: middle;

	}

	.link {
		width: fit-content;
		margin: 10px 5vw 0;
	}

	.link text {
		font-weight: bold;
		font-size: 15px;
		color: #FFA265;
	}
</style>