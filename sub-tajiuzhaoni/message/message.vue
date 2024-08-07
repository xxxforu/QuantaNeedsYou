<script setup>
	import { getNoticeList } from '../api/api.js'
	var noticeList = ref()
	onLoad(() => {
		getNoticeList().then(res => {
			noticeList.value = res
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
		<view class="noticeLine" v-for="(item,i) in noticeList" :key="noticeId" :data-id="item.noticeId" @tap="goToDetail">
			<text>{{item.noticeName}}</text>
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
</style>