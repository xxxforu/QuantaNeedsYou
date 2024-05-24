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
        } else {
          common_vendor.index.setStorage({
            data: res.data,
            key: "openId"
          });
          common_vendor.index.navigateTo({ url: "/pages/info/info" });
        }
      });
    }
    function getUserProfile() {
      return new Promise((resolve, reject) => {
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
        b: common_vendor.o(getUserProfile)
      } : {
        c: common_vendor.o(bindGetUserInfo)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/XXX/Desktop/2023学期工作/招新小程序/enrollSystem/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
