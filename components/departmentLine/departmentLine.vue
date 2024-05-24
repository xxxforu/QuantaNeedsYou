<template>
	<view class="departmentLineBox" @click="deliverProfile">
		<text>{{title}}</text>
		<image src="../../static/image/返回.png" mode=""></image>
	</view>
</template>

<script>
	export default {
		name: 'departmentLine',

		props: {
			title: { type: String }, //departmentName
			id: { type: Number } //departmentId
		},
		methods: {
			deliverProfile() {
				this.$emit('deliverProfile', this.id)
			}
		}
	}
</script>

<style>
	.departmentLineBox {
		background-color: #fff;
		border-radius: 10px;
		font-size: 15px;
		color: $text-color;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 85vw;
		height: 50px;
		margin: 20px auto;
		padding: 20px;
		box-sizing: border-box;
		box-shadow: 0 3px 8px 0 rgba(50, 49, 49, 0.06);
	}

	.departmentLineBox image {
		width: 20px;
		height: 20px;
	}
</style>