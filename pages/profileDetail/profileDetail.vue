<script setup>
	import { request } from '../../utils/request.js'
	var profileData = ref({
		department: 1001,
		email: '419976407@qq.com',
		faculty: '信息科学与技术学院',
		grade: '2025届',
		image: 'https://recruit-1306963863.cos.ap-guangzhou.myqcloud.com/img/4917ec13b7b6020d205610e14037d265.jpg',
		name: '张三',
		others: '热爱产品',
		phone: '17323716580',
		resumeId: 8,
		resumeName: '产品部 张三',
		sex: 0,
		skillsAdvantages: '熟悉axure',
		studentNum: 20211003333
	})

	// 选择部门相关
	var pickerIndex = ref(0)
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
	var bindPickerChange = function(e) {
		profileData.value.faculty = facultyList.value[e.detail.value]
		pickerIndex.value = e.detail.value
	}



	var sexs = ref([{
		text: '男',
		value: 0
	}, {
		text: '女',
		value: 1
	}])
	onLoad(option => {
		console.log(option)
		uni.setNavigationBarTitle({ title: option.name })
		if (option.resumeId) { //如果是现有的简历 则获取其数据
			request({ url: 'resume/' + option.resumeId }).then(res => {
				profileData.value = res.data
				console.log(profileData.value)
			})
		} else {
			profileData.value.name = uni.getStorageSync('userName')
			profileData.value.faculty = uni.getStorageSync('faculty')
			profileData.value.grade = uni.getStorageSync('grade')
			profileData.value.studentNum = uni.getStorageSync('studentNum')
		}
	})
</script>

<template>
	<view class="container">
		<h2>基本信息</h2>
		<view class="inputAndPhoto">
			<view class="photo">
				<image :src="profileData.image" mode="widthFix"></image>
			</view>
			<view class="input">
				<uni-forms ref="form1" :rules="customRules" :modelValue="profileData">
					<uni-forms-item label="姓名">
						<uni-easyinput v-model="profileData.name" placeholder="请输入姓名" />
					</uni-forms-item>
					<uni-forms-item label="性别">
						<uni-data-checkbox v-model="profileData.sex" :localdata="sexs" />
					</uni-forms-item>
					<uni-forms-item label="学号">
						<uni-easyinput v-model="profileData.studentNum" placeholder="请输入学号" />
					</uni-forms-item>

					<uni-forms-item label="自我介绍">
						<uni-easyinput type="textarea" v-model="profileData.introduction" placeholder="请输入自我介绍" />
					</uni-forms-item>
					<uni-forms-item class="inputBox" label="自我介绍">
						<picker class="inputBox" mode="selector" :value="pickerIndex" :range="facultyList"
							@change="bindPickerChange">
							<view>{{ facultyList[pickerIndex] }}</view>
						</picker>
					</uni-forms-item>
				</uni-forms>
			</view>
		</view>
		<view class="skill"></view>
		<view class="other"></view>
		<view class="saveInMyProfile"></view>
		<view class="button"></view>
	</view>
</template>

<style lang="scss" scoped>
	.container {
		display: flex;
		flex-direction: column;
	}

	h2 {
		font-weight: bold;
		font-size: 15px;
	}

	.photo image {
		width: 128px;
		border-radius: 15px;
	}

	.inputAndPhoto {
		display: flex;
	}

	.form-item {
		display: flex;
		align-items: center;
	}

	.button {
		display: flex;
		align-items: center;
		height: 35px;
		margin-left: 10px;
	}

	.inputBox {
		border: 1px #FFA265 solid;
		border-radius: 3px;
		width: 100%;
		flex: 1;
		position: relative;
		text-align: left;
		color: #333;
		font-size: 13px;
	}
</style>