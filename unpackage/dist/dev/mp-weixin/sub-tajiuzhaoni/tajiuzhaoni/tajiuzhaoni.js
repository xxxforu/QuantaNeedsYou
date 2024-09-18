"use strict";
const common_vendor = require("../../common/vendor.js");
const subTajiuzhaoni_api_api = require("../api/api.js");
if (!Array) {
  const _easycom_departmentLine2 = common_vendor.resolveComponent("departmentLine");
  const _easycom_profileLine2 = common_vendor.resolveComponent("profileLine");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  (_easycom_departmentLine2 + _easycom_profileLine2 + _easycom_uni_popup2 + _easycom_uni_popup_dialog2)();
}
const _easycom_departmentLine = () => "../../components/departmentLine/departmentLine.js";
const _easycom_profileLine = () => "../../components/profileLine/profileLine.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
if (!Math) {
  (_easycom_departmentLine + _easycom_profileLine + _easycom_uni_popup + _easycom_uni_popup_dialog)();
}
const _sfc_main = {
  __name: "tajiuzhaoni",
  setup(__props) {
    const instance = common_vendor.getCurrentInstance();
    if (!instance) {
      throw new Error("getCurrentInstance must be called within setup or lifecycle hook.");
    }
    const getStaticFilePath = instance.appContext.config.globalProperties.$getStaticFilePath;
    var isNotDeliver = common_vendor.ref(true);
    var type = common_vendor.ref("center");
    common_vendor.ref("");
    var openProfile = common_vendor.ref(null);
    var profileListEmpty = common_vendor.ref(null);
    var departmentEmpty = common_vendor.ref(false);
    var deliveryEmpty = common_vendor.ref(true);
    common_vendor.ref();
    var departmentList = common_vendor.ref([]);
    var profileList = common_vendor.ref([]);
    function getDepartment(isRefresh, hasSubmitted) {
      isNotDeliver.value = !hasSubmitted;
      subTajiuzhaoni_api_api.department({ hasSubmitted }).then((res) => {
        console.log(res);
        if (!hasSubmitted && res.length === 0) {
          departmentEmpty.value = true;
        }
        if (hasSubmitted && res.length) {
          deliveryEmpty.value = false;
        }
        departmentList.value = res;
        if (isRefresh)
          common_vendor.index.stopPullDownRefresh();
      }).catch((error) => {
        if (error.data.code == 402) {
          departmentEmpty.value = true;
        }
        console.log(error);
      });
    }
    common_vendor.onPullDownRefresh(() => {
      getDepartment(true, !isNotDeliver.value);
    });
    common_vendor.onShow(() => {
      getDepartment(false, false);
    });
    common_vendor.onLoad(() => {
      common_vendor.index.setStorage({
        key: "haveEnterTajiuzhaoni",
        data: true
      });
      getProfileList();
    });
    common_vendor.onReady(() => {
      var tabBarHeight = common_vendor.ref(0);
      common_vendor.index.createSelectorQuery().select(".tabBar").boundingClientRect((data) => {
        console.log(data);
        tabBarHeight.value = data.height;
      }).exec();
    });
    var chooseDepartmentId = 0;
    function getProfileList() {
      subTajiuzhaoni_api_api.getResumeList().then((res) => {
        profileList.value = res;
        console.log(profileList.value);
      });
    }
    function deliverProfile(id) {
      getProfileList();
      chooseDepartmentId = id;
      if (profileList.value.length != 0) {
        openProfile.value.open("center");
      } else {
        profileListEmpty.value.open("center");
      }
    }
    common_vendor.ref("名字");
    var inputDialog = common_vendor.ref(null);
    function newProfileDecideName() {
      inputDialog.value.open();
    }
    const inputClose = common_vendor.ref(null);
    function dialogInputConfirm(val) {
      if (val == "") {
        common_vendor.index.showToast({
          title: "请命名简历！",
          icon: "error"
        });
        return;
      }
      inputClose.value.val = "";
      openProfile.value.close();
      common_vendor.index.navigateTo({
        url: "/sub-wodejianli/profileDetail/profileDetail?name=" + val + "&from=1&departmentId=" + chooseDepartmentId
      });
      inputDialog.value.close();
    }
    function chooseProfile(name, id) {
      console.log(name);
      openProfile.value.close();
      common_vendor.index.navigateTo({
        url: "/sub-wodejianli/profileDetail/profileDetail?name=" + name + "&departmentId=" + chooseDepartmentId + "&resumeId=" + id + "&from=1"
      });
    }
    function goTOSchduleIndex(id) {
      common_vendor.index.navigateTo({ url: "/sub-tajiuzhaoni/schduleIndex/schduleIndex?id=" + id });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(isNotDeliver) == true ? 1 : "",
        b: common_vendor.o(($event) => getDepartment(true, false)),
        c: common_vendor.unref(isNotDeliver) == false ? 1 : "",
        d: common_vendor.o(($event) => getDepartment(true, true)),
        e: common_vendor.unref(departmentEmpty)
      }, common_vendor.unref(departmentEmpty) ? {} : {}, {
        f: !common_vendor.unref(departmentEmpty)
      }, !common_vendor.unref(departmentEmpty) ? {
        g: common_vendor.f(common_vendor.unref(departmentList), (item, k0, i0) => {
          return {
            a: item.departmentId,
            b: common_vendor.o(deliverProfile, item.departmentId),
            c: "22f99d84-0-" + i0,
            d: common_vendor.p({
              title: item.name,
              id: item.departmentId
            }),
            e: item.departmentId
          };
        })
      } : {}, {
        h: common_vendor.unref(isNotDeliver),
        i: common_vendor.unref(deliveryEmpty)
      }, common_vendor.unref(deliveryEmpty) ? {} : {}, {
        j: !common_vendor.unref(deliveryEmpty)
      }, !common_vendor.unref(deliveryEmpty) ? {
        k: common_vendor.f(common_vendor.unref(departmentList), (item, k0, i0) => {
          return {
            a: item.departmentId,
            b: common_vendor.o(goTOSchduleIndex, item.departmentId),
            c: "22f99d84-1-" + i0,
            d: common_vendor.p({
              title: item.name,
              id: item.departmentId
            }),
            e: item.departmentId
          };
        })
      } : {}, {
        l: !common_vendor.unref(isNotDeliver),
        m: common_vendor.f(common_vendor.unref(profileList), (item, k0, i0) => {
          return {
            a: item.resumeId,
            b: common_vendor.o(chooseProfile, item.resumeId),
            c: "22f99d84-3-" + i0 + ",22f99d84-2",
            d: common_vendor.p({
              name: item.resumeName,
              id: item.resumeId
            }),
            e: item.resumeId
          };
        }),
        n: common_vendor.o(newProfileDecideName),
        o: common_vendor.unref(type) === "left" || common_vendor.unref(type) === "right" ? 1 : "",
        p: common_vendor.sr(openProfile, "22f99d84-2", {
          "k": "openProfile"
        }),
        q: common_vendor.p({
          ["background-color"]: "#fff"
        }),
        r: common_vendor.unref(getStaticFilePath)("bin.png"),
        s: common_vendor.o(newProfileDecideName),
        t: common_vendor.unref(type) === "left" || common_vendor.unref(type) === "right" ? 1 : "",
        v: common_vendor.sr(profileListEmpty, "22f99d84-4", {
          "k": "profileListEmpty"
        }),
        w: common_vendor.p({
          ["background-color"]: "#fff"
        }),
        x: common_vendor.sr(inputClose, "22f99d84-6,22f99d84-5", {
          "k": "inputClose"
        }),
        y: common_vendor.o(dialogInputConfirm),
        z: common_vendor.p({
          mode: "input",
          title: "简历命名",
          placeholder: "请输入内容"
        }),
        A: common_vendor.sr(inputDialog, "22f99d84-5", {
          "k": "inputDialog"
        }),
        B: common_vendor.p({
          type: "dialog"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-22f99d84"]]);
wx.createPage(MiniProgramPage);
