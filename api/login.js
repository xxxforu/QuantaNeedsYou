// 引用网络请求中间件
import request from '@/utils/newRequest'

function objectToKeyValuePairs(obj) {
	return Object.keys(obj).map(key => `${key}=${obj[key]}`).join('&')
}


/**
 *    登陆请求
 */
export function login(params) {
	return request({
		url: 'student/login?' + objectToKeyValuePairs(params),
		method: 'POST',
	})
}

/**
 *    获取用户信息
 */
export function info(data) {
	return request({
		url: 'student/info',
		method: 'POST',
		data
	})
}


/**
 *    获取用户信息
 */
export function logout() {
	return request({
		url: 'student/logout',
		method: 'POST'
	})
}