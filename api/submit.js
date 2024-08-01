// 引用网络请求中间件
import request from '@/utils/newRequest'

function objectToKeyValuePairs(obj) {
	return Object.keys(obj).map(key => `${key}=${obj[key]}`).join('&')
}

// 获得招新投递信息
export function recruitment() {
	return request({
		url: 'recruitment',
		method: 'GET'
	})
}

// 获得部门列表
export function department(query) {
	return request({
		url: 'department?' + objectToKeyValuePairs(query),
		method: 'GET'
	})
}

// 投递简历
export function submit(data) {
	return request({
		url: 'submit',
		method: 'POST',
		data
	})
}

// 获得投递进度列表
export function schedule(query) {
	return request({
		url: 'interview-record/schedule?' + objectToKeyValuePairs(query),
		method: 'GET'
	})
}
// 