"use strict";
const common_vendor = require("../../common/vendor.js");
const subTajiuzhaoni_api_api = require("../api/api.js");
const _sfc_main = {
  __name: "schduleIndex",
  setup(__props) {
    const instance = common_vendor.getCurrentInstance();
    if (!instance) {
      throw new Error("getCurrentInstance must be called within setup or lifecycle hook.");
    }
    const getStaticFilePath = instance.appContext.config.globalProperties.$getStaticFilePath;
    var interviewRecordListDtos = common_vendor.ref();
    var lastIndex = common_vendor.ref();
    var departmentName = common_vendor.ref("");
    common_vendor.onLoad((option) => {
      console.log(option.id);
      subTajiuzhaoni_api_api.schedule({ department_id: option.id }).then((res) => {
        console.log(res.departmentName);
        departmentName.value = res.departmentName;
        interviewRecordListDtos.value = res.interviewRecordListDtos;
        lastIndex.value = interviewRecordListDtos.value.length - 1;
      });
    });
    var interviewRoundCN = common_vendor.ref(["0", "一面", "二面", "三面", "四面", "五面"]);
    function goToDetail(e) {
      const { id } = e.currentTarget.dataset;
      console.log(e.currentTarget.dataset);
      common_vendor.index.navigateTo({ url: "/sub-tajiuzhaoni/schduleDetail/schduleDetail?id=" + id });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(getStaticFilePath)("scheduleBanner.png"),
        b: common_vendor.t(common_vendor.unref(departmentName)),
        c: common_vendor.unref(getStaticFilePath)("pass.png"),
        d: common_vendor.f(common_vendor.unref(interviewRecordListDtos), (item, i, i0) => {
          return common_vendor.e({
            a: item.result == 2
          }, item.result == 2 ? {
            b: common_vendor.unref(getStaticFilePath)("pass.png")
          } : item.result == 1 ? {
            d: common_vendor.unref(getStaticFilePath)("unpass.png")
          } : {
            e: common_vendor.unref(getStaticFilePath)("end.png")
          }, {
            c: item.result == 1,
            f: item.result == 2
          }, item.result == 2 ? {
            g: common_vendor.unref(getStaticFilePath)("solidLine.png")
          } : {
            h: common_vendor.unref(getStaticFilePath)("dotLine.png")
          }, {
            i: common_vendor.t(common_vendor.unref(interviewRoundCN)[item.round]),
            j: item.noticeId
          }, item.noticeId ? {
            k: common_vendor.o(goToDetail, _ctx.round),
            l: item.noticeId
          } : {});
        }),
        e: _ctx.round,
        f: common_vendor.unref(interviewRecordListDtos)[common_vendor.unref(lastIndex)].result == 2
      }, common_vendor.unref(interviewRecordListDtos)[common_vendor.unref(lastIndex)].result == 2 ? {
        g: common_vendor.unref(getStaticFilePath)("pass.png")
      } : {
        h: common_vendor.unref(getStaticFilePath)("end.png")
      }, {
        i: common_vendor.unref(interviewRecordListDtos)[common_vendor.unref(lastIndex)].result == 2
      }, common_vendor.unref(interviewRecordListDtos)[common_vendor.unref(lastIndex)].result == 2 ? {
        j: common_vendor.unref(getStaticFilePath)("solidLine.png")
      } : {
        k: common_vendor.unref(getStaticFilePath)("dotLine.png")
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9f0279a5"]]);
wx.createPage(MiniProgramPage);
