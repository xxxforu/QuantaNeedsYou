"use strict";const e=require("../../common/vendor.js"),i=require("../api/api.js");if(!Array){const m=e.resolveComponent("uni-easyinput"),r=e.resolveComponent("uni-popup-dialog"),a=e.resolveComponent("uni-popup");(m+r+a)()}const F=()=>"../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js",j=()=>"../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js",B=()=>"../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";Math||(F+j+B)();const P={__name:"wodejianli",setup(m){const r=e.getCurrentInstance();if(!r)throw new Error("getCurrentInstance must be called within setup or lifecycle hook.");const a=r.appContext.config.globalProperties.$getStaticFilePath;e.ref(!1),e.ref("双击我试试看呢");let s=e.ref([]),t=e.ref(null),p=e.ref(null),v=e.ref("info"),f=e.ref(null),d=e.ref(0);const h=(u,o)=>{e.index.navigateTo({url:"/sub-wodejianli/profileDetail/profileDetail?from=2&resumeId="+u+"&name="+o})},D=u=>{d.value=u,f.value.open()},y=()=>{i.deleteResume(d.value).then(()=>i.getResumeList()).then(u=>{s.value=u}).catch(u=>{console.error("Error deleting or fetching resume list:",u)})},g=u=>{console.log("正在处理的简历id：",u);let o=s.value.find(n=>n.resumeId===u);o?p.value==o.resumeName?console.log("没有更新名字！"):o.resumeName==""?o.resumeName=p.value:i.ChangeResumeName(u,o.resumeName):console.log("未找到对应的对象")},I=()=>{t.value&&(g(t.value),t.value=null)};e.onShow(()=>{i.getResumeList().then(u=>{console.log(u),s.value=u})});const C=(u,o)=>{t.value=u,p.value=o},E=u=>{t.value===u&&(g(u),t.value=null)};var c=e.ref(null);function N(){c.value.open()}const _=e.ref(null);function w(u){if(u==""){e.index.showToast({title:"请命名简历！",icon:"error"});return}_.value.val="",e.index.navigateTo({url:"/sub-wodejianli/profileDetail/profileDetail?name="+u+"&from=3"}),c.value.close()}return(u,o)=>({a:e.o(N),b:e.f(e.unref(s),(n,b,x)=>({a:e.t(n.resumeName),b:e.o(l=>D(n.resumeId),n.resumeId),c:e.o(l=>C(n.resumeId,n.resumeName),n.resumeId),d:e.o(l=>h(n.resumeId,n.resumeName),n.resumeId),e:e.unref(t)!==n.resumeId,f:e.o(()=>{},n.resumeId),g:e.o(l=>E(n.resumeId),n.resumeId),h:"ee8529fc-0-"+x,i:e.o(l=>n.resumeName=l,n.resumeId),j:e.p({primaryColor:"#fff",trim:!0,maxlength:"15",placeholder:"输入新名称",modelValue:n.resumeName}),k:e.unref(t)===n.resumeId,l:n.resumeId})),c:e.unref(a)("delete.png"),d:e.unref(a)("rename.png"),e:e.o(I),f:e.o(y),g:e.p({type:e.unref(v),cancelText:"取消",confirmText:"确认",title:"提示",content:"简历删除后不可恢复,您确认要删除吗？"}),h:e.sr(f,"ee8529fc-1",{k:"alertDialog"}),i:e.p({type:"dialog"}),j:e.sr(_,"ee8529fc-4,ee8529fc-3",{k:"inputClose"}),k:e.o(w),l:e.p({mode:"input",title:"简历命名",placeholder:"请输入内容"}),m:e.sr(c,"ee8529fc-3",{k:"inputDialog"}),n:e.p({type:"dialog"})})}},T=e._export_sfc(P,[["__scopeId","data-v-ee8529fc"]]);wx.createPage(T);