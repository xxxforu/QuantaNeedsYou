"use strict";
const common_vendor = require("../../common/vendor.js");
const subYiqianweiding_api_api = require("../api/api.js");
if (!Array) {
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  const _easycom_interviewDetail2 = common_vendor.resolveComponent("interviewDetail");
  (_easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _easycom_uni_popup_message2 + _easycom_interviewDetail2)();
}
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _easycom_interviewDetail = () => "../../components/interviewDetail/interviewDetail.js";
if (!Math) {
  (_easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_uni_popup_message + _easycom_interviewDetail)();
}
const _sfc_main = {
  __name: "yiqianweiding-detail",
  setup(__props) {
    const instance = common_vendor.getCurrentInstance();
    if (!instance) {
      throw new Error("getCurrentInstance must be called within setup or lifecycle hook.");
    }
    const getStaticFilePath = instance.appContext.config.globalProperties.$getStaticFilePath;
    var detail = common_vendor.ref();
    var checkIn = common_vendor.ref("false");
    let type = common_vendor.ref("center");
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
    var yourTurnDpmId = 0;
    let timeoutId = null;
    let checkInMsg = common_vendor.ref("签到成功！");
    let checkInType = common_vendor.ref("success");
    const successTip = common_vendor.ref(null);
    common_vendor.onLoad((options) => {
      console.log("options:", options);
      date.value = getNowFormatDate();
      id = options.id;
      common_vendor.index.getStorage({
        key: "checkIn" + id,
        success: function(res) {
          checkIn.value = "true";
          getDeque();
        },
        fail() {
          console.log("缓存不存在");
        }
      });
      subYiqianweiding_api_api.checkInDetail(options.id).then((res) => {
        detail.value = res;
        if (res.type === 2) {
          const val = common_vendor.index.getStorageSync(detail.value.interviewId + "state");
          if (val) {
            detail.value.type = val;
          } else
            common_vendor.index.setStorageSync(detail.value.interviewId + "state", 2);
        }
        switch (detail.value.type) {
          case 0:
            detail.value.buttonText = "面试签到";
            break;
          case 1:
            detail.value.buttonText = "笔试签到";
            break;
          case 2:
            detail.value.buttonText = "笔试签到";
            break;
        }
      });
    });
    common_vendor.onUnload(() => {
      common_vendor.index.removeStorage({ key: "yourTurnDpmId" + yourTurnDpmId });
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    });
    var result = "";
    var checkList = common_vendor.ref([]);
    var yourTurn = common_vendor.ref(null);
    let errorNoList = common_vendor.ref(false);
    function getDeque() {
      clearTimeout(timeoutId);
      common_vendor.index.request({
        url: "https://qtzx.xdj666.top/quanta/recruitment_reception/check-in/deque?interview_id=" + id,
        header: {
          "content-type": "application/json",
          "Authorization": common_vendor.index.getStorageSync("token")
        }
      }).then((res) => {
        checkList.value = [];
        res.data.data.forEach((item) => {
          if (item.departmentId !== null) {
            checkList.value.push(item);
          }
        });
        if (checkList.value.length === 0) {
          errorNoList.value = true;
        } else {
          errorNoList.value = false;
          for (let i = 0; i < checkList.value.length; i++) {
            if (checkList.value[i].currentType == 2) {
              yourTurnDpmId = checkList.value[i].departmentId;
              common_vendor.index.getStorage({
                key: "yourTurnDpmId" + yourTurnDpmId,
                fail() {
                  yourTurn.value.open(type.value);
                }
              });
            }
          }
        }
        timeoutId = setTimeout(() => getDeque(), 5e3);
      });
    }
    function getScanCode() {
      common_vendor.index.scanCode({
        success(res) {
          result = res.result;
          subYiqianweiding_api_api.scanCode({ code: result }).then((res2) => {
            switch (detail.value.type) {
              case 0:
                common_vendor.index.setStorage({
                  data: true,
                  key: "checkIn" + id
                });
                checkIn.value = "true";
                getDeque();
                break;
              case 1:
                successTip.value.open();
                checkIn.value = "true";
                break;
              case 2:
                common_vendor.index.setStorageSync(detail.value.interviewId + "state", 0);
                checkIn.value = "false";
                successTip.value.open();
                detail.value.type = 0;
                detail.value.buttonText = "面试签到";
                break;
            }
          }).catch((err) => {
            if (err.data.msg.includes("过期"))
              checkIn.value = "false";
            else if (err.data.msg.includes("重复") && !common_vendor.index.getStorageSync(detail.value.interviewId + "state") === 2) {
              common_vendor.index.setStorage({
                data: true,
                key: "checkIn" + id
              });
              checkIn.value = "true";
              getDeque();
            } else if (err.data.msg.includes("重复") && common_vendor.index.getStorageSync(detail.value.interviewId + "state") === 2) {
              detail.value.buttonText = "面试签到";
            }
          });
        },
        fail(res) {
          common_vendor.index.showToast({
            icon: "none",
            duration: 3e3,
            title: "扫码失败，请重试！"
          });
        }
      });
    }
    const giveUpPopup = common_vendor.ref(null);
    let giveUpId;
    var msgType = common_vendor.ref("warn");
    function handleGiveUp(e) {
      giveUpId = e.currentTarget.dataset.dpmid;
      giveUpPopup.value.open();
    }
    function confirmGiveUp() {
      subYiqianweiding_api_api.giveUp({
        interview_id: id,
        department_id: giveUpId
      }).then((res) => {
        common_vendor.index.showToast({
          icon: "none",
          duration: 3e3,
          title: "您已放弃该面试机会"
        });
        getDeque();
      });
    }
    function change(e) {
      if (!e.show) {
        console.log(yourTurnDpmId);
        common_vendor.index.setStorage({
          data: true,
          key: "yourTurnDpmId" + yourTurnDpmId
        });
        getDeque();
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(confirmGiveUp),
        b: common_vendor.p({
          type: common_vendor.unref(msgType),
          cancelText: "取消",
          confirmText: "放弃",
          title: "提示",
          content: "您确定要放弃该面试吗？"
        }),
        c: common_vendor.sr(giveUpPopup, "5e7ac6c5-0", {
          "k": "giveUpPopup"
        }),
        d: common_vendor.p({
          type: "dialog"
        }),
        e: common_vendor.unref(type) === "left" || common_vendor.unref(type) === "right" ? 1 : "",
        f: common_vendor.sr(yourTurn, "5e7ac6c5-2", {
          "k": "yourTurn"
        }),
        g: common_vendor.o(change),
        h: common_vendor.p({
          ["background-color"]: "#fff"
        }),
        i: common_vendor.p({
          type: common_vendor.unref(checkInType),
          message: common_vendor.unref(checkInMsg),
          duration: 2e3
        }),
        j: common_vendor.sr(successTip, "5e7ac6c5-3", {
          "k": "successTip"
        }),
        k: common_vendor.p({
          type: "message"
        }),
        l: common_vendor.t(common_vendor.unref(detail).title),
        m: common_vendor.p({
          detail: common_vendor.unref(detail),
          date: common_vendor.unref(date)
        }),
        n: common_vendor.unref(checkIn) == "false"
      }, common_vendor.unref(checkIn) == "false" ? {
        o: common_vendor.t(common_vendor.unref(detail).buttonText),
        p: common_vendor.o(getScanCode)
      } : {
        q: common_vendor.f(common_vendor.unref(checkList), (item, i, i0) => {
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
            l: common_vendor.o(getScanCode, _ctx.departmentId)
          } : item.currentType == 3 ? {} : item.currentType == 2 ? {} : item.currentType == 1 ? {
            p: common_vendor.o(handleGiveUp, _ctx.departmentId),
            q: item.departmentId
          } : {}, {
            m: item.currentType == 3,
            n: item.currentType == 2,
            o: item.currentType == 1
          });
        }),
        r: _ctx.departmentId
      }, {
        s: common_vendor.unref(errorNoList)
      }, common_vendor.unref(errorNoList) ? {
        t: common_vendor.unref(getStaticFilePath)("bin.png")
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5e7ac6c5"]]);
wx.createPage(MiniProgramPage);
