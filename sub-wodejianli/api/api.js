// 引用网络请求中间件
import request from "@/utils/newRequest";

function objectToKeyValuePairs(obj) {
  return Object.keys(obj)
    .map((key) => `${key}=${obj[key]}`)
    .join("&");
}

/**
 *    修改简历
 */
export function putResume(resumeId, data) {
  return request({
    url: "resume/" + resumeId,
    method: "POST",
    data,
  });
}
/**
 *    删除简历
 */
export function deleteResume(resumeId) {
  return request({
    url: "resume/" + resumeId,
    method: "DELETE",
  });
}
/**
 *    新建简历
 */
export function postResume(data) {
  return request({
    url: "resume/",
    method: "POST",
    data,
  });
}
/**
 *    获取简历列表
 */
export function getResumeList() {
  return request({
    url: "resume/",
    method: "GET",
    showLoading: false,
  });
}
/**
 *    获取简历详细
 */
export function getResumeDetail(resumeId) {
  return request({
    url: "resume/" + resumeId,
    method: "GET",
  });
}
/**
 *    修改简历名
 */
export function ChangeResumeName(resumeId, name) {
  return request({
    url: "resume/" + resumeId + "/name?name=" + name,
    method: "PUT",
  });
}
// 投递简历
export function submit(data) {
  return request({
    url: "submit",
    method: "POST",
    data,
  });
}
