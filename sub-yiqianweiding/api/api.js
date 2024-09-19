import request from "@/utils/newRequest";

function objectToKeyValuePairs(obj) {
  return Object.keys(obj)
    .map((key) => `${key}=${obj[key]}`)
    .join("&");
}

// 获得签到活动列表
export function checkInList() {
  return request({
    url: "check-in",
    method: "GET",
  });
}

// 获得签到活动详细
export function checkInDetail(interviewId) {
  return request({
    url: "check-in/" + interviewId,
    method: "GET",
  });
}

// 扫码签到
export function scanCode(query) {
  return request({
    url: "check-in?" + objectToKeyValuePairs(query),
    method: "POST",
  });
}

// 获得排号进度列表
export function deque(query) {
  return request({
    url: "check-in/deque?" + objectToKeyValuePairs(query),
    method: "GET",
  });
}

// 放弃排号
export function giveUp(query) {
  return request({
    url: "check-in/deque?" + objectToKeyValuePairs(query),
    method: "DELETE",
  });
}
