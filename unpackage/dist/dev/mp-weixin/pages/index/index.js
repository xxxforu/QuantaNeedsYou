"use strict";
const common_vendor = require("../../common/vendor.js");
const api_login = require("../../api/login.js");
const api_notice = require("../../api/notice.js");
if (!Array) {
  const _easycom_uni_badge2 = common_vendor.resolveComponent("uni-badge");
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  (_easycom_uni_badge2 + _easycom_uni_popup_message2 + _easycom_uni_popup2 + _easycom_uni_popup_dialog2)();
}
const _easycom_uni_badge = () => "../../uni_modules/uni-badge/components/uni-badge/uni-badge.js";
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
if (!Math) {
  (_easycom_uni_badge + _easycom_uni_popup_message + _easycom_uni_popup + _easycom_uni_popup_dialog)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const instance = common_vendor.getCurrentInstance();
    if (!instance) {
      throw new Error("getCurrentInstance must be called within setup or lifecycle hook.");
    }
    const getStaticFilePath = instance.appContext.config.globalProperties.$getStaticFilePath;
    var topBarHeight = common_vendor.ref(0);
    var haveEnterTajiuzhaoni = common_vendor.ref(false);
    var MenuButtonHeight = common_vendor.ref(0);
    var userName = common_vendor.ref(common_vendor.index.getStorageSync("userName"));
    var unreadCount = common_vendor.ref(0);
    common_vendor.onLoad(() => {
      common_vendor.index.getSystemInfoAsync({
        success: (res) => {
          topBarHeight.value = res.statusBarHeight;
          MenuButtonHeight.value = common_vendor.index.getMenuButtonBoundingClientRect().height;
        }
      });
    });
    function goToMessage() {
      common_vendor.index.navigateTo({ url: "/sub-tajiuzhaoni/message/message" });
    }
    common_vendor.onShow(() => {
      api_notice.getUnreadCount().then((res) => {
        unreadCount.value = res.unreadCount;
      });
      common_vendor.index.getStorage({
        key: "haveEnterTajiuzhaoni",
        success() {
          haveEnterTajiuzhaoni.value = true;
        },
        fail() {
          haveEnterTajiuzhaoni.value = false;
        }
      });
    });
    common_vendor.ref(null);
    const alertDialog = common_vendor.ref(null);
    var messageText = common_vendor.ref("退出成功！");
    var msgType = common_vendor.ref("success");
    function dialogToggle(type) {
      msgType.value = type;
      alertDialog.value.open();
    }
    function dialogConfirm() {
      api_login.logout().then((res) => {
        console.log(res);
        common_vendor.index.clearStorage();
        setTimeout(() => {
          common_vendor.index.navigateTo({ url: "/pages/login/login" });
        }, 1500);
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(getStaticFilePath)("quantaLogo.png"),
        b: common_vendor.t(common_vendor.unref(userName)),
        c: common_vendor.unref(getStaticFilePath)("msg.png"),
        d: common_vendor.p({
          customStyle: {
            background: "#64B3D4"
          },
          text: common_vendor.unref(unreadCount),
          absolute: "rightTop",
          size: "small"
        }),
        e: common_vendor.o(goToMessage),
        f: common_vendor.unref(getStaticFilePath)("exit.png"),
        g: common_vendor.o(($event) => dialogToggle("success")),
        h: common_vendor.unref(topBarHeight) + "px",
        i: !common_vendor.unref(haveEnterTajiuzhaoni)
      }, !common_vendor.unref(haveEnterTajiuzhaoni) ? {
        j: common_vendor.unref(getStaticFilePath)("tajiuzhaoni.png"),
        k: common_vendor.unref(getStaticFilePath)("back.png")
      } : {
        l: common_vendor.unref(getStaticFilePath)("tajiuzhaoni.png"),
        m: common_vendor.unref(getStaticFilePath)("back.png")
      }, {
        n: common_vendor.unref(getStaticFilePath)("yiqianweiding.png"),
        o: common_vendor.unref(getStaticFilePath)("back.png"),
        p: common_vendor.unref(getStaticFilePath)("wodejianli.png"),
        q: common_vendor.unref(getStaticFilePath)("back.png"),
        r: common_vendor.unref(topBarHeight) + common_vendor.unref(MenuButtonHeight) + "px",
        s: common_vendor.p({
          type: common_vendor.unref(msgType),
          message: common_vendor.unref(messageText),
          duration: 2e3
        }),
        t: common_vendor.sr(" message", "44ca7ba6-1"),
        v: common_vendor.p({
          type: "message"
        }),
        w: common_vendor.o(dialogConfirm),
        x: common_vendor.p({
          type: common_vendor.unref(msgType),
          cancelText: "取消",
          confirmText: "退出",
          title: "提示",
          content: "您确认要退出登录吗？"
        }),
        y: common_vendor.sr(alertDialog, "44ca7ba6-3", {
          "k": "alertDialog"
        }),
        z: common_vendor.p({
          type: "dialog"
        })
      });
    };
  }
};
wx.createPage(_sfc_main);
