<script setup>
	import { request } from '../../utils/request.js'
	import { department, getResumeList } from '../api/api.js'
	import { getCurrentInstance } from 'vue'
	const instance = getCurrentInstance()
	if (!instance) {
		throw new Error('getCurrentInstance must be called within setup or lifecycle hook.')
	}
	const getStaticFilePath = instance.appContext.config.globalProperties.$getStaticFilePath
	var isNotDeliver = ref(true)
	var type = ref('center')
	var messageText = ref('')
	var openProfile = ref(null)
	var profileListEmpty = ref(null)
	var departmentEmpty = ref(false)
	var deliveryEmpty = ref(true)

	function messageToggle(type, text) {
		msgType.value = type
		messageText.value = text
		message.value.open()
	}
	var departmentList = ref([])
	var profileList = ref([])

	function getDepartment(isRefresh, hasSubmitted) {
		isNotDeliver.value = !hasSubmitted
		department({ hasSubmitted: hasSubmitted }).then(res => {
			// 未投递的列表
			if (!hasSubmitted && res.length === 0) {
				departmentEmpty.value = true
			}
			// 已投递的列表
			if (hasSubmitted && res.length) {
				deliveryEmpty.value = false
			}
			departmentList.value = res
			if (isRefresh) uni.stopPullDownRefresh()
		}).catch(error => {
			if (error.data.code == 402) { //投递已结束
				departmentEmpty.value = true
			}
		})
	}

	// 下拉刷新函数
	onPullDownRefresh(() => {
		getDepartment(true, !isNotDeliver.value)
	})
	onShow(() => {
		getDepartment(false, false)
	})
	onLoad(() => {
		uni.setStorage({
			key: 'haveEnterTajiuzhaoni',
			data: true
		})
		getProfileList()
	})
	onReady(() => {
		//.box获取class为box的元素，如果使用的id= 'box' 则使用'#box'
		var tabBarHeight = ref(0)
		uni.createSelectorQuery().select('.tabBar').boundingClientRect(data => {
			tabBarHeight.value = data.height
		}).exec()
	})


	// 选择简历
	var chooseDepartmentId = 0

	function getProfileList() {
		getResumeList().then(res => {
			profileList.value = res
		})
	}


	function deliverProfile(id) {
		getProfileList()
		chooseDepartmentId = id
		if (profileList.value.length != 0) {
			openProfile.value.open('center')
		} else {
			profileListEmpty.value.open('center')
		}
	}
	var inputDialog = ref(null)

	function newProfileDecideName() {
		inputDialog.value.open()
	}

	const inputClose = ref(null)

	function dialogInputConfirm(val) {
		if (val == '') {
			uni.showToast({
				title: '请命名简历！',
				icon: 'error'
			})
			return
		}
		inputClose.value.val = ''
		openProfile.value.close()
		uni.navigateTo({
			url: '/sub-wodejianli/profileDetail/profileDetail?name=' + val + '&from=1' + '&departmentId=' +
				chooseDepartmentId
		})

		inputDialog.value.close()
	}

	function chooseProfile(name, id) {
		// 跳转简历详情页
		console.log(name)
		openProfile.value.close()
		uni.navigateTo({
			url: '/sub-wodejianli/profileDetail/profileDetail?name=' + name + '&departmentId=' +
				chooseDepartmentId + '&resumeId=' + id + '&from=1'
		})
	}

	function goTOSchduleIndex(id) {
		uni.navigateTo({ url: '/sub-tajiuzhaoni/schduleIndex/schduleIndex?id=' + id })
	}
</script>

<template>
	<view class="container">
		<view class="tabBar">
			<text class="tab" :class="{active:isNotDeliver==true}" @click="getDepartment(true,false)">未投递</text>
			<text class="tab" :class="{active:isNotDeliver==false}" @click="getDepartment(true,true)">投递进度</text>
		</view>
		<view class="content">
			<view v-show="isNotDeliver" class="tabcontent notDeliver">
				<text v-if="departmentEmpty" class="empty">本年投递已结束~明年再来吧~</text>
				<view v-if="!departmentEmpty" class="departmentList" style="padding-top: 20px;">
					<view v-for="item in departmentList" :key="item.departmentId">
						<departmentLine :title="item.name" :id="item.departmentId" @deliverProfile="deliverProfile">
						</departmentLine>
					</view>
				</view>
			</view>
			<view v-show="!isNotDeliver" class="tabcontent progress">
				<text v-if="deliveryEmpty" class="empty">这里什么都没有~快去投递简历吧</text>
				<view v-if="!deliveryEmpty" class="departmentList" style="padding-top: 20px;">
					<view v-for="item in departmentList" :key="item.departmentId">
						<departmentLine :title="item.name" :id="item.departmentId" @deliverProfile="goTOSchduleIndex">
						</departmentLine>
					</view>
				</view>
			</view>
		</view>

	</view>
	<!-- 选择简历弹窗 -->
	<uni-popup ref="openProfile" background-color="#fff">
		<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">

			<text id="title">选择简历</text>
			<view style="width: 100%;max-height: 40vh;overflow-y: scroll;margin-top: 10px;">
				<view style="width: 100%;" v-for="item in profileList" :key="item.resumeId">
					<profileLine :name="item.resumeName" :id="item.resumeId" @chooseProfile="chooseProfile">
					</profileLine>
				</view>
			</view>

			<text class="newProfile" @click="newProfileDecideName">新建</text>
		</view>
	</uni-popup>

	<!-- 暂无简历弹窗profileListEmpty -->
	<uni-popup ref="profileListEmpty" background-color="#fff">
		<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">
			<text id="title">选择简历</text>
			<image :src="getStaticFilePath('bin.png')" style="width: 58px; margin: 10px 0;" mode="widthFix"></image>
			<text style="font-size: 15px; margin: 10px 0;">这里空空如也~</text>
			<button class="myButton" @click="newProfileDecideName">去新建</button>
		</view>
	</uni-popup>

	<!-- 新建简历命名框 -->
	<uni-popup ref="inputDialog" type="dialog">
		<uni-popup-dialog ref="inputClose" mode="input" title="简历命名" placeholder="请输入内容"
			@confirm="dialogInputConfirm"></uni-popup-dialog>
	</uni-popup>
</template>


<style lang="scss" scoped>
	.container {
		height: 100vh;
		overflow-y: hidden;
	}

	.tabBar {
		width: 100vw;
		display: flex;
	}

	.tab {
		flex: 1;
		text-align: center;
		padding: 10px 0;
		font-weight: bold;
		color: $button-color;
		font-size: 15px;
		box-shadow: 0 3px 8px 0 rgba(50, 49, 49, 0.06);
	}

	.active {
		color: $text-color !important;
		background-color: #fadecd !important;
	}

	.content {
		height: 100%;
	}

	.tabcontent {
		background-color: $background-color;
		height: 100%;
	}

	.empty {
		font-size: 15px;
		display: inline-block;
		line-height: 85vh;
		width: 100%;
		text-align: center;
	}

	.uni-popup .uni-popup__wrapper {
		background-color: transparent !important;
	}

	.popup-content {
		color: $text-color;
		background-color: #fff;
		padding: 20px 0;
		width: 80vw;
		border-radius: 10px;
		border: 1px $button-color solid;
		box-shadow: 0 3px 8px 0 rgba(50, 49, 49, 0.06);
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	#title {
		font-weight: bold;
	}

	.newProfile {
		color: $button-color;
		position: absolute;
		right: 10%;
		top: 20px;
		text-decoration: underline;
	}
</style>