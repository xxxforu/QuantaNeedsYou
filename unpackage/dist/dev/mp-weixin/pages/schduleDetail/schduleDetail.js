"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_notice = require("../../api/notice.js");
const _sfc_main = {
  __name: "schduleDetail",
  setup(__props) {
    var data = common_vendor.ref({});
    common_vendor.onLoad((option) => {
      console.log(option.id);
      api_notice.getNotice(option.id).then((res) => {
        console.log(res);
        data.value = res;
      });
    });
    function downLoad() {
      common_vendor.index.showLoading({ title: "正在下载" });
      var fileExtension = data.annex.substring(data.annex.lastIndexOf(".") + 1);
      common_vendor.index.downloadFile({
        url: data.annex,
        //文件的下载路径
        filePath: common_vendor.wx$1.env.USER_DATA_PATH + "/file." + fileExtension,
        // 指定文件的下载路径和名字、后缀名，防止unknown
        success(res) {
          common_vendor.index.saveFile({
            tempFilePath: res.filePath,
            //文件的保存路径
            success: function(res2) {
              console.log(res2);
              const savedFilePath = res2.savedFilePath;
              common_vendor.index.openDocument({
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
            }
          });
        },
        fail(res) {
        }
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$9,
        b: common_vendor.t(common_vendor.unref(data).content),
        c: common_vendor.unref(data).annex
      }, common_vendor.unref(data).annex ? {
        d: common_assets._imports_1$6,
        e: common_vendor.t(common_vendor.unref(data).title),
        f: common_vendor.o(downLoad)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-524fcf75"]]);
wx.createPage(MiniProgramPage);
