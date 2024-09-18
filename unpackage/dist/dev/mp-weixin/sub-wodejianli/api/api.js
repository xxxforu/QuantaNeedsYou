"use strict";
const utils_newRequest = require("../../utils/newRequest.js");
function deleteResume(resumeId) {
  return utils_newRequest.service({
    url: "resume/" + resumeId,
    method: "DELETE"
  });
}
function getResumeList() {
  return utils_newRequest.service({
    url: "resume/",
    method: "GET",
    showLoading: false
  });
}
function getResumeDetail(resumeId) {
  return utils_newRequest.service({
    url: "resume/" + resumeId,
    method: "GET"
  });
}
function ChangeResumeName(resumeId, name) {
  return utils_newRequest.service({
    url: "resume/" + resumeId + "/name?name=" + name,
    method: "PUT"
  });
}
function submit(data) {
  return utils_newRequest.service({
    url: "submit",
    method: "POST",
    data
  });
}
exports.ChangeResumeName = ChangeResumeName;
exports.deleteResume = deleteResume;
exports.getResumeDetail = getResumeDetail;
exports.getResumeList = getResumeList;
exports.submit = submit;
