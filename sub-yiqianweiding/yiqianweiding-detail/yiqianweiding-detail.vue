<script setup>
import { checkInDetail, scanCode, deque, giveUp } from "../api/api.js";
const instance = getCurrentInstance();
if (!instance) {
  throw new Error(
    "getCurrentInstance must be called within setup or lifecycle hook."
  );
}
const getStaticFilePath =
  instance.appContext.config.globalProperties.$getStaticFilePath;

var detail = ref();
let checkIn = ref(false);
let type = ref("center");
//获取当前日期函数
function getNowFormatDate() {
  let date = new Date(),
    year = date.getFullYear(), //获取完整的年份(4位)
    month = date.getMonth() + 1, //获取当前月份(0-11,0代表1月)
    strDate = date.getDate(); // 获取当前日(1-31)
  if (month < 10) month = `0${month}`; // 如果月份是个位数，在前面补0
  if (strDate < 10) strDate = `0${strDate}`; // 如果日是个位数，在前面补0

  return `${year}-${month}-${strDate}`;
}
var date = ref();
var id = 0;
var yourTurnDpmId = 0;
let timeoutId = null; // 用于保存定时器 ID
let checkInMsg = ref("签到成功！");
let checkInType = ref("success");
let showButton = ref(true);
const successTip = ref(null);

onLoad((options) => {
  date.value = getNowFormatDate();
  id = options.id;

  checkInDetail(options.id).then((res) => {
    detail.value = res;
    uni.getStorage({
      key: id + "state",
      success: function (val) {
        detail.value.type = val;
      },
      fail() {
        uni.setStorageSync(detail.value.interviewId + "state", res.type);
      },
    });

    if (detail.value.type === 0) {
      uni.getStorage({
        key: "checkIn" + id,
        success: function (res) {
          // 判断缓存是否存在
          // 如果存在就不显示扫码按钮，直接展示数据
          checkIn.value = true;
          getDeque();
        },
      });
    }
    switch (detail.value.type) {
      case -1:
        showButton.value = false;
        break;
      case 0:
        detail.value.buttonText = "面试签到";
        break;
      case 1:
        detail.value.buttonText = "笔试签到";
        break;
      case 2:
        detail.value.buttonText = "笔试签到";
        break;
    }
  });
});
onUnload(() => {
  uni.removeStorage({ key: "yourTurnDpmId" + yourTurnDpmId });
  if (timeoutId !== null) {
    clearTimeout(timeoutId); // 取消定时器
  }
});
var result = "";
var checkList = ref([]);
var yourTurn = ref(null);
let errorNoList = ref(false);
// 轮询
function getDeque() {
  clearTimeout(timeoutId);
  uni
    .request({
      url:
        "https://qtzx.xdj666.top/quanta/recruitment_reception/check-in/deque?interview_id=" +
        id,
      header: {
        "content-type": "application/json",
        Authorization: uni.getStorageSync("token"),
      },
    })
    .then((res) => {
      checkList.value = [];
      res.data.data.forEach((item) => {
        //数据有效才保存
        if (item.departmentId !== null) {
          checkList.value.push(item);
        }
      });

      if (checkList.value.length === 0) {
        //判断处理完后数据列表是否为空
        errorNoList.value = true;
      } else {
        errorNoList.value = false;
        for (let i = 0; i < checkList.value.length; i++) {
          //如果存在'进行中'的数据 就弹出提示
          if (checkList.value[i].currentType == 2) {
            //先判断这个简历有没有提示过
            yourTurnDpmId = checkList.value[i].departmentId;
            uni.getStorage({
              key: "yourTurnDpmId" + yourTurnDpmId,
              fail() {
                yourTurn.value.open(type.value);
              },
            });
          }
        }
      }
      timeoutId = setTimeout(() => getDeque(), 5000); // 保存定时器 ID
    });
}

function getScanCode() {
  uni.scanCode({
    success(res) {
      //扫描成功
      result = res.result;
      scanCode({ code: result })
        .then((res) => {
          //扫码签到
          switch (detail.value.type) {
            case 0:
              uni.setStorage({
                data: true,
                key: "checkIn" + id,
              });
              checkIn.value = true;
              getDeque();
              break;
            case 1:
              uni.setStorageSync(id + "state", -1);
              detail.value.type = -1;
              showButton.value = false;
              successTip.value.open();
              break;
            case 2:
              uni.setStorageSync(id + "state", 0);
              detail.value.type = 0;
              checkIn.value = false;
              successTip.value.open();
              detail.value.buttonText = "面试签到";
              break;
          }
        })
        .catch((err) => {
          //扫码出错
          if (err.data.msg.includes("过期"))
            checkIn.value = "false"; //当前码过期了
          else if (err.data.msg.includes("重复")) {
            //视作已成功签到扫码
            switch (detail.value.type) {
              case 0:
                uni.setStorage({
                  data: true,
                  key: "checkIn" + id,
                });
                checkIn.value = true;
                getDeque();
                break;
              case 1:
                uni.setStorageSync(id + "state", -1);
                detail.value.type = -1;
                showButton.value = false;
                successTip.value.open();
                break;
              case 2:
                uni.setStorageSync(id + "state", 0);
                detail.value.type = 0;
                checkIn.value = false;
                successTip.value.open();
                detail.value.buttonText = "面试签到";
                break;
            }
          }
        });
    },
    fail(res) {
      uni.showToast({
        icon: "none",
        duration: 3000,
        title: "扫码失败，请重试！",
      });
    },
  });
}

