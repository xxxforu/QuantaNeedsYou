"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const _sfc_main = {
  __name: "login",
  setup(__props) {
    var canIUseGetUserProfile = common_vendor.ref(false);
    var code = "";
    const instance = common_vendor.getCurrentInstance();
    if (!instance) {
      throw new Error("getCurrentInstance must be called within setup or lifecycle hook.");
    }
    const getStaticFilePath = instance.appContext.config.globalProperties.$getStaticFilePath;
    common_vendor.onLoad(() => {
      if (common_vendor.index.getUserProfile) {
        canIUseGetUserProfile.value = true;
      }
      console.log(canIUseGetUserProfile.value);
    });
    function debounce(fn, delay, immediate = true) {
      let timer = null;
      let isInvoke = false;
      const _debounce = () => {
        if (timer)
          clearTimeout(timer);
        if (immediate && !isInvoke) {
          fn();
          isInvoke = true;
        } else {
          timer = setTimeout(() => {
            fn();
            isInvoke = false;
            timer = null;
          }, delay);
        }
      };
      return _debounce;
    }
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
          common_vendor.index.navigateTo({ url: "/pages/index/index" });
        } else if (res.code == 405 && res.data) {
          common_vendor.index.setStorage({
            data: res.data,
            key: "openId"
          });
          common_vendor.index.navigateTo({ url: "/pages/info/info" });
        } else if (res.code == 405 && !res.data) {
          common_vendor.index.showToast({
            icon: "none",
            duration: 3e3,
            title: `${res.msg}`
          });
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
        "provider": "weixin",
        "onlyAuthorize": true,
        // 微信登录仅请求授权认证
        success: function(res) {
          console.log(res.code);
          if (res.code) {
            code = res.code;
            weixinLogin();
          }
        }
      });
    }
    var debounceGetUseProfile = debounce(getUserProfile, 1500);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(getStaticFilePath)("loginBackground.png"),
        b: common_vendor.unref(getStaticFilePath)("weixinLogo.png"),
        c: common_vendor.o((...args) => common_vendor.unref(debounceGetUseProfile) && common_vendor.unref(debounceGetUseProfile)(...args))
      };
    };
  }
};
wx.createPage(_sfc_main);
