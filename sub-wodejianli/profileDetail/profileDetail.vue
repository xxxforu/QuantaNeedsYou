<script setup>
import { getResumeDetail, postResume, putResume, submit } from '../api/api.js'
var profileData = ref({})
var from = ref() //值为数字1 2 3 分别代表进来本页面的父页面是“塔就招你”，“我的简历-修改”和“我的简历-创建”
var resumeId = ref()
let message = ref(null)
let type = ref('success')
let msg = ref('修改成功！')
// 选择部门相关
var pickerIndex = ref(0)
let isLoading = false
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
var currentDpm = 0
onLoad(option => {
	from.value = option.from
	uni.setNavigationBarTitle({ title: option.name })
	profileData.value.resumeName = option.name
	if (option.resumeId) { //如果是现有的简历 则获取其数据
		resumeId.value = option.resumeId
		getResumeDetail(option.resumeId).then(res => {
			profileData.value = res
			if (profileData.value.others.includes('Undefined')) {
				profileData.value.others = ''
			}
			// 必须要按照此格式才可以回显头像！
			profileData.value.getBackImage = [{
				'name': '用户头像',
				'extname': 'image',
				'url': profileData.value.image
			}]
		})

	} else {
		fileList.value.url = uni.getStorageSync('avatarUrl')

	}
	profileData.value.name = uni.getStorageSync('userName')
	profileData.value.faculty = uni.getStorageSync('faculty')
	profileData.value.grade = uni.getStorageSync('grade')
	profileData.value.studentNum = uni.getStorageSync('studentNum')
	if (option.departmentId) {
		profileData.value.department = option.departmentId
		currentDpm = option.departmentId
	}

})

// 是否保存到“我的简历”胶囊按钮改变事件
var save = 0

function ifSave(event) {
	console.log(event.detail.value) // true/false
	save = event.detail.value ? 1 : 0
}

//上传头像
var imageStyles = reactive({
	height: 171,
	width: 128,
	margin: 'auto',
	background: { color: '#f9e6da' },
	border: { radius: '15px' }
})

var hasChoose = false

function selectok(e) {
	console.log(e)
	profileData.value.image = e.tempFilePaths[0]
	// profileData.value.image = e.tempFiles[0].file
	console.log(profileData.value.image)
	hasChoose = true
}


//按钮点击相关事件
//校验信息是否填写完整
function checkProfileData() {
	if (!profileData.value.image || profileData.value.image.length == 0) return false
	if (!('sex' in profileData.value)) return false
	if (!profileData.value.phone || profileData.value.phone.length == 0) return false
	if (!profileData.value.email || profileData.value.email.length == 0) return false
	if (!profileData.value.skillsAdvantages || profileData.value.skillsAdvantages.length == 0) return false
	// if (!profileData.value.others || profileData.value.others.length == 0) return false //others非必须
	return true
}
//校验手机号码和邮箱
function regCheck() {
	var phoneReg = /^1[3456789]\d{9}$/
	var emailReg = /^([a-zA-Z0-9_]-*\.*)+@([a-zA-Z0-9_]-?)+(\.[a-zA-Z]{2,3}){1,2}$/

	if (phoneReg.test(profileData.value.phone) && emailReg.test(profileData.value.email)) {
		return '合法'
	} else if (!phoneReg.test(profileData.value.phone)) {
		return '手机号格式错误！'
	} else if (!emailReg.test(profileData.value.email)) {
		return '验邮箱格式错误！'
	}

}

//提交简历
function handleSubmit() {
	submit({
		resumeId: resumeId.value - 0,
		departmentId: currentDpm - 0
	}).then(res => {
		msg.value = '提交成功！'
		message.value.open()
		setTimeout(() => {
			uni.navigateBack()
		}, 2000)
	})
}
// 修改简历
function changeResume() {
	if (isLoading) return Promise.reject('isLoading')
	if (!checkProfileData()) {
		uni.showToast({
			title: '请完整填写简历！',
			icon: 'error'
		})
		return Promise.reject('Incomplete profile data')
	}
	let checkMsg = regCheck()
	if (checkMsg !== '合法') {
		uni.showToast({
			title: checkMsg,
			icon: 'error'
		})
		return Promise.reject(checkMsg)
	}
	return new Promise((resolve, reject) => {
		isLoading = true
		uni.uploadFile({
			url: 'https://qtzx.xdj666.top/quanta/recruitment_reception/resume/' + resumeId.value,
			filePath: profileData.value.image,
			name: 'image',
			formData: {
				'sex': profileData.value.sex,
				'department_id': currentDpm,
				'email': profileData.value.email,
				'phone': profileData.value.phone,
				'skill_advantages': profileData.value.skillsAdvantages,
				'others': profileData.value.others || ''
			},
			method: 'POST',
			header: { 'Authorization': uni.getStorageSync('token') },
			success(res) {
				resolve(res)
				isLoading = false
			},
			fail(err) {
				isLoading = false
				console.log(err)
				reject(err)
			}
		})
	})
}

