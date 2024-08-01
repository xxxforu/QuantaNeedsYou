"use strict";
const utils_newRequest = require("../utils/newRequest.js");
function getUnreadCount() {
  return utils_newRequest.service({ url: "interview-notice/unread/count" });
}
function getNoticeList() {
  return utils_newRequest.service({ url: "interview-notice" });
}
function getNotice(id) {
  return utils_newRequest.service({ url: "interview-notice/" + id });
}
exports.getNotice = getNotice;
exports.getNoticeList = getNoticeList;
exports.getUnreadCount = getUnreadCount;
