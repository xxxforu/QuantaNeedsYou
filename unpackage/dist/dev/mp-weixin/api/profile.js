"use strict";
const utils_newRequest = require("../utils/newRequest.js");
function deleteResume(resumeId, data) {
  return utils_newRequest.service({
    url: "resume/" + resumeId,
    method: "DELETE",
    data
  });
}
function getResumeList() {
  return utils_newRequest.service({
    url: "resume/",
    method: "GET"
  });
}
function getResumeDetail(resumeId) {
  return utils_newRequest.service({
    url: "resume/" + resumeId,
    method: "GET"
  });
}
exports.deleteResume = deleteResume;
exports.getResumeDetail = getResumeDetail;
exports.getResumeList = getResumeList;
