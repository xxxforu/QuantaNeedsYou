"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "departmentLine",
  props: {
    title: { type: String },
    //departmentName
    id: { type: Number }
    //departmentId
  },
  methods: {
    deliverProfile() {
      this.$emit("deliverProfile", this.id);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($props.title),
    b: _ctx.$getStaticFilePath("back.png"),
    c: common_vendor.o((...args) => $options.deliverProfile && $options.deliverProfile(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
