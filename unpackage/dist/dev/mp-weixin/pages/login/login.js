"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_request = require("../../utils/request.js");
const _sfc_main = {
  __name: "login",
  setup(__props) {
    var canIUseGetUserProfile = common_vendor.ref(false);
    var code = "";
    common_vendor.onLoad(() => {
      if (common_vendor.index.getUserProfile) {
        canIUseGetUserProfile.value = true;
      }
      console.log(canIUseGetUserProfile.value);
    });
    function weixinLogin() {
      utils_request.request({ url: "student/login?code=" + code, method: "POST" }).then((res) => {
        if (res.code === 200) {
          common_vendor.index.setStorage({
            data: res.data.token,
            key: "token"
          });
          common_vendor.index.setStorage({
            data: res.data.name,
            key: "userName"
          });
          common_vendor.index.setStorage({
            data: res.data.studentNum,
            key: "studentNum"
          });
          common_vendor.index.setStorage({
            data: res.data.faculty,
            key: "faculty"
          });
          common_vendor.index.setStorage({
            data: res.data.grade,
            key: "grade"
          });
          common_vendor.index.getStorage({
            // 看有没有进入过“塔就招你”的海报页
            key: "haveEnterTajiuzhaoni",
            success() {
              console.log("getSuccess");
            },
            fail() {
              common_vendor.index.setStorage({
                data: true,
                key: "haveEnterTajiuzhaoni"
              });
            }
          });
          common_vendor.index.navigateTo({ url: "/pages/index/index" });
        } else if (res.code == 405) {
          common_vendor.index.setStorage({
            data: res.data,
            key: "openId"
          });
          common_vendor.index.navigateTo({ url: "/pages/info/info" });
        } else {
          common_vendor.index.showToast({
            icon: "none",
            duration: 3e3,
            title: `${res.msg}`
          });
        }
      });
    }
    function getUserProfile() {
      common_vendor.index.login({
        success: function(res) {
          console.log(res.code);
          if (res.code) {
            code = res.code;
            weixinLogin();
          }
        }
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_assets._imports_1,
        c: common_vendor.o(getUserProfile)
      };
    };
  }
};
wx.createPage(_sfc_main);
