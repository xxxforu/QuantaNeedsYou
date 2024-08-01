import request from '@/utils/newRequest'

// 获取未读消息数
export function getUnreadCount() {
	return request({ url: 'interview-notice/unread/count' })
}
// 获取消息列表
export function getNoticeList() {
	return request({ url: 'interview-notice' })
}
// 获取未读消息数
export function getNotice(id) {
	return request({ url: 'interview-notice/' + id })
}