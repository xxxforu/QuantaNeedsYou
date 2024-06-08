<template>
	<view class="container">
		<view class="tab" :style="{paddingTop: topBarHeight + 'px'}">
			<view id="avatarUrl" :style="{backgroundImage: 'url(' + avatarUrl + ')','background-repeat':'no-repeat', 
			backgroundSize:'100% 100%'}"></view>
			<text class="userName">{{userName}}</text>
			<view class="logoutBox" @click="dialogToggle('success')">
				<img src="../../static/image/退出.png" alt="" />
				<text>退出</text>
			</view>
		</view>
		<view class="content" :style="{paddingTop :topBarHeight +MenuButtonHeight+'px' }">
			<navigator v-if="haveEnterTajiuzhaoni" url="/pages/tajiuzhaoni-HAIBAO/tajiuzhaoni-HAIBAO">
				<view class="navBox">
					<view class="up">
						<image class="navImg" src="../../static/image/塔就招你.png" mode="widthFix"></image>
					</view>
					<view class="down">
						<text class="navTitle">塔就招你</text>
						<image class="navIcon" src="../../static/image/返回.png" mode=""></image>
					</view>

				</view>
			</navigator>
			<navigator v-else url="/pages/tajiuzhaoni/tajiuzhaoni">
				<view class="navBox">
					<view class="up">
						<image class="navImg" src="../../static/image/塔就招你.png" mode="widthFix"></image>
					</view>
					<view class="down">
						<text class="navTitle">塔就招你</text>
						<image class="navIcon" src="../../static/image/返回.png" mode=""></image>
					</view>

				</view>
			</navigator>
			<navigator url="/pages/yiqianweiding/yiqianweiding">
				<view class="navBox">
					<view class="up">
						<image class="navImg" src="../../static/image/一签为定.png" mode="widthFix"></image>
					</view>
					<view class="down">
						<text class="navTitle">一签为定</text>
						<image class="navIcon" src="../../static/image/返回.png" mode=""></image>
					</view>

				</view>
			</navigator>
			<navigator url="/pages/wodejianli/wodejianli">
				<view class="navBox">
					<view class="up">
						<image class="navImg" src="../../static/image/我的简历.png" mode="widthFix"></image>
					</view>
					<view class="down">
						<text class="navTitle">我的简历</text>
						<image class="navIcon" src="../../static/image/返回.png" mode=""></image>
					</view>

				</view>
			</navigator>
		</view>
	</view>
	<uni-popup ref="message" type="message">
		<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
	</uni-popup>
	<uni-popup ref="alertDialog" type="dialog">
		<uni-popup-dialog :type="msgType" cancelText="取消" confirmText="退出" title="提示" content="您确认要退出登录吗？"
			@confirm="dialogConfirm"></uni-popup-dialog>
	</uni-popup>
</template>

<script setup>
	import { request } from '../../utils/request.js'
	import { logout } from '@/api/login.js'
	var topBarHeight = ref(0)
	var haveEnterTajiuzhaoni = ref(false)
	var MenuButtonHeight = ref(0)
	var avatarUrl = ref(uni.getStorageSync('avatarUrl'))
	var userName = ref(uni.getStorageSync('userName'))
	onLoad(() => {
		uni.getSystemInfoAsync({
			success: res => {
				topBarHeight.value = res.statusBarHeight
				MenuButtonHeight.value = uni.getMenuButtonBoundingClientRect().height
			}
		})

	})
	// 每次页面显示就要重新获取haveEnterTajiuzhaoni来判断跳转去那个塔就招你页面
	onShow(() => {
		uni.getStorage({
			key: 'haveEnterTajiuzhaoni',
			success(res) {
				haveEnterTajiuzhaoni.value = res.data
				console.log(haveEnterTajiuzhaoni.value)
			}
		})

	})

	// 退出登录部分
	// 弹窗相关
	const message = ref(null)
	const alertDialog = ref(null)
	var messageText = ref('退出成功！')
	var msgType = ref('success')

	function dialogToggle(type) {
		msgType.value = type
		alertDialog.value.open()
	}

	function dialogConfirm() {
		console.log(message.value)
		console.log(logout)
		logout().then(res => {
			console.log(res)

			uni.clearStorage()
			message.value.open()
			setTimeout(() => {
				uni.navigateTo({ url: '/pages/login/login' })
			}, 1500)

		})
		// request({ url: 'student/logout', method: 'POST' }).then(res => {
		// 	console.log(res)
		// 	if (res.code == 200) {
		// 		uni.clearStorage()
		// 		message.value.open()
		// 		setTimeout(() => {
		// 			uni.navigateTo({ url: '/pages/login/login' })
		// 		}, 1500)


		// 	}
		// })


	}
</script>

<style lang="scss">
	.container {
		display: flex;
	}

	.tab {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 3;
		background-color: $tabBar-color;
		height: 100%;
		box-sizing: border-box;
	}

	.content {
		background-color: $background-color;
		flex: 8;
		height: 100%;
		box-sizing: border-box;
	}

	#avatarUrl {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		margin: 20px auto 0;
	}

	.logoutBox {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: absolute;
		bottom: 30px;
	}

	.logoutBox image {
		width: 20px;
		height: 20px;
	}

	.logoutBox text {
		font-weight: bold;
		font-size: 13px;
	}

	.userName {
		font-weight: bold;
		font-size: 15px;
		margin: 10px 0;
	}

	// 退出部分的弹窗相关
	.uni-popup-dialog {
		border: 1px $button-color solid;
	}

	.uni-popup__success {
		color: $button-color !important;
		font-weight: bold;
	}

	.uni-button-color {
		color: $button-color !important;
	}

	.uni-popup-message {
		margin-top: var(--topBarHeight);
	}

	// 三个功能板块的样式
	.navBox {
		margin: 20px auto 0;
		position: relative;
		display: flex;
		flex-direction: column;
		width: 85%;
		border-radius: 15px;
		box-shadow: 0 3px 8px 0 rgba(50, 49, 49, 0.06);
	}

	.up {
		border-radius: 15px;
		width: 100%;
		background-color: #cfe8f1;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: 0 8px 7px 0 rgba(216, 205, 205, 0.12);
	}

	navigator {
		margin-top: 25px;
	}

	.content navigator:nth-child(1) .up {
		background-color: #cfe8f1;
	}

	.content navigator:nth-child(2) .up {
		background-color: #fbe8a7;
	}

	.content navigator:nth-child(3) .up {
		background-color: #c3cae2;
	}

	.navIcon {
		width: 20px;
		height: 20px;
		vertical-align: middle;
		position: absolute;
		right: 0;
		top: 50%;
		transform: translate(0, -50%);
		padding: 0 10px;

	}

	.navImg {
		width: 85%;
	}

	.down {
		padding: 10px 0;
		display: flex;
		justify-content: center;
		position: relative;
	}
</style>