"use strict";
const common_vendor = require("../../common/vendor.js");
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
    function debounce(fn, delay, immediate = true) {
      let timer = null;
      let isInvoke = false;
      const _debounce = () => {
        console.log("222");
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
      common_vendor.index.getUserProfile({
        lang: "zh_CN",
        desc: "用户登录",
        // 声明获取用户个人信息后的用途，后续会展示在弹窗中，
        success: (res) => {
          console.log(res.userInfo);
          common_vendor.index.setStorage({
            data: res.userInfo.avatarUrl,
            key: "avatarUrl"
          });
          common_vendor.index.login({
            success: function(res2) {
              console.log(res2.code);
              if (res2.code) {
                code = res2.code;
                weixinLogin();
              }
            }
          });
        }
      });
    }
    var debounceGetUseProfile = debounce(getUserProfile, 1500);
    function bindGetUserInfo() {
      return new Promise((resolve, reject) => {
        common_vendor.index.getUserInfo({
          lang: "zh_CN",
          success: (res) => {
            common_vendor.index.login({
              success: function(res2) {
                if (res2.code) {
                  code = res2.code;
                  weixinLogin();
                }
              }
            });
            resolve(res.userInfo);
          },
          fail: (err) => {
            reject(err);
          }
        });
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(canIUseGetUserProfile)
      }, common_vendor.unref(canIUseGetUserProfile) ? {
        b: common_vendor.o((...args) => common_vendor.unref(debounceGetUseProfile) && common_vendor.unref(debounceGetUseProfile)(...args))
      } : {
        c: common_vendor.o(bindGetUserInfo)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/XXX/Desktop/2023学期工作/招新小程序/enrollSystem/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