// 新建简历
function newResume() {
	if (!checkProfileData()) {
		uni.showToast({
			title: '请完整填写简历！',
			icon: 'error'
		})
		return Promise.reject('Incomplete profile data')
	}
	let checkMsg = regCheck()
	if (checkMsg !== '合法') {
		uni.showToast({
			title: checkMsg,
			icon: 'error'
		})
		return Promise.reject(checkMsg)
	}
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: 'https://qtzx.xdj666.top/quanta/recruitment_reception/resume',
			filePath: profileData.value.image,
			name: 'image',
			formData: {
				'sex': profileData.value.sex,
				'department_id': currentDpm,
				'email': profileData.value.email,
				'skill_advantages': profileData.value.skillsAdvantages,
				'others': profileData.value.others || '',
				'phone': profileData.value.phone,
				'name': profileData.value.resumeName,
				'save': save,
			},
			method: 'POST',
			header: { 'Authorization': uni.getStorageSync('token') },
			success(result) {
				console.log(currentDpm)
				console.log(result)
				let res = JSON.parse(result.data).data

				if (res) {
					resolve(res.resumeId)
				}
			},
			fail(err) {
				console.log(err)
				reject(err)
			}
		})
	})
}

var alertDialog = ref(null)
var msgType = 'info'
// 提交简历
function submitResume(resumeID, department) {
	if (!checkProfileData()) {
		uni.showToast({
			title: '请完整填写简历！',
			icon: 'error'
		})
		return Promise.reject('Incomplete profile data')
	}
	let checkMsg = regCheck()
	if (checkMsg !== '合法') {
		uni.showToast({
			title: checkMsg,
			icon: 'error'
		})
		return Promise.reject(checkMsg)
	}
	if (resumeId.value && save) { //已有简历并且要保存
		if (!hasChoose) { //没有选择图片就要先下载
			isLoading = true
			uni.downloadFile({
				url: profileData.value.image,
				success(res) {
					console.log(res)
					isLoading = false
					profileData.value.image = res.tempFilePath
					changeResume().then(res => { //成功更新了就上传
						handleSubmit()
					})
				},
				fail() {
					isLoading = false
					uni.showToast({
						icon: 'none',
						duration: 3000,
						title: '服务器错误,请稍后再试'
					})
				}
			})
		} else {
			changeResume().then(res => { //成功更新了就上传
				handleSubmit()
			})
		}

	} else if (!resumeId.value) { //新建简历
		newResume().then(newResumeId => {
			console.log(newResumeId) // 拿到newResumeId 再去submit
			resumeId.value = newResumeId
			handleSubmit()
		})
	} else {
		handleSubmit()
	}

}

function resumeAndSubmit() {
	// 先判断信息是否完整
	if (!checkProfileData()) {
		uni.showToast({
			title: '请完整填写简历！',
			icon: 'error'
		})
		return Promise.reject('Incomplete profile data')
	}
	let checkMsg = regCheck()
	if (checkMsg !== '合法') {
		uni.showToast({
			title: checkMsg,
			icon: 'error'
		})
		return Promise.reject(checkMsg)
	}
	alertDialog.value.open()
}




function completeChange() {
	if (isLoading) return
	if (!hasChoose) {
		isLoading = true
		uni.downloadFile({
			url: profileData.value.image,
			success(res) {
				isLoading = false
				profileData.value.image = res.tempFilePath
				changeResume().then(res => {
					if (JSON.parse(res.data).code) {
						msg.value = '修改成功！'
						message.value.open()
						setTimeout(() => {
							uni.navigateBack()
						}, 1000)
					}
				}).catch(err => {
					console.log(err)
					isLoading = false
				})
			},
			fail() {
				isLoading = false
				uni.showToast({
					icon: 'none',
					duration: 3000,
					title: '服务器错误,请稍后再试'
				})
			}
		})
	} else {
		changeResume()
	}
}
let ifHaveChanged = ref(false)

function haveChange() {
	ifHaveChanged.value = true
}

