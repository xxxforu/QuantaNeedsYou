"use strict";
const common_vendor = require("../common/vendor.js");
const baseUrl = "http://47.120.73.35:8088/quanta/recruitment_reception/";
function service(options = {}) {
  options.url = `${baseUrl}${options.url}`;
  let token = common_vendor.index.getStorageSync("token");
  options.header = {
    "content-type": "application/json",
    "Authorization": `${token || false}`
    // 这里是token(可自行修改)
  };
  common_vendor.index.showLoading({ title: "加载中" });
  return new Promise((resolved, rejected) => {
    options.success = (res) => {
      common_vendor.index.hideLoading();
      if (res.data.code !== 200) {
        common_vendor.index.showToast({
          icon: "none",
          duration: 3e3,
          title: `${res.data.msg}`
        });
        rejected(res);
      } else {
        resolved(res.data.data);
      }
    };
    options.fail = (err) => {
      common_vendor.index.hideLoading();
      common_vendor.index.showToast({
        icon: "none",
        duration: 3e3,
        title: "服务器错误,请稍后再试"
      });
      rejected(err);
    };
    common_vendor.index.request(options);
  });
}
exports.service = service;
