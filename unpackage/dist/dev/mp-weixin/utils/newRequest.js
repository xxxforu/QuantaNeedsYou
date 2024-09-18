"use strict";
const common_vendor = require("../common/vendor.js");
const baseUrl = "https://qtzx.xdj666.top/quanta/recruitment_reception/";
function service(options = {}) {
  options.url = `${baseUrl}${options.url}`;
  let token = common_vendor.index.getStorageSync("token");
  options.header = {
    "content-type": "application/json",
    "Authorization": `${token || false}`
    // 这里是token(可自行修改)
  };
  console.log(options);
  if (options.showLoading !== false) {
    common_vendor.index.showLoading({ title: "加载中" });
  }
  return new Promise((resolved, rejected) => {
    options.success = (res) => {
      if (options.showLoading !== false) {
        common_vendor.index.hideLoading();
      }
      if (res.data.code !== 200) {
        common_vendor.index.showToast({
          icon: "none",
          duration: 3e3,
          title: `${res.data.msg}`
        });
        if (res.data.code == 401) {
          common_vendor.index.showToast({
            icon: "none",
            duration: 3e3,
            title: `${res.data.msg}，即将跳转登录页`
          });
          setTimeout(() => {
            common_vendor.index.navigateTo({ url: "/pages/login/login" });
          }, 3e3);
        }
        rejected(res);
      } else {
        resolved(res.data.data);
      }
    };
    options.fail = (err) => {
      if (options.showLoading !== false) {
        common_vendor.index.hideLoading();
      }
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