// 放弃排队
const giveUpPopup = ref(null);
let giveUpId;
var msgType = ref("warn");

function handleGiveUp(e) {
  giveUpId = e.currentTarget.dataset.dpmid;
  giveUpPopup.value.open();
}

function confirmGiveUp() {
  giveUp({
    interview_id: id,
    department_id: giveUpId,
  }).then((res) => {
    uni.showToast({
      icon: "none",
      duration: 3000,
      title: "您已放弃该面试机会",
    });
    getDeque();
  });
}

//监听弹窗关闭事件
function change(e) {
  if (!e.show) {
    console.log(yourTurnDpmId);
    uni.setStorage({
      data: true,
      key: "yourTurnDpmId" + yourTurnDpmId,
    });
    getDeque();
  }
}
</script>

<template>
  <view class="container">
    <uni-popup ref="giveUpPopup" type="dialog">
      <uni-popup-dialog :type="msgType" cancelText="取消" confirmText="放弃" title="提示" content="您确定要放弃该面试吗？"
        @confirm="confirmGiveUp"></uni-popup-dialog>
    </uni-popup>

    <uni-popup ref="yourTurn" background-color="#fff" @change="change">
      <view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">
        <text class="popupTitle">通知</text>
        <text>轮到你啦~请到指定教室里面试</text>
      </view>
    </uni-popup>

    <uni-popup ref="successTip" type="message">
      <uni-popup-message :type="checkInType" :message="checkInMsg" :duration="2000"></uni-popup-message>
    </uni-popup>

    <text class="title">{{ detail.title }}</text>
    <interviewDetail :detail="detail" :date="date"></interviewDetail>
    <view disabled="{{detail.state != 1}}" v-if="!checkIn && showButton"><button @tap="getScanCode" class="myButton">
        {{ detail.buttonText }}
      </button></view>

    <view class="checkList" v-if="checkIn">
      <view class="checkItem" v-for="item in checkList" :key="item.departmentId">
        <view class="content">
          <view class="left">
            <text class="dpmName">{{ item.departmentName }}</text>
            <text class="mineNumber">{{ item.mineNumber }}</text>
          </view>
          <view class="right">
            <view>
              <text class="currentType topic">当前状态：</text>

              <text style="color: #ffa265; font-weight: bold">
                {{ item.currentType == 0 ? "已过号" : "" }}
                {{ item.currentType == 1 ? "等待中" : "" }}
                {{ item.currentType == 2 ? "进行中" : "" }}
                {{ item.currentType == 3 ? "已结束" : "" }}
              </text>
            </view>
            <view>
              <text class="waitingNum topic">前方等待：</text>{{ item.waitingNumber }}
            </view>
            <view>
              <text class="currentNumber topic">当前面试：</text>{{ item.currentNumber }}
            </view>
            <view>
              <text class="estimatedTime topic">预计时间：</text>{{ item.estimatedTime }}
            </view>
            <view>
              <text class="location topic">面试地点：</text>{{ item.location }}
            </view>
          </view>
        </view>
        <button v-if="item.currentType == 0" @tap="getScanCode" class="myButton">
          重新签到
        </button>
        <button v-else-if="item.currentType == 3" disabled class="myButton">
          已结束
        </button>
        <button v-else-if="item.currentType == 2" disabled class="myButton">
          进行中
        </button>
        <button v-else-if="item.currentType == 1" @tap="handleGiveUp" class="myButton" :data-dpmId="item.departmentId">
          放弃
        </button>
      </view>
    </view>

    <view v-if="errorNoList" class="emptyBox">
      <image :src="getStaticFilePath('bin.png')" style="width: 25vw" mode="widthFix"></image>
      <text>找不到您的排队列表</text>
    </view>
  </view>
</template>

<style scoped>
.container {
  padding-top: 30px;
  overflow-y: scroll;
}

.container>>>.popup-content {
  background-color: #fff;
  display: flex;
  color: #707070;
  flex-direction: column;
  padding: 30px 20px;
  border: 2px solid #ffa265;
  border-radius: 10px;
  align-items: center;
}

.container>>>.popup-content .popupTitle {
  font-weight: bold;
  color: #ffa265;
  margin-bottom: 15px;
}

.checkItem {
  margin: 20px auto;
  background-color: #fff;
  border-radius: 15px;
  width: 85vw;
  box-sizing: border-box;
  padding: 15px;
  box-shadow: 0 3px 8px 0 rgba(50, 49, 49, 0.06);
}

.right view {
  font-size: 14px;
  margin: 3px 0;
}

.topic {
  font-weight: bold;
}

.content {
  display: flex;
  margin: auto;
}

.dpmName {
  font-weight: bold;
  font-size: 18px;
}

.mineNumber {
  font-weight: bold;
  font-size: 35px;
  color: #ffa265;
}

.left,
.right {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title {
  font-size: 20px;
  font-weight: bold;
  justify-content: center;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.myButton {
  width: fit-content;
  margin: 15px auto;
  padding: 5px 35px !important;
}

.emptyBox {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 50px 0;
}
</style>
