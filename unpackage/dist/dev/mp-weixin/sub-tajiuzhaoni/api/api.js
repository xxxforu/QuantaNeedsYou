"use strict";
const utils_newRequest = require("../../utils/newRequest.js");
function objectToKeyValuePairs(obj) {
  return Object.keys(obj).map((key) => `${key}=${obj[key]}`).join("&");
}
function department(query) {
  return utils_newRequest.service({
    url: "department?" + objectToKeyValuePairs(query),
    method: "GET"
  });
}
function schedule(query) {
  return utils_newRequest.service({
    url: "interview-record/schedule?" + objectToKeyValuePairs(query),
    method: "GET"
  });
}
function getResumeList() {
  return utils_newRequest.service({
    url: "resume/",
    method: "GET",
    showLoading: false
  });
}
function getNoticeList() {
  return utils_newRequest.service({ url: "interview-notice" });
}
function getNotice(id) {
  return utils_newRequest.service({ url: "interview-notice/" + id });
}
function getHaiBao() {
  return utils_newRequest.service({ url: "recruitment" });
}
exports.department = department;
exports.getHaiBao = getHaiBao;
exports.getNotice = getNotice;
exports.getNoticeList = getNoticeList;
exports.getResumeList = getResumeList;
exports.schedule = schedule;
