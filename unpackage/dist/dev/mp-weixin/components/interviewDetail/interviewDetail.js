"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  name: "interviewDetail",
  props: {
    detail: Object,
    date: String
  },
  methods: {
    deliverProfile() {
      this.$emit("deliverProfile", this.id);
    }
  },
  onLoad() {
    console.log(this.detail);
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_assets._imports_0$5,
    b: common_vendor.t($props.date),
    c: $props.detail.state == 0
  }, $props.detail.state == 0 ? {
    d: common_assets._imports_1$3
  } : $props.detail.state == 1 ? {
    f: common_assets._imports_2$1,
    g: $props.detail.interviewId,
    h: common_vendor.o((...args) => _ctx.goToDetail && _ctx.goToDetail(...args))
  } : $props.detail.state == 2 ? {
    j: common_assets._imports_3
  } : {}, {
    e: $props.detail.state == 1,
    i: $props.detail.state == 2,
    k: common_vendor.t($props.detail.startTime),
    l: common_vendor.t($props.detail.endTime)
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-57c64d24"]]);
wx.createComponent(Component);
