<script setup>
	import { checkInList } from '../api/api.js'
	import { getCurrentInstance } from 'vue'
	const instance = getCurrentInstance()
	if (!instance) {
		throw new Error('getCurrentInstance must be called within setup or lifecycle hook.')
	}
	const getStaticFilePath = instance.appContext.config.globalProperties.$getStaticFilePath
	// var dataList = ref([{
	// 		'title': '2023年Quanta一面',
	// 		'interviewId': 0,
	// 		'startTime': '2023-02-01 02:06:07',
	// 		'endTime': '2024-05-31 20:00:00',
	// 		'state': 1
	// 	},
	// 	{
	// 		'title': '2024年研发部安卓方向二面',
	// 		'interviewId': 53,
	// 		'startTime': '2024-06-16 05:00:01',
	// 		'endTime': '2024-06-20 20:00:00',
	// 		'state': 2
	// 	},
	// 	{
	// 		'title': '2024年产品部二面',
	// 		'interviewId': 62,
	// 		'startTime': '2024-06-17 20:00:00',
	// 		'endTime': '2024-06-23 20:00:00',
	// 		'state': 2
	// 	},
	// 	{
	// 		'title': '2024年设计部二面',
	// 		'interviewId': 63,
	// 		'startTime': '2024-06-17 20:00:00',
	// 		'endTime': '2024-06-24 20:00:00',
	// 		'state': 2
	// 	},
	// 	{
	// 		'title': '2024年研发部后端方向二面',
	// 		'interviewId': 65,
	// 		'startTime': '2024-06-17 20:00:00',
	// 		'endTime': '2024-06-25 20:00:00',
	// 		'state': 2
	// 	},
	// 	{
	// 		'title': '2024年研发部前端方向二面',
	// 		'interviewId': 66,
	// 		'startTime': '2024-07-08 06:28:21',
	// 		'endTime': '2024-07-13 20:00:00',
	// 		'state': 0
	// 	}
	// ])

	function goToDetail(e) {
		const { interviewid } = e.currentTarget.dataset
		uni.navigateTo({ url: '/sub-yiqianweiding/yiqianweiding-detail/yiqianweiding-detail?id=' + interviewid })
	}
	var dataList = ref()
	onLoad(() => {
		checkInList().then(res => {
			dataList.value = res
		})
	})
</script>

<template>
	<view class="container">
		<view class="dataBox" v-for="(item,i) in dataList" :key="interviewId">
			<text class="title">{{item.title}}</text>
			<!-- 开始时间 -->
			<view class="line">
				<image class="icon" :src="getStaticFilePath('startTime.png')" mode="widthFix"></image>
				<text>{{item.startTime}}</text>
			</view>
			<!-- 未开始 -->
			<view class="line" v-if="item.state == 0" :data-interviewId="item.interviewId" @tap="goToDetail">
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
			<view class="line" v-else-if="item.state == 2" :data-interviewId="item.interviewId" @tap="goToDetail">
				<image class="icon" :src="getStaticFilePath('hasEnd.png')" mode="widthFix"></image>
				<text>已结束</text>
				<image style="width: 20px;vertical-align: middle;float: right;" :src="getStaticFilePath('back.png')"
					mode="widthFix">
				</image>
			</view>
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
</style>