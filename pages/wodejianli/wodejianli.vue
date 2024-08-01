<template>
	<view class="container" @tap="handlePageTap">
		<text @tap.stop="handleTap">{{ isEditing ? editText : '双击我试试看呢' }}</text>
		<view class="new">新建简历</view>
		<view class="resumeListBox" v-for="(item, i) in resumeList" :key="item.resumeId" data-resumeId="item.resumeId">
			<view class="normalBox" v-show="editingId !== item.resumeId">
				{{item.resumeName}}
				<image src="../../static/image/rename.png" mode="widthFix" class="icon" @tap.stop="startEditing(item.resumeId)">
				</image>
				<image src="../../static/image/delete.png" mode="widthFix" class="icon" @tap.stop="deleteResume(item.resumeId)">
				</image>
			</view>
			<view class="inputBox" v-show="editingId === item.resumeId">
				<uni-easyinput primaryColor="#fff" @tap.stop @blur="stopEditing(item.resumeId)" class="inputBox"
					v-model="item.resumeName" placeholder="输入新名称" />
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import { getResumeList, deleteResume } from '@/api/profile.js'

	let touchNum = 0
	let isEditing = ref(false)
	let editText = ref('双击我试试看呢')
	let resumeList = ref([])
	let editingId = ref(null) // 当前正在编辑的 resumeId

	const handlePageTap = () => {
		console.log('页面被点击了')
		editingId.value = null // 点击页面空白处时，结束所有编辑状态
	}

	onLoad(() => {
		getResumeList().then(res => {
			console.log(res)
			resumeList.value = res
			console.log(resumeList.value)
		})
	})

	const startEditing = resumeId => {
		editingId.value = resumeId
	}

	const stopEditing = resumeId => {
		if (editingId.value === resumeId) {
			editingId.value = null
		}
	}

	function handleTap() {
		touchNum++
		setTimeout(() => {
			if (touchNum === 1) {
				console.log('单击')
			} else if (touchNum >= 2) {
				console.log('双击')
				isEditing.value = true // 双击时进入编辑状态
			}
			touchNum = 0
		}, 250)
	}
</script>

<style scoped>
	.container {
		padding: 20px;
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

	.icon {
		width: 16px;
	}
</style>