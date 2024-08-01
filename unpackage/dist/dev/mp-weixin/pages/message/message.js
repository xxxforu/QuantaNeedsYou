"use strict";
const common_vendor = require("../../common/vendor.js");
const api_notice = require("../../api/notice.js");
const _sfc_main = {
  __name: "message",
  setup(__props) {
    var noticeList = common_vendor.ref();
    common_vendor.onLoad(() => {
      api_notice.getNoticeList().then((res) => {
        noticeList.value = res;
      });
    });
    function goToDetail(e) {
      const { id } = e.currentTarget.dataset;
      console.log(e.currentTarget.dataset);
      common_vendor.index.navigateTo({ url: "/pages/schduleDetail/schduleDetail?id=" + id });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(noticeList), (item, i, i0) => {
          return {
            a: common_vendor.t(item.noticeName),
            b: item.noticeId
          };
        }),
        b: _ctx.noticeId,
        c: common_vendor.o(goToDetail, _ctx.noticeId)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4c1b26cf"]]);
wx.createPage(MiniProgramPage);
