"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/login/login.js";
  "./pages/index/index.js";
  "./pages/info/info.js";
  "./pages/tajiuzhaoni-HAIBAO/tajiuzhaoni-HAIBAO.js";
  "./pages/yiqianweiding/yiqianweiding.js";
  "./pages/yiqianweiding-detail/yiqianweiding-detail.js";
  "./pages/wodejianli/wodejianli.js";
  "./pages/xinjianjianli/xinjianjianli.js";
  "./pages/toudijianli-index/toudijianli-index.js";
  "./pages/tajiuzhaoni/tajiuzhaoni.js";
  "./pages/profileDetail/profileDetail.js";
  "./pages/schduleIndex/schduleIndex.js";
  "./pages/schduleDetail/schduleDetail.js";
  "./pages/message/message.js";
}
const _sfc_main = {
  onLaunch: function() {
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
  return { app };
}
createApp().app.mount("#app");
exports.createApp = createApp;
