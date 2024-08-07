"use strict";const e=require("../../common/vendor.js"),m=require("../api/api.js");if(!Array){const _=e.resolveComponent("uni-popup-dialog"),a=e.resolveComponent("uni-popup"),o=e.resolveComponent("uni-file-picker"),l=e.resolveComponent("uni-easyinput"),d=e.resolveComponent("uni-forms-item"),f=e.resolveComponent("uni-data-checkbox"),r=e.resolveComponent("uni-forms"),c=e.resolveComponent("uni-popup-message");(_+a+o+l+d+f+r+c)()}const T=()=>"../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js",V=()=>"../../uni_modules/uni-popup/components/uni-popup/uni-popup.js",j=()=>"../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js",w=()=>"../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js",N=()=>"../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js",z=()=>"../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js",O=()=>"../../uni_modules/uni-forms/components/uni-forms/uni-forms.js",q=()=>"../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";Math||(T+V+j+w+N+z+O+q)();const R={__name:"profileDetail",setup(_){var a=e.ref({}),o=e.ref(),l=e.ref();e.ref(0),e.ref(["信息科学与技术学院","东方语言文化学院","中国语言文化学院","亚非语言文化学院","会计学院","商学院","国际关系学院","国际商务英语学院","数学与统计学院","新闻与传播学院","日语语言文化学院","法学院","社会与公共管理学院","经济贸易学院","艺术学院","英语教育学院","英语语言文化学院","西方语言文化学院","金融学院","高级翻译学院","人工智能与电子竞技学院"]);var d=e.ref({url:"",extname:"png",name:"avatur.png"}),f=e.ref([{text:"男",value:0},{text:"女",value:1}]);e.onLoad(n=>{console.log(n),o.value=n.from,e.index.setNavigationBarTitle({title:n.name}),n.resumeId?(l.value=n.resumeId,m.getResumeDetail(n.resumeId).then(t=>{a.value=t,a.value.others.includes("Undefined")&&(console.log("为空"),a.value.others=""),a.value.getBackImage=[{name:"用户头像",extname:"image",url:a.value.image}],console.log(t)})):(d.value.url=e.index.getStorageSync("avatarUrl"),a.value.name=e.index.getStorageSync("userName"),a.value.faculty=e.index.getStorageSync("faculty"),a.value.grade=e.index.getStorageSync("grade"),a.value.studentNum=e.index.getStorageSync("studentNum")),n.departmentId&&(a.value.department=n.departmentId),n.name&&(a.value.name=n.name)});var r=0;function c(n){console.log(n.detail.value),r=n.detail.value?1:0}var k=e.reactive({height:171,width:128,margin:"auto",background:{color:"#f9e6da"},border:{radius:"15px"}}),v=!1;function B(n){console.log(n),a.value.image=n.tempFilePaths[0],console.log(a.value.image),v=!0}function b(){return!(!a.value.image||a.value.image.length==0||!("sex"in a.value)||!a.value.phone||a.value.phone.length==0||!a.value.email||a.value.email.length==0||!a.value.skillsAdvantages||a.value.skillsAdvantages.length==0)}function p(){return new Promise((n,t)=>{e.index.uploadFile({url:"https://zx.quantacenter.com/recruitment_reception/resume/"+l.value,filePath:a.value.image,name:"image",formData:{sex:a.value.sex,department_id:a.value.department,email:a.value.email,phone:a.value.phone,skill_advantages:a.value.skillsAdvantages,others:a.value.others},method:"POST",header:{Authorization:e.index.getStorageSync("token")},success(u){n(u)},fail(u){console.log(u),t(u)}})})}function F(){return new Promise((n,t)=>{e.index.uploadFile({url:"https://zx.quantacenter.com/recruitment_reception/resume",filePath:a.value.image,name:"image",formData:{sex:a.value.sex,department_id:a.value.department,email:a.value.email,skill_advantages:a.value.skillsAdvantages,others:a.value.others,phone:a.value.phone,name:a.value.name,save:r},method:"POST",header:{Authorization:e.index.getStorageSync("token")},success(u){let s=JSON.parse(u.data).data;s&&n(s.resumeId)},fail(u){console.log(u),t(u)}})})}var h=e.ref(null),S="info";function C(n,t){l.value&&r?v?p().then(u=>{m.submit({resumeId:l.value,departmentId:a.value.department}).then(s=>{console.log(s)})}):e.index.downloadFile({url:a.value.image,success(u){console.log(u),a.value.image=u.tempFilePath,p().then(s=>{m.submit({resumeId:l.value,departmentId:a.value.department}).then(P=>{console.log(P)})})},fail(){e.index.showToast({icon:"none",duration:3e3,title:"服务器错误,请稍后再试"})}}):l.value?m.submit({resumeId:l.value,departmentId:a.value.department}).then(u=>{console.log(u)}):F().then(u=>{console.log(u),l.value=u,m.submit({resumeId:l.value,departmentId:a.value.department}).then(s=>{console.log(s)})})}function D(){if(!b()){e.index.showToast({title:"请完整填写简历！",icon:"error"});return}h.value.open()}let g=e.ref(null),A=e.ref("success"),y=e.ref("修改成功！");function I(){v?p():e.index.downloadFile({url:a.value.image,success(n){a.value.image=n.tempFilePath,p().then(t=>{JSON.parse(t.data).code&&(g.value.open(),setTimeout(()=>{e.index.navigateBack()},2e3))})},fail(){e.index.showToast({icon:"none",duration:3e3,title:"服务器错误,请稍后再试"})}})}let x=e.ref(!1);function i(){x.value=!0}function E(){e.index.uploadFile({url:"https://zx.quantacenter.com/recruitment_reception/resume",filePath:a.value.image,name:"image",formData:{sex:a.value.sex,email:a.value.email,skill_advantages:a.value.skillsAdvantages,others:a.value.others,phone:a.value.phone,name:a.value.name,save:1},method:"POST",header:{Authorization:e.index.getStorageSync("token")},success(n){JSON.parse(n.data).code==200&&(y.value="创建成功！",g.value.open(),setTimeout(()=>{e.index.navigateBack()},2e3))},fail(n){console.log(n),reject(n)}})}return(n,t)=>e.e({a:e.o(C),b:e.p({type:e.unref(S),cancelText:"我再想想",confirmText:"确认投递",title:"是否确认投递该简历",content:"注:投递后无法修改或撤回"}),c:e.sr(h,"205f1dd9-0",{k:"alertDialog"}),d:e.p({type:"dialog"}),e:e.sr("file","205f1dd9-2"),f:e.o(B),g:e.o(u=>e.unref(a).getBackImage=u),h:e.p({value:e.unref(a).getBackImage,"auto-upload":"false",limit:"1","del-icon":!1,"disable-preview":!0,imageStyles:e.unref(k),"file-mediatype":"image",modelValue:e.unref(a).getBackImage}),i:e.o(u=>e.unref(a).name=u),j:e.p({primaryColor:"#fff",disabled:!0,placeholder:"请输入姓名",modelValue:e.unref(a).name}),k:e.p({label:"姓名"}),l:e.o(i),m:e.o(u=>e.unref(a).sex=u),n:e.p({localdata:e.unref(f),modelValue:e.unref(a).sex}),o:e.p({label:"性别"}),p:e.o(u=>e.unref(a).studentNum=u),q:e.p({primaryColor:"#fff",disabled:!0,placeholder:"请输入学号",modelValue:e.unref(a).studentNum}),r:e.p({label:"学号"}),s:e.o(u=>e.unref(a).faculty=u),t:e.p({primaryColor:"#fff",disabled:!0,modelValue:e.unref(a).faculty}),v:e.p({label:"学院"}),w:e.o(u=>e.unref(a).grade=u),x:e.p({primaryColor:"#fff",disabled:!0,placeholder:"请输入年级",modelValue:e.unref(a).grade}),y:e.p({label:"年级"}),z:e.o(i),A:e.o(u=>e.unref(a).phone=u),B:e.p({primaryColor:"#fff",placeholder:"请输入电话",modelValue:e.unref(a).phone}),C:e.p({label:"电话"}),D:e.o(i),E:e.o(u=>e.unref(a).email=u),F:e.p({primaryColor:"#fff",placeholder:"请输入邮箱",modelValue:e.unref(a).email}),G:e.p({label:"邮箱"}),H:e.sr("form1","205f1dd9-3"),I:e.p({rules:n.customRules,modelValue:e.unref(a)}),J:e.o(i),K:e.o(u=>e.unref(a).skillsAdvantages=u),L:e.p({primaryColor:"#fff",type:"textarea",placeholder:"请输入自我介绍",modelValue:e.unref(a).skillsAdvantages}),M:e.o(i),N:e.o(u=>e.unref(a).others=u),O:e.p({primaryColor:"#fff",type:"textarea",modelValue:e.unref(a).others}),P:e.unref(o)==1},e.unref(o)==1?{Q:e.o(c)}:{},{R:e.unref(o)==1},e.unref(o)==1?{S:e.o(D)}:{},{T:e.unref(o)==2},e.unref(o)==2?{U:e.o(I),V:!e.unref(x)}:{},{W:e.unref(o)==3},e.unref(o)==3?{X:e.o(E)}:{},{Y:e.p({type:e.unref(A),message:e.unref(y),duration:2e3}),Z:e.sr(g,"205f1dd9-22",{k:"message"}),aa:e.p({type:"message"})})}};wx.createPage(R);
