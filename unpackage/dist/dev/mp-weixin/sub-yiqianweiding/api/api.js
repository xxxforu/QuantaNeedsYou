"use strict";
const utils_newRequest = require("../../utils/newRequest.js");
function objectToKeyValuePairs(obj) {
  return Object.keys(obj).map((key) => `${key}=${obj[key]}`).join("&");
}
function checkInList() {
  return utils_newRequest.service({
    url: "check-in",
    method: "GET"
  });
}
function checkInDetail(interviewId) {
  return utils_newRequest.service({
    url: "check-in/" + interviewId,
    method: "GET"
  });
}
function scanCode(query) {
  return utils_newRequest.service({
    url: "check-in?" + objectToKeyValuePairs(query),
    method: "POST"
  });
}
function giveUp(query) {
  return utils_newRequest.service({
    url: "check-in/deque?" + objectToKeyValuePairs(query),
    method: "DELETE"
  });
}
exports.checkInDetail = checkInDetail;
exports.checkInList = checkInList;
exports.giveUp = giveUp;
exports.scanCode = scanCode;
