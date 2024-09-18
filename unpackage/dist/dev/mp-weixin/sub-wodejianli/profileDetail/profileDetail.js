"use strict";
const common_vendor = require("../../common/vendor.js");
const subWodejianli_api_api = require("../api/api.js");
if (!Array) {
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  (_easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _easycom_uni_file_picker2 + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_data_checkbox2 + _easycom_uni_forms2 + _easycom_uni_popup_message2)();
}
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_file_picker = () => "../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_data_checkbox = () => "../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
if (!Math) {
  (_easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_uni_file_picker + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_data_checkbox + _easycom_uni_forms + _easycom_uni_popup_message)();
}
const _sfc_main = {
  __name: "profileDetail",
  setup(__props) {
    var profileData = common_vendor.ref({});
    var from = common_vendor.ref();
    var resumeId = common_vendor.ref();
    let message = common_vendor.ref(null);
    let type = common_vendor.ref("success");
    let msg = common_vendor.ref("修改成功！");
    common_vendor.ref(0);
    let isLoading = false;
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
    var currentDpm = 0;
    common_vendor.onLoad((option) => {
      console.log(option);
      from.value = option.from;
      common_vendor.index.setNavigationBarTitle({ title: option.name });
      profileData.value.resumeName = option.name;
      if (option.resumeId) {
        resumeId.value = option.resumeId;
        subWodejianli_api_api.getResumeDetail(option.resumeId).then((res) => {
          profileData.value = res;
          if (profileData.value.others.includes("Undefined")) {
            profileData.value.others = "";
          }
          profileData.value.getBackImage = [{
            "name": "用户头像",
            "extname": "image",
            "url": profileData.value.image
          }];
        });
      } else {
        fileList.value.url = common_vendor.index.getStorageSync("avatarUrl");
      }
      profileData.value.name = common_vendor.index.getStorageSync("userName");
      profileData.value.faculty = common_vendor.index.getStorageSync("faculty");
      profileData.value.grade = common_vendor.index.getStorageSync("grade");
      profileData.value.studentNum = common_vendor.index.getStorageSync("studentNum");
      if (option.departmentId) {
        profileData.value.department = option.departmentId;
        currentDpm = option.departmentId;
      }
      console.log(currentDpm);
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
    function regCheck() {
      var phoneReg = /^1[3456789]\d{9}$/;
      var emailReg = /^([a-zA-Z0-9_]-*\.*)+@([a-zA-Z0-9_]-?)+(\.[a-zA-Z]{2,3}){1,2}$/;
      if (phoneReg.test(profileData.value.phone) && emailReg.test(profileData.value.email)) {
        return "合法";
      } else if (!phoneReg.test(profileData.value.phone)) {
        return "手机号格式错误！";
      } else if (!emailReg.test(profileData.value.email)) {
        return "验邮箱格式错误！";
      }
    }
    function handleSubmit() {
      subWodejianli_api_api.submit({
        resumeId: resumeId.value - 0,
        departmentId: currentDpm - 0
      }).then((res) => {
        msg.value = "提交成功！";
        message.value.open();
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 2e3);
      });
    }
    function changeResume() {
      if (isLoading)
        return Promise.reject("isLoading");
      if (!checkProfileData()) {
        common_vendor.index.showToast({
          title: "请完整填写简历！",
          icon: "error"
        });
        return Promise.reject("Incomplete profile data");
      }
      let checkMsg = regCheck();
      if (checkMsg !== "合法") {
        common_vendor.index.showToast({
          title: checkMsg,
          icon: "error"
        });
        return Promise.reject(checkMsg);
      }
      return new Promise((resolve, reject2) => {
        isLoading = true;
        common_vendor.index.uploadFile({
          url: "https://qtzx.xdj666.top/quanta/recruitment_reception/resume/" + resumeId.value,
          filePath: profileData.value.image,
          name: "image",
          formData: {
            "sex": profileData.value.sex,
            "department_id": currentDpm,
            "email": profileData.value.email,
            "phone": profileData.value.phone,
            "skill_advantages": profileData.value.skillsAdvantages,
            "others": profileData.value.others || ""
          },
          method: "POST",
          header: { "Authorization": common_vendor.index.getStorageSync("token") },
          success(res) {
            resolve(res);
            isLoading = false;
          },
          fail(err) {
            isLoading = false;
            console.log(err);
            reject2(err);
          }
        });
      });
    }
    function newResume() {
      if (!checkProfileData()) {
        common_vendor.index.showToast({
          title: "请完整填写简历！",
          icon: "error"
        });
        return Promise.reject("Incomplete profile data");
      }
      let checkMsg = regCheck();
      if (checkMsg !== "合法") {
        common_vendor.index.showToast({
          title: checkMsg,
          icon: "error"
        });
        return Promise.reject(checkMsg);
      }
      return new Promise((resolve, reject2) => {
        common_vendor.index.uploadFile({
          url: "https://qtzx.xdj666.top/quanta/recruitment_reception/resume",
          filePath: profileData.value.image,
          name: "image",
          formData: {
            "sex": profileData.value.sex,
            "department_id": currentDpm,
            "email": profileData.value.email,
            "skill_advantages": profileData.value.skillsAdvantages,
            "others": profileData.value.others || "",
            "phone": profileData.value.phone,
            "name": profileData.value.resumeName,
            "save": save
          },
          method: "POST",
          header: { "Authorization": common_vendor.index.getStorageSync("token") },
          success(result) {
            console.log(currentDpm);
            console.log(result);
            let res = JSON.parse(result.data).data;
            if (res) {
              resolve(res.resumeId);
            }
          },
          fail(err) {
            console.log(err);
            reject2(err);
          }
        });
      });
    }
    var alertDialog = common_vendor.ref(null);
    var msgType = "info";
    function submitResume(resumeID, department) {
      if (!checkProfileData()) {
        common_vendor.index.showToast({
          title: "请完整填写简历！",
          icon: "error"
        });
        return Promise.reject("Incomplete profile data");
      }
      let checkMsg = regCheck();
      if (checkMsg !== "合法") {
        common_vendor.index.showToast({
          title: checkMsg,
          icon: "error"
        });
        return Promise.reject(checkMsg);
      }
      if (resumeId.value && save) {
        if (!hasChoose) {
          isLoading = true;
          common_vendor.index.downloadFile({
            url: profileData.value.image,
            success(res) {
              console.log(res);
              isLoading = false;
              profileData.value.image = res.tempFilePath;
              changeResume().then((res2) => {
                handleSubmit();
              });
            },
            fail() {
              isLoading = false;
              common_vendor.index.showToast({
                icon: "none",
                duration: 3e3,
                title: "服务器错误,请稍后再试"
              });
            }
          });
        } else {
          changeResume().then((res) => {
            handleSubmit();
          });
        }
      } else if (!resumeId.value) {
        newResume().then((newResumeId) => {
          console.log(newResumeId);
          resumeId.value = newResumeId;
          handleSubmit();
        });
      } else {
        handleSubmit();
      }
    }
    function resumeAndSubmit() {
      if (!checkProfileData()) {
        common_vendor.index.showToast({
          title: "请完整填写简历！",
          icon: "error"
        });
        return Promise.reject("Incomplete profile data");
      }
      let checkMsg = regCheck();
      if (checkMsg !== "合法") {
        common_vendor.index.showToast({
          title: checkMsg,
          icon: "error"
        });
        return Promise.reject(checkMsg);
      }
      alertDialog.value.open();
    }
    function completeChange() {
      if (isLoading)
        return;
      if (!hasChoose) {
        isLoading = true;
        common_vendor.index.downloadFile({
          url: profileData.value.image,
          success(res) {
            isLoading = false;
            profileData.value.image = res.tempFilePath;
            changeResume().then((res2) => {
              if (JSON.parse(res2.data).code) {
                msg.value = "修改成功！";
                message.value.open();
                setTimeout(() => {
                  common_vendor.index.navigateBack();
                }, 1e3);
              }
            }).catch((err) => {
              console.log(err);
              isLoading = false;
            });
          },
          fail() {
            isLoading = false;
            common_vendor.index.showToast({
              icon: "none",
              duration: 3e3,
              title: "服务器错误,请稍后再试"
            });
          }
        });
      } else {
        changeResume();
      }
    }
    let ifHaveChanged = common_vendor.ref(false);
    function haveChange() {
      ifHaveChanged.value = true;
    }
    function createProfile() {
      if (isLoading)
        return Promise.reject("isLoading");
      if (!checkProfileData()) {
        common_vendor.index.showToast({
          title: "请完整填写简历！",
          icon: "error"
        });
        return Promise.reject("请完整检查简历");
      }
      let checkMsg = regCheck();
      if (checkMsg !== "合法") {
        common_vendor.index.showToast({
          title: checkMsg,
          icon: "error"
        });
        return Promise.reject(checkMsg);
      }
      isLoading = true;
      common_vendor.index.showLoading({ title: "加载中" });
      console.log(profileData.value.others || "");
      common_vendor.index.uploadFile({
        url: "https://qtzx.xdj666.top/quanta/recruitment_reception/resume",
        filePath: profileData.value.image,
        name: "image",
        formData: {
          "sex": profileData.value.sex,
          "email": profileData.value.email,
          "skill_advantages": profileData.value.skillsAdvantages,
          "others": profileData.value.others || "",
          "phone": profileData.value.phone,
          "name": profileData.value.resumeName,
          "save": 1
        },
        method: "POST",
        header: { "Authorization": common_vendor.index.getStorageSync("token") },
        success(result) {
          isLoading = false;
          common_vendor.index.hideLoading();
          let res = JSON.parse(result.data);
          if (res.code == 200) {
            msg.value = "创建成功！";
            message.value.open();
            setTimeout(() => {
              common_vendor.index.navigateBack();
            }, 2e3);
          }
        },
        fail(err) {
          isLoading = false;
          console.log(err);
          common_vendor.index.hideLoading();
          reject(err);
        }
      });
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
        c: common_vendor.sr(alertDialog, "205f1dd9-0", {
          "k": "alertDialog"
        }),
        d: common_vendor.p({
          type: "dialog"
        }),
        e: common_vendor.sr("file", "205f1dd9-2"),
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
        l: common_vendor.o(haveChange),
        m: common_vendor.o(($event) => common_vendor.unref(profileData).sex = $event),
        n: common_vendor.p({
          localdata: common_vendor.unref(sexs),
          modelValue: common_vendor.unref(profileData).sex
        }),
        o: common_vendor.p({
          label: "性别"
        }),
        p: common_vendor.o(($event) => common_vendor.unref(profileData).studentNum = $event),
        q: common_vendor.p({
          primaryColor: "#fff",
          disabled: true,
          placeholder: "请输入学号",
          modelValue: common_vendor.unref(profileData).studentNum
        }),
        r: common_vendor.p({
          label: "学号"
        }),
        s: common_vendor.o(($event) => common_vendor.unref(profileData).faculty = $event),
        t: common_vendor.p({
          primaryColor: "#fff",
          disabled: true,
          modelValue: common_vendor.unref(profileData).faculty
        }),
        v: common_vendor.p({
          label: "学院"
        }),
        w: common_vendor.o(($event) => common_vendor.unref(profileData).grade = $event),
        x: common_vendor.p({
          primaryColor: "#fff",
          disabled: true,
          placeholder: "请输入年级",
          modelValue: common_vendor.unref(profileData).grade
        }),
        y: common_vendor.p({
          label: "年级"
        }),
        z: common_vendor.o(haveChange),
        A: common_vendor.o(($event) => common_vendor.unref(profileData).phone = $event),
        B: common_vendor.p({
          primaryColor: "#fff",
          placeholder: "请输入电话",
          modelValue: common_vendor.unref(profileData).phone
        }),
        C: common_vendor.p({
          label: "电话"
        }),
        D: common_vendor.o(haveChange),
        E: common_vendor.o(($event) => common_vendor.unref(profileData).email = $event),
        F: common_vendor.p({
          primaryColor: "#fff",
          placeholder: "请输入邮箱",
          modelValue: common_vendor.unref(profileData).email
        }),
        G: common_vendor.p({
          label: "邮箱"
        }),
        H: common_vendor.sr("form1", "205f1dd9-3"),
        I: common_vendor.p({
          rules: _ctx.customRules,
          modelValue: common_vendor.unref(profileData)
        }),
        J: common_vendor.o(haveChange),
        K: common_vendor.o(($event) => common_vendor.unref(profileData).skillsAdvantages = $event),
        L: common_vendor.p({
          primaryColor: "#fff",
          type: "textarea",
          placeholder: "请输入自我介绍",
          modelValue: common_vendor.unref(profileData).skillsAdvantages
        }),
        M: common_vendor.o(haveChange),
        N: common_vendor.o(($event) => common_vendor.unref(profileData).others = $event),
        O: common_vendor.p({
          primaryColor: "#fff",
          type: "textarea",
          modelValue: common_vendor.unref(profileData).others
        }),
        P: common_vendor.unref(from) == 1
      }, common_vendor.unref(from) == 1 ? {
        Q: common_vendor.o(ifSave)
      } : {}, {
        R: common_vendor.unref(from) == 1
      }, common_vendor.unref(from) == 1 ? {
        S: common_vendor.o(resumeAndSubmit)
      } : {}, {
        T: common_vendor.unref(from) == 2
      }, common_vendor.unref(from) == 2 ? {
        U: common_vendor.o(completeChange),
        V: !common_vendor.unref(ifHaveChanged)
      } : {}, {
        W: common_vendor.unref(from) == 3
      }, common_vendor.unref(from) == 3 ? {
        X: common_vendor.o(createProfile)
      } : {}, {
        Y: common_vendor.p({
          type: common_vendor.unref(type),
          message: common_vendor.unref(msg),
          duration: 2e3
        }),
        Z: common_vendor.sr(message, "205f1dd9-22", {
          "k": "message"
        }),
        aa: common_vendor.p({
          type: "message"
        })
      });
    };
  }
};
wx.createPage(_sfc_main);
