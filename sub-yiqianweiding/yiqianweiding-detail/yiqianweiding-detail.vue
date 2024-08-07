<script setup>
	import { checkInDetail, scanCode, deque, giveUp } from '../api/api.js'
	var detail = ref()
	var checkIn = ref('false')
	//获取当前日期函数
	function getNowFormatDate() {
		let date = new Date(),
			year = date.getFullYear(), //获取完整的年份(4位)
			month = date.getMonth() + 1, //获取当前月份(0-11,0代表1月)
			strDate = date.getDate() // 获取当前日(1-31)
		if (month < 10) month = `0${month}` // 如果月份是个位数，在前面补0
		if (strDate < 10) strDate = `0${strDate}` // 如果日是个位数，在前面补0

		return `${year}-${month}-${strDate}`
	}
	var date = ref()
	var id = 0
	onLoad(options => {
		date.value = getNowFormatDate()
		id = options.id
		uni.getStorageInfo({
			success: function(res) {
				// 判断缓存是否存在
				if (res.keys.includes('checkIn' + id)) {
					checkIn.value = 'true'
				} else {
					console.log('缓存不存在')
				}
			}
		})
		console.log(checkIn.value)
		checkInDetail(options.id).then(res => {
			console.log(res)
			detail.value = res
		})
	})

	var result = ''
	var checkList = ref()
	// var checkList = ref([{
	// 	currentNumber: null,
	// 	currentType: 3,
	// 	departmentId: 1004,
	// 	departmentName: '研发部安卓方向',
	// 	estimatedTime: 0,
	// 	location: '南F211',
	// 	mineNumber: 1,
	// 	waitingNumber: 0
	// }, {
	// 	currentNumber: null,
	// 	currentType: 2,
	// 	departmentId: 1004,
	// 	departmentName: '研发部安卓方向',
	// 	estimatedTime: 0,
	// 	location: '南F211',
	// 	mineNumber: 1,
	// 	waitingNumber: 0
	// }, {
	// 	currentNumber: null,
	// 	currentType: 1,
	// 	departmentId: 1004,
	// 	departmentName: '研发部安卓方向',
	// 	estimatedTime: 0,
	// 	location: '南F211',
	// 	mineNumber: 1,
	// 	waitingNumber: 0
	// }, {
	// 	currentNumber: null,
	// 	currentType: 0,
	// 	departmentId: 1004,
	// 	departmentName: '研发部安卓方向',
	// 	estimatedTime: 0,
	// 	location: '南F211',
	// 	mineNumber: 1,
	// 	waitingNumber: 0
	// }])
	var yourTurn = ref(null)
	// 轮询
	function getDeque() {
		uni.request({
			url: 'https://zx.quantacenter.com/recruitment_reception/check-in/deque?interview_id=' + id,
			header: {
				'content-type': 'application/json',
				'Authorization': uni.getStorageSync('token')
			}
		}).then(res => {
			checkList.value = res.data.data
			console.log(res.data.data)
			for (let i = 0; i < checkList.value; i++) { //如果存在'进行中'的数据 就弹出提示
				if (checkList.value[i].currentType == 2) {
					yourTurn.value.open()
				}
			}
			setTimeout(() => getDeque(), 5000)
		})

	}


	function getScanCode() {
		uni.setStorage({
			data: true,
			key: 'checkIn' + id
		})
		checkIn.value = true
		getDeque()
		//跳过扫码过程先
		uni.scanCode({
			success(res) { //扫描成功
				console.log(res)
				result = res.result
				scanCode({ code: result }).then(res => { //扫码签到
					uni.setStorageSync({
						data: true,
						key: 'checkIn' + id
					})
					checkIn.value = 'true'
					getDeque()
				})
			}
		})
	}

	// 放弃排队
	function handleGiveUp(e) {
		console.log(e.currentTarget.dataset.dpmid)
		giveUp({
			interview_id: id,
			department_id: e.currentTarget.dataset.dpmid
		}).then(res => {
			console.log(res)
		})
	}
</script>

<template>
	<uni-popup ref="yourTurn" type="dialog">
		<uni-popup-dialog type="info" :showClose='false' confirmText="好的" content="轮到你啦~请到指定教室里面试" @confirm="dialogConfirm"
			@close="dialogClose"></uni-popup-dialog>
	</uni-popup>
	<view class="container">
		<text class="title">{{detail.title}}</text>
		<interviewDetail :detail="detail" :date='date'></interviewDetail>
		<!-- disabled="{{detail.state != 1}}" -->
		<view disabled="{{detail.state != 1}}" v-if="checkIn == 'false'"><button @tap="getScanCode"
				class="myButton">扫码签到</button></view>

		<view v-else class="checkList">
			<view class="checkItem" v-for="(item,i) in checkList">
				<view class="content">
					<view class="left">
						<text class="dpmName">{{item.departmentName}}</text>
						<text class="mineNumber">{{item.mineNumber}}</text>
					</view>
					<view class="right">
						<view>
							<text class="currentType topic">当前状态：</text>

							<text style="color: #FFA265;font-weight: bold;">
								{{item.currentType == 0 ?'已过号':''}}
								{{item.currentType == 1 ?'等待中':''}}
								{{item.currentType == 2 ?'进行中':''}}
								{{item.currentType == 3 ?'已结束':''}}
							</text>

						</view>
						<view>
							<text class="waitingNum topic">前方等待：</text>{{item.waitingNumber}}
						</view>
						<view>
							<text class="currentNumber topic">当前面试：</text>{{item.currentNumber}}
						</view>
						<view>
							<text class="estimatedTime topic">预计时间：</text>{{item.estimatedTime}}
						</view>
						<view>
							<text class="location topic">面试地点：</text>{{item.location}}
						</view>
					</view>
				</view>
				<button v-if="item.currentType == 0" @tap="getScanCode" class="myButton">重新签到</button>
				<button v-else-if="item.currentType == 3" disabled class="myButton">已结束</button>
				<button v-else-if="item.currentType == 2" disabled class="myButton">进行中</button>
				<button v-else-if="item.currentType == 1" @tap="handleGiveUp" class="myButton"
					:data-dpmId="item.departmentId">放弃</button>
			</view>
		</view>
	</view>

</template>

<style lang="scss" scoped>
	.container {
		padding-top: 30px;
		overflow-y: scroll;
	}

	.checkItem {
		margin: 20px auto;
		background-color: #fff;
		border-radius: 15px;
		width: 85vw;
		box-sizing: border-box;
		padding: 15px;
		box-shadow: 0 3px 8px 0 rgba(50, 49, 49, 0.06);
	}

	.right view {
		font-size: 14px;
		margin: 3px 0;
	}

	.topic {
		font-weight: bold;
	}

	.content {
		display: flex;
		margin: auto;
	}

	.dpmName {
		font-weight: bold;
		font-size: 20px;
	}

	.mineNumber {
		font-weight: bold;
		font-size: 35px;
		color: #FFA265;
	}

	.left,
	.right {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.title {
		font-size: 20px;
		font-weight: bold;
		justify-content: center;
		display: flex;
		justify-content: center;
		margin-bottom: 30px;
	}

	.myButton {
		width: fit-content;
		margin: 15px auto;
		padding: 5px 35px !important;
	}
</style>