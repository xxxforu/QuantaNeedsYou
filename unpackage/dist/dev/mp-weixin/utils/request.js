"use strict";
const common_vendor = require("../common/vendor.js");
const baseUrl = "http://47.120.73.35:8088/quanta/recruitment_reception/";
const request = (options) => {
  return new Promise((resolve, reject) => {
    const header = {
      "Content-Type": "application/json",
      Authorization: common_vendor.index.getStorageSync("token") != null ? common_vendor.index.getStorageSync("token") : null
    };
    common_vendor.index.request({
      url: baseUrl + options.url,
      //接收请求的API
      method: options.method || "GET",
      //接收请求的方式,如果不传默认为GET
      data: JSON.stringify(options.data) || {},
      //接收请求的data,不传默认为空
      header,
      //接收请求的header
      success(res) {
        if (res.data.code == 401) {
          common_vendor.index.showToast({
            title: "请重新登录！",
            duration: 1500,
            icon: "none"
          });
          setTimeout(() => {
            common_vendor.index.navigateTo({ url: "/pages/login/login" });
          }, 1e3);
        }
        resolve(res.data);
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
};
exports.request = request;
