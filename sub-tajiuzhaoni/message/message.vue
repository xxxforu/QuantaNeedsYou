<script setup>
	import { getNoticeList } from '../api/api.js'
	import { getCurrentInstance } from 'vue'
	const instance = getCurrentInstance()
	if (!instance) {
		throw new Error('getCurrentInstance must be called within setup or lifecycle hook.')
	}
	const getStaticFilePath = instance.appContext.config.globalProperties.$getStaticFilePath
	var noticeList = ref()
	var noData = ref(false)
	onLoad(() => {
		getNoticeList().then(res => {
			console.log(res)
			if (res.length) noticeList.value = res
			else {
				noData.value = true
			}
		})
	})

	function goToDetail(e) {
		const { id } = e.currentTarget.dataset
		console.log(e.currentTarget.dataset)
		uni.navigateTo({ url: '/sub-tajiuzhaoni/schduleDetail/schduleDetail?id=' + id })
	}
</script>

<template>
	<view class="container">
		<view v-if="noData == false">
			<view class="noticeLine" v-for="(item,i) in noticeList" :key="noticeId" :data-id="item.noticeId"
				@tap="goToDetail">
				<text>{{item.noticeName}}</text>
			</view>
		</view>

		<view v-else class="emptyBox">
			<image :src="getStaticFilePath('bin.png')" style="width: 35vw;" mode="widthFix"></image>
			<text>空空如也~</text>
		</view>
	</view>
</template>

<style lang="scss" scoped>
	.container {
		padding-top: 20px;
	}

	.noticeLine {
		background-color: #FFF;
		width: 85vw;
		margin: 0 auto 20px;
		padding: 20px;
		box-sizing: border-box;
		border-radius: 10px;
		box-shadow: 0 3px 8px 0 rgba(50, 49, 49, 0.06);
		font-size: 15px;
	}

	.emptyBox {
		display: flex;
		width: 100%;
		flex-direction: column;
		height: 100%;
		justify-content: center;
		align-items: center;
	}
</style>