<template>
	<uni-popup ref="message" type="message">
		<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
	</uni-popup>
</template>

<script>
	export default {
		name: 'uniMessage',
		props: {
			msgType: { type: String },
			messageText: { type: String },
			showMessage: {
				type: Boolean,
				required: true
			}
		},
		methods: {
			messageToggle(type) {
				this.msgType = type
				this.messageText = `这是一条${type}消息提示`
				this.$refs.message.open()
			},
		},
		watch: {
			'showMessage': {
				handler(newVal, oldVal) {
					if (this.showMessage == true) {
						this.$nextTick(() => {
							this.$refs.message.open()
						})
					}
				}
			}
		}
	}
</script>

<style>

</style>