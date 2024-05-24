"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
if (!Array) {
  const _easycom_departmentLine2 = common_vendor.resolveComponent("departmentLine");
  const _easycom_profileLine2 = common_vendor.resolveComponent("profileLine");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_departmentLine2 + _easycom_profileLine2 + _easycom_uni_popup2)();
}
const _easycom_departmentLine = () => "../../components/departmentLine/departmentLine.js";
const _easycom_profileLine = () => "../../components/profileLine/profileLine.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_departmentLine + _easycom_profileLine + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "tajiuzhaoni",
  setup(__props) {
    var isNotDeliver = common_vendor.ref(true);
    var type = common_vendor.ref("center");
    common_vendor.ref("");
    var openProfile = common_vendor.ref(null);
    var profileListEmpty = common_vendor.ref(null);
    var departmentEmpty = common_vendor.ref(false);
    var deliveryEmpty = common_vendor.ref(true);
    var departmentList = common_vendor.ref([
      {
        "departmentId": 1001,
        "name": "产品部"
      },
      {
        "departmentId": 1002,
        "name": "设计部"
      },
      {
        "departmentId": 1003,
        "name": "研发部前端方向"
      },
      {
        "departmentId": 1004,
        "name": "研发部安卓方向"
      },
      {
        "departmentId": 1005,
        "name": "研发部后端方向"
      }
    ]);
    var profileList = common_vendor.ref([]);
    function getDepartment(isRefresh) {
      utils_request.request({ url: "department" }).then((res) => {
        console.log(res);
        if (res.code != 200) {
          departmentEmpty.value = true;
        } else {
          departmentList.value = res.data;
        }
        if (isRefresh)
          common_vendor.index.stopPullDownRefresh();
      });
    }
    common_vendor.onPullDownRefresh(() => {
      getDepartment(true);
    });
    common_vendor.onLoad(() => {
      getDepartment();
      common_vendor.index.setStorage({
        key: "haveEnterTajiuzhaoni",
        data: false
      });
    });
    common_vendor.onReady(() => {
      var tabBarHeight = common_vendor.ref(0);
      common_vendor.index.createSelectorQuery().select(".tabBar").boundingClientRect((data) => {
        console.log(data);
        tabBarHeight.value = data.height;
      }).exec();
    });
    var chooseDepartmentId = 0;
    function deliverProfile(id) {
      chooseDepartmentId = id;
      utils_request.request({ url: "resume" }).then((res) => {
        if (res.code == 200) {
          profileList.value = res.data;
          openProfile.value.open("center");
        } else {
          profileListEmpty.value.open("center");
        }
      });
    }
    var newProfileName = common_vendor.ref("名字");
    function chooseProfile(id) {
      console.log(id);
      common_vendor.index.navigateTo({
        url: "/pages/profileDetail/profileDetail?name=" + newProfileName.value + "&departmentId=" + chooseDepartmentId
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(isNotDeliver) == true ? 1 : "",
        b: common_vendor.o(($event) => common_vendor.isRef(isNotDeliver) ? isNotDeliver.value = true : isNotDeliver = true),
        c: common_vendor.unref(isNotDeliver) == false ? 1 : "",
        d: common_vendor.o(($event) => common_vendor.isRef(isNotDeliver) ? isNotDeliver.value = false : isNotDeliver = false),
        e: !common_vendor.unref(departmentEmpty)
      }, !common_vendor.unref(departmentEmpty) ? {} : {}, {
        f: common_vendor.unref(departmentEmpty)
      }, common_vendor.unref(departmentEmpty) ? {
        g: common_vendor.f(common_vendor.unref(departmentList), (item, k0, i0) => {
          return {
            a: item.departmentId,
            b: common_vendor.o(deliverProfile, item.departmentId),
            c: "80f8bad8-0-" + i0,
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
        j: !common_vendor.unref(isNotDeliver),
        k: common_vendor.f(common_vendor.unref(profileList), (item, k0, i0) => {
          return {
            a: item.resumeId,
            b: common_vendor.o(chooseProfile, item.resumeId),
            c: "80f8bad8-2-" + i0 + ",80f8bad8-1",
            d: common_vendor.p({
              name: item.resumeName,
              id: item.resumeId
            }),
            e: item.resumeId
          };
        }),
        l: common_vendor.unref(type) === "left" || common_vendor.unref(type) === "right" ? 1 : "",
        m: common_vendor.sr(openProfile, "80f8bad8-1", {
          "k": "openProfile"
        }),
        n: common_vendor.p({
          ["background-color"]: "#fff"
        }),
        o: common_vendor.unref(type) === "left" || common_vendor.unref(type) === "right" ? 1 : "",
        p: common_vendor.sr(profileListEmpty, "80f8bad8-3", {
          "k": "profileListEmpty"
        }),
        q: common_vendor.p({
          ["background-color"]: "#fff"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-80f8bad8"], ["__file", "C:/Users/XXX/Desktop/2023学期工作/招新小程序/enrollSystem/pages/tajiuzhaoni/tajiuzhaoni.vue"]]);
wx.createPage(MiniProgramPage);
