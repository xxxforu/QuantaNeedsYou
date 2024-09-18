"use strict";
const utils_newRequest = require("../utils/newRequest.js");
function getUnreadCount() {
  return utils_newRequest.service({
    url: "interview-notice/unread/count",
    showLoading: false
  });
}
exports.getUnreadCount = getUnreadCount;