function createProfile() {
	if (isLoading) return Promise.reject('isLoading')
	if (!checkProfileData()) {
		uni.showToast({
			title: '请完整填写简历！',
			icon: 'error'
		})
		return Promise.reject('请完整检查简历')
	}
	let checkMsg = regCheck()
	if (checkMsg !== '合法') {
		uni.showToast({
			title: checkMsg,
			icon: 'error'
		})
		return Promise.reject(checkMsg)
	}
	isLoading = true
	uni.showLoading({ title: '加载中' })
	console.log(profileData.value.others || '')
	uni.uploadFile({
		url: 'https://qtzx.xdj666.top/quanta/recruitment_reception/resume',
		filePath: profileData.value.image,
		name: 'image',
		formData: {
			'sex': profileData.value.sex,
			'email': profileData.value.email,
			'skill_advantages': profileData.value.skillsAdvantages,
			'others': profileData.value.others || '',
			'phone': profileData.value.phone,
			'name': profileData.value.resumeName,
			'save': 1,
		},
		method: 'POST',
		header: { 'Authorization': uni.getStorageSync('token') },
		success(result) {
			isLoading = false
			uni.hideLoading()
			let res = JSON.parse(result.data)
			if (res.code == 200) {
				msg.value = '创建成功！'
				message.value.open()
				setTimeout(() => {
					uni.navigateBack()
				}, 2000)
			}
		},
		fail(err) {
			isLoading = false
			console.log(err)
			uni.hideLoading()
			reject(err)
		}
	})
}
</script>

<template>
	<uni-popup ref="alertDialog" type="dialog">
		<uni-popup-dialog :type="msgType" cancelText="我再想想" confirmText="确认投递" title="是否确认投递该简历" content="注:投递后无法修改或撤回"
			@confirm="submitResume"></uni-popup-dialog>
	</uni-popup>


	<view class="container">
		<h2 id="title">基本信息</h2>
		<view class="inputAndPhoto">
			<view class="photo">
				<uni-file-picker ref="file" v-model="profileData.getBackImage" :value="profileData.getBackImage"
					class="upload" auto-upload="false" limit="1" :del-icon="false" disable-preview
					:imageStyles="imageStyles" file-mediatype="image" @select="selectok">选择照片</uni-file-picker>
				<!-- <image :src="profileData.image" mode="aspectFill"></image> -->
			</view>
			<view class="input">
				<uni-forms ref="form1" :rules="customRules" :modelValue="profileData">
					<uni-forms-item label="姓名">
						<uni-easyinput primaryColor="#fff" disabled v-model="profileData.name" placeholder="请输入姓名" />
					</uni-forms-item>
					<uni-forms-item label="性别">
						<uni-data-checkbox v-model="profileData.sex" :localdata="sexs" @change="haveChange" />
					</uni-forms-item>
					<uni-forms-item label="学号">
						<uni-easyinput primaryColor="#fff" disabled class="inputBox" v-model="profileData.studentNum"
							placeholder="请输入学号" />
					</uni-forms-item>
					<uni-forms-item class="inputBox" label="学院">
						<uni-easyinput primaryColor="#fff" disabled class="inputBox" v-model="profileData.faculty" />
					</uni-forms-item>
					<uni-forms-item label="年级">
						<uni-easyinput primaryColor="#fff" disabled class="inputBox" v-model="profileData.grade"
							placeholder="请输入年级" />
					</uni-forms-item>
					<uni-forms-item label="电话">
						<uni-easyinput primaryColor="#fff" class="inputBox" @input="haveChange"
							v-model="profileData.phone" placeholder="请输入电话" />
					</uni-forms-item>
					<uni-forms-item label="邮箱">
						<uni-easyinput primaryColor="#fff" class="inputBox" @input="haveChange"
							v-model="profileData.email" placeholder="请输入邮箱" />
					</uni-forms-item>

				</uni-forms>
			</view>
		</view>
		<view class="skill">
			<p>技能/优势*</p>
			<uni-forms-item>
				<uni-easyinput @input="haveChange" primaryColor="#fff" type="textarea"
					v-model="profileData.skillsAdvantages" placeholder="请输入自我介绍" />
			</uni-forms-item>
		</view>
		<view class="other">
			<p>其他</p>
			<uni-forms-item>
				<uni-easyinput @input="haveChange" primaryColor="#fff" type="textarea" v-model="profileData.others" />
			</uni-forms-item>
		</view>
		<view v-if="from == 1" class="saveInMyProfile">
			<span>
				是否保存到“我的简历”
			</span>
			<switch @change="ifSave" color="#ffa265" />
		</view>
		<view class="button">
			<button v-if="from == 1" class="myButton" @click="resumeAndSubmit">投递</button>
			<button v-if="from == 2" class="myButton" @click="completeChange" :disabled="!ifHaveChanged">完成修改</button>
			<button v-if="from == 3" class="myButton" @click="createProfile">完成创建</button>
		</view>
	</view>
	<uni-popup ref="message" type="message">
		<uni-popup-message :type="type" :message="msg" :duration="2000"></uni-popup-message>
	</uni-popup>
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