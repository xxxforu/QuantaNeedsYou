"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/login/login.js";
  "./pages/info/info.js";
  "./sub-tajiuzhaoni/tajiuzhaoni/tajiuzhaoni.js";
  "./sub-tajiuzhaoni/schduleDetail/schduleDetail.js";
  "./sub-tajiuzhaoni/schduleIndex/schduleIndex.js";
  "./sub-tajiuzhaoni/tajiuzhaoni-HAIBAO/tajiuzhaoni-HAIBAO.js";
  "./sub-tajiuzhaoni/message/message.js";
  "./sub-yiqianweiding/yiqianweiding-detail/yiqianweiding-detail.js";
  "./sub-yiqianweiding/yiqianweiding/yiqianweiding.js";
  "./sub-wodejianli/profileDetail/profileDetail.js";
  "./sub-wodejianli/wodejianli/wodejianli.js";
}
const _sfc_main = {
  onLaunch: function() {
    const updateManager = common_vendor.index.getUpdateManager();
    updateManager.onCheckForUpdate(function(res) {
      if (res.hasUpdate) {
        updateManager.onUpdateReady(function() {
          common_vendor.index.showModal({
            title: "温馨提示",
            content: "检测到新版本，是否重启小程序？",
            showCancel: false,
            success: function(res2) {
              if (res2.confirm) {
                updateManager.applyUpdate();
              }
            }
          });
        });
        updateManager.onUpdateFailed(function() {
          common_vendor.index.showModal({
            title: "已有新版本",
            content: "请您删除小程序，重新搜索进入"
          });
        });
      }
    });
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.config.globalProperties.$getStaticFilePath = function(url) {
    return "https://quanta-web-1306963863.cos.ap-guangzhou.myqcloud.com/img%2Ftajiuzhaoni%2F" + url;
  };
  return { app };
}
createApp().app.mount("#app");
exports.createApp = createApp;
