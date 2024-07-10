"use strict";
const utils_newRequest = require("../utils/newRequest.js");
function resume(resumeId, data) {
  return utils_newRequest.service({
    url: "resume/" + resumeId,
    method: "PUT",
    data
  });
}
exports.resume = resume;
