<script setup>
	import { resume } from '../../api/profile.js'
	import { request } from '../../utils/request.js'
	var profileData = ref({})
	var from = ref() //值为数字1 2 3 分别代表进来本页面的父页面是“塔就招你”，“我的简历-修改”和“我的简历-创建”

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
	var fileList = ref({
		url: '',
		extname: 'png',
		name: 'avatur.png'
	})
	var sexs = ref([{
		text: '男',
		value: 0
	}, {
		text: '女',
		value: 1
	}])
	onLoad(option => {
		console.log(option)
		from.value = option.from
		uni.setNavigationBarTitle({ title: option.name })
		if (option.resumeId) { //如果是现有的简历 则获取其数据
			var resumeId = option.resumeId
			request({ url: 'resume/' + option.resumeId }).then(res => {
				profileData.value = res.data
				console.log(profileData.value)
			})
		} else {
			fileList.value.url = uni.getStorageSync('avatarUrl')
			profileData.value.name = uni.getStorageSync('userName')
			profileData.value.faculty = uni.getStorageSync('faculty')
			profileData.value.grade = uni.getStorageSync('grade')
			profileData.value.studentNum = uni.getStorageSync('studentNum')
		}
		if (option.department) {
			profileData.value.department = option.department
		}
	})

	// 是否保存到“我的简历”胶囊按钮改变事件
	function ifSave(event) {
		console.log(event.detail.value) // true/false
	}

	//上传头像
	var imageStyles = reactive({
		height: 171,
		width: 128,
		margin: 'auto',
		background: { color: '#f9e6da' },
		border: { radius: '15px' }
	})


	function selectok(e) {
		profileData.value.image = e.tempFiles[0].file
	}


	//按钮点击相关事件
	//校验
	function checkProfileData() {
		if (profileData.value.image && profileData.value.sex && profileData.value.phone && profileData.value.email &&
			profileData.value.skillsAdvantages && profileData.value.others)
			return true
		else return false
	}

	function resumeAndSubmit() {
		if (checkProfileData()) {
			console.log(resume)
			resume(resumeId, profileData.value).then(res => {
				console.log(res)
			})
		} else console.log(profileData.value)
	}
</script>

<template>
	<view class="container">
		<h2 id="title">基本信息</h2>
		<view class="inputAndPhoto">
			<view class="photo">
				<uni-file-picker ref="file" :value="fileList" class="upload" auto-upload="false" limit="1" :del-icon="false"
					disable-preview :imageStyles="imageStyles" file-mediatype="image" @select="selectok">选择照片</uni-file-picker>
				<!-- <image :src="profileData.image" mode="aspectFill"></image> -->
			</view>
			<view class="input">
				<uni-forms ref="form1" :rules="customRules" :modelValue="profileData">
					<uni-forms-item label="姓名">
						<uni-easyinput disabled v-model="profileData.name" placeholder="请输入姓名" />
					</uni-forms-item>
					<uni-forms-item label="性别">
						<uni-data-checkbox v-model="profileData.sex" :localdata="sexs" />
					</uni-forms-item>
					<uni-forms-item label="学号">
						<uni-easyinput disabled class="inputBox" v-model="profileData.studentNum" placeholder="请输入学号" />
					</uni-forms-item>
					<uni-forms-item class="inputBox" label="学院">
						<uni-easyinput disabled class="inputBox" v-model="profileData.faculty" />
						<!-- <picker disabled class="inputBox" mode="selector" :value="pickerIndex" :range="facultyList"
							@change="bindPickerChange">
							<view>{{ facultyList[pickerIndex] }}</view>
						</picker> -->
					</uni-forms-item>
					<uni-forms-item label="年级">
						<uni-easyinput disabled class="inputBox" v-model="profileData.grade" placeholder="请输入年级" />
					</uni-forms-item>
					<uni-forms-item label="电话">
						<uni-easyinput class="inputBox" v-model="profileData.phone" placeholder="请输入电话" />
					</uni-forms-item>
					<uni-forms-item label="邮箱">
						<uni-easyinput class="inputBox" v-model="profileData.email" placeholder="请输入邮箱" />
					</uni-forms-item>

				</uni-forms>
			</view>
		</view>
		<view class="skill">
			<p>技能/优势</p>
			<uni-forms-item>
				<uni-easyinput type="textarea" v-model="profileData.skillsAdvantages" placeholder="请输入自我介绍" />
			</uni-forms-item>
		</view>
		<view class="other">
			<p>其他</p>
			<uni-forms-item>
				<uni-easyinput type="textarea" v-model="profileData.others" />
			</uni-forms-item>
		</view>
		<view v-if="from==1" class="saveInMyProfile">
			<span>
				是否保存到“我的简历”
			</span>
			<switch @change="ifSave" color="#ffa265" />
		</view>
		<view class="button">
			<button v-if="from==1" class="myButton" @click="resumeAndSubmit">投递</button>
			<button v-if="from==2" class="myButton">完成修改</button>
			<button v-if="from==3" class="myButton">完成创建</button>
		</view>
	</view>
</template>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
	}

	.saveInMyProfile {
		padding: 0 30px;
	}

	.saveInMyProfile span {
		float: left;
	}

	.saveInMyProfile switch {
		float: right;
	}

	.uni-file-picker {
		display: flex !important;
		align-items: center;
		margin-left: 10px !important;
	}

	.file-picker__box-content {
		border: none !important;
		background-color: #f9e6da !important;
	}

	#title {
		font-weight: bold;
		font-size: 15px;
		padding-left: 10px;
		margin: 10px 0;
		color: $text-color;
	}

	.photo {
		display: flex;
	}

	.photo .upload {
		margin: auto;
		margin-left: 10px;
		height: 171px;
		width: 128px;
		border-radius: 15px;
	}

	.inputAndPhoto {
		display: flex;
	}

	.uni-forms-item__label {
		width: fit-content !important;
	}

	.uni-list-item {
		background-color: #f9f8f8 !important;
		padding: 0 10px;
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

	.uni-forms {
		padding: 0 15px;
	}

	.uni-forms-item {
		margin-bottom: 8px !important;
	}

	.other,
	.skill {
		padding: 0 30px;
	}

	.inputBox {
		border: 1px #FFA265 solid !important;
		border-radius: 3px;
		flex: 1;
		position: relative;
		text-align: left;
		color: #333;
		font-size: 13px;
		padding: 8px;
		background-color: #fff;
	}
</style>