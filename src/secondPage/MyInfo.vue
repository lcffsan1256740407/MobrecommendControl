<template>
  <div id="my-info">
    <div class="header">
      <!-- 头像区域 -->
      <div class="header-title">
        <img src="../imgs/myinfo.jpg" alt="" />
        <div class="header-msg">
          <div>
            <span style="color: #fd4478">AcFun用户</span>
          </div>
          <div>年度大会员</div>
          <div>
            <span>A币: 0.0</span>
            <span>硬币: 125</span>
          </div>
        </div>
      </div>
      <!-- 动态数据区域 -->
      <div class="header-other">
        <div>
          <span>2</span>
          <span class="tag">总数据</span>
        </div>
        <span class="line"></span>
        <div>
          <span>106</span>
          <span class="tag">待完善</span>
        </div>
        <span class="line"></span>
        <div>
          <span>200</span>
          <span class="tag">可编辑</span>
        </div>
      </div>
    </div>
    <div class="main">
      <van-empty
        class="custom-image"
        image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
        description="还未完成开发"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "MyInfo",
};
</script>

<style scoped>
.header {
  padding-top: 25px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: rgb(249, 251, 250);
  border-radius: 5px;
}
.header-title {
  display: flex;
  width: 100%;
  padding-left: 20px;
}
.header-title img {
  width: 82px;
  height: 82px;
  border-radius: 50%;
}
.header-title .header-msg {
  margin-left: 10px;
  font-size: 16px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.header-title .header-msg > div:nth-child(2) {
  width: 65px;
  border-radius: 5px;
  padding: 5px;
  font-size: 12px;
  color: white;
  background-color: #fd4478;
}
.header-title .header-msg > div:nth-child(3) {
  width: 150px;
  font-size: 14px;
  color: silver;
  display: flex;
  justify-content: space-between;
}

.header-other {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 35px;
}
.header-other > div {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.header-other > div .tag {
  font-size: 14px;
  color: silver;
  margin-top: 5px;
}
.header-other > .line {
  width: 1px;
  height: 20px;
  background-color: silver;
}
.main{
    margin-top: 50px;
}
</style>