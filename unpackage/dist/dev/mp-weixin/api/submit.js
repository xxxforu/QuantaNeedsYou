"use strict";
const utils_newRequest = require("../utils/newRequest.js");
function objectToKeyValuePairs(obj) {
  return Object.keys(obj).map((key) => `${key}=${obj[key]}`).join("&");
}
function department(query) {
  return utils_newRequest.service({
    url: "department?" + objectToKeyValuePairs(query),
    method: "GET"
  });
}
function submit(data) {
  return utils_newRequest.service({
    url: "submit",
    method: "POST",
    data
  });
}
function schedule(query) {
  return utils_newRequest.service({
    url: "interview-record/schedule?" + objectToKeyValuePairs(query),
    method: "GET"
  });
}
exports.department = department;
exports.schedule = schedule;
exports.submit = submit;
