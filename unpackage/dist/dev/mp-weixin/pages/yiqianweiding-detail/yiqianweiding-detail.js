"use strict";
const common_vendor = require("../../common/vendor.js");
const api_checkIn = require("../../api/checkIn.js");
if (!Array) {
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_interviewDetail2 = common_vendor.resolveComponent("interviewDetail");
  (_easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _easycom_interviewDetail2)();
}
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_interviewDetail = () => "../../components/interviewDetail/interviewDetail.js";
if (!Math) {
  (_easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_interviewDetail)();
}
const _sfc_main = {
  __name: "yiqianweiding-detail",
  setup(__props) {
    var detail = common_vendor.ref();
    var checkIn = common_vendor.ref("false");
    function getNowFormatDate() {
      let date2 = /* @__PURE__ */ new Date(), year = date2.getFullYear(), month = date2.getMonth() + 1, strDate = date2.getDate();
      if (month < 10)
        month = `0${month}`;
      if (strDate < 10)
        strDate = `0${strDate}`;
      return `${year}-${month}-${strDate}`;
    }
    var date = common_vendor.ref();
    var id = 0;
    common_vendor.onLoad((options) => {
      date.value = getNowFormatDate();
      id = options.id;
      common_vendor.index.getStorageInfo({
        success: function(res) {
          if (res.keys.includes("checkIn" + id)) {
            checkIn.value = "true";
          } else {
            console.log("缓存不存在");
          }
        }
      });
      console.log(checkIn.value);
      api_checkIn.checkInDetail(options.id).then((res) => {
        console.log(res);
        detail.value = res;
      });
    });
    var result = "";
    var checkList = common_vendor.ref([{
      currentNumber: null,
      currentType: 3,
      departmentId: 1004,
      departmentName: "研发部安卓方向",
      estimatedTime: 0,
      location: "南F211",
      mineNumber: 1,
      waitingNumber: 0
    }, {
      currentNumber: null,
      currentType: 2,
      departmentId: 1004,
      departmentName: "研发部安卓方向",
      estimatedTime: 0,
      location: "南F211",
      mineNumber: 1,
      waitingNumber: 0
    }, {
      currentNumber: null,
      currentType: 1,
      departmentId: 1004,
      departmentName: "研发部安卓方向",
      estimatedTime: 0,
      location: "南F211",
      mineNumber: 1,
      waitingNumber: 0
    }, {
      currentNumber: null,
      currentType: 0,
      departmentId: 1004,
      departmentName: "研发部安卓方向",
      estimatedTime: 0,
      location: "南F211",
      mineNumber: 1,
      waitingNumber: 0
    }]);
    var yourTurn = common_vendor.ref(null);
    function getDeque() {
      common_vendor.index.request({
        url: "http://47.120.73.35:8088/quanta/recruitment_reception/check-in/deque?interview_id=" + id,
        header: {
          "content-type": "application/json",
          "Authorization": common_vendor.index.getStorageSync("token")
        }
      }).then((res) => {
        checkList.value = res.data.data;
        console.log(res.data.data);
        for (let i = 0; i < checkList.value; i++) {
          if (checkList.value[i].currentType == 2) {
            yourTurn.value.open();
          }
        }
        setTimeout(() => getDeque(), 5e3);
      });
    }
    function getScanCode() {
      common_vendor.index.scanCode({
        success(res) {
          console.log(res);
          result = res.result;
          api_checkIn.scanCode({ code: result }).then((res2) => {
            common_vendor.index.setStorageSync({
              data: true,
              key: "checkIn" + id
            });
            checkIn.value = "true";
            getDeque();
          });
        }
      });
    }
    function handleGiveUp(e) {
      console.log(e.currentTarget.dataset.dpmid);
      api_checkIn.giveUp({
        interview_id: id,
        department_id: e.currentTarget.dataset.dpmid
      }).then((res) => {
        console.log(res);
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(_ctx.dialogConfirm),
        b: common_vendor.o(_ctx.dialogClose),
        c: common_vendor.p({
          type: "info",
          showClose: false,
          confirmText: "好的",
          content: "轮到你啦~请到指定教室里面试"
        }),
        d: common_vendor.sr(yourTurn, "16c429ae-0", {
          "k": "yourTurn"
        }),
        e: common_vendor.p({
          type: "dialog"
        }),
        f: common_vendor.t(common_vendor.unref(detail).title),
        g: common_vendor.p({
          detail: common_vendor.unref(detail),
          date: common_vendor.unref(date)
        }),
        h: common_vendor.unref(checkIn) == "false"
      }, common_vendor.unref(checkIn) == "false" ? {
        i: common_vendor.o(getScanCode)
      } : {
        j: common_vendor.f(common_vendor.unref(checkList), (item, i, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.departmentName),
            b: common_vendor.t(item.mineNumber),
            c: common_vendor.t(item.currentType == 0 ? "已过号" : ""),
            d: common_vendor.t(item.currentType == 1 ? "等待中" : ""),
            e: common_vendor.t(item.currentType == 2 ? "进行中" : ""),
            f: common_vendor.t(item.currentType == 3 ? "已结束" : ""),
            g: common_vendor.t(item.waitingNumber),
            h: common_vendor.t(item.currentNumber),
            i: common_vendor.t(item.estimatedTime),
            j: common_vendor.t(item.location),
            k: item.currentType == 0
          }, item.currentType == 0 ? {
            l: common_vendor.o(getScanCode)
          } : item.currentType == 3 ? {} : item.currentType == 2 ? {} : item.currentType == 1 ? {
            p: common_vendor.o(handleGiveUp),
            q: item.departmentId
          } : {}, {
            m: item.currentType == 3,
            n: item.currentType == 2,
            o: item.currentType == 1
          });
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-16c429ae"]]);
wx.createPage(MiniProgramPage);
