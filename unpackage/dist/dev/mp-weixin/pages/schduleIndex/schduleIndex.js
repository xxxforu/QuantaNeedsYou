"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_submit = require("../../api/submit.js");
const _sfc_main = {
  __name: "schduleIndex",
  setup(__props) {
    var interviewRecordListDtos = common_vendor.ref();
    var lastIndex = common_vendor.ref();
    common_vendor.onLoad((option) => {
      console.log(option.id);
      api_submit.schedule({ department_id: option.id }).then((res) => {
        console.log(res);
        interviewRecordListDtos.value = res.interviewRecordListDtos;
        lastIndex.value = interviewRecordListDtos.value.length - 1;
      });
    });
    var interviewRoundCN = common_vendor.ref(["0", "一面", "二面", "三面", "四面", "五面"]);
    function goToDetail(e) {
      const { id } = e.currentTarget.dataset;
      console.log(e.currentTarget.dataset);
      common_vendor.index.navigateTo({ url: "/pages/schduleDetail/schduleDetail?id=" + id });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$8,
        b: common_vendor.t(_ctx.departmentName),
        c: common_assets._imports_1$5,
        d: common_vendor.f(common_vendor.unref(interviewRecordListDtos), (item, i, i0) => {
          return common_vendor.e({
            a: item.result == 2
          }, item.result == 2 ? {
            b: common_assets._imports_1$5
          } : item.result == 1 ? {
            d: common_assets._imports_2$2
          } : item.result === null ? {
            f: common_assets._imports_3$1
          } : {}, {
            c: item.result == 1,
            e: item.result === null,
            g: item.result == 2
          }, item.result == 2 ? {
            h: common_assets._imports_4$1
          } : {
            i: common_assets._imports_5$1
          }, {
            j: common_vendor.t(common_vendor.unref(interviewRoundCN)[item.round]),
            k: item.noticeId
          }, item.noticeId ? {
            l: common_vendor.o(goToDetail, _ctx.round),
            m: item.noticeId
          } : {});
        }),
        e: _ctx.round,
        f: common_vendor.unref(interviewRecordListDtos)[common_vendor.unref(lastIndex)].result == 2
      }, common_vendor.unref(interviewRecordListDtos)[common_vendor.unref(lastIndex)].result == 2 ? {
        g: common_assets._imports_1$5
      } : {
        h: common_assets._imports_3$1
      }, {
        i: common_vendor.unref(interviewRecordListDtos)[common_vendor.unref(lastIndex)].result == 2
      }, common_vendor.unref(interviewRecordListDtos)[common_vendor.unref(lastIndex)].result == 2 ? {
        j: common_assets._imports_4$1
      } : {
        k: common_assets._imports_5$1
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fb0d6461"]]);
wx.createPage(MiniProgramPage);
