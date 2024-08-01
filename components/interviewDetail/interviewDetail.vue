<script>
	export default {
		name: 'interviewDetail',

		props: {
			detail: Object,
			date: String
		},
		methods: {
			deliverProfile() {
				this.$emit('deliverProfile', this.id)
			}
		},
		onLoad() {
			console.log(this.detail)
		}
	}
</script>

<template>
	<view class="outerBox">
		<view class="innerBox">
			<!-- 当日时间 -->
			<view class="line">
				<image style="width: 17px;vertical-align: middle;margin-right:10px;" src="../../static/image/startTime.png"
					mode="widthFix">
				</image>
				<text>{{date}}</text>
			</view>
			<!-- 未开始 -->
			<view class="line" v-if="detail.state == 0">
				<image style="width: 17px;vertical-align: middle;margin-right:10px;" src="../../static/image/noStart.png"
					mode="widthFix"></image>
				<text>未开始</text>
			</view>
			<!-- 进行中 -->
			<view class="line" v-else-if="detail.state == 1" :data-interviewId="detail.interviewId" @tap="goToDetail">
				<image style="width: 17px;vertical-align: middle;margin-right:10px;" src="../../static/image/endTime.png"
					mode="widthFix"></image>
				<text>进行中</text>
			</view>
			<!-- 已结束 -->
			<view class="line" v-else-if="detail.state == 2">
				<image style="width: 17px;vertical-align: middle;margin-right:10px;" src="../../static/image/hasEnd.png"
					mode="widthFix"></image>
				<text>已结束</text>
			</view>
			<view class="text">
				<text>开始时间：</text><span>{{detail.startTime}}</span>
			</view>
			<view class="text">
				<text>结束时间：</text><span>{{detail.endTime}}</span>
			</view>
		</view>
	</view>
</template>

<style lang="scss" scoped>
	.outerBox {
		width: 100vw;
	}

	.innerBox {
		padding: 20px;
		box-sizing: border-box;
		width: 85vw;
		margin: auto;
		box-shadow: 0 3px 8px 0 rgba(50, 49, 49, 0.06);
		background-color: #FFF;
		border-radius: 15px;
	}

	.line,
	.text>span {
		font-size: 14px;
	}

	.text>text {
		font-weight: bold;
		font-size: 15px;
	}

	.text,
	.line {
		margin: 15px 0;
	}
</style>