"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_profile = require("../../api/profile.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  _easycom_uni_easyinput2();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  _easycom_uni_easyinput();
}
const _sfc_main = {
  __name: "wodejianli",
  setup(__props) {
    let touchNum = 0;
    let isEditing = common_vendor.ref(false);
    let editText = common_vendor.ref("双击我试试看呢");
    let resumeList = common_vendor.ref([]);
    let editingId = common_vendor.ref(null);
    const handlePageTap = () => {
      console.log("页面被点击了");
      editingId.value = null;
    };
    common_vendor.onLoad(() => {
      api_profile.getResumeList().then((res) => {
        console.log(res);
        resumeList.value = res;
        console.log(resumeList.value);
      });
    });
    const startEditing = (resumeId) => {
      editingId.value = resumeId;
    };
    const stopEditing = (resumeId) => {
      if (editingId.value === resumeId) {
        editingId.value = null;
      }
    };
    function handleTap() {
      touchNum++;
      setTimeout(() => {
        if (touchNum === 1) {
          console.log("单击");
        } else if (touchNum >= 2) {
          console.log("双击");
          isEditing.value = true;
        }
        touchNum = 0;
      }, 250);
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(isEditing) ? common_vendor.unref(editText) : "双击我试试看呢"),
        b: common_vendor.o(handleTap),
        c: common_vendor.f(common_vendor.unref(resumeList), (item, i, i0) => {
          return {
            a: common_vendor.t(item.resumeName),
            b: common_vendor.o(($event) => startEditing(item.resumeId), item.resumeId),
            c: common_vendor.o(($event) => common_vendor.unref(api_profile.deleteResume)(item.resumeId), item.resumeId),
            d: common_vendor.unref(editingId) !== item.resumeId,
            e: common_vendor.o(() => {
            }, item.resumeId),
            f: common_vendor.o(($event) => stopEditing(item.resumeId), item.resumeId),
            g: "960664a1-0-" + i0,
            h: common_vendor.o(($event) => item.resumeName = $event, item.resumeId),
            i: common_vendor.p({
              primaryColor: "#fff",
              placeholder: "输入新名称",
              modelValue: item.resumeName
            }),
            j: common_vendor.unref(editingId) === item.resumeId,
            k: item.resumeId
          };
        }),
        d: common_assets._imports_0$6,
        e: common_assets._imports_1$4,
        f: common_vendor.o(handlePageTap)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-960664a1"]]);
wx.createPage(MiniProgramPage);
