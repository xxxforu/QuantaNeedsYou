<script setup>
	import { getHaiBao } from '../api/api.js'
	import { getCurrentInstance, onMounted } from 'vue'
	var data = ref({})
	onMounted(() => {
		getHaiBao().then(res => {
			data.value = res
			// 如果已结束 直接去到投递页
			if (data.value.state == 2) {
				uni.navigateTo({ url: '/sub-tajiuzhaoni/tajiuzhaoni/tajiuzhaoni' })
			}
		})
	})
	const instance = getCurrentInstance()
	if (!instance) {
		throw new Error('getCurrentInstance must be called within setup or lifecycle hook.')
	}
	const getStaticFilePath = instance.appContext.config.globalProperties.$getStaticFilePath

	function goToPage() {
		uni.navigateTo({ url: '/sub-tajiuzhaoni/tajiuzhaoni/tajiuzhaoni' })
	}
</script>

<template>
	<view class="container">
		<view class="imageBox">
			<image :src="data.image || getStaticFilePath('tajiuzhaoni.png')" mode="widthFix"></image>
		</view>
		<view class="textBox">
			<text>{{data.recruitmentContent}}</text>
		</view>
		<button v-if="data.state !=  1" type="default" disabled>投递简历</button>
		<button v-else id="deliverButton" @click="goToPage()">投递简历</button>

	</view>
</template>

<style lang="scss" scoped>
	.container {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
	}

	.imageBox {
		width: 85vw;
		background-color: #fadecd;
		border-radius: 15px;
	}

	.imageBox image {
		width: 90%;
		margin: auto;
		display: block;
	}

	#deliverButton {
		background-color: $button-color;
		color: #fff;
		font-weight: bold;
		border-radius: 10px;
		width: 125px;
		height: 50px;
		box-shadow: 0 3px 8px 0 rgba(50, 49, 49, 0.06);
	}

	.textBox {
		width: 80vw;
		box-sizing: border-box;
		background-color: #fff;
		padding: 17px;
		box-shadow: 0 3px 8px 0 rgba(50, 49, 49, 0.06);
		border-radius: 15px;
	}
</style>