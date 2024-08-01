"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_checkIn = require("../../api/checkIn.js");
const _sfc_main = {
  __name: "yiqianweiding",
  setup(__props) {
    function goToDetail(e) {
      const { interviewid } = e.currentTarget.dataset;
      common_vendor.index.navigateTo({ url: "/pages/yiqianweiding-detail/yiqianweiding-detail?id=" + interviewid });
    }
    var dataList = common_vendor.ref();
    common_vendor.onLoad(() => {
      api_checkIn.checkInList().then((res) => {
        dataList.value = res;
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(dataList), (item, i, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.startTime),
            c: item.state == 0
          }, item.state == 0 ? {
            d: common_assets._imports_1$3,
            e: common_assets._imports_0$1,
            f: item.interviewId,
            g: common_vendor.o(goToDetail, _ctx.interviewId)
          } : item.state == 1 ? {
            i: common_assets._imports_2$1,
            j: common_vendor.t(item.endTime),
            k: common_assets._imports_0$1,
            l: item.interviewId,
            m: common_vendor.o(goToDetail, _ctx.interviewId)
          } : item.state == 2 ? {
            o: common_assets._imports_3,
            p: common_assets._imports_0$1,
            q: item.interviewId,
            r: common_vendor.o(goToDetail, _ctx.interviewId)
          } : {}, {
            h: item.state == 1,
            n: item.state == 2
          });
        }),
        b: common_assets._imports_0$5,
        c: _ctx.interviewId
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cfc355ab"]]);
wx.createPage(MiniProgramPage);
