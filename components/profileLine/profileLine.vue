<template>
	<view class="departmentLineBox" @click="chooseProfile">
		<text>{{name}}</text>
		<image :src="$getStaticFilePath('back.png')" mode=""></image>
	</view>
</template>

<script>
	export default {
		name: 'profileLine',

		props: {
			name: { type: String }, //resumeName
			id: { type: Number } //resumeId
		},
		methods: {
			chooseProfile() {
				this.$emit('chooseProfile', this.name, this.id)
			}
		}
	}
</script>

<style>
	.departmentLineBox {
		background-color: #f9e6da;
		border-radius: 10px;
		font-size: 15px;
		color: $text-color;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 85%;
		height: 40px;
		margin: 10px auto;
		padding: 20px;
		box-sizing: border-box;
		box-shadow: 0 3px 8px 0 rgba(50, 49, 49, 0.06);
	}

	.departmentLineBox image {
		width: 20px;
		height: 20px;
	}
</style>