"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_data_checkbox2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_data_checkbox = () => "../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_data_checkbox + _easycom_uni_forms)();
}
const _sfc_main = {
  __name: "profileDetail",
  setup(__props) {
    var profileData = common_vendor.ref({
      department: 1001,
      email: "419976407@qq.com",
      faculty: "信息科学与技术学院",
      grade: "2025届",
      image: "https://recruit-1306963863.cos.ap-guangzhou.myqcloud.com/img/4917ec13b7b6020d205610e14037d265.jpg",
      name: "张三",
      others: "热爱产品",
      phone: "17323716580",
      resumeId: 8,
      resumeName: "产品部 张三",
      sex: 0,
      skillsAdvantages: "熟悉axure",
      studentNum: 20211003333
    });
    var pickerIndex = common_vendor.ref(0);
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
    var bindPickerChange = function(e) {
      profileData.value.faculty = facultyList.value[e.detail.value];
      pickerIndex.value = e.detail.value;
    };
    var sexs = common_vendor.ref([{
      text: "男",
      value: 0
    }, {
      text: "女",
      value: 1
    }]);
    common_vendor.onLoad((option) => {
      console.log(option);
      common_vendor.index.setNavigationBarTitle({ title: option.name });
      if (option.resumeId) {
        utils_request.request({ url: "resume/" + option.resumeId }).then((res) => {
          profileData.value = res.data;
          console.log(profileData.value);
        });
      } else {
        profileData.value.name = common_vendor.index.getStorageSync("userName");
        profileData.value.faculty = common_vendor.index.getStorageSync("faculty");
        profileData.value.grade = common_vendor.index.getStorageSync("grade");
        profileData.value.studentNum = common_vendor.index.getStorageSync("studentNum");
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(profileData).image,
        b: common_vendor.o(($event) => common_vendor.unref(profileData).name = $event),
        c: common_vendor.p({
          placeholder: "请输入姓名",
          modelValue: common_vendor.unref(profileData).name
        }),
        d: common_vendor.p({
          label: "姓名"
        }),
        e: common_vendor.o(($event) => common_vendor.unref(profileData).sex = $event),
        f: common_vendor.p({
          localdata: common_vendor.unref(sexs),
          modelValue: common_vendor.unref(profileData).sex
        }),
        g: common_vendor.p({
          label: "性别"
        }),
        h: common_vendor.o(($event) => common_vendor.unref(profileData).studentNum = $event),
        i: common_vendor.p({
          placeholder: "请输入学号",
          modelValue: common_vendor.unref(profileData).studentNum
        }),
        j: common_vendor.p({
          label: "学号"
        }),
        k: common_vendor.o(($event) => common_vendor.unref(profileData).introduction = $event),
        l: common_vendor.p({
          type: "textarea",
          placeholder: "请输入自我介绍",
          modelValue: common_vendor.unref(profileData).introduction
        }),
        m: common_vendor.p({
          label: "自我介绍"
        }),
        n: common_vendor.t(common_vendor.unref(facultyList)[common_vendor.unref(pickerIndex)]),
        o: common_vendor.unref(pickerIndex),
        p: common_vendor.unref(facultyList),
        q: common_vendor.o((...args) => common_vendor.unref(bindPickerChange) && common_vendor.unref(bindPickerChange)(...args)),
        r: common_vendor.p({
          label: "自我介绍"
        }),
        s: common_vendor.sr("form1", "107d34f2-0"),
        t: common_vendor.p({
          rules: _ctx.customRules,
          modelValue: common_vendor.unref(profileData)
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-107d34f2"], ["__file", "C:/Users/XXX/Desktop/2023学期工作/招新小程序/enrollSystem/pages/profileDetail/profileDetail.vue"]]);
wx.createPage(MiniProgramPage);
