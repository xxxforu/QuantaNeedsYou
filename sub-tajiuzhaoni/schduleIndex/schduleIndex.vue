<script setup>
	import { schedule } from '../api/api.js'
	import { getCurrentInstance } from 'vue'
	const instance = getCurrentInstance()
	if (!instance) {
		throw new Error('getCurrentInstance must be called within setup or lifecycle hook.')
	}
	const getStaticFilePath = instance.appContext.config.globalProperties.$getStaticFilePath
	var interviewRecordListDtos = ref()
	var lastIndex = ref()
	var departmentName = ref('')
	onLoad(option => {
		schedule({ department_id: option.id }).then(res => {
			// 拿到res后要给到interviewRecordListDtos
			console.log(res.departmentName)
			departmentName.value = res.departmentName
			interviewRecordListDtos.value = res.interviewRecordListDtos
			lastIndex.value = interviewRecordListDtos.value.length - 1
		})
	})
	var interviewRoundCN = ref(['0', '一面', '二面', '三面', '四面', '五面'])

	function goToDetail(e) {
		const { id } = e.currentTarget.dataset
		uni.navigateTo({ url: '/sub-tajiuzhaoni/schduleDetail/schduleDetail?id=' + id })
	}
</script>

<template>
	<view class="container">
		<view class="banner">
			<image :src="getStaticFilePath('scheduleBanner.png')" mode="widthFix" style="width: 90vw;margin: 5vw;"></image>
		</view>
		<view class="content">
			<text id="title">投递部门：{{departmentName}}</text>
			<text style="font-weight: bold;font-size: 15px;margin: 10px 0 5px;display: block;">当前进度</text>
			<!-- 投递简历轮，固定样式 -->
			<view id="zeroRound">
				<image class="roundIcon" :src="getStaticFilePath('pass.png')" mode="widthFix"></image>
				<text class="roundText">投递简历</text>
			</view>
			<!-- 面试轮 -->
			<view class="interviewRound" v-for="(item,i) in interviewRecordListDtos" :key="round">
				<image v-if="item.result == 2" class="roundIcon" :src="getStaticFilePath('pass.png')" mode="widthFix"></image>
				<image v-else-if="item.result == 1" class="roundIcon" :src="getStaticFilePath('unpass.png')" mode="widthFix">
				</image>
				<image v-else class="roundIcon" :src="getStaticFilePath('end.png')" mode="widthFix">
				</image>
				<image v-if="item.result == 2" class="line" :src="getStaticFilePath('solidLine.png')" mode="widthFix"></image>
				<image v-else class="line" :src="getStaticFilePath('dotLine.png')" mode="widthFix"></image>
				<text class="roundText">{{interviewRoundCN[item.round]}}</text>
				<text v-if='item.noticeId' @tap="goToDetail" :data-id="item.noticeId"
					style="color: #FFA265;font-weight: bold;font-size: 12px;margin:0 5px">（点击查看详情）</text>

			</view>
			<!-- 录取轮 -->
			<view class="interviewRound">
				<image v-if="interviewRecordListDtos[lastIndex].result == 2" class="roundIcon"
					:src="getStaticFilePath('pass.png')" mode="widthFix"></image>
				<image v-else class="roundIcon" :src="getStaticFilePath('end.png')" mode="widthFix">
				</image>
				<image v-if="interviewRecordListDtos[lastIndex].result == 2" class="line"
					:src="getStaticFilePath('solidLine.png')" mode="widthFix"></image>
				<image v-else class="line" :src="getStaticFilePath('dotLine.png')" mode="widthFix"></image>
				<text class="roundText">录取</text>
			</view>
		</view>

	</view>

</template>

<style lang="scss" scoped>
	#title {
		font-weight: bold;
		font-size: 20px;
		display: block;
	}

	.content {
		margin: auto;
		background-color: #fff;
		border-radius: 15px;
		box-sizing: border-box;
		width: 90vw;
		padding: 20px 20px 50px;
		box-shadow: 0 3px 8px 0 rgba(50, 49, 49, 0.06);
	}

	.roundText {
		font-size: 12px;
	}

	.roundIcon {
		width: 16px;
		vertical-align: middle;
		margin-right: 10px;
	}

	.line {
		width: 1px;
		position: absolute;
		left: 7px;
		top: -3px;
	}

	.interviewRound {
		margin-top: 3px;
		position: relative;
	}
</style>