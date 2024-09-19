<template>
	<view class="container" @tap="handlePageTap">
		<view class="new" @click="newProfileDecideName">新建简历</view>

		<view class="resumeListBox" v-for="(item, i) in resumeList" :key="item.resumeId" data-resumeId="item.resumeId">
			<view class="normalBox" @click="goToDetail(item.resumeId,item.resumeName)" v-show="editingId !== item.resumeId">
				{{item.resumeName}}

				<image :src="getStaticFilePath('delete.png')" mode="widthFix" class="icon"
					@tap.stop="openDeletePopup(item.resumeId)">
				</image>
				<image :src="getStaticFilePath('rename.png')" mode="widthFix" class="icon"
					@tap.stop="startEditing(item.resumeId,item.resumeName)">
				</image>
			</view>
			<view class="inputBox" v-show="editingId === item.resumeId">
				<uni-easyinput primaryColor="#fff" @tap.stop @blur="stopEditing(item.resumeId)" class="inputBox"
					v-model="item.resumeName" trim maxlength="15" placeholder="输入新名称" />
			</view>
		</view>
		<view v-if="!loading && resumeList.length == 0" class="emptyBox">
			<image :src="getStaticFilePath('bin.png')" style="width: 35vw;" mode="widthFix"></image>
			<text>空空如也~</text>
		</view>
	</view>
	<!-- 简历删除弹窗 -->
	<uni-popup ref="alertDialog" type="dialog" class="deletePopup">
		<uni-popup-dialog :type="msgType" cancelText="取消" confirmText="确认" title="提示" content="简历删除后不可恢复,您确认要删除吗？"
			@confirm="goToDelete"></uni-popup-dialog>
	</uni-popup>
	<!-- 简历命名弹窗 -->
	<uni-popup ref="inputDialog" type="dialog">
		<uni-popup-dialog ref="inputClose" mode="input" title="简历命名" placeholder="请输入内容"
			@confirm="dialogInputConfirm"></uni-popup-dialog>
	</uni-popup>
</template>

<script setup>
	import { ref } from 'vue'
	import { getResumeList, deleteResume, ChangeResumeName } from '../api/api.js'
	import { getCurrentInstance } from 'vue'
	const instance = getCurrentInstance()
	if (!instance) {
		throw new Error('getCurrentInstance must be called within setup or lifecycle hook.')
	}
	const getStaticFilePath = instance.appContext.config.globalProperties.$getStaticFilePath
	let resumeList = ref([])
	let editingId = ref(null) // 当前正在编辑的 resumeId
	let nameBeforeEdit = ref(null)
	let msgType = ref('info')
	let alertDialog = ref(null)
	let currentDeleteId = ref(0)
	const goToDetail = (id, name) => {
		uni.navigateTo({ url: '/sub-wodejianli/profileDetail/profileDetail?from=2' + '&resumeId=' + id + '&name=' + name })
	}
	const openDeletePopup = id => {

		currentDeleteId.value = id
		alertDialog.value.open()
	}
	const goToDelete = () => {
		deleteResume(currentDeleteId.value)
			.then(() => {
				return getResumeList()
			})
			.then(res => {
				resumeList.value = res
			})
			.catch(error => {
				console.error('Error deleting or fetching resume list:', error)
				// 处理错误情况
			})
	}
	// 处理编辑完成的事件
	const handleEdit = resumeId => {
		let currentResume = resumeList.value.find(obj => obj.resumeId === resumeId)

		// 如果找到了对应的对象，则获取其 resumeName 属性
		if (currentResume) {
			if (nameBeforeEdit.value == currentResume.resumeName) console.log('没有更新名字！')
			else if (currentResume.resumeName == '') {
				currentResume.resumeName = nameBeforeEdit.value
			} else { //成功改名
				ChangeResumeName(resumeId, currentResume.resumeName)
			}
		}
	}

	const handlePageTap = () => {
		if (editingId.value) {
			handleEdit(editingId.value)
			editingId.value = null // 点击页面空白处时，结束所有编辑状态
		}

	}

	let loading = ref(true)
	onShow(() => {
		loading.value = true
		getResumeList().then(res => {
			console.log(res)
			resumeList.value = res
			loading.value = false
		})
	})

	const startEditing = (resumeId, resumeName) => {
		editingId.value = resumeId
		nameBeforeEdit.value = resumeName
	}

	const stopEditing = resumeId => {
		if (editingId.value === resumeId) {
			handleEdit(resumeId)
			editingId.value = null
		}
	}



	// 新建简历部分
	var inputDialog = ref(null) //获取简历实例

	function newProfileDecideName() {
		inputDialog.value.open()
	}

	const inputClose = ref(null)

	function dialogInputConfirm(val) {
		if (val == '') {
			uni.showToast({
				title: '请命名简历！',
				icon: 'error'
			})
			return
		}
		inputClose.value.val = ''
		uni.navigateTo({ url: '/sub-wodejianli/profileDetail/profileDetail?name=' + val + '&from=3' })

		inputDialog.value.close()
	}
</script>

<style scoped>
	.container {
		padding: 20px;
		overflow-y: scroll;
	}

	.new {
		text-align: right;
		font-size: 13px;
		color: #ffa265;
		text-decoration: underline;
		font-weight: bold;
	}

	.inputBox>>>.uni-easyinput__content-input {
		border-radius: 10px !important;
		padding: 7px;
		font-size: 16px;
	}

	.inputBox>>>.uni-easyinput {
		border-radius: 10px !important;
		color: #707070;
	}

	.inputBox>>>.is-input-border {
		border-radius: 10px;
	}

	.inputBox {
		margin: 20px 0;
		border-radius: 3px;
		flex: 1;
		position: relative;
		text-align: left;
		color: #333;
		font-size: 13px;
		background-color: #fff;
	}


	.icon {
		width: 16px;
		float: right;
		margin: 5px;
	}

	.normalBox {
		width: 90vw;
		background-color: #fff;
		padding: 15px;
		margin: 20px 0;
		box-sizing: border-box;
		box-shadow: 0 3px 8px 0 rgba(50, 49, 49, 0.06);
		border-radius: 10px;
	}

	.deletePopup>>>.uni-button-color {
		color: #ffa265;
	}

	.deletePopup>>>.uni-popup__info {
		color: #ffa265;
	}

	.emptyBox {
		display: flex;
		width: 100%;
		flex-direction: column;
		height: 80%;
		justify-content: center;
		align-items: center;
	}
</style>