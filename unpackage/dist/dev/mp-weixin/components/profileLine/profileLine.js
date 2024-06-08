"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "profileLine",
  props: {
    name: { type: String },
    //resumeName
    id: { type: Number }
    //resumeId
  },
  methods: {
    chooseProfile() {
      this.$emit("chooseProfile", this.name, this.id);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($props.name),
    b: common_vendor.o((...args) => $options.chooseProfile && $options.chooseProfile(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/XXX/Desktop/2023学期工作/招新小程序/enrollSystem/components/profileLine/profileLine.vue"]]);
wx.createComponent(Component);
