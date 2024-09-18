<script setup>
	import { request } from '../../utils/request.js'
	import { onMounted, reactive } from 'vue'
	import { getCurrentInstance } from 'vue'
	const instance = getCurrentInstance()
	if (!instance) {
		throw new Error('getCurrentInstance must be called within setup or lifecycle hook.')
	}
	const getStaticFilePath = instance.appContext.config.globalProperties.$getStaticFilePath
	// 学院列表 
	var facultyList = ref([
		'信息科学与技术学院',
		'东方语言文化学院',
		'中国语言文化学院',
		'亚非语言文化学院',
		'会计学院',
		'商学院',
		'国际关系学院',
		'国际商务英语学院',
		'数学与统计学院',
		'新闻与传播学院',
		'日语语言文化学院',
		'法学院',
		'社会与公共管理学院',
		'经济贸易学院',
		'艺术学院',
		'英语教育学院',
		'英语语言文化学院',
		'西方语言文化学院',
		'金融学院',
		'高级翻译学院',
		'人工智能与电子竞技学院'
	])
	var pickerIndex = ref(0)
	var formData = ref({
		name: '',
		studentNum: '',
		faculty: facultyList.value[pickerIndex.value],
		openId: uni.getStorageSync('openId')
	})
	// 处理学院选择栏
	var bindPickerChange = function(e) {
		formData.value.faculty = facultyList.value[e.detail.value]
		console.log(facultyList.value[e.detail.value])
		pickerIndex.value = e.detail.value
	}
	// 处理提交按钮
	var type = ref('center')
	var messageText = ref('验证失败！请重试')
	const popup = ref(null)
	onMounted(() => {
		console.log(popup.value)
	})
	var submitForm = () => {
		request({ url: 'student/info', data: formData.value, method: 'POST' }).then(res => {
			console.log(res)
			if (res.code != 200) {
				popup.value.open(type)
			} else {
				uni.setStorage({
					data: formData.value.name,
					key: 'name'
				})
				uni.navigateTo({ url: '/pages/login/login' })
			}
		})
	}


	// 清除文本框内容部分
	var showClearIconName = ref(false)
	var showClearIconNum = ref(false)
	var showClearIconFaulty = ref(false)
	// 清除name
	var clearInputName = function(e) {
		if (formData.value.name.length > 0) {
			showClearIconName.value = true
		} else {
			showClearIconName.value = false
		}
	}
	var clearIconName = function() {
		formData.value.name = ''
		showClearIconName.value = false
	}
	// 清除num
	var clearInputNum = function(e) {
		if (formData.value.studentNum.length > 0) {
			showClearIconNum.value = true
		} else {
			showClearIconNum.value = false
		}
	}
	var clearIconNum = function() {
		formData.value.studentNum = ''
		showClearIconNum.value = false
	}
	// 清除faculty
	var clearInputFaulty = function(e) {
		if (formData.value.faculty.length > 0) {
			showClearIconFaulty.value = true
		} else {
			showClearIconFaulty.value = false
		}
	}
	var clearIconFaulty = function() {
		formData.value.faculty = ''
		showClearIconFaulty.value = false
	}
</script>

<template>
	<form id="infoForm">
		<text id="title">验证</text>
		<view class="formItem">
			<img :src="getStaticFilePath('name.png')" alt="icon" class="icon" />
			<input class="inputBox" type="text" placeholder="姓名" v-model="formData.name" confirm-type="done"
				@input="clearInputName" />
			<uni-icons type="close" class="clearIcon" v-if="showClearIconName" @click="clearIconName" size="20"></uni-icons>
		</view>
		<view class="formItem">
			<img :src="getStaticFilePath('stuNum.png')" alt="icon" class="icon" />
			<input class="inputBox" type="text" placeholder="学号" v-model="formData.studentNum" confirm-type="done"
				@input="clearInputNum" />
			<uni-icons type="close" class="clearIcon" v-if="showClearIconNum" @click="clearIconNum" size="20"></uni-icons>
		</view>
		<view class="formItem">
			<img :src="getStaticFilePath('college.png')" alt="icon" class="icon" />
			<picker class="inputBox" mode="selector" :value="pickerIndex" :range="facultyList" @change="bindPickerChange">
				<view>{{ facultyList[pickerIndex] }}</view>
			</picker>
		</view>

		<button id="submit" @click="submitForm">确认</button>
	</form>
	<uni-popup ref="popup" background-color="#fff">
		<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">
			<text class="popupTitle">提示</text>
			<text>{{messageText}}</text>
		</view>
	</uni-popup>
</template>

<style lang="scss">
	#infoForm {
		width: 100vw;
		position: absolute;
		top: 50%;
		left: 0;
		transform: translate(0, -75%);
		margin: auto;
	}

	#title {
		display: inline-block;
		font-weight: bold;
		font-size: 16px;
		color: $button-color;
		text-align: center;
		margin: auto;
		width: 100%;
	}

	.popupTitle {
		font-weight: bold;
		font-size: 16px;
		color: $button-color;
		margin-bottom: 20px;
	}

	.icon {
		position: absolute;
		left: 10px;
		top: 50%;
		transform: translate(0, -50%);
		width: 20px;
		height: 20px;
	}

	.clearIcon {
		position: absolute;
		right: 10px;
		top: 50%;
		transform: translate(0, -50%);
	}

	.inputBox {
		height: 50px;
		padding: 0 40px;
		box-sizing: border-box;
		background-color: $tabBar-color;
		border-radius: 20px;
		color: $text-color;
	}

	.formItem {
		position: relative;
		width: 85vw;
		margin: 20px auto;
	}

	picker view {
		line-height: 50px;
	}

	#submit {
		width: 125px;
		height: 50px;
		background-color: $button-color;
		color: #fff;
		border-radius: 10px;
		margin: 20px auto;
	}

	.popup-content {
		color: $text-color ;
		border: 2px $button-color solid;
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 45px 65px;
		background-color: #fff;
	}

	.uni-popup .uni-popup__wrapper {
		background-color: transparent !important;
	}

	.text {
		font-size: 12px;
		color: #333;
	}
</style>