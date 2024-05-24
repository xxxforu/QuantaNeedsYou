"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
if (!Array) {
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  (_easycom_uni_popup_message2 + _easycom_uni_popup2 + _easycom_uni_popup_dialog2)();
}
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
if (!Math) {
  (_easycom_uni_popup_message + _easycom_uni_popup + _easycom_uni_popup_dialog)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    var topBarHeight = common_vendor.ref(0);
    var haveEnterTajiuzhaoni = common_vendor.ref(false);
    var MenuButtonHeight = common_vendor.ref(0);
    var avatarUrl = common_vendor.ref(common_vendor.index.getStorageSync("avatarUrl"));
    var userName = common_vendor.ref(common_vendor.index.getStorageSync("userName"));
    common_vendor.onLoad(() => {
      common_vendor.index.getSystemInfoAsync({
        success: (res) => {
          topBarHeight.value = res.statusBarHeight;
          MenuButtonHeight.value = common_vendor.index.getMenuButtonBoundingClientRect().height;
        }
      });
    });
    common_vendor.onShow(() => {
      common_vendor.index.getStorage({
        key: "haveEnterTajiuzhaoni",
        success(res) {
          haveEnterTajiuzhaoni.value = res.data;
          console.log(haveEnterTajiuzhaoni.value);
        }
      });
    });
    const message = common_vendor.ref(null);
    const alertDialog = common_vendor.ref(null);
    var messageText = common_vendor.ref("退出成功！");
    var msgType = common_vendor.ref("success");
    function dialogToggle(type) {
      msgType.value = type;
      alertDialog.value.open();
    }
    function dialogConfirm() {
      console.log(message.value);
      utils_request.request({ url: "student/logout", method: "POST" }).then((res) => {
        console.log(res);
        if (res.code == 200) {
          common_vendor.index.clearStorage();
          message.value.open();
          setTimeout(() => {
            common_vendor.index.navigateTo({ url: "/pages/login/login" });
          }, 3e3);
        }
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: "url(" + common_vendor.unref(avatarUrl) + ")",
        b: common_vendor.t(common_vendor.unref(userName)),
        c: common_vendor.o(($event) => dialogToggle("success")),
        d: common_vendor.unref(topBarHeight) + "px",
        e: common_vendor.unref(haveEnterTajiuzhaoni)
      }, common_vendor.unref(haveEnterTajiuzhaoni) ? {} : {}, {
        f: common_vendor.unref(topBarHeight) + common_vendor.unref(MenuButtonHeight) + "px",
        g: common_vendor.p({
          type: common_vendor.unref(msgType),
          message: common_vendor.unref(messageText),
          duration: 2e3
        }),
        h: common_vendor.sr(message, "44ca7ba6-0", {
          "k": "message"
        }),
        i: common_vendor.p({
          type: "message"
        }),
        j: common_vendor.o(dialogConfirm),
        k: common_vendor.p({
          type: common_vendor.unref(msgType),
          cancelText: "取消",
          confirmText: "退出",
          title: "提示",
          content: "您确认要退出登录吗？"
        }),
        l: common_vendor.sr(alertDialog, "44ca7ba6-2", {
          "k": "alertDialog"
        }),
        m: common_vendor.p({
          type: "dialog"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/XXX/Desktop/2023学期工作/招新小程序/enrollSystem/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
