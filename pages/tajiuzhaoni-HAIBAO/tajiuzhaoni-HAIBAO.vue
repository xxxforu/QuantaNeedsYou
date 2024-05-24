<script setup>

</script>

<template>
	<view class="container">
		<view class="imageBox">
			<image src="../../static/image/塔就招你.png" mode="widthFix"></image>
		</view>
		<view class="textBox">
			<text>文字</text>
			<text>文字</text>
			<text>文字</text>
		</view>
		<navigator url="/pages/tajiuzhaoni/tajiuzhaoni">
			<button id="deliverButton">投递简历</button>
		</navigator>

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
</style>