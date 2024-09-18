"use strict";
const common_vendor = require("../../common/vendor.js");
const subYiqianweiding_api_api = require("../api/api.js");
const _sfc_main = {
  __name: "yiqianweiding",
  setup(__props) {
    const instance = common_vendor.getCurrentInstance();
    if (!instance) {
      throw new Error("getCurrentInstance must be called within setup or lifecycle hook.");
    }
    const getStaticFilePath = instance.appContext.config.globalProperties.$getStaticFilePath;
    function goToDetail(e) {
      const { interviewid } = e.currentTarget.dataset;
      common_vendor.index.navigateTo({ url: "/sub-yiqianweiding/yiqianweiding-detail/yiqianweiding-detail?id=" + interviewid });
    }
    var dataList = common_vendor.ref();
    var noData = common_vendor.ref(false);
    common_vendor.onLoad(() => {
      subYiqianweiding_api_api.checkInList().then((res) => {
        console.log(res);
        dataList.value = res;
        if (dataList.value.length == 0)
          noData.value = true;
      }).catch((err) => {
        if (err.data.code == 404)
          noData.value = true;
      });
    });
    function showToast(msg) {
      common_vendor.index.showToast({
        icon: "none",
        duration: 3e3,
        title: msg
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(noData) == false
      }, common_vendor.unref(noData) == false ? {
        b: common_vendor.f(common_vendor.unref(dataList), (item, i, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.startTime),
            c: item.state == 0
          }, item.state == 0 ? {
            d: common_vendor.unref(getStaticFilePath)("noStart.png"),
            e: common_vendor.unref(getStaticFilePath)("back.png"),
            f: item.interviewId,
            g: common_vendor.o(($event) => showToast("本次面试暂未开始！"), _ctx.interviewId)
          } : item.state == 1 ? {
            i: common_vendor.unref(getStaticFilePath)("endTime.png"),
            j: common_vendor.t(item.endTime),
            k: common_vendor.unref(getStaticFilePath)("back.png"),
            l: item.interviewId,
            m: common_vendor.o(goToDetail, _ctx.interviewId)
          } : item.state == 2 ? {
            o: common_vendor.unref(getStaticFilePath)("hasEnd.png"),
            p: common_vendor.unref(getStaticFilePath)("back.png"),
            q: item.interviewId,
            r: common_vendor.o(($event) => showToast("本次面试已结束！"), _ctx.interviewId)
          } : {}, {
            h: item.state == 1,
            n: item.state == 2
          });
        }),
        c: common_vendor.unref(getStaticFilePath)("startTime.png"),
        d: _ctx.interviewId
      } : {
        e: common_vendor.unref(getStaticFilePath)("bin.png")
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4cb4eb95"]]);
wx.createPage(MiniProgramPage);
