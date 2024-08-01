"use strict";
const common_vendor = require("../../common/vendor.js");
const api_profile = require("../../api/profile.js");
const api_submit = require("../../api/submit.js");
if (!Array) {
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _easycom_uni_file_picker2 + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_data_checkbox2 + _easycom_uni_forms2)();
}
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_file_picker = () => "../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_data_checkbox = () => "../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_uni_file_picker + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_data_checkbox + _easycom_uni_forms)();
}
const _sfc_main = {
  __name: "profileDetail",
  setup(__props) {
    var profileData = common_vendor.ref({});
    var from = common_vendor.ref();
    var resumeId = common_vendor.ref();
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
        resumeId.value = option.resumeId;
        api_profile.getResumeDetail(option.resumeId).then((res) => {
          profileData.value = res;
          profileData.value.getBackImage = [{
            "name": "用户头像",
            "extname": "image",
            "url": profileData.value.image
          }];
          console.log(res);
        });
      } else {
        fileList.value.url = common_vendor.index.getStorageSync("avatarUrl");
        profileData.value.name = common_vendor.index.getStorageSync("userName");
        profileData.value.faculty = common_vendor.index.getStorageSync("faculty");
        profileData.value.grade = common_vendor.index.getStorageSync("grade");
        profileData.value.studentNum = common_vendor.index.getStorageSync("studentNum");
      }
      if (option.departmentId) {
        profileData.value.department = option.departmentId;
      }
      if (option.name) {
        profileData.value.name = option.name;
      }
    });
    var save = 0;
    function ifSave(event) {
      console.log(event.detail.value);
      save = event.detail.value ? 1 : 0;
    }
    var imageStyles = common_vendor.reactive({
      height: 171,
      width: 128,
      margin: "auto",
      background: { color: "#f9e6da" },
      border: { radius: "15px" }
    });
    var hasChoose = false;
    function selectok(e) {
      console.log(e);
      profileData.value.image = e.tempFilePaths[0];
      console.log(profileData.value.image);
      hasChoose = true;
    }
    function checkProfileData() {
      if (!profileData.value.image || profileData.value.image.length == 0)
        return false;
      if (!("sex" in profileData.value))
        return false;
      if (!profileData.value.phone || profileData.value.phone.length == 0)
        return false;
      if (!profileData.value.email || profileData.value.email.length == 0)
        return false;
      if (!profileData.value.skillsAdvantages || profileData.value.skillsAdvantages.length == 0)
        return false;
      return true;
    }
    function changeResume() {
      return new Promise((resolve, reject) => {
        common_vendor.index.uploadFile({
          url: "http://47.120.73.35:8088/quanta/recruitment_reception/resume/" + resumeId.value,
          filePath: profileData.value.image,
          name: "image",
          formData: {
            "sex": profileData.value.sex,
            "department_id": profileData.value.department,
            "email": profileData.value.email,
            "phone": profileData.value.phone,
            "skill_advantages": profileData.value.skillsAdvantages,
            "others": profileData.value.others
          },
          method: "POST",
          header: { "Authorization": common_vendor.index.getStorageSync("token") },
          success(res) {
            resolve(res);
          },
          fail(err) {
            console.log(err);
            reject(err);
          }
        });
      });
    }
    function newResume() {
      return new Promise((resolve, reject) => {
        common_vendor.index.uploadFile({
          url: "http://47.120.73.35:8088/quanta/recruitment_reception/resume",
          filePath: profileData.value.image,
          name: "image",
          formData: {
            "sex": profileData.value.sex,
            "department_id": profileData.value.department,
            "email": profileData.value.email,
            "skill_advantages": profileData.value.skillsAdvantages,
            "others": profileData.value.others,
            "phone": profileData.value.phone,
            "name": profileData.value.name,
            "save": save
          },
          method: "POST",
          header: { "Authorization": common_vendor.index.getStorageSync("token") },
          success(result) {
            let res = JSON.parse(result.data).data;
            if (res) {
              resolve(res.resumeId);
            }
          },
          fail(err) {
            console.log(err);
            reject(err);
          }
        });
      });
    }
    var alertDialog = common_vendor.ref(null);
    var msgType = "info";
    function submitResume(resumeID, department) {
      if (resumeId.value && save) {
        if (!hasChoose) {
          common_vendor.index.downloadFile({
            url: profileData.value.image,
            success(res) {
              console.log(res);
              profileData.value.image = res.tempFilePath;
              changeResume().then((res2) => {
                api_submit.submit({
                  resumeId: resumeId.value,
                  departmentId: profileData.value.department
                }).then((res3) => {
                  console.log(res3);
                });
              });
            },
            fail() {
              common_vendor.index.showToast({
                icon: "none",
                duration: 3e3,
                title: "服务器错误,请稍后再试"
              });
            }
          });
        } else {
          changeResume().then((res) => {
            api_submit.submit({
              resumeId: resumeId.value,
              departmentId: profileData.value.department
            }).then((res2) => {
              console.log(res2);
            });
          });
        }
      } else if (!resumeId.value) {
        newResume().then((newResumeId) => {
          console.log(newResumeId);
          resumeId.value = newResumeId;
          api_submit.submit({
            resumeId: resumeId.value,
            departmentId: profileData.value.department
          }).then((res) => {
            console.log(res);
          });
        });
      } else {
        api_submit.submit({
          resumeId: resumeId.value,
          departmentId: profileData.value.department
        }).then((res) => {
          console.log(res);
        });
      }
    }
    function resumeAndSubmit() {
      if (!checkProfileData()) {
        common_vendor.index.showToast({
          title: "请完整填写简历！",
          icon: "error"
        });
        return;
      }
      alertDialog.value.open();
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(submitResume),
        b: common_vendor.p({
          type: common_vendor.unref(msgType),
          cancelText: "我再想想",
          confirmText: "确认投递",
          title: "是否确认投递该简历",
          content: "注:投递后无法修改或撤回"
        }),
        c: common_vendor.sr(alertDialog, "3cb8b494-0", {
          "k": "alertDialog"
        }),
        d: common_vendor.p({
          type: "dialog"
        }),
        e: common_vendor.sr("file", "3cb8b494-2"),
        f: common_vendor.o(selectok),
        g: common_vendor.o(($event) => common_vendor.unref(profileData).getBackImage = $event),
        h: common_vendor.p({
          value: common_vendor.unref(profileData).getBackImage,
          ["auto-upload"]: "false",
          limit: "1",
          ["del-icon"]: false,
          ["disable-preview"]: true,
          imageStyles: common_vendor.unref(imageStyles),
          ["file-mediatype"]: "image",
          modelValue: common_vendor.unref(profileData).getBackImage
        }),
        i: common_vendor.o(($event) => common_vendor.unref(profileData).name = $event),
        j: common_vendor.p({
          primaryColor: "#fff",
          disabled: true,
          placeholder: "请输入姓名",
          modelValue: common_vendor.unref(profileData).name
        }),
        k: common_vendor.p({
          label: "姓名"
        }),
        l: common_vendor.o(($event) => common_vendor.unref(profileData).sex = $event),
        m: common_vendor.p({
          localdata: common_vendor.unref(sexs),
          modelValue: common_vendor.unref(profileData).sex
        }),
        n: common_vendor.p({
          label: "性别"
        }),
        o: common_vendor.o(($event) => common_vendor.unref(profileData).studentNum = $event),
        p: common_vendor.p({
          primaryColor: "#fff",
          disabled: true,
          placeholder: "请输入学号",
          modelValue: common_vendor.unref(profileData).studentNum
        }),
        q: common_vendor.p({
          label: "学号"
        }),
        r: common_vendor.o(($event) => common_vendor.unref(profileData).faculty = $event),
        s: common_vendor.p({
          primaryColor: "#fff",
          disabled: true,
          modelValue: common_vendor.unref(profileData).faculty
        }),
        t: common_vendor.p({
          label: "学院"
        }),
        v: common_vendor.o(($event) => common_vendor.unref(profileData).grade = $event),
        w: common_vendor.p({
          primaryColor: "#fff",
          disabled: true,
          placeholder: "请输入年级",
          modelValue: common_vendor.unref(profileData).grade
        }),
        x: common_vendor.p({
          label: "年级"
        }),
        y: common_vendor.o(($event) => common_vendor.unref(profileData).phone = $event),
        z: common_vendor.p({
          primaryColor: "#fff",
          placeholder: "请输入电话",
          modelValue: common_vendor.unref(profileData).phone
        }),
        A: common_vendor.p({
          label: "电话"
        }),
        B: common_vendor.o(($event) => common_vendor.unref(profileData).email = $event),
        C: common_vendor.p({
          primaryColor: "#fff",
          placeholder: "请输入邮箱",
          modelValue: common_vendor.unref(profileData).email
        }),
        D: common_vendor.p({
          label: "邮箱"
        }),
        E: common_vendor.sr("form1", "3cb8b494-3"),
        F: common_vendor.p({
          rules: _ctx.customRules,
          modelValue: common_vendor.unref(profileData)
        }),
        G: common_vendor.o(($event) => common_vendor.unref(profileData).skillsAdvantages = $event),
        H: common_vendor.p({
          primaryColor: "#fff",
          type: "textarea",
          placeholder: "请输入自我介绍",
          modelValue: common_vendor.unref(profileData).skillsAdvantages
        }),
        I: common_vendor.o(($event) => common_vendor.unref(profileData).others = $event),
        J: common_vendor.p({
          primaryColor: "#fff",
          type: "textarea",
          modelValue: common_vendor.unref(profileData).others
        }),
        K: common_vendor.unref(from) == 1
      }, common_vendor.unref(from) == 1 ? {
        L: common_vendor.o(ifSave)
      } : {}, {
        M: common_vendor.unref(from) == 1
      }, common_vendor.unref(from) == 1 ? {
        N: common_vendor.o(resumeAndSubmit)
      } : {}, {
        O: common_vendor.unref(from) == 2
      }, common_vendor.unref(from) == 2 ? {} : {}, {
        P: common_vendor.unref(from) == 3
      }, common_vendor.unref(from) == 3 ? {} : {});
    };
  }
};
wx.createPage(_sfc_main);
