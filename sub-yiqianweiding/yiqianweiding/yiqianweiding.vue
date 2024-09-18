<script setup>
	import { checkInList } from '../api/api.js'
	import { getCurrentInstance } from 'vue'
	const instance = getCurrentInstance()
	if (!instance) {
		throw new Error('getCurrentInstance must be called within setup or lifecycle hook.')
	}
	const getStaticFilePath = instance.appContext.config.globalProperties.$getStaticFilePath


	function goToDetail(e) {
		const { interviewid } = e.currentTarget.dataset
		uni.navigateTo({ url: '/sub-yiqianweiding/yiqianweiding-detail/yiqianweiding-detail?id=' + interviewid })
	}
	var dataList = ref()
	var noData = ref(false)
	onLoad(() => {
		checkInList().then(res => {
			console.log(res)
			dataList.value = res
			if (dataList.value.length == 0) noData.value = true
		}).catch(err => {
			if (err.data.code == 404)
				noData.value = true
		})
	})

	function showToast(msg) {
		uni.showToast({
			icon: 'none',
			duration: 3000,
			title: msg
		})
	}
</script>

<template>
	<view class="container">
		<view v-if="noData == false">
			<view class="dataBox" v-for="(item,i) in dataList" :key="interviewId">
				<text class="title">{{item.title}}</text>
				<!-- 开始时间 -->
				<view class="line">
					<image class="icon" :src="getStaticFilePath('startTime.png')" mode="widthFix"></image>
					<text>{{item.startTime}}</text>
				</view>
				<!-- 未开始 -->
				<view class="line" v-if="item.state == 0" :data-interviewId="item.interviewId" @tap="showToast('本次面试暂未开始！')">
					<image class="icon" :src="getStaticFilePath('noStart.png')" mode="widthFix"></image>
					<text>未开始</text>
					<image style="width: 20px;vertical-align: middle;float: right;" :src="getStaticFilePath('back.png')"
						mode="widthFix">
					</image>
				</view>
				<!-- 进行中 -->
				<view class="line" v-else-if="item.state == 1" :data-interviewId="item.interviewId" @tap="goToDetail">
					<image class="icon" :src="getStaticFilePath('endTime.png')" mode="widthFix"></image>
					<text>{{item.endTime}}</text>
					<image style="width: 20px;vertical-align: middle;float: right;" :src="getStaticFilePath('back.png')"
						mode="widthFix">
					</image>
				</view>
				<!-- 已结束 -->
				<view class="line" v-else-if="item.state == 2" :data-interviewId="item.interviewId"
					@tap="showToast('本次面试已结束！')">
					<image class="icon" :src="getStaticFilePath('hasEnd.png')" mode="widthFix"></image>
					<text>已结束</text>
					<image style="width: 20px;vertical-align: middle;float: right;" :src="getStaticFilePath('back.png')"
						mode="widthFix">
					</image>
				</view>
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
		padding: 5vw;
		overflow-y: scroll;
	}

	.icon {
		width: 17px;
		vertical-align: middle;
	}

	.title {
		font-weight: bold;
		font-size: 15px;
	}

	.line {
		margin: 15px 0;
		font-size: 13px;
	}

	.icon {
		margin-right: 10px;
	}

	.dataBox {
		width: 90vw;
		margin-bottom: 5vw;
		box-shadow: 0 3px 8px 0 rgba(50, 49, 49, 0.06);
		box-sizing: border-box;
		padding: 20px;
		background-color: #fff;
		border-radius: 15px;
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