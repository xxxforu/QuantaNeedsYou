"use strict";
const common_vendor = require("../../common/vendor.js");
const subTajiuzhaoni_api_api = require("../api/api.js");
const _sfc_main = {
  __name: "message",
  setup(__props) {
    const instance = common_vendor.getCurrentInstance();
    if (!instance) {
      throw new Error("getCurrentInstance must be called within setup or lifecycle hook.");
    }
    const getStaticFilePath = instance.appContext.config.globalProperties.$getStaticFilePath;
    var noticeList = common_vendor.ref();
    var noData = common_vendor.ref(false);
    common_vendor.onLoad(() => {
      subTajiuzhaoni_api_api.getNoticeList().then((res) => {
        console.log(res);
        if (res.length)
          noticeList.value = res;
        else {
          noData.value = true;
        }
      });
    });
    function goToDetail(e) {
      const { id } = e.currentTarget.dataset;
      console.log(e.currentTarget.dataset);
      common_vendor.index.navigateTo({ url: "/sub-tajiuzhaoni/schduleDetail/schduleDetail?id=" + id });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(noData) == false
      }, common_vendor.unref(noData) == false ? {
        b: common_vendor.f(common_vendor.unref(noticeList), (item, i, i0) => {
          return {
            a: common_vendor.t(item.noticeName),
            b: item.noticeId
          };
        }),
        c: _ctx.noticeId,
        d: common_vendor.o(goToDetail, _ctx.noticeId)
      } : {
        e: common_vendor.unref(getStaticFilePath)("bin.png")
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-679563dc"]]);
wx.createPage(MiniProgramPage);
