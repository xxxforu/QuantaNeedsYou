"use strict";const i=require("../../common/vendor.js"),d={name:"interviewDetail",props:{detail:Object,date:String},methods:{deliverProfile(){this.$emit("deliverProfile",this.id)}},onLoad(){console.log(this.detail)}};function n(e,o,t,s,c,r){return i.e({a:e.$getStaticFilePath("startTime.png"),b:i.t(t.date),c:t.detail.state==0},t.detail.state==0?{d:e.$getStaticFilePath("noStart.png")}:t.detail.state==1?{f:e.$getStaticFilePath("endTime.png"),g:t.detail.interviewId,h:i.o((...a)=>e.goToDetail&&e.goToDetail(...a))}:t.detail.state==2?{j:e.$getStaticFilePath("hasEnd.png")}:{},{e:t.detail.state==1,i:t.detail.state==2,k:i.t(t.detail.startTime),l:i.t(t.detail.endTime)})}const l=i._export_sfc(d,[["render",n],["__scopeId","data-v-57c64d24"]]);wx.createComponent(l);
