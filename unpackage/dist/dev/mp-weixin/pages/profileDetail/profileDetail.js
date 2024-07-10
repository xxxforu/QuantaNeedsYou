"use strict";
const common_vendor = require("../../common/vendor.js");
const api_profile = require("../../api/profile.js");
const utils_request = require("../../utils/request.js");
if (!Array) {
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_file_picker2 + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_data_checkbox2 + _easycom_uni_forms2)();
}
const _easycom_uni_file_picker = () => "../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_data_checkbox = () => "../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_file_picker + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_data_checkbox + _easycom_uni_forms)();
}
const _sfc_main = {
  __name: "profileDetail",
  setup(__props) {
    var profileData = common_vendor.ref({});
    var from = common_vendor.ref();
    common_vendor.ref(0);
    common_vendor.ref([
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
    var fileList = common_vendor.ref({
      url: "",
      extname: "png",
      name: "avatur.png"
    });
    var sexs = common_vendor.ref([{
      text: "男",
      value: 0
    }, {
      text: "女",
      value: 1
    }]);
    common_vendor.onLoad((option) => {
      console.log(option);
      from.value = option.from;
      common_vendor.index.setNavigationBarTitle({ title: option.name });
      if (option.resumeId) {
        option.resumeId;
        utils_request.request({ url: "resume/" + option.resumeId }).then((res) => {
          profileData.value = res.data;
          console.log(profileData.value);
        });
      } else {
        fileList.value.url = common_vendor.index.getStorageSync("avatarUrl");
        profileData.value.name = common_vendor.index.getStorageSync("userName");
        profileData.value.faculty = common_vendor.index.getStorageSync("faculty");
        profileData.value.grade = common_vendor.index.getStorageSync("grade");
        profileData.value.studentNum = common_vendor.index.getStorageSync("studentNum");
      }
      if (option.department) {
        profileData.value.department = option.department;
      }
    });
    function ifSave(event) {
      console.log(event.detail.value);
    }
    var imageStyles = common_vendor.reactive({
      height: 171,
      width: 128,
      margin: "auto",
      background: { color: "#f9e6da" },
      border: { radius: "15px" }
    });
    function selectok(e) {
      profileData.value.image = e.tempFiles[0].file;
    }
    function checkProfileData() {
      if (profileData.value.image && profileData.value.sex && profileData.value.phone && profileData.value.email && profileData.value.skillsAdvantages && profileData.value.others)
        return true;
      else
        return false;
    }
    function resumeAndSubmit() {
      if (checkProfileData()) {
        console.log(api_profile.resume);
        api_profile.resume(resumeId, profileData.value).then((res) => {
          console.log(res);
        });
      } else
        console.log(profileData.value);
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.sr("file", "3cb8b494-0"),
        b: common_vendor.o(selectok),
        c: common_vendor.p({
          value: common_vendor.unref(fileList),
          ["auto-upload"]: "false",
          limit: "1",
          ["del-icon"]: false,
          ["disable-preview"]: true,
          imageStyles: common_vendor.unref(imageStyles),
          ["file-mediatype"]: "image"
        }),
        d: common_vendor.o(($event) => common_vendor.unref(profileData).name = $event),
        e: common_vendor.p({
          disabled: true,
          placeholder: "请输入姓名",
          modelValue: common_vendor.unref(profileData).name
        }),
        f: common_vendor.p({
          label: "姓名"
        }),
        g: common_vendor.o(($event) => common_vendor.unref(profileData).sex = $event),
        h: common_vendor.p({
          localdata: common_vendor.unref(sexs),
          modelValue: common_vendor.unref(profileData).sex
        }),
        i: common_vendor.p({
          label: "性别"
        }),
        j: common_vendor.o(($event) => common_vendor.unref(profileData).studentNum = $event),
        k: common_vendor.p({
          disabled: true,
          placeholder: "请输入学号",
          modelValue: common_vendor.unref(profileData).studentNum
        }),
        l: common_vendor.p({
          label: "学号"
        }),
        m: common_vendor.o(($event) => common_vendor.unref(profileData).faculty = $event),
        n: common_vendor.p({
          disabled: true,
          modelValue: common_vendor.unref(profileData).faculty
        }),
        o: common_vendor.p({
          label: "学院"
        }),
        p: common_vendor.o(($event) => common_vendor.unref(profileData).grade = $event),
        q: common_vendor.p({
          disabled: true,
          placeholder: "请输入年级",
          modelValue: common_vendor.unref(profileData).grade
        }),
        r: common_vendor.p({
          label: "年级"
        }),
        s: common_vendor.o(($event) => common_vendor.unref(profileData).phone = $event),
        t: common_vendor.p({
          placeholder: "请输入电话",
          modelValue: common_vendor.unref(profileData).phone
        }),
        v: common_vendor.p({
          label: "电话"
        }),
        w: common_vendor.o(($event) => common_vendor.unref(profileData).email = $event),
        x: common_vendor.p({
          placeholder: "请输入邮箱",
          modelValue: common_vendor.unref(profileData).email
        }),
        y: common_vendor.p({
          label: "邮箱"
        }),
        z: common_vendor.sr("form1", "3cb8b494-1"),
        A: common_vendor.p({
          rules: _ctx.customRules,
          modelValue: common_vendor.unref(profileData)
        }),
        B: common_vendor.o(($event) => common_vendor.unref(profileData).skillsAdvantages = $event),
        C: common_vendor.p({
          type: "textarea",
          placeholder: "请输入自我介绍",
          modelValue: common_vendor.unref(profileData).skillsAdvantages
        }),
        D: common_vendor.o(($event) => common_vendor.unref(profileData).others = $event),
        E: common_vendor.p({
          type: "textarea",
          modelValue: common_vendor.unref(profileData).others
        }),
        F: common_vendor.unref(from) == 1
      }, common_vendor.unref(from) == 1 ? {
        G: common_vendor.o(ifSave)
      } : {}, {
        H: common_vendor.unref(from) == 1
      }, common_vendor.unref(from) == 1 ? {
        I: common_vendor.o(resumeAndSubmit)
      } : {}, {
        J: common_vendor.unref(from) == 2
      }, common_vendor.unref(from) == 2 ? {} : {}, {
        K: common_vendor.unref(from) == 3
      }, common_vendor.unref(from) == 3 ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/XXX/Desktop/2023学期工作/招新小程序/enrollSystem/pages/profileDetail/profileDetail.vue"]]);
wx.createPage(MiniProgramPage);
