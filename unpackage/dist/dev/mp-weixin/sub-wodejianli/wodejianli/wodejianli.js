"use strict";
const common_vendor = require("../../common/vendor.js");
const subWodejianli_api_api = require("../api/api.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_easyinput2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "wodejianli",
  setup(__props) {
    const instance = common_vendor.getCurrentInstance();
    if (!instance) {
      throw new Error("getCurrentInstance must be called within setup or lifecycle hook.");
    }
    const getStaticFilePath = instance.appContext.config.globalProperties.$getStaticFilePath;
    let resumeList = common_vendor.ref([]);
    let editingId = common_vendor.ref(null);
    let nameBeforeEdit = common_vendor.ref(null);
    let msgType = common_vendor.ref("info");
    let alertDialog = common_vendor.ref(null);
    let currentDeleteId = common_vendor.ref(0);
    const goToDetail = (id, name) => {
      common_vendor.index.navigateTo({ url: "/sub-wodejianli/profileDetail/profileDetail?from=2&resumeId=" + id + "&name=" + name });
    };
    const openDeletePopup = (id) => {
      currentDeleteId.value = id;
      alertDialog.value.open();
    };
    const goToDelete = () => {
      subWodejianli_api_api.deleteResume(currentDeleteId.value).then(() => {
        return subWodejianli_api_api.getResumeList();
      }).then((res) => {
        resumeList.value = res;
      }).catch((error) => {
        console.error("Error deleting or fetching resume list:", error);
      });
    };
    const handleEdit = (resumeId) => {
      console.log("正在处理的简历id：", resumeId);
      let currentResume = resumeList.value.find((obj) => obj.resumeId === resumeId);
      if (currentResume) {
        if (nameBeforeEdit.value == currentResume.resumeName)
          console.log("没有更新名字！");
        else if (currentResume.resumeName == "") {
          currentResume.resumeName = nameBeforeEdit.value;
        } else {
          subWodejianli_api_api.ChangeResumeName(resumeId, currentResume.resumeName);
        }
      } else {
        console.log("未找到对应的对象");
      }
    };
    const handlePageTap = () => {
      if (editingId.value) {
        handleEdit(editingId.value);
        editingId.value = null;
      }
    };
    let loading = common_vendor.ref(true);
    common_vendor.onShow(() => {
      loading.value = true;
      subWodejianli_api_api.getResumeList().then((res) => {
        console.log(res);
        resumeList.value = res;
        loading.value = false;
      });
    });
    const startEditing = (resumeId, resumeName) => {
      editingId.value = resumeId;
      nameBeforeEdit.value = resumeName;
    };
    const stopEditing = (resumeId) => {
      if (editingId.value === resumeId) {
        handleEdit(resumeId);
        editingId.value = null;
      }
    };
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
      common_vendor.index.navigateTo({ url: "/sub-wodejianli/profileDetail/profileDetail?name=" + val + "&from=3" });
      inputDialog.value.close();
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(newProfileDecideName),
        b: common_vendor.f(common_vendor.unref(resumeList), (item, i, i0) => {
          return {
            a: common_vendor.t(item.resumeName),
            b: common_vendor.o(($event) => openDeletePopup(item.resumeId), item.resumeId),
            c: common_vendor.o(($event) => startEditing(item.resumeId, item.resumeName), item.resumeId),
            d: common_vendor.o(($event) => goToDetail(item.resumeId, item.resumeName), item.resumeId),
            e: common_vendor.unref(editingId) !== item.resumeId,
            f: common_vendor.o(() => {
            }, item.resumeId),
            g: common_vendor.o(($event) => stopEditing(item.resumeId), item.resumeId),
            h: "ee8529fc-0-" + i0,
            i: common_vendor.o(($event) => item.resumeName = $event, item.resumeId),
            j: common_vendor.p({
              primaryColor: "#fff",
              trim: true,
              maxlength: "15",
              placeholder: "输入新名称",
              modelValue: item.resumeName
            }),
            k: common_vendor.unref(editingId) === item.resumeId,
            l: item.resumeId
          };
        }),
        c: common_vendor.unref(getStaticFilePath)("delete.png"),
        d: common_vendor.unref(getStaticFilePath)("rename.png"),
        e: !common_vendor.unref(loading) && common_vendor.unref(resumeList).length == 0
      }, !common_vendor.unref(loading) && common_vendor.unref(resumeList).length == 0 ? {
        f: common_vendor.unref(getStaticFilePath)("bin.png")
      } : {}, {
        g: common_vendor.o(handlePageTap),
        h: common_vendor.o(goToDelete),
        i: common_vendor.p({
          type: common_vendor.unref(msgType),
          cancelText: "取消",
          confirmText: "确认",
          title: "提示",
          content: "简历删除后不可恢复,您确认要删除吗？"
        }),
        j: common_vendor.sr(alertDialog, "ee8529fc-1", {
          "k": "alertDialog"
        }),
        k: common_vendor.p({
          type: "dialog"
        }),
        l: common_vendor.sr(inputClose, "ee8529fc-4,ee8529fc-3", {
          "k": "inputClose"
        }),
        m: common_vendor.o(dialogInputConfirm),
        n: common_vendor.p({
          mode: "input",
          title: "简历命名",
          placeholder: "请输入内容"
        }),
        o: common_vendor.sr(inputDialog, "ee8529fc-3", {
          "k": "inputDialog"
        }),
        p: common_vendor.p({
          type: "dialog"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ee8529fc"]]);
wx.createPage(MiniProgramPage);
