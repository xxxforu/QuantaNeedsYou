"use strict";
const common_vendor = require("../../common/vendor.js");
const subTajiuzhaoni_api_api = require("../api/api.js");
const _sfc_main = {
  __name: "tajiuzhaoni-HAIBAO",
  setup(__props) {
    var data = common_vendor.ref({});
    common_vendor.onMounted(() => {
      subTajiuzhaoni_api_api.getHaiBao().then((res) => {
        data.value = res;
        if (data.value.state == 2) {
          common_vendor.index.navigateTo({ url: "/sub-tajiuzhaoni/tajiuzhaoni/tajiuzhaoni" });
        }
      });
    });
    const instance = common_vendor.getCurrentInstance();
    if (!instance) {
      throw new Error("getCurrentInstance must be called within setup or lifecycle hook.");
    }
    const getStaticFilePath = instance.appContext.config.globalProperties.$getStaticFilePath;
    function goToPage() {
      common_vendor.index.navigateTo({ url: "/sub-tajiuzhaoni/tajiuzhaoni/tajiuzhaoni" });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(data).image || common_vendor.unref(getStaticFilePath)("tajiuzhaoni.png"),
        b: common_vendor.t(common_vendor.unref(data).recruitmentContent),
        c: common_vendor.unref(data).state != 1
      }, common_vendor.unref(data).state != 1 ? {} : {
        d: common_vendor.o(($event) => goToPage())
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c25facbb"]]);
wx.createPage(MiniProgramPage);
