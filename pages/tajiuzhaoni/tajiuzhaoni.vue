<script setup>
	import { request } from '../../utils/request.js'
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

	// 获取未投递列表请求
	var departmentList = ref([{
			'departmentId': 1001,
			'name': '产品部'
		},
		{
			'departmentId': 1002,
			'name': '设计部'
		},
		{
			'departmentId': 1003,
			'name': '研发部前端方向'
		},
		{
			'departmentId': 1004,
			'name': '研发部安卓方向'
		},
		{
			'departmentId': 1005,
			'name': '研发部后端方向'
		}
	])
	var profileList = ref([])

	function getDepartment(isRefresh) {
		request({ url: 'department' }).then(res => {
			console.log(res)
			if (res.code != 200) {
				departmentEmpty.value = true
			} else {
				departmentList.value = res.data
			}
			if (isRefresh) uni.stopPullDownRefresh()
		})
	}

	// 下拉刷新函数
	onPullDownRefresh(() => {
		getDepartment(true)
	})
	onLoad(() => {
		getDepartment()
		uni.setStorage({
			key: 'haveEnterTajiuzhaoni',
			data: false
		})
	})
	onReady(() => {
		//.box获取class为box的元素，如果使用的id= 'box' 则使用'#box'
		var tabBarHeight = ref(0)
		uni.createSelectorQuery().select('.tabBar').boundingClientRect(data => {
			console.log(data)
			tabBarHeight.value = data.height
		}).exec()
	})


	// 选择简历
	var chooseDepartmentId = 0

	function deliverProfile(id) {
		chooseDepartmentId = id
		request({ url: 'resume' }).then(res => {
			if (res.code == 200) {
				profileList.value = res.data
				openProfile.value.open('center')
			} else {
				profileListEmpty.value.open('center')
			}
		})
	}
	var newProfileName = ref('名字')

	function chooseProfile(id) {
		// 跳转简历详情页
		console.log(id)
		uni.navigateTo({
 url: '/pages/profileDetail/profileDetail?name=' + newProfileName.value + '&departmentId=' +
				chooseDepartmentId 
})
	}
</script>

<template>
	<view class="container">
		<view class="tabBar">
			<text class="tab" :class="{active:isNotDeliver==true}" @click="isNotDeliver = true">未投递</text>
			<text class="tab" :class="{active:isNotDeliver==false}" @click="isNotDeliver = false">投递进度</text>
		</view>
		<view class="content">
			<view v-show="isNotDeliver" class="tabcontent notDeliver">
				<text v-if="!departmentEmpty" class="empty">本年投递已结束~明年再来吧~</text>
				<view v-if="departmentEmpty" class="departmentList">
					<view v-for="item in departmentList" :key="item.departmentId">
						<departmentLine :title="item.name" :id="item.departmentId" @deliverProfile="deliverProfile">
						</departmentLine>
					</view>

				</view>
			</view>
			<view v-show="!isNotDeliver" class="tabcontent progress">
				<text v-if="deliveryEmpty" class="empty">这里什么都没有~快去投递简历吧</text>
			</view>
		</view>

	</view>
	<!-- 选择简历弹窗 -->
	<uni-popup ref="openProfile" background-color="#fff">
		<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">

			<text id="title">选择简历</text>
			<view style="width: 100%;" v-for="item in profileList" :key="item.resumeId">
				<profileLine :name="item.resumeName" :id="item.resumeId" @chooseProfile="chooseProfile">
				</profileLine>
			</view>
			<text id="newProfile">新建</text>
		</view>
	</uni-popup>
	<!-- 暂无简历弹窗profileListEmpty -->
	<uni-popup ref="profileListEmpty" background-color="#fff">
		<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">

			<text id="title">选择简历</text>

			<text id="newProfile">新建</text>
		</view>
	</uni-popup>
</template>

<style lang="scss" scoped>
	.container {
		height: 100vh;
		overflow-y: hidden;
		color: $text-color;
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

	#newProfile {
		position: absolute;
		right: 10%;
		top: 20px;
		text-decoration: underline;
	}
</style>