// 引用网络请求中间件
import request from '@/utils/newRequest'

function objectToKeyValuePairs(obj) {
	return Object.keys(obj).map(key => `${key}=${obj[key]}`).join('&')
}


// 获得部门列表
export function department(query) {
	return request({
		url: 'department?' + objectToKeyValuePairs(query),
		method: 'GET'
	})
}

// 获得投递进度列表
export function schedule(query) {
	return request({
		url: 'interview-record/schedule?' + objectToKeyValuePairs(query),
		method: 'GET',

	})
}
// 
/**
 *    获取简历列表
 */
export function getResumeList() {
	return request({
		url: 'resume/',
		method: 'GET',
		showLoading: false
	})
}
// 获取消息列表
export function getNoticeList() {
	return request({ url: 'interview-notice' })
}
// 获取未读消息数
export function getNotice(id) {
	return request({ url: 'interview-notice/' + id })
}
//获取塔就招你海报信息
export function getHaiBao() {
	return request({ url: 'recruitment' })
}