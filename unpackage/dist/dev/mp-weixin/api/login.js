"use strict";
const utils_newRequest = require("../utils/newRequest.js");
function logout() {
  return utils_newRequest.service({
    url: "student/logout",
    method: "POST"
  });
}
exports.logout = logout;
