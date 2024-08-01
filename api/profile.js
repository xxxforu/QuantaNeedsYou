// 引用网络请求中间件
import request from '@/utils/newRequest'

function objectToKeyValuePairs(obj) {
	return Object.keys(obj).map(key => `${key}=${obj[key]}`).join('&')
}


/**
 *    修改简历
 */
export function putResume(resumeId, data) {
	return request({
		url: 'resume/' + resumeId,
		method: 'PUT',
		data
	})
}
/**
 *    删除简历
 */
export function deleteResume(resumeId, data) {
	return request({
		url: 'resume/' + resumeId,
		method: 'DELETE',
		data
	})
}
/**
 *    新建简历
 */
export function postResume(data) {
	return request({
		url: 'resume/',
		method: 'POST',
		data
	})
}
/**
 *    获取简历列表
 */
export function getResumeList() {
	return request({
		url: 'resume/',
		method: 'GET'
	})
}
/**
 *    获取简历详细
 */
export function getResumeDetail(resumeId) {
	return request({
		url: 'resume/' + resumeId,
		method: 'GET'
	})
}
/**
 *    修改简历名
 */
export function ChangeResumeName(resumeId, name) {
	return request({
		url: 'resume/' + resumeId + '/' + name,
		method: 'PUT'
	})
}