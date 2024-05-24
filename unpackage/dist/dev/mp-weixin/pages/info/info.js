"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "info",
  setup(__props) {
    var facultyList = common_vendor.ref([
      "信息科学与技术学院",
      "东方语言文化学院",
      "中国语言文化学院",
      "亚非语言文化学院",
      "会计学院",
      "商学院",
      "国际关系学院",
      "国际商务英语学院",
      "数学与统计学院",
      "新闻与传播学院",
      "日语语言文化学院",
      "法学院",
      "社会与公共管理学院",
      "经济贸易学院",
      "艺术学院",
      "英语教育学院",
      "英语语言文化学院",
      "西方语言文化学院",
      "金融学院",
      "高级翻译学院",
      "人工智能与电子竞技学院"
    ]);
    var pickerIndex = common_vendor.ref(0);
    var formData = common_vendor.ref({
      name: "",
      studentNum: "",
      faculty: facultyList.value[pickerIndex.value],
      openId: common_vendor.index.getStorageSync("openId")
    });
    var bindPickerChange = function(e) {
      formData.value.faculty = facultyList.value[e.detail.value];
      console.log(facultyList.value[e.detail.value]);
      pickerIndex.value = e.detail.value;
    };
    var type = common_vendor.ref("center");
    var messageText = common_vendor.ref("验证失败！请重试");
    const popup = common_vendor.ref(null);
    common_vendor.onMounted(() => {
      console.log(popup.value);
    });
    var submitForm = () => {
      utils_request.request({ url: "student/info", data: formData.value, method: "POST" }).then((res) => {
        console.log(res);
        if (res.code != 200) {
          popup.value.open(type);
        } else {
          common_vendor.index.setStorage({
            data: formData.value.name,
            key: "name"
          });
          common_vendor.index.navigateTo({ url: "/pages/index/index" });
        }
      });
    };
    var showClearIconName = common_vendor.ref(false);
    var showClearIconNum = common_vendor.ref(false);
    common_vendor.ref(false);
    var clearInputName = function(e) {
      if (formData.value.name.length > 0) {
        showClearIconName.value = true;
      } else {
        showClearIconName.value = false;
      }
    };
    var clearIconName = function() {
      formData.value.name = "";
      showClearIconName.value = false;
    };
    var clearInputNum = function(e) {
      if (formData.value.studentNum.length > 0) {
        showClearIconNum.value = true;
      } else {
        showClearIconNum.value = false;
      }
    };
    var clearIconNum = function() {
      formData.value.studentNum = "";
      showClearIconNum.value = false;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o([($event) => common_vendor.unref(formData).name = $event.detail.value, (...args) => common_vendor.unref(clearInputName) && common_vendor.unref(clearInputName)(...args)]),
        b: common_vendor.unref(formData).name,
        c: common_vendor.unref(showClearIconName)
      }, common_vendor.unref(showClearIconName) ? {
        d: common_vendor.o(common_vendor.unref(clearIconName)),
        e: common_vendor.p({
          type: "close",
          size: "20"
        })
      } : {}, {
        f: common_vendor.o([($event) => common_vendor.unref(formData).studentNum = $event.detail.value, (...args) => common_vendor.unref(clearInputNum) && common_vendor.unref(clearInputNum)(...args)]),
        g: common_vendor.unref(formData).studentNum,
        h: common_vendor.unref(showClearIconNum)
      }, common_vendor.unref(showClearIconNum) ? {
        i: common_vendor.o(common_vendor.unref(clearIconNum)),
        j: common_vendor.p({
          type: "close",
          size: "20"
        })
      } : {}, {
        k: common_vendor.t(common_vendor.unref(facultyList)[common_vendor.unref(pickerIndex)]),
        l: common_vendor.unref(pickerIndex),
        m: common_vendor.unref(facultyList),
        n: common_vendor.o((...args) => common_vendor.unref(bindPickerChange) && common_vendor.unref(bindPickerChange)(...args)),
        o: common_vendor.o((...args) => common_vendor.unref(submitForm) && common_vendor.unref(submitForm)(...args)),
        p: common_vendor.t(common_vendor.unref(messageText)),
        q: common_vendor.unref(type) === "left" || common_vendor.unref(type) === "right" ? 1 : "",
        r: common_vendor.sr(popup, "5f117500-2", {
          "k": "popup"
        }),
        s: common_vendor.p({
          ["background-color"]: "#fff"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/XXX/Desktop/2023学期工作/招新小程序/enrollSystem/pages/info/info.vue"]]);
wx.createPage(MiniProgramPage);
