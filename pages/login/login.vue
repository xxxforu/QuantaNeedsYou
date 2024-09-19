<script setup>
	import { NavigationFailureType } from 'vue-router'
	import { getCurrentInstance } from 'vue'
	import { request } from '../../utils/request.js'
	var canIUseGetUserProfile = ref(false)
	var code = ''
	const instance = getCurrentInstance()
	if (!instance) {
		throw new Error('getCurrentInstance must be called within setup or lifecycle hook.')
	}
	const getStaticFilePath = instance.appContext.config.globalProperties.$getStaticFilePath
	onLoad(() => {
		// 判断版本权限
		if (uni.getUserProfile) {
			canIUseGetUserProfile.value = true
		}
		console.log(canIUseGetUserProfile.value)
	})
	// 防抖函数
	function debounce(fn, delay, immediate = true) {
		//1、初始化一个定时器

		let timer = null
		let isInvoke = false

		//2、真正执行的函数
		const _debounce = () => {
			//取消上一次的定时器
			if (timer) clearTimeout(timer)
			//判断是否需要立即执行
			if (immediate && !isInvoke) {
				fn() //视情况而定是否需要改变this指向
				isInvoke = true
			} else {
				//延迟执行
				timer = setTimeout(() => {
					//外部传入的真正要执行的函数
					fn() //视情况而定是否需要改变this指向
					isInvoke = false
					timer = null
				}, delay)
			}
		}

		return _debounce
	}



	function weixinLogin() {
		request({ url: 'student/login?code=' + code, method: 'POST' }).then(res => {
			// 是已绑定的账号 直接跳转index并记录token
			if (res.code === 200) {
				uni.setStorage({
					data: res.data.token,
					key: 'token'
				})
				uni.setStorage({
					data: res.data.name,
					key: 'userName'
				})
				uni.setStorage({
					data: res.data.studentNum,
					key: 'studentNum'
				})
				uni.setStorage({
					data: res.data.faculty,
					key: 'faculty'
				})
				uni.setStorage({
					data: res.data.grade,
					key: 'grade'
				})
				uni.navigateTo({ url: '/pages/index/index' })
			}
			// 未绑定 去info页进行信息绑定 记录下openId
			else if (res.code == 405 && res.data) {
				// uni.$showMsg(res.msg)
				uni.setStorage({
					data: res.data,
					key: 'openId',
				})
				uni.navigateTo({ url: '/pages/info/info' })
			} else {
				uni.showToast({
					icon: 'none',
					duration: 3000,
					title: `${res.msg}`
				})
			}

		})
	}


	function getUserProfile() {
		uni.login({
			'provider': 'weixin',
			'onlyAuthorize': true, // 微信登录仅请求授权认证
			success: function(res) {
				console.log(res.code)
				if (res.code) {
					code = res.code
					weixinLogin()
				}
			}
		})
	}

	var debounceGetUseProfile = debounce(getUserProfile, 1500)
</script>

<template>
	<img id="loginBg" :src="getStaticFilePath('loginBackground.png')" alt="" />
	<view class="login">
		<button class="loginButton" @tap="debounceGetUseProfile">
			<img class="weixinLogo" :src="getStaticFilePath('weixinLogo.png')" alt="" />
			<text class="loginText">微信登陆</text>
		</button>
		<text></text>
	</view>
</template>

<style lang="scss">
	page {
		background: #fee5d5;
		color: $text-color;
	}

	.loginButton {
		display: flex;
		flex-direction: column;
		background-color: transparent;
	}

	// 去除默认的边框效果
	.loginButton::after {
		border: none;
	}

	.weixinLogo {
		display: inline-block;
		width: 80px;
		height: 80px;
	}

	.loginText {
		display: inline-block;
		font-size: 15px;
		color: $text-color;
	}

	#loginBg {
		display: block;
		width: 100%;
		margin: 20vh auto;
	}

	.login {
		position: absolute;
		left: 50%;
		bottom: 20vh;
		transform: translate(-50%, 0);
		width: fit-content;
		display: flex;
		flex-direction: column;
	}

	#weixinLogo {
		width: 82px;
		height: 82px;
	}
</style>