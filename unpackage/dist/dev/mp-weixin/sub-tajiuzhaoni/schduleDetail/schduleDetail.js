"use strict";
const common_vendor = require("../../common/vendor.js");
const subTajiuzhaoni_api_api = require("../api/api.js");
const _sfc_main = {
  __name: "schduleDetail",
  setup(__props) {
    const instance = common_vendor.getCurrentInstance();
    if (!instance) {
      throw new Error("getCurrentInstance must be called within setup or lifecycle hook.");
    }
    const getStaticFilePath = instance.appContext.config.globalProperties.$getStaticFilePath;
    var data = common_vendor.ref({});
    common_vendor.onLoad((option) => {
      console.log(option.id);
      subTajiuzhaoni_api_api.getNotice(option.id).then((res) => {
        console.log(res);
        data.value = res;
      });
    });
    function downLoad() {
      console.log(data.value.annex);
      common_vendor.index.showLoading({ title: "正在下载" });
      data.value.annex.substring(data.value.annex.lastIndexOf(".") + 1);
      common_vendor.index.downloadFile({
        url: data.value.annex,
        //文件的下载路径
        // filePath: wx.env.USER_DATA_PATH + '/file.' + fileExtension, // 指定文件的下载路径和名字、后缀名，防止unknown
        success(res) {
          console.log("downLoadFileRES------->", res);
          common_vendor.index.saveFile({
            tempFilePath: res.tempFilePath,
            //文件的保存路径
            success: function(res2) {
              console.log("saveFileRES------------------>", res2);
              const savedFilePath = res2.savedFilePath;
              common_vendor.index.openDocument({
                showMenu: true,
                filePath: savedFilePath,
                success: function(res3) {
                  common_vendor.index.hideLoading();
                },
                fail: function(err) {
                  console.log(err);
                },
                complete: function(res3) {
                  common_vendor.index.hideLoading();
                }
              });
            },
            fail: function(err) {
              console.log(err);
              common_vendor.index.showToast({
                icon: "none",
                duration: 3e3,
                title: `${err.errMsg}`
              });
            }
          });
        },
        fail(err) {
          common_vendor.index.showToast({
            icon: "none",
            duration: 3e3,
            title: `${err.errMsg}`
          });
        }
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(data).result == 2
      }, common_vendor.unref(data).result == 2 ? {
        b: common_vendor.unref(getStaticFilePath)("scheduleDetailBanner.png")
      } : {
        c: common_vendor.unref(getStaticFilePath)("miss.png")
      }, {
        d: common_vendor.t(common_vendor.unref(data).content),
        e: common_vendor.unref(data).annex
      }, common_vendor.unref(data).annex ? {
        f: common_vendor.unref(getStaticFilePath)("link.png"),
        g: common_vendor.t(common_vendor.unref(data).title),
        h: common_vendor.o(downLoad)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a1df3caf"]]);
wx.createPage(MiniProgramPage);
